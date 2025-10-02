import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function Home() {
  return (
    <div className="grid grid-rows-[1fr_auto] items-center justify-items-center min-h-screen p-8 pb-20 sm:p-20 font-display bg-background text-foreground">
      <main className="flex flex-col gap-8 row-start-1 items-center sm:items-start text-center sm:text-left">
        <section className="hero-section max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-bold tracking-tighter leading-tight text-foreground">
            Crafted Cuts. <span className="text-primary">Community Roots.</span>
          </h1>
          <p className="mt-6 text-xl text-muted-foreground max-w-2xl mx-auto sm:mx-0 font-mono">
            Where precision meets kinship. Your family barbershop experience.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center sm:justify-start">
            <Link href="/book" className="inline-flex items-center justify-center px-8 py-4 bg-primary text-primary-foreground rounded-full text-xl font-medium can-animate hover:bg-primary/90 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary">
              Book Now <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
            <Link href="/services" className="inline-flex items-center justify-center px-8 py-4 border border-muted-foreground/30 text-muted-foreground rounded-full text-xl font-medium can-animate hover:border-primary hover:text-primary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary">
              View Services
            </Link>
          </div>
        </section>

        <section className="cta-tiles mt-16 grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-5xl">
          <Link href="/book" className="block bg-card rounded-2xl p-8 shadow-ultra-soft can-animate group">
            <h2 className="text-3xl font-display font-semibold text-foreground group-hover:text-primary transition-colors">Book Your Visit</h2>
            <p className="text-muted-foreground mt-3 text-lg leading-relaxed">Secure your spot for a flawless cut with our easy online booking.</p>
          </Link>
          <Link href="/artists" className="block bg-card rounded-2xl p-8 shadow-ultra-soft can-animate group">
            <h2 className="text-3xl font-display font-semibold text-foreground group-hover:text-primary transition-colors">Meet Our Artists</h2>
            <p className="text-muted-foreground mt-3 text-lg leading-relaxed">Discover the skilled hands and unique styles of our master barbers.</p>
          </Link>
          <Link href="/services" className="block bg-card rounded-2xl p-8 shadow-ultra-soft can-animate group">
            <h2 className="text-3xl font-display font-semibold text-foreground group-hover:text-primary transition-colors">Explore Services</h2>
            <p className="text-muted-foreground mt-3 text-lg leading-relaxed">From classic fades to modern styling, find your perfect grooming experience.</p>
          </Link>
        </section>

        {/* Placeholder for other sections like social proof, before/after carousel, location */}
        <section className="mt-16 w-full max-w-5xl text-center">
          <h2 className="text-4xl font-display font-semibold text-foreground">The Kith & Kin Experience</h2>
          <p className="mt-4 text-muted-foreground text-lg font-mono">More than a haircut, it's a ritual.</p>
          {/* Add more content here as needed */}
        </section>
      </main>
    </div>
  );
}