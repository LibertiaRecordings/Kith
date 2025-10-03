import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import crypto from 'crypto'; // Import Node.js crypto module

// Initialize a Supabase client for server-side operations (e.g., with service role key)
const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!, // Use service role key for server-side operations
  {
    auth: {
      persistSession: false,
    },
  }
);

// Utility function to hash PII using SHA-256
function hashSha256(data: string): string {
  return crypto.createHash('sha256').update(data).digest('hex');
}

// Function to verify Square webhook signature
function verifySignature(body: string, signature: string | null, secret: string | undefined): boolean {
  if (!signature || !secret) {
    console.warn('Webhook secret or signature missing. Skipping verification.');
    return false; // In production, you might want to return false here
  }

  const hmac = crypto.createHHmac('sha1', secret);
  hmac.update(body);
  const expectedSignature = hmac.digest('base64');

  // Compare the expected signature with the received signature
  return crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(expectedSignature));
}

export async function POST(req: NextRequest) {
  console.log('Received Square webhook event.');

  const squareWebhookSecret = process.env.SQUARE_WEBHOOK_SECRET;
  const signature = req.headers.get('X-Square-Signature');
  const rawBody = await req.text(); // Read body as text for signature verification

  // Verify Square webhook signature
  if (!verifySignature(rawBody, signature, squareWebhookSecret)) {
    console.error('Invalid Square webhook signature.');
    return NextResponse.json({ error: 'Invalid signature' }, { status: 401 });
  }

  const event = JSON.parse(rawBody); // Parse body to JSON after verification
  console.log('Webhook event data:', event);

  try {
    if (event.type === 'booking.created' || event.type === 'booking.updated') {
      const booking = event.data.object.booking;
      console.log(`Processing booking event: ${event.type} for booking ID: ${booking.id}`);

      // Extract relevant details
      const bookingId = booking.id;
      const customerId = booking.customer_id;
      const staffId = booking.staff_member_id;
      const serviceName = booking.appointment_segments?.[0]?.service_variation_name || 'Unknown Service';
      const serviceValue = booking.appointment_segments?.[0]?.service_variation_money?.amount / 100 || 0; // Convert cents to dollars
      const bookingTimestamp = booking.start_at; // ISO 8601 format

      // Hash PII (customer_id) before storing
      const hashedCustomerId = customerId ? hashSha256(customerId) : null;

      // Store relevant booking details in Supabase
      const { data, error } = await supabaseAdmin
        .from('square_bookings_ledger')
        .insert({
          event_id: event.event_id,
          event_type: event.type,
          booking_id: bookingId,
          customer_id: hashedCustomerId, // Store hashed customer ID
          staff_id: staffId,
          service_name: serviceName,
          service_value: serviceValue,
          booking_timestamp: bookingTimestamp,
          raw_event_data: event, // Store the full raw event for comprehensive logging/debugging
        })
        .select()
        .single();

      if (error) {
        console.error('Error inserting Square event into Supabase:', error);
        return NextResponse.json({ error: 'Failed to process webhook event' }, { status: 500 });
      }

      console.log('Square event successfully logged to Supabase:', data);

      // TODO:
      // 1. Forward hashed data to Meta CAPI and Google Ads Enhanced Conversions with event_id dedupe
      //    (Ensure any PII sent to these services is also hashed)
    } else {
      console.log(`Unhandled Square event type: ${event.type}`);
    }

    return NextResponse.json({ status: 'success', received: true });
  } catch (e) {
    console.error('Unexpected error processing Square webhook:', e);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}