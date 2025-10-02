"use server";

import { supabase } from '@/integrations/supabase/client';
import { revalidatePath } from 'next/cache';

interface UpdateProfileParams {
  userId: string;
  firstName?: string | null;
  lastName?: string | null;
  avatarUrl?: string | null;
}

export async function getProfile(userId: string) {
  const { data, error } = await supabase
    .from('profiles')
    .select('first_name, last_name, avatar_url')
    .eq('id', userId)
    .single();

  if (error) {
    console.error('Error fetching profile:', error);
    return { success: false, error: error.message };
  }

  return { success: true, data };
}

export async function updateProfile({ userId, firstName, lastName, avatarUrl }: UpdateProfileParams) {
  const { error } = await supabase
    .from('profiles')
    .update({
      first_name: firstName,
      last_name: lastName,
      avatar_url: avatarUrl,
      updated_at: new Date().toISOString(),
    })
    .eq('id', userId);

  if (error) {
    console.error('Error updating profile:', error);
    return { success: false, error: error.message };
  }

  revalidatePath('/profile'); // Revalidate the profile page to show updated data
  return { success: true };
}