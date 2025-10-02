import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/integrations/supabase/client'; // Using the client for simplicity, but for server actions, a server client is often preferred.
import { createClient } from '@supabase/supabase-js'; // Import for server-side Supabase client

// Initialize a Supabase client for server-side operations (e.g., with service role key)
// For webhooks, it's safer to use the service role key if you need to bypass RLS for internal writes.
// However, for this example, we'll use the anon key and rely on the RLS policy for 'service_role' to allow inserts.
// In a real scenario, you'd use process.env.SUPABASE_SERVICE_ROLE_KEY here.
const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!, // Use service role key for server-side operations
  {
    auth: {
      persistSession: false,
    },
  }
);

export async function POST(req: NextRequest) {
  console.log('Received Square webhook event.');

  // TODO: Implement Square webhook signature verification for security
  // const signature = req.headers.get('X-Square-Signature');
  // const body = await req.text(); // Read body as text for signature verification
  // if (!verifySignature(body, signature, process.env.SQUARE_WEBHOOK_SECRET)) {
  //   return NextResponse.json({ error: 'Invalid signature' }, { status: 401 });
  // }

  const event = await req.json();
  console.log('Webhook event data:', event);

  // The spec mentions:
  // - Hashing PII (SHA-256)
  // - Forwarding to Meta CAPI + Google Ads Enhanced Conversions with event_id dedupe
  // - Writing minimal booking ledger to Supabase (timestamp, staff, service, value, source if resolvable)

  try {
    // Example of handling a 'booking.created' event
    if (event.type === 'booking.created' || event.type === 'booking.updated') {
      const booking = event.data.object.booking;
      console.log(`Processing booking event: ${event.type} for booking ID: ${booking.id}`);

      // Extract relevant details
      const bookingId = booking.id;
      const customerId = booking.customer_id; // Consider hashing this if it's PII
      const staffId = booking.staff_member_id;
      const serviceName = booking.appointment_segments?.[0]?.service_variation_name || 'Unknown Service';
      const serviceValue = booking.appointment_segments?.[0]?.service_variation_money?.amount / 100 || 0; // Convert cents to dollars
      const bookingTimestamp = booking.start_at; // ISO 8601 format

      // Store relevant booking details in Supabase
      const { data, error } = await supabaseAdmin
        .from('square_bookings_ledger')
        .insert({
          event_id: event.event_id,
          event_type: event.type,
          booking_id: bookingId,
          customer_id: customerId, // TODO: Hash PII like customer_id before storing or sending to external APIs
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
      // 1. Fetch customer details from Square API using booking.customer_id (if needed for PII hashing)
      // 2. Hash PII (e.g., email, phone) using SHA-256
      // 3. Send data to Meta CAPI and Google Ads Enhanced Conversions with event_id dedupe
    } else {
      console.log(`Unhandled Square event type: ${event.type}`);
    }

    return NextResponse.json({ status: 'success', received: true });
  } catch (e) {
    console.error('Unexpected error processing Square webhook:', e);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// TODO: Implement signature verification function
// function verifySignature(body: string, signature: string | null, secret: string | undefined): boolean {
//   if (!signature || !secret) return false;
//   // Implement actual Square signature verification logic here
//   // This typically involves HMAC-SHA1 hashing of the body with the secret
//   return true;
// }