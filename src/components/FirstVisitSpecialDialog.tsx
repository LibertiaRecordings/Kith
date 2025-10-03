"use client";

import React from 'react';
import Link from 'next/link';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
// Removed DollarSign import as it's no longer needed

interface FirstVisitSpecialDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

const FirstVisitSpecialDialog: React.FC<FirstVisitSpecialDialogProps> = ({ isOpen, onClose }) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px] bg-card text-foreground p-6 rounded-2xl shadow-ultra-soft border-muted-foreground/30">
        <DialogHeader className="text-center">
          {/* Removed DollarSign icon */}
          <DialogTitle className="text-4xl md:text-5xl font-hero text-foreground mb-4">
            20% Off Your First Visit!
          </DialogTitle>
          <DialogDescription className="text-muted-foreground mt-2 leading-relaxed text-base">
            New to Kith & Kin? Enjoy a special discount on your first precision cut or service.
            Experience the difference with our skilled barbers.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="mt-6">
          <Link href="/book" passHref>
            <Button onClick={onClose} className="w-full px-6 py-3 bg-primary text-primary-foreground rounded-full text-lg font-medium can-animate hover:bg-primary/90 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary">
              Book Now & Claim Offer
            </Button>
          </Link>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default FirstVisitSpecialDialog;