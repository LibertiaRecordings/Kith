import { NextRequest, NextResponse } from 'next/server';

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

  // This functionality requires a database (Supabase) and external API integrations.
  // For now, this is a placeholder.

  // Example of handling a 'booking.created' event
  if (event.type === 'booking.created') {
    const booking = event.data.object.booking;
    console.log(`New booking created: ${booking.id} for ${booking.customer_id}`);

    // TODO:
    // 1. Fetch customer details from Square API using booking.customer_id
    // 2. Hash PII (e.g., email, phone) using SHA-256
    // 3. Send data to Meta CAPI and Google Ads Enhanced Conversions
    // 4. Store relevant booking details in Supabase
  }

  return NextResponse.json({ status: 'success', received: true });
}

// TODO: Implement signature verification function
// function verifySignature(body: string, signature: string | null, secret: string | undefined): boolean {
//   if (!signature || !secret) return false;
//   // Implement actual Square signature verification logic here
//   // This typically involves HMAC-SHA1 hashing of the body with the secret
//   return true;
// }