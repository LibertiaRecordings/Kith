"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogClose } from '@/components/ui/dialog'; // Import DialogClose
import { X } from 'lucide-react'; // Import X icon for the close button

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
        <DialogContent className="fixed inset-0 w-[98vw] h-[98vh] flex flex-col bg-card text-foreground p-0 rounded-2xl shadow-ultra-soft border-muted-foreground/30 transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
          <DialogHeader className="p-4 pb-2 flex flex-row items-center justify-between">
            <DialogTitle className="text-3xl font-hero text-foreground">Book with {barberName}</DialogTitle>
            <DialogClose asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-foreground">
                <X className="h-5 w-5" />
                <span className="sr-only">Close</span>
              </Button>
            </DialogClose>
          </DialogHeader>
          <div className="flex-grow p-4 pt-0 overflow-hidden"> {/* Adjusted padding for iframe container */}
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