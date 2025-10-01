import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Specials & Offers | Kith & Kin Barbershop",
  description: "Discover limited-time promotions and special offers at Kith & Kin Barbershop. Don't miss out on our exclusive deals!",
};

export default function SpecialsPage() {
  // Placeholder data for specials
  const specials = [
    {
      slug: "lunchtime-lightning",
      title: "Lunchtime Lightning",
      description: "Quick trim and style for those on the go. In and out in 30 minutes!",
      startDate: "2024-07-01",
      endDate: "2024-07-31",
      ctaLink: "/book",
      imageUrl: "https://via.placeholder.com/400x250/1C1C1C/FAFAFA?text=Lunchtime+Special",
      active: true,
    },
    {
      slug: "bring-a-friend",
      title: "Bring a Friend, Get 20% Off",
      description: "Introduce a new client to Kith & Kin and both receive 20% off your next service.",
      startDate: "2024-07-01",
      endDate: "2024-08-31",
      ctaLink: "/book",
      imageUrl: "https://via.placeholder.com/400x250/1C1C1C/FAFAFA?text=Friend+Offer",
      active: true,
    },
    {
      slug: "first-time-client",
      title: "First-Time Client Discount",
      description: "New to Kith & Kin? Enjoy 15% off your first service with us.",
      startDate: "2024-01-01", // Ongoing
      endDate: "2099-12-31",
      ctaLink: "/book",
      imageUrl: "https://via.placeholder.com/400x250/1C1C1C/FAFAFA?text=New+Client",
      active: true,
    },
  ];

  const activeSpecials = specials.filter(s => s.active && new Date(s.endDate) >= new Date());

  return (
    <main id="main" className="container mx-auto px-6 py-10 min-h-screen bg-ink text-paper">
      <h1 className="text-4xl md:text-5xl font-display font-semibold tracking-tight text-paper">Specials & Offers</h1>
      <p className="mt-3 text-chrome font-mono">Limited-time precision, unlimited style.</p>

      {activeSpecials.length > 0 ? (
        <section className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {activeSpecials.map((special) => (
            <div key={special.slug} className="bg-graphite rounded-2xl p-6 shadow-ultra-soft">
              <img src={special.imageUrl} alt={special.title} className="w-full h-48 object-cover rounded-lg mb-4 border border-chrome" />
              <h2 className="text-2xl font-display font-medium text-paper">{special.title}</h2>
              <p className="text-chrome mt-2 leading-relaxed text-sm">{special.description}</p>
              <p className="text-chrome/70 font-mono text-xs mt-4">
                Valid until {new Date(special.endDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
              </p>
              <Link href={special.ctaLink} className="mt-6 w-full inline-flex items-center justify-center px-6 py-3 bg-neon text-ink rounded-full text-lg font-medium can-animate hover:bg-neon/90 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neon">
                Claim Offer
              </Link>
            </div>
          ))}
        </section>
      ) : (
        <div className="mt-8 text-center bg-graphite rounded-2xl p-8 shadow-ultra-soft">
          <p className="text-paper text-xl font-display">No active specials at the moment. Check back soon!</p>
          <Link href="/book" className="mt-6 inline-flex items-center justify-center px-6 py-3 bg-neon text-ink rounded-full text-lg font-medium can-animate hover:bg-neon/90 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neon">
            Book an Appointment
          </Link>
        </div>
      )}
    </main>
  );
}