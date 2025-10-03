import { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Gift, CreditCard } from "lucide-react"; // Importing CreditCard icon

export const metadata: Metadata = {
  title: "Gift Cards | Kith & Kin Barbershop",
  description: "Give the gift of precision grooming with Kith & Kin gift cards. Easily check your gift card balance.",
};

export default function GiftCardsPage() {
  const squareGiftCardPurchaseLink = "https://app.squareup.com/gift/GN4AGXPR30ESR/order";
  const squareGiftCardBalanceCheckerLink = "https://app.squareup.com/gift/GN4AGXPR30ESR/check-balance";

  return (
    <main id="main" className="container mx-auto px-6 py-16 min-h-screen bg-background text-foreground">
      <h1 className="text-4xl md:text-5xl tracking-tight text-foreground text-center">Gift Cards</h1>
      <p className="mt-3 text-muted-foreground font-body text-lg text-center max-w-2xl mx-auto">The perfect gift for any occasion.</p>

      <section className="mt-12 grid grid-cols-1 lg:grid-cols-2 gap-10 max-w-6xl mx-auto">
        {/* Purchase Gift Card Section */}
        <div className="bg-card rounded-2xl p-8 shadow-ultra-soft flex flex-col items-center text-center border border-muted-foreground/20">
          <Gift className="h-16 w-16 text-primary mb-6" />
          <h2 className="text-3xl font-hero text-foreground mb-4">Purchase a Gift Card</h2>
          <p className="text-muted-foreground leading-relaxed mb-8 max-w-md text-lg font-body">
            Treat someone to the Kith & Kin experience. Click below to purchase a personalized gift card directly through Square.
          </p>
          
          <div className="w-full max-w-md">
            <Link href={squareGiftCardPurchaseLink} target="_blank" rel="noopener noreferrer" className="w-full inline-flex items-center justify-center px-8 py-4 bg-primary text-primary-foreground rounded-full text-lg font-medium can-animate hover:bg-primary/90 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary">
              Purchase Gift Card on Square
            </Link>
          </div>

          <p className="text-muted-foreground/70 font-body text-sm mt-8">
            You will be redirected to Square to complete your gift card purchase.
          </p>
        </div>

        {/* Enhanced Check Gift Card Balance Section */}
        <div className="bg-card rounded-2xl p-8 shadow-ultra-soft flex flex-col items-center text-center border border-muted-foreground/20">
          <CreditCard className="h-16 w-16 text-primary mb-6" /> {/* Added CreditCard icon */}
          <h2 className="text-3xl font-hero text-foreground mb-4">Check Your Gift Card Balance</h2>
          <p className="text-muted-foreground leading-relaxed mb-8 max-w-md mx-auto text-lg font-body">
            Have a Kith & Kin gift card? Enter its code below to instantly check the current value and status.
          </p>
          <div className="w-full max-w-sm mx-auto bg-background rounded-xl p-4 border border-muted-foreground/30 shadow-inner">
            <iframe
              src={squareGiftCardBalanceCheckerLink}
              className="w-full h-[350px] rounded-lg border border-muted-foreground/20"
              loading="lazy"
              title="Square Gift Card Balance Checker"
            />
          </div>
          <p className="text-muted-foreground/70 font-body text-sm mt-6">
            This balance checker is provided securely by Square.
          </p>
        </div>
      </section>
    </main>
  );
}