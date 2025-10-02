"use server";

import { supabase } from '@/integrations/supabase/client';
import { v4 as uuidv4 } from 'uuid';

interface CreateGiftCardParams {
  value: number;
  recipientName: string;
  recipientEmail: string;
  senderName: string;
  message?: string;
  purchasedByUserId?: string | null;
}

export async function createGiftCard({
  value,
  recipientName,
  recipientEmail,
  senderName,
  message,
  purchasedByUserId,
}: CreateGiftCardParams) {
  try {
    // Generate a unique 12-character alphanumeric code
    const code = uuidv4().replace(/-/g, '').substring(0, 12).toUpperCase();

    const { data, error } = await supabase
      .from('gift_cards')
      .insert({
        code,
        value,
        balance: value, // Initial balance is the full value
        recipient_name: recipientName,
        recipient_email: recipientEmail,
        sender_name: senderName,
        message,
        purchased_by_user_id: purchasedByUserId,
        status: 'active',
      })
      .select()
      .single();

    if (error) {
      console.error('Supabase error creating gift card:', error);
      return { success: false, error: error.message };
    }

    // In a real application, you would also trigger an email to the recipient here
    // with the gift card code and value.

    return { success: true, code: data.code, giftCardId: data.id };
  } catch (e) {
    console.error('Unexpected error in createGiftCard:', e);
    return { success: false, error: 'An unexpected server error occurred.' };
  }
}

export async function getGiftCardDetails(code: string) {
  try {
    const { data, error } = await supabase
      .from('gift_cards')
      .select('code, value, balance, status') // Only select non-sensitive public info
      .eq('code', code.toUpperCase())
      .single();

    if (error) {
      // If no gift card is found or other error, return a generic error
      console.error('Supabase error fetching gift card:', error);
      return { success: false, error: 'Gift card not found or invalid code.' };
    }

    return { success: true, data };
  } catch (e) {
    console.error('Unexpected error in getGiftCardDetails:', e);
    return { success: false, error: 'An unexpected server error occurred.' };
  }
}