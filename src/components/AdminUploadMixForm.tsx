"use client";

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Checkbox } from '@/components/ui/checkbox';
import { toast } from 'sonner';
import { uploadRadioTrack } from '@/app/actions/radio';
import { Loader2 } from 'lucide-react';

const MAX_FILE_SIZE = 50 * 1024 * 1024; // 50MB
const ACCEPTED_MIME_TYPES = ["audio/mpeg", "audio/wav", "audio/ogg", "audio/aac", "audio/flac"];

// Explicitly define the type for form values to ensure consistency with defaultValues
type UploadMixFormValues = {
  title: string;
  artist?: string | null;
  audioFile?: File; // This matches the optional() in the schema and defaultValues
  duration_seconds?: number | null;
  is_dj_mix: boolean;
};

// Define the schema for form validation, explicitly typing it with UploadMixFormValues
const uploadMixFormSchema: z.ZodType<UploadMixFormValues> = z.object({
  title: z.string().min(1, { message: 'Title is required.' }),
  artist: z.string().nullable().optional(),
  audioFile: z
    .instanceof(File)
    .optional() // It's optional in the UI, so it should be optional in the base schema
    .refine((file) => file !== undefined, { message: 'Audio file is required.' }) // Refine to ensure it's present for submission
    .refine((file) => !file || file.size <= MAX_FILE_SIZE, `Max file size is 50MB.`) // Guard with !file
    .refine(
      (file) => !file || ACCEPTED_MIME_TYPES.includes(file.type), // Guard with !file
      "Only .mp3, .wav, .ogg, .aac, and .flac formats are supported."
    ),
  duration_seconds: z.preprocess(
    (val: unknown) => {
      if (val === '' || val === undefined) {
        return null;
      }
      const num = Number(val);
      return isNaN(num) ? null : num;
    },
    z.union([z.number().int().min(0, { message: 'Duration must be a positive number.' }), z.literal(null)])
  ).optional(),
  is_dj_mix: z.boolean().default(true),
});

const AdminUploadMixForm: React.FC = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<UploadMixFormValues>({
    resolver: zodResolver(uploadMixFormSchema),
    defaultValues: {
      title: '',
      artist: null,
      audioFile: undefined, // This correctly matches `File | undefined` from the schema
      duration_seconds: null,
      is_dj_mix: true,
    },
  });

  const onSubmit = async (values: UploadMixFormValues) => {
    setIsSubmitting(true);
    const loadingToastId = toast.loading('Uploading track...');

    // The schema's refine ensures audioFile is a File here, but for type safety in runtime
    if (!values.audioFile) {
      toast.error('Audio file is required.', { id: loadingToastId });
      setIsSubmitting(false);
      return;
    }

    try {
      const result = await uploadRadioTrack({
        title: values.title,
        artist: values.artist || null,
        file: values.audioFile, // Now `values.audioFile` is guaranteed to be `File` by validation
        duration_seconds: values.duration_seconds,
        is_dj_mix: values.is_dj_mix,
      });

      if (result.success) {
        toast.success('Track uploaded successfully!', { id: loadingToastId });
        form.reset({
          title: '',
          artist: null,
          audioFile: undefined,
          duration_seconds: null,
          is_dj_mix: true,
        });
      } else {
        toast.error(result.error || 'Failed to upload track.', { id: loadingToastId });
      }
    } catch (error) {
      console.error('Error uploading track:', error);
      toast.error('An unexpected error occurred.', { id: loadingToastId });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-foreground font-body text-base">Track Title</FormLabel>
              <FormControl>
                <Input placeholder="Enter track title" className="bg-background border-muted-foreground/30 text-foreground focus:ring-primary" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="artist"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-foreground font-body text-base">Artist Name (Optional)</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter artist name"
                  className="bg-background border-muted-foreground/30 text-foreground focus:ring-primary"
                  {...field}
                  value={field.value || ''}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="audioFile"
          render={({ field: { value, onChange, ...fieldProps } }) => (
            <FormItem>
              <FormLabel className="text-foreground font-body text-base">Audio File</FormLabel>
              <FormControl>
                <Input
                  {...fieldProps}
                  type="file"
                  accept={ACCEPTED_MIME_TYPES.join(',')}
                  onChange={(event) => onChange(event.target.files && event.target.files[0])}
                  className="bg-background border-muted-foreground/30 text-foreground file:text-primary file:font-medium"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="duration_seconds"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-foreground font-body text-base">Duration in Seconds (Optional)</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder="e.g., 300"
                  className="bg-background border-muted-foreground/30 text-foreground focus:ring-primary"
                  {...field}
                  value={field.value === null ? '' : field.value}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="is_dj_mix"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border border-muted-foreground/30 p-4 shadow-sm">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                  className="border-muted-foreground/50 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground"
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel className="text-foreground font-body text-base">
                  Is this a DJ Mix?
                </FormLabel>
                <p className="text-sm text-muted-foreground font-body">
                  Check if this track is a continuous DJ mix rather than a single song.
                </p>
              </div>
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full px-8 py-4 bg-primary text-primary-foreground rounded-full text-lg font-medium can-animate hover:bg-primary/90 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary" disabled={isSubmitting}>
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Uploading...
            </>
          ) : (
            'Upload Track'
          )}
        </Button>
      </form>
    </Form>
  );
};

export default AdminUploadMixForm;