import { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import GiftCardPurchaseForm from "@/components/GiftCardPurchaseForm"; // Import the new form component

export const metadata: Metadata = {
  title: "Gift Cards & Loyalty | Kith & Kin Barbershop",
  description: "Give the gift of precision grooming with Kith & Kin gift cards. Learn about our loyalty program and earn rewards.",
};

export default function GiftCardsPage() {
  return (
    <main id="main" className="container mx-auto px-6 py-16 min-h-screen bg-background text-foreground">
      <h1 className="text-4xl md:text-5xl font-display font-semibold tracking-tight text-foreground text-center">Gift Cards & Loyalty</h1>
      <p className="mt-3 text-muted-foreground font-mono text-center max-w-2xl mx-auto">The perfect gift. The perfect reward.</p>

      <section className="mt-12 grid grid-cols-1 lg:grid-cols-2 gap-10 max-w-6xl mx-auto">
        <div className="bg-card rounded-2xl p-8 shadow-ultra-soft flex flex-col items-center text-center">
          <h2 className="text-3xl font-display font-semibold text-foreground mb-4">Purchase a Gift Card</h2>
          <p className="text-muted-foreground leading-relaxed mb-8 max-w-md">
            Treat someone to the Kith & Kin experience. Select an amount and send a personalized gift card instantly.
          </p>
          
          <div className="w-full max-w-md">
            <GiftCardPurchaseForm />
          </div>

          <p className="text-muted-foreground/70 font-mono text-xs mt-8">
            Gift cards are delivered by email and contain instructions to redeem them at checkout.
          </p>
        </div>

        <div className="bg-card rounded-2xl p-8 shadow-ultra-soft flex flex-col items-center text-center">
          <h2 className="text-3xl font-display font-semibold text-foreground mb-4">Loyalty Program</h2>
          <p className="text-muted-foreground leading-relaxed mb-8 max-w-md">
            Join the Kith & Kin Loyalty Program and start earning rewards with every visit. Enjoy exclusive discounts, early access to specials, and more.
          </p>
          <ul className="space-y-4 text-muted-foreground text-left w-full max-w-sm">
            <li className="flex items-start">
              <span className="text-primary mr-3 text-xl">✓</span>
              <span>Earn points for every dollar spent on services and products.</span>
            </li>
            <li className="flex items-start">
              <span className="text-primary mr-3 text-xl">✓</span>
              <span>Redeem points for free services or exclusive merchandise.</span>
            </li>
            <li className="flex items-start">
              <span className="text-primary mr-3 text-xl">✓</span>
              <span>Receive special birthday offers and member-only promotions.</span>
            </li>
          </ul>
          <Link href="/book" className="mt-10 w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 bg-primary text-primary-foreground rounded-full text-lg font-medium can-animate hover:bg-primary/90 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary">
            Join Loyalty (Book Now)
          </Link>
          <p className="text-muted-foreground/70 font-mono text-xs mt-4">
            You will be prompted to join our loyalty program after your booking confirmation.
          </p>
        </div>
      </section>
    </main>
  );
}