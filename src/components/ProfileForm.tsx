import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { updateProfile } from '@/app/actions/profiles';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

// Define the schema for your profile form
const profileFormSchema = z.object({
  first_name: z.string().min(1, { message: 'First name is required.' }),
  last_name: z.string().min(1, { message: 'Last name is required.' }),
  avatar_url: z.string().url({ message: 'Invalid URL for avatar.' }).optional().or(z.literal('')),
});

// Define the props interface for ProfileForm
interface ProfileFormProps {
  initialData: {
    first_name: string | null;
    last_name: string | null;
    avatar_url: string | null;
  };
  userId: string; // Add userId to props
}

export function ProfileForm({ initialData, userId }: ProfileFormProps) {
  const router = useRouter();
  const form = useForm<z.infer<typeof profileFormSchema>>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      first_name: initialData.first_name || '',
      last_name: initialData.last_name || '',
      avatar_url: initialData.avatar_url || '',
    },
  });

  async function onSubmit(values: z.infer<typeof profileFormSchema>) {
    const result = await updateProfile({ ...values, userId }); // Pass userId to updateProfile
    if (result.success) {
      toast.success('Profile updated successfully!');
      router.refresh(); // Refresh the page to show updated data
    } else {
      // Safely access error message
      const errorMessage = typeof result.error === 'string'
        ? result.error
        : (result.error as { message?: string })?.message || 'Failed to update profile.';
      toast.error(errorMessage);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="first_name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>First Name</FormLabel>
              <FormControl>
                <Input placeholder="John" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="last_name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Last Name</FormLabel>
              <FormControl>
                <Input placeholder="Doe" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="avatar_url"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Avatar URL</FormLabel>
              <FormControl>
                <Input placeholder="https://example.com/avatar.jpg" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full">Update Profile</Button>
      </form>
    </Form>
  );
}