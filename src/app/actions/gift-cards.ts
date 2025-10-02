"use server";

import { supabase } from '@/integrations/supabase/client';
import { revalidatePath } from 'next/cache';
import { v4 as uuidv4 } from 'uuid'; // Still needed for getGiftCardDetails if it generates codes, but not for create.

// Removed: createGiftCard function

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