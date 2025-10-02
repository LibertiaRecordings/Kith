"use client";

import React, { useEffect } from 'react';
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
import { toast } from 'sonner';
import { updateProfile } from '@/app/actions/profiles';
import { useSession } from './SessionContextProvider';

const profileFormSchema = z.object({
  firstName: z.string().min(1, { message: 'First name is required.' }).optional().or(z.literal('')),
  lastName: z.string().min(1, { message: 'Last name is required.' }).optional().or(z.literal('')),
  avatarUrl: z.string().url({ message: 'Invalid URL for avatar.' }).optional().or(z.literal('')),
});

type ProfileFormValues = z.infer<typeof profileFormSchema>;

interface ProfileFormProps {
  initialData: {
    first_name?: string | null;
    last_name?: string | null;
    avatar_url?: string | null;
  };
}

const ProfileForm: React.FC<ProfileFormProps> = ({ initialData }) => {
  const { session } = useSession();
  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      firstName: initialData.first_name || '',
      lastName: initialData.last_name || '',
      avatarUrl: initialData.avatar_url || '',
    },
  });

  useEffect(() => {
    form.reset({
      firstName: initialData.first_name || '',
      lastName: initialData.last_name || '',
      avatarUrl: initialData.avatar_url || '',
    });
  }, [initialData, form]);

  const onSubmit = async (values: ProfileFormValues) => {
    if (!session?.user?.id) {
      toast.error('You must be logged in to update your profile.');
      return;
    }

    const loadingToastId = toast.loading('Updating profile...');

    try {
      const result = await updateProfile({
        userId: session.user.id,
        firstName: values.firstName || null,
        lastName: values.lastName || null,
        avatarUrl: values.avatarUrl || null,
      });

      if (result.success) {
        toast.success('Profile updated successfully!', { id: loadingToastId });
      } else {
        toast.error(result.error || 'Failed to update profile.', { id: loadingToastId });
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      toast.error('An unexpected error occurred.', { id: loadingToastId });
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="firstName"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-foreground font-display">First Name</FormLabel>
              <FormControl>
                <Input placeholder="John" className="bg-background border-muted-foreground/30 text-foreground focus:ring-primary" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="lastName"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-foreground font-display">Last Name</FormLabel>
              <FormControl>
                <Input placeholder="Doe" className="bg-background border-muted-foreground/30 text-foreground focus:ring-primary" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="avatarUrl"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-foreground font-display">Avatar URL (Optional)</FormLabel>
              <FormControl>
                <Input placeholder="https://example.com/avatar.jpg" className="bg-background border-muted-foreground/30 text-foreground focus:ring-primary" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full px-8 py-4 bg-primary text-primary-foreground rounded-full text-lg font-medium can-animate hover:bg-primary/90 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary">
          Save Profile
        </Button>
      </form>
    </Form>
  );
};

export default ProfileForm;