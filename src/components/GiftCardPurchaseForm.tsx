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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import { createGiftCard } from '@/app/actions/gift-cards';
import { useSession } from './SessionContextProvider';

const formSchema = z.object({
  amount: z.union([
    z.literal('50'),
    z.literal('100'),
    z.literal('250'),
    z.literal('500'),
    z.literal('custom'),
  ]),
  customAmount: z.string().optional().transform((val) => {
    if (!val || val.trim() === '') return undefined;
    const num = Number(val);
    return isNaN(num) ? undefined : num;
  }).pipe(
    z.number().min(10, { message: 'Minimum custom amount is $10' }).max(1000, { message: 'Maximum custom amount is $1000' }).optional()
  ),
  recipientName: z.string().min(1, { message: 'Recipient name is required.' }),
  recipientEmail: z.string().email({ message: 'Invalid email address.' }),
  senderName: z.string().min(1, { message: 'Your name is required.' }),
  message: z.string().max(500, { message: 'Message cannot exceed 500 characters.' }).optional(),
}).refine((data) => {
  if (data.amount === 'custom' && (data.customAmount === undefined || data.customAmount === null)) {
    return false;
  }
  return true;
}, {
  message: 'Custom amount is required when "Other Amount" is selected.',
  path: ['customAmount'],
});

type GiftCardFormValues = z.infer<typeof formSchema>;

const GiftCardPurchaseForm: React.FC = () => {
  const { session } = useSession();
  const form = useForm<GiftCardFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      amount: '50',
      customAmount: undefined, // Explicitly set default for customAmount
      recipientName: '',
      recipientEmail: '',
      senderName: '',
      message: '',
    },
  });

  const selectedAmount = form.watch('amount');

  const onSubmit = async (values: GiftCardFormValues) => {
    const finalAmount = values.amount === 'custom' ? values.customAmount : Number(values.amount);

    if (!finalAmount) {
      toast.error('Please select or enter a valid amount.');
      return;
    }

    const loadingToastId = toast.loading('Processing gift card purchase...');

    try {
      const result = await createGiftCard({
        value: finalAmount,
        recipientName: values.recipientName,
        recipientEmail: values.recipientEmail,
        senderName: values.senderName,
        message: values.message,
        purchasedByUserId: session?.user?.id || null,
      });

      if (result.success) {
        toast.success(`Gift card for ${finalAmount} created! Code: ${result.code}`, { id: loadingToastId });
        form.reset();
      } else {
        toast.error(result.error || 'Failed to create gift card.', { id: loadingToastId });
      }
    } catch (error) {
      console.error('Error creating gift card:', error);
      toast.error('An unexpected error occurred.', { id: loadingToastId });
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="amount"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-foreground">Gift Card Value</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className="bg-background border-muted-foreground/30 text-foreground focus:ring-primary">
                    <SelectValue placeholder="Select an amount" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent className="bg-card border-muted-foreground/30 text-foreground">
                  <SelectItem value="50">$50</SelectItem>
                  <SelectItem value="100">$100</SelectItem>
                  <SelectItem value="250">$250</SelectItem>
                  <SelectItem value="500">$500</SelectItem>
                  <SelectItem value="custom">Other Amount</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        {selectedAmount === 'custom' && (
          <FormField
            control={form.control}
            name="customAmount"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-foreground">Custom Amount ($10 - $1000)</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="e.g., 75"
                    className="bg-background border-muted-foreground/30 text-foreground focus:ring-primary"
                    {...field}
                    onChange={(e) => field.onChange(e.target.value === '' ? '' : Number(e.target.value))}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        )}

        <FormField
          control={form.control}
          name="recipientName"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-foreground">Recipient's Name</FormLabel>
              <FormControl>
                <Input placeholder="Jane Doe" className="bg-background border-muted-foreground/30 text-foreground focus:ring-primary" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="recipientEmail"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-foreground">Recipient's Email</FormLabel>
              <FormControl>
                <Input type="email" placeholder="jane.doe@example.com" className="bg-background border-muted-foreground/30 text-foreground focus:ring-primary" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="senderName"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-foreground">Your Name</FormLabel>
              <FormControl>
                <Input placeholder="John Smith" className="bg-background border-muted-foreground/30 text-foreground focus:ring-primary" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-foreground">Personal Message (Optional)</FormLabel>
              <FormControl>
                <Textarea placeholder="Happy Birthday!" className="bg-background border-muted-foreground/30 text-foreground focus:ring-primary" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full px-8 py-4 bg-primary text-primary-foreground rounded-full text-lg font-medium can-animate hover:bg-primary/90 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary">
          Purchase Gift Card
        </Button>
      </form>
    </Form>
  );
};

export default GiftCardPurchaseForm;