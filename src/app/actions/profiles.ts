"use server";

import { revalidatePath } from 'next/cache';
import { CLOUDFLARE_WORKER_BASE_URL } from '@/integrations/cloudflare/client';

interface ProfileData {
  first_name: string | null;
  last_name: string | null;
  avatar_url: string | null;
}

interface UpdateProfileParams {
  userId: string;
  first_name?: string | null;
  last_name?: string | null;
  avatar_url?: string | null;
}

export async function getProfile(userId: string): Promise<{ success: boolean; data?: ProfileData; error?: string }> {
  try {
    const response = await fetch(`${CLOUDFLARE_WORKER_BASE_URL}/profiles/${userId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        // Add any necessary authorization headers here, e.g., a bearer token
        // 'Authorization': `Bearer ${yourAuthToken}`
      },
      // Ensure no-cache for server actions if fresh data is always needed
      cache: 'no-store',
    });

    if (!response.ok) {
      const errorData = await response.json();
      return { success: false, error: errorData.message || 'Failed to fetch profile.' };
    }

    const data = await response.json();
    return { success: true, data: data.profile };
  } catch (e: any) {
    console.error('Error fetching profile:', e);
    return { success: false, error: e.message || 'An unexpected error occurred while fetching profile.' };
  }
}

export async function updateProfile({ userId, first_name, last_name, avatar_url }: UpdateProfileParams): Promise<{ success: boolean; error?: string }> {
  try {
    const response = await fetch(`${CLOUDFLARE_WORKER_BASE_URL}/profiles/${userId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        // Add any necessary authorization headers here
        // 'Authorization': `Bearer ${yourAuthToken}`
      },
      body: JSON.stringify({ first_name, last_name, avatar_url }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      return { success: false, error: errorData.message || 'Failed to update profile.' };
    }

    revalidatePath('/profile');
    return { success: true };
  } catch (e: any) {
    console.error('Error updating profile:', e);
    return { success: false, error: e.message || 'An unexpected error occurred while updating profile.' };
  }
}