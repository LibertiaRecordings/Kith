import Link from 'next/link';
import { Frown } from 'lucide-react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "404 - Page Not Found | Kith & Kin Barbershop",
  description: "The page you are looking for does not exist.",
};

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-ink text-paper p-8">
      <Frown className="h-24 w-24 text-neon mb-6" />
      <h1 className="text-5xl md:text-7xl font-display font-bold tracking-tighter mb-4">404</h1>
      <h2 className="text-2xl md:text-3xl font-display font-semibold text-paper mb-8 text-center">Page Not Found</h2>
      <p className="text-lg text-chrome mb-10 text-center max-w-md">
        Oops! The page you're looking for doesn't exist. It might have been moved or deleted.
      </p>
      <Link href="/book" className="inline-flex items-center justify-center px-8 py-4 bg-neon text-ink rounded-full text-xl font-medium can-animate hover:bg-neon/90 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neon">
        Book an Appointment
      </Link>
      <Link href="/" className="mt-4 inline-flex items-center justify-center px-8 py-4 border border-graphite text-chrome rounded-full text-lg font-medium can-animate hover:border-neon hover:text-neon transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neon">
        Go to Homepage
      </Link>
    </div>
  );
}