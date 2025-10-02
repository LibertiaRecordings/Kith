import Link from "next/link";
import Image from "next/image"; // Import Image component
import { ArrowRight } from "lucide-react";
import HeroVideoBackground from "@/components/HeroVideoBackground";
import ReviewCard from "@/components/ReviewCard"; // Import the new ReviewCard component

export default function Home() {
  const reviews = [
    {
      review: "Always a great experience at Kith & Kin. The barbers are skilled and the atmosphere is top-notch. Highly recommend!",
      author: "John D.",
      rating: 5,
    },
    {
      review: "The attention to detail here is incredible. Every cut is precise, and the staff are always friendly and professional.",
      author: "Michael P.",
      rating: 5,
    },
    {
      review: "I LOVE KITH & KIN! As a woman, I appreciate the skill and comfort here. It's an awesome quick cut without the discomfort of traditional men's shops.",
      author: "Jen",
      rating: 5,
    },
    {
      review: "Fantastic service and a perfect cut every time. The attention to detail is unmatched.",
      author: "Sarah L.",
      rating: 5,
    },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      <HeroVideoBackground
        videoSrc="https://kithkin.family/assets/videos/video01.mp4"
        fallbackImageSrc="/kith-kin-logo.png" // Using logo as a simple fallback, consider a dedicated hero image
      >
        <main className="flex flex-col gap-8 items-center text-center p-8 pb-20 sm:p-20 w-full max-w-7xl mx-auto">
          <section className="hero-section max-w-4xl mx-auto text-paper"> {/* Text color changed to paper for contrast */}
            <h1 className="text-5xl md:text-7xl font-bold tracking-tighter leading-tight">
              Crafted Cuts. <br className="block" /><span className="text-primary">Community Roots.</span>
            </h1>
            <p className="mt-6 text-xl text-paper/90 max-w-2xl mx-auto font-mono">
              Where precision meets kinship. Calgary's premium barbershop experience.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/book" className="inline-flex items-center justify-center px-8 py-4 bg-primary text-primary-foreground rounded-full text-xl font-medium can-animate hover:bg-primary/90 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary">
                Book Now <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
              <Link href="/services" className="inline-flex items-center justify-center px-8 py-4 border border-paper/30 text-paper rounded-full text-xl font-medium can-animate hover:border-primary hover:text-primary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary">
                View Services
              </Link>
            </div>
          </section>
        </main>
      </HeroVideoBackground>

      {/* Remaining sections below the hero video */}
      <div className="container mx-auto px-6 py-10">
        <section className="cta-tiles mt-8 grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-5xl mx-auto">
          <Link href="/book" className="block bg-card rounded-2xl p-8 shadow-ultra-soft can-animate group">
            <h2 className="text-3xl font-display font-semibold text-foreground group-hover:text-primary transition-colors">Book Your Visit</h2>
            <p className="text-muted-foreground mt-3 text-lg leading-relaxed">Secure your spot for a flawless cut with our easy online booking.</p>
          </Link>
          <Link href="/barbers" className="block bg-card rounded-2xl p-8 shadow-ultra-soft can-animate group"> {/* Changed from /artists to /barbers */}
            <h2 className="text-3xl font-display font-semibold text-foreground group-hover:text-primary transition-colors">Meet Our Barbers</h2>
            <p className="text-muted-foreground mt-3 text-lg leading-relaxed">Discover the skilled hands and unique styles of our master barbers.</p>
          </Link>
          <Link href="/services" className="block bg-card rounded-2xl p-8 shadow-ultra-soft can-animate group">
            <h2 className="text-3xl font-display font-semibold text-foreground group-hover:text-primary transition-colors">Explore Services</h2>
            <p className="text-muted-foreground mt-3 text-lg leading-relaxed">From classic fades to modern styling, find your perfect grooming experience.</p>
          </Link>
        </section>

        <section className="mt-16 w-full max-w-5xl mx-auto text-center">
          <h2 className="text-4xl font-display font-semibold text-foreground">The Kith & Kin Experience</h2>
          <p className="mt-4 text-muted-foreground text-lg font-mono">More than a haircut, it's a ritual.</p>
          
          {/* New "Our Space" section with shop photos */}
          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="relative w-full h-64 md:h-80 rounded-2xl overflow-hidden shadow-ultra-soft border border-muted-foreground/30">
              <Image
                src="/images/kith-kin-interior.jpg"
                alt="Interior of Kith & Kin Barbershop with barber chairs"
                fill
                style={{ objectFit: "cover" }}
                sizes="(max-width: 768px) 100vw, 50vw"
                className="transition-transform duration-300 ease-in-out hover:scale-105"
              />
            </div>
            <div className="relative w-full h-64 md:h-80 rounded-2xl overflow-hidden shadow-ultra-soft border border-muted-foreground/30">
              <Image
                src="/images/kith-kin-exterior.jpg"
                alt="Exterior of Kith & Kin Barbershop at night with neon sign"
                fill
                style={{ objectFit: "cover" }}
                sizes="(max-width: 768px) 100vw, 50vw"
                className="transition-transform duration-300 ease-in-out hover:scale-105"
              />
            </div>
          </div>
        </section>

        {/* What Our Clients Say section */}
        <section className="mt-16 w-full max-w-5xl mx-auto text-center">
          <h2 className="text-4xl font-display font-semibold text-foreground">What Our Clients Say</h2>
          <p className="mt-4 text-muted-foreground text-lg font-mono">Hear it from the community.</p>
          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {reviews.map((review, index) => (
              <ReviewCard key={index} review={review.review} author={review.author} rating={review.rating} />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}