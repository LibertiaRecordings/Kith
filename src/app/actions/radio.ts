"use server";

import { createSupabaseServerClient } from '@/integrations/supabase/server';
import { revalidatePath } from 'next/cache';
import { v4 as uuidv4 } from 'uuid'; // For generating unique file names

interface UploadTrackParams {
  title: string;
  artist: string | null;
  file: File;
  duration_seconds?: number | null;
  is_dj_mix: boolean;
}

export async function uploadRadioTrack({ title, artist, file, duration_seconds, is_dj_mix }: UploadTrackParams) {
  const supabase = createSupabaseServerClient();

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    return { success: false, error: 'Unauthorized: User not logged in.' };
  }

  // Check if the user is an admin
  const { data: profile, error: profileError } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', user.id)
    .single();

  if (profileError || profile?.role !== 'admin') {
    console.error('Unauthorized access attempt to upload radio track:', profileError);
    return { success: false, error: 'Unauthorized: Only administrators can upload tracks.' };
  }

  const fileExtension = file.name.split('.').pop();
  const fileName = `${uuidv4()}.${fileExtension}`;
  const filePath = `tracks/${fileName}`; // Store in a 'tracks' folder in the bucket

  // Upload file to Supabase Storage
  const { error: uploadError } = await supabase.storage
    .from('radio-music')
    .upload(filePath, file, {
      cacheControl: '3600',
      upsert: false,
    });

  if (uploadError) {
    console.error('Error uploading file to Supabase Storage:', uploadError);
    return { success: false, error: `Failed to upload audio file: ${uploadError.message}` };
  }

  // Insert track metadata into the database
  const { error: insertError } = await supabase
    .from('radio_tracks')
    .insert({
      title,
      artist,
      file_path: filePath,
      duration_seconds,
      is_dj_mix,
      // Assuming 'created_at' and 'id' are handled by database defaults
    });

  if (insertError) {
    console.error('Error inserting track metadata into database:', insertError);
    // Optionally, delete the uploaded file if metadata insertion fails
    await supabase.storage.from('radio-music').remove([filePath]);
    return { success: false, error: `Failed to save track metadata: ${insertError.message}` };
  }

  revalidatePath('/radio'); // Revalidate any page that displays radio tracks
  revalidatePath('/admin/upload-mix'); // Revalidate the admin page itself
  return { success: true };
}