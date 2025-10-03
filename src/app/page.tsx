import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import HeroVideoBackground from "@/components/HeroVideoBackground";
import ReviewCard from "@/components/ReviewCard";
import RadioAccessButton from "@/components/RadioAccessButton";
import InteractiveImageCard from "@/components/InteractiveImageCard";
// Removed BarberShowcaseGallery import

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

  // Removed showcaseImages array

  return (
    <div className="min-h-screen bg-background text-foreground">
      <HeroVideoBackground
        videoSrc="https://kithkin.family/assets/videos/video01.mp4"
        fallbackImageSrc="/images/barber-client-haircut-calgary.jpg"
      >
        <main className="flex flex-col gap-8 items-center text-center p-8 pb-20 sm:p-20 w-full max-w-7xl mx-auto">
          <section className="hero-section max-w-4xl mx-auto text-paper">
            <h1 className="text-6xl md:text-8xl font-hero tracking-tight leading-none uppercase">
              Crafted Cuts. <br className="block" /><span className="text-primary">Community Roots.</span>
            </h1>
            <p className="mt-6 text-xl text-paper/90 max-w-2xl mx-auto font-body leading-relaxed">
              Where precision meets kinship. Calgary's premium barbershop experience.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/book" className="inline-flex items-center justify-center px-8 py-4 bg-primary text-primary-foreground rounded-full text-xl font-medium can-animate hover:bg-primary/90 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-visible:ring-primary">
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
            <h2 className="text-3xl font-hero text-foreground group-hover:text-primary transition-colors">Book Your Visit Today</h2>
            <p className="text-muted-foreground mt-3 text-base leading-relaxed font-body">Secure your spot for a flawless cut with our easy online booking in Calgary.</p>
          </Link>
          <Link href="/barbers" className="block bg-card rounded-2xl p-8 shadow-ultra-soft can-animate group">
            <h2 className="text-3xl font-hero text-foreground group-hover:text-primary transition-colors">Meet Our Barbers</h2>
            <p className="text-muted-foreground mt-3 text-base leading-relaxed font-body">Discover the skilled hands and unique styles of our master barbers in Calgary.</p>
          </Link>
          <Link href="/services" className="block bg-card rounded-2xl p-8 shadow-ultra-soft can-animate group">
            <h2 className="text-3xl font-hero text-foreground group-hover:text-primary transition-colors">Explore Services</h2>
            <p className="text-muted-foreground mt-3 text-base leading-relaxed font-body">From classic fades to modern styling, find your perfect grooming experience at our Calgary barbershop.</p>
          </Link>
        </section>

        <section className="mt-16 w-full max-w-5xl mx-auto text-center">
          <h2 className="text-4xl font-hero text-foreground">The Kith & Kin Experience</h2>
          <p className="mt-4 text-muted-foreground text-lg font-body">More than a haircut, it's a ritual in Calgary.</p>
          
          {/* "Our Space" section with InteractiveImageCard */}
          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6">
            <InteractiveImageCard
              src="/images/barber-scissors-haircut-detail.jpg"
              alt="Close-up of a barber's hands meticulously cutting hair with scissors at Kith & Kin Barbershop, Calgary"
              initialHeight="h-64"
              hoverHeight="h-80"
            />
            <InteractiveImageCard
              src="/images/barber-styling-hair-comb.jpg"
              alt="Skilled barber styling a client's hair with a comb and product, showcasing precision grooming at Kith & Kin Calgary"
              initialHeight="h-64"
              hoverHeight="h-80"
            />
          </div>
        </section>

        {/* Removed "Our Craft" section */}

        {/* Dedicated Radio Section */}
        <section className="mt-16 w-full max-w-5xl mx-auto text-center bg-card rounded-2xl p-8 shadow-ultra-soft border border-muted-foreground/20 flex flex-col items-center">
          <h2 className="text-4xl font-hero text-foreground mb-4">Kith & Kin Radio</h2>
          <p className="text-muted-foreground text-lg font-body max-w-2xl mb-8">
            Tune into the curated sounds of Kith & Kin. From soundcloud gems to electronic beats,
            our barbershop radio sets the perfect vibe for your visit.
          </p>
          <RadioAccessButton />
        </section>

        {/* What Our Clients Say section */}
        <section className="mt-16 w-full max-w-5xl mx-auto text-center">
          <h2 className="text-3xl font-hero text-foreground">What Our Clients Say</h2>
          <p className="mt-4 text-muted-foreground text-lg font-body">Hear it from the Calgary community.</p>
          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {reviews.map((review, index) => (
              <ReviewCard key={index} review={review.review} author={review.author} rating={review.rating} />
            ))}
          </div>
        </section>

        {/* Existing Sleek Minimalistic Gallery */}
        <section className="mt-16 w-full max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <InteractiveImageCard
              src="/images/barber-trimming-side-profile-new.jpg"
              alt="Close-up of a barber meticulously trimming a client's hair, showcasing precision and attention to detail in a black and white analog style."
            />
            <InteractiveImageCard
              src="/images/client-centered-face.jpg"
              alt="Client with a fresh haircut looking directly at the camera, showcasing a clean and confident look in a black and white analog style."
            />
            <InteractiveImageCard
              src="/images/barber-trimming-side-profile-alt.jpg"
              alt="Barber carefully trimming a client's side profile, highlighting the focused craftsmanship and clean lines in a black and white analog style."
            />
          </div>
        </section>
      </div>
    </div>
  );
}