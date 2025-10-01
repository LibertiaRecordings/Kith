import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Gift Cards & Loyalty | Kith & Kin Barbershop",
  description: "Give the gift of precision grooming with Kith & Kin gift cards. Learn about our loyalty program and earn rewards.",
};

export default function GiftCardsPage() {
  return (
    <main id="main" className="container mx-auto px-6 py-10 min-h-screen bg-ink text-paper">
      <h1 className="text-4xl md:text-5xl font-display font-semibold tracking-tight text-paper">Gift Cards & Loyalty</h1>
      <p className="mt-3 text-chrome font-mono">The perfect gift. The perfect reward.</p>

      <section className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-graphite rounded-2xl p-8 shadow-ultra-soft">
          <h2 className="text-3xl font-display font-semibold text-paper mb-4">Gift Cards</h2>
          <p className="text-chrome leading-relaxed mb-6">
            Treat someone to the Kith & Kin experience. Our gift cards are perfect for any occasion and can be used for any service or product.
          </p>
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="bg-ink p-4 rounded-lg border border-chrome text-center can-animate hover:border-neon">
              <p className="text-neon text-2xl font-display font-bold">$50</p>
              <p className="text-chrome text-sm">Gift Card</p>
            </div>
            <div className="bg-ink p-4 rounded-lg border border-chrome text-center can-animate hover:border-neon">
              <p className="text-neon text-2xl font-display font-bold">$100</p>
              <p className="text-chrome text-sm">Gift Card</p>
            </div>
            <div className="bg-ink p-4 rounded-lg border border-chrome text-center can-animate hover:border-neon">
              <p className="text-neon text-2xl font-display font-bold">$150</p>
              <p className="text-chrome text-sm">Gift Card</p>
            </div>
            <div className="bg-ink p-4 rounded-lg border border-chrome text-center can-animate hover:border-neon">
              <p className="text-neon text-2xl font-display font-bold">Custom</p>
              <p className="text-chrome text-sm">Amount</p>
            </div>
          </div>
          {/* Square Gift Cards iframe */}
          <iframe
            src="https://squareup.com/gift-cards/buy" // TODO: Replace with your actual Square Gift Cards embed URL
            className="w-full h-[400px] rounded-xl border border-graphite"
            loading="lazy"
            title="Square Gift Cards"
          />
          <p className="text-chrome/70 font-mono text-xs mt-4">
            Gift cards are delivered by email and contain instructions to redeem them at checkout.
          </p>
        </div>

        <div className="bg-graphite rounded-2xl p-8 shadow-ultra-soft">
          <h2 className="text-3xl font-display font-semibold text-paper mb-4">Loyalty Program</h2>
          <p className="text-chrome leading-relaxed mb-6">
            Join the Kith & Kin Loyalty Program and start earning rewards with every visit. Enjoy exclusive discounts, early access to specials, and more.
          </p>
          <ul className="space-y-4 text-chrome">
            <li className="flex items-start">
              <span className="text-neon mr-3 text-xl">✓</span>
              <span>Earn points for every dollar spent on services and products.</span>
            </li>
            <li className="flex items-start">
              <span className="text-neon mr-3 text-xl">✓</span>
              <span>Redeem points for free services or exclusive merchandise.</span>
            </li>
            <li className="flex items-start">
              <span className="text-neon mr-3 text-xl">✓</span>
              <span>Receive special birthday offers and member-only promotions.</span>
            </li>
          </ul>
          <Link href="/book" className="mt-8 w-full inline-flex items-center justify-center px-6 py-3 border border-neon text-neon rounded-full text-lg font-medium can-animate hover:bg-neon hover:text-ink transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neon">
            Join Loyalty (Book Now)
          </Link>
          <p className="text-chrome/70 font-mono text-xs mt-4">
            You will be prompted to join our loyalty program after your booking confirmation.
          </p>
        </div>
      </section>
    </main>
  );
}