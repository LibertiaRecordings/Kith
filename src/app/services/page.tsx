import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Our Services | Kith & Kin Barbershop",
  description: "Explore the full range of precision barbering services offered at Kith & Kin, from classic cuts to modern styling and luxurious add-ons.",
};

export default function ServicesPage() {
  // Placeholder data for services
  const services = [
    {
      slug: "precision-cut",
      name: "Precision Cut",
      price: 60,
      duration: 45,
      description: "A meticulous haircut tailored to your style, finished with a hot towel and neck shave.",
      addOns: [{ name: "Beard Trim", price: 25, duration: 15 }],
    },
    {
      slug: "hot-shave",
      name: "Traditional Hot Shave",
      price: 45,
      duration: 30,
      description: "Experience the ultimate relaxation with a classic hot lather and straight razor shave.",
      addOns: [],
    },
    {
      slug: "beard-sculpt",
      name: "Beard Sculpt & Line-up",
      price: 35,
      duration: 20,
      description: "Expert shaping and precise line-up to perfect your beard, finished with conditioning.",
      addOns: [{ name: "Facial Steamer", price: 15, duration: 10 }],
    },
    {
      slug: "head-shave",
      name: "Head Shave",
      price: 50,
      duration: 30,
      description: "A smooth, clean head shave with hot towels and soothing aftershave.",
      addOns: [],
    },
    {
      slug: "kids-cut",
      name: "Kids Cut (Under 12)",
      price: 40,
      duration: 30,
      description: "A stylish and comfortable haircut for our younger clients.",
      addOns: [],
    },
  ];

  return (
    <main id="main" className="container mx-auto px-6 py-10 min-h-screen bg-background text-foreground">
      <h1 className="text-4xl md:text-5xl font-display font-semibold tracking-tight text-foreground">Our Services</h1>
      <p className="mt-3 text-muted-foreground font-mono">Crafted for precision, designed for you.</p>

      <section className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((service) => (
          <div key={service.slug} className="bg-card rounded-2xl p-6 shadow-ultra-soft">
            <h2 className="text-2xl font-display font-medium text-foreground">{service.name}</h2>
            <p className="text-primary font-mono text-lg mt-2">${service.price} <span className="text-muted-foreground text-sm">({service.duration} min)</span></p>
            <p className="text-muted-foreground mt-4 leading-relaxed">{service.description}</p>

            {service.addOns.length > 0 && (
              <div className="mt-4 pt-4 border-t border-muted-foreground/20">
                <h3 className="text-lg font-display font-medium text-foreground mb-2">Add-ons:</h3>
                <ul className="space-y-2">
                  {service.addOns.map((addon, index) => (
                    <li key={index} className="flex justify-between items-center text-muted-foreground text-sm">
                      <span>{addon.name}</span>
                      <span className="font-mono">${addon.price} ({addon.duration} min)</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <Link href="/book" className="mt-6 w-full inline-flex items-center justify-center px-6 py-3 bg-primary text-primary-foreground rounded-full text-lg font-medium can-animate hover:bg-primary/90 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary">
              Book {service.name}
            </Link>
          </div>
        ))}
      </section>
    </main>
  );
}