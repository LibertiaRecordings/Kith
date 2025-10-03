import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Our Barbers | Kith & Kin Barbershop",
  description: "Meet the skilled barbers of Kith & Kin. Explore their bios, specialties, and book your next cut with your preferred barber.",
};

export default function BarbersPage() {
  // Placeholder data for barbers
  const barbers = [
    { slug: "kenneth", name: "Kenneth", role: "Senior Barber", specialties: ["Scissor Cuts", "Fades", "Textured Hair"], imageUrl: "/images/kenneth.jpeg" },
    { slug: "heather", name: "Heather", role: "Senior Barber", specialties: ["Scissor Cuts", "Fades", "Textured Hair"], imageUrl: "/images/heather.jpeg" },
    { slug: "liam", name: "Liam", role: "Barber", specialties: ["Fades", "Tapers", "Textured Hair"], imageUrl: "https://via.placeholder.com/150/305%2530/FFFCF7?text=Liam" },
    { slug: "bojan-el", name: "BOJAN / EL", role: "Senior Barber", specialties: ["Scissor Cuts", "Fades", "Tapers", "Textured Hair", "Afro Hair"], imageUrl: "https://via.placeholder.com/150/305%2530/FFFCF7?text=Bojan" },
  ];

  return (
    <main id="main" className="container mx-auto px-6 py-16 min-h-screen bg-background text-foreground">
      <h1 className="text-4xl md:text-5xl tracking-tight text-foreground">Our Barbers</h1>
      <p className="mt-3 text-muted-foreground font-body text-lg">Meet the hands behind the precision.</p>

      <section className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {barbers.map((barber) => (
          <Link href={`/barbers/${barber.slug}`} key={barber.slug} className="block">
            <div className="bg-card rounded-2xl p-6 shadow-ultra-soft can-animate group">
              <img src={barber.imageUrl} alt={barber.name} className="w-24 h-24 rounded-full mx-auto mb-4 border-2 border-muted-foreground/30 group-hover:border-primary transition-colors" />
              <h2 className="text-2xl font-hero text-foreground text-center group-hover:text-primary transition-colors">{barber.name}</h2>
              <p className="text-muted-foreground text-center font-body text-base mt-1">{barber.role}</p>
              <ul className="mt-4 flex flex-wrap justify-center gap-2">
                {barber.specialties.map((spec, index) => (
                  <li key={index} className="bg-background text-muted-foreground text-sm px-3 py-1 rounded-full border border-muted-foreground/30 group-hover:border-primary transition-colors font-body">
                    {spec}
                  </li>
                ))}
              </ul>
              <div className="mt-4 text-center">
                <span className="inline-flex items-center justify-center px-4 py-2 border border-muted-foreground/30 text-muted-foreground rounded-full text-sm font-medium group-hover:border-primary group-hover:text-primary transition-colors font-body">
                  View Profile
                </span>
              </div>
            </div>
          </Link>
        ))}
      </section>
    </main>
  );
}