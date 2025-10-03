import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

// Define interfaces for the Square webhook event structure
interface SquareBookingSegment {
  service_variation_name?: string;
  service_variation_money?: {
    amount: number;
    currency: string;
  };
}

interface SquareBooking {
  id: string;
  customer_id?: string;
  staff_member_id?: string;
  start_at?: string;
  appointment_segments?: SquareBookingSegment[];
}

interface SquareWebhookObject {
  booking: SquareBooking;
}

interface SquareWebhookData {
  object: SquareWebhookObject;
}

interface SquareWebhookEvent {
  event_id: string;
  type: string;
  data: SquareWebhookData;
}

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

export async function POST(req: NextRequest) {
  console.log('Received Square webhook event.');

  const event = await req.json() as SquareWebhookEvent; // Assert the type of the incoming event
  console.log('Webhook event data:', event);

  try {
    if (event.type === 'booking.created' || event.type === 'booking.updated') {
      const booking = event.data.object.booking;
      console.log(`Processing booking event: ${event.type} for booking ID: ${booking.id}`);

      // Extract relevant details
      const bookingId = booking.id;
      const customerId = booking.customer_id || null;
      const staffId = booking.staff_member_id || null;
      const serviceName = booking.appointment_segments?.[0]?.service_variation_name || 'Unknown Service';
      const serviceValue = booking.appointment_segments?.[0]?.service_variation_money?.amount ? booking.appointment_segments[0].service_variation_money.amount / 100 : 0; // Convert cents to dollars
      const bookingTimestamp = booking.start_at || null; // ISO 8601 format

      // Store relevant booking details in Supabase (without hashing customer_id for now)
      const { data, error } = await supabaseAdmin
        .from('square_bookings_ledger')
        .insert({
          event_id: event.event_id,
          event_type: event.type,
          booking_id: bookingId,
          customer_id: customerId, // Storing customer ID directly as hashing is removed
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
      // 1. Forward data to Meta CAPI and Google Ads Enhanced Conversions with event_id dedupe
      //    (If PII is sent to these services, ensure it is hashed at that point if required)
    } else {
      console.log(`Unhandled Square event type: ${event.type}`);
    }

    return NextResponse.json({ status: 'success', received: true });
  } catch (e) {
    console.error('Unexpected error processing Square webhook:', e);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}