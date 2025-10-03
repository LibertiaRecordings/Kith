"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';

interface BarberBookingDialogProps {
  barberName: string;
  squareBookingLink: string;
}

const BarberBookingDialog: React.FC<BarberBookingDialogProps> = ({ barberName, squareBookingLink }) => {
  const [isBookingDialogOpen, setIsBookingDialogOpen] = useState(false);

  return (
    <>
      <Button 
        onClick={() => setIsBookingDialogOpen(true)}
        className="mt-6 w-full inline-flex items-center justify-center px-6 py-3 bg-primary text-primary-foreground rounded-full text-lg font-medium can-animate hover:bg-primary/90 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
      >
        Book with {barberName}
      </Button>

      <Dialog open={isBookingDialogOpen} onOpenChange={setIsBookingDialogOpen}>
        <DialogContent className="sm:max-w-[95vw] max-h-[95vh] flex flex-col bg-card text-foreground p-0 rounded-2xl shadow-ultra-soft border-muted-foreground/30">
          <DialogHeader className="p-6 pb-0">
            <DialogTitle className="text-3xl font-hero text-foreground">Book with {barberName}</DialogTitle>
          </DialogHeader>
          <div className="flex-grow p-6 pt-0 overflow-hidden">
            <iframe
              src={squareBookingLink}
              className="w-full h-full rounded-xl border border-muted-foreground/30"
              loading="lazy"
              title={`Book an appointment with ${barberName}`}
            />
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default BarberBookingDialog;