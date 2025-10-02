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
import { toast } from 'sonner';
import { getGiftCardDetails } from '@/app/actions/gift-cards';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const formSchema = z.object({
  code: z.string().min(1, { message: 'Gift card code is required.' }).length(12, { message: 'Gift card code must be 12 characters.' }),
});

type GiftCardBalanceFormValues = z.infer<typeof formSchema>;

const GiftCardBalanceChecker: React.FC = () => {
  const [giftCardInfo, setGiftCardInfo] = useState<{ value: number; balance: number; status: string } | null>(null);

  const form = useForm<GiftCardBalanceFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      code: '',
    },
  });

  const onSubmit = async (values: GiftCardBalanceFormValues) => {
    setGiftCardInfo(null); // Clear previous info
    const loadingToastId = toast.loading('Checking gift card balance...');

    try {
      const result = await getGiftCardDetails(values.code);

      if (result.success && result.data) {
        setGiftCardInfo(result.data);
        toast.success('Gift card details retrieved!', { id: loadingToastId });
      } else {
        toast.error(result.error || 'Gift card not found or invalid code.', { id: loadingToastId });
      }
    } catch (error) {
      console.error('Error checking gift card:', error);
      toast.error('An unexpected error occurred.', { id: loadingToastId });
    }
  };

  return (
    <div className="space-y-6">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="code"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-foreground">Gift Card Code</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter 12-character code"
                    className="bg-background border-muted-foreground/30 text-foreground focus:ring-primary"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="w-full px-6 py-3 bg-primary text-primary-foreground rounded-full text-lg font-medium can-animate hover:bg-primary/90 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary">
            Check Balance
          </Button>
        </form>
      </Form>

      {giftCardInfo && (
        <Card className="bg-background border-muted-foreground/30 shadow-ultra-soft">
          <CardHeader>
            <CardTitle className="text-foreground">Gift Card Details</CardTitle>
          </CardHeader>
          <CardContent className="text-muted-foreground space-y-2">
            <p><strong>Original Value:</strong> ${giftCardInfo.value.toFixed(2)}</p>
            <p><strong>Current Balance:</strong> ${giftCardInfo.balance.toFixed(2)}</p>
            <p><strong>Status:</strong> {giftCardInfo.status.charAt(0).toUpperCase() + giftCardInfo.status.slice(1)}</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default GiftCardBalanceChecker;