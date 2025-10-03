"use client";

import { Metadata } from "next";
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

// Note: Metadata cannot be exported from client components.
// This page will use the root layout's metadata or a default.

export default function BookPage() {
  const searchParams = useSearchParams();
  const [iframeSrc, setIframeSrc] = useState<string>('');

  useEffect(() => {
    const bookingUrl = searchParams.get('bookingUrl');
    if (bookingUrl) {
      setIframeSrc(decodeURIComponent(bookingUrl));
    } else {
      // Default to the general Square Appointments page if no specific URL is provided
      setIframeSrc("https://kithkinco.square.site/s/appointments");
    }
  }, [searchParams]);

  if (!iframeSrc) {
    return (
      <main id="main" className="container mx-auto px-6 py-16 min-h-screen bg-background text-foreground text-center">
        <h1 className="text-4xl md:text-5xl font-display font-normal tracking-tight text-foreground">Loading Booking...</h1>
        <p className="mt-3 text-muted-foreground font-body text-lg">Please wait while we load the booking system.</p>
      </main>
    );
  }

  return (
    <main id="main" className="container mx-auto px-6 py-16 min-h-screen bg-background text-foreground">
      <h1 className="text-4xl md:text-5xl font-display font-normal tracking-tight text-foreground">Book an Appointment</h1>
      <p className="mt-3 text-muted-foreground font-body text-lg">Precision cuts, exact times. Reserve in seconds.</p>
      <section className="mt-8 rounded-2xl bg-card p-4 shadow-ultra-soft">
        <iframe
          src={iframeSrc}
          className="w-full h-[1400px] rounded-xl border border-muted-foreground/30"
          loading="lazy"
          title="Square Appointments Booking Widget"
        />
      </section>
    </main>
  );
}