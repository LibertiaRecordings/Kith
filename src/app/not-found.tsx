import Link from 'next/link';
import { Frown } from 'lucide-react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "404 - Page Not Found | Kith & Kin Barbershop",
  description: "The page you are looking for does not exist.",
};

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background text-foreground p-8">
      <Frown className="h-24 w-24 text-primary mb-6" />
      <h1 className="text-5xl md:text-7xl font-display font-bold tracking-tighter mb-4">404</h1>
      <h2 className="text-2xl md:text-3xl font-display font-semibold text-foreground mb-8 text-center">Page Not Found</h2>
      <p className="text-lg text-muted-foreground mb-10 text-center max-w-md">
        Oops! The page you're looking for doesn't exist. It might have been moved or deleted.
      </p>
      <Link href="/book" className="inline-flex items-center justify-center px-8 py-4 bg-primary text-primary-foreground rounded-full text-xl font-medium can-animate hover:bg-primary/90 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary">
        Book an Appointment
      </Link>
      <Link href="/" className="mt-4 inline-flex items-center justify-center px-8 py-4 border border-muted-foreground/30 text-muted-foreground rounded-full text-lg font-medium can-animate hover:border-primary hover:text-primary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary">
        Go to Homepage
      </Link>
    </div>
  );
}