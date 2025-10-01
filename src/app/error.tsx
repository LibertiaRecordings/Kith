"use client"; // Error components must be Client Components

import { useEffect } from 'react';
import Link from 'next/link';
import { TriangleAlert } from 'lucide-react';
import { Metadata } from 'next';

// Note: Metadata cannot be exported from client components.
// This page will use the root layout's metadata or a default.

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-ink text-paper p-8">
      <TriangleAlert className="h-24 w-24 text-danger mb-6" />
      <h1 className="text-5xl md:text-7xl font-display font-bold tracking-tighter mb-4">500</h1>
      <h2 className="text-2xl md:text-3xl font-display font-semibold text-paper mb-8 text-center">Something Went Wrong!</h2>
      <p className="text-lg text-chrome mb-10 text-center max-w-md">
        We're sorry, but an unexpected error occurred. Our team has been notified.
      </p>
      <button
        className="inline-flex items-center justify-center px-8 py-4 bg-neon text-ink rounded-full text-xl font-medium can-animate hover:bg-neon/90 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neon"
        onClick={
          // Attempt to recover by trying to re-render the segment
          () => reset()
        }
      >
        Try Again
      </button>
      <Link href="/book" className="mt-4 inline-flex items-center justify-center px-8 py-4 border border-graphite text-chrome rounded-full text-lg font-medium can-animate hover:border-neon hover:text-neon transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neon">
        Book an Appointment
      </Link>
    </div>
  );
}