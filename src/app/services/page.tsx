import { Metadata } from "next";
import Link from "next/link";
import { Service } from "@/types/cms"; // Import the Service interface

export const metadata: Metadata = {
  title: "Our Services | Kith & Kin Barbershop",
  description: "Explore the full range of precision barbering services offered at Kith & Kin, from classic cuts to modern styling and luxurious add-ons.",
};

export default function ServicesPage() {
  const services: Service[] = [ // Explicitly type the services array
    {
      _id: "svc-skin-zero-fade",
      slug: "skin-zero-fade",
      name: "Skin/Zero Fade",
      price: 40.00,
      displayPrice: "$40.00+",
      duration: 40,
      displayDuration: "40 mins",
      description: "A precise fade with a smooth skin finish. Service includes a zero fade. Suggested upkeep: every 1 to 2 weeks or more.",
      addOns: [],
      category: "Haircut",
      finishLookExamples: [],
      ctaLink: "https://book.squareup.com/appointments/30wjsaqndgj3cy/location/G2ZAD7PBKCNTT/services/S2JFZTY43YWT2R2LASQUU7QS",
    },
    {
      _id: "svc-classic-cut",
      slug: "classic-cut",
      name: "Classic Cut",
      price: 35.00,
      displayPrice: "$35.00+",
      duration: 30,
      displayDuration: "30 mins+",
      description: "A classic haircut with a straight edged finish for a clean & timeless look. Service does not include a zero or skin fade. Suggested upkeep: every 2 to 4 weeks.",
      addOns: [],
      category: "Haircut",
      finishLookExamples: [],
      ctaLink: "https://book.squareup.com/appointments/30wjsaqndgj3cy/location/G2ZAD7PBKCNTT/services/5KXJE56UHIQB7P6N5NLBRNBU",
    },
    {
      _id: "svc-ladies-dry-cut",
      slug: "ladies-dry-cut",
      name: "Ladies Dry Cut",
      price: 45.00,
      displayPrice: "$45.00",
      duration: 45,
      displayDuration: "45 mins+",
      description: "A simple trim for the ladies without any styling or finishing.",
      addOns: [],
      category: "Haircut",
      finishLookExamples: [],
      ctaLink: "https://book.squareup.com/appointments/30wjsaqndgj3cy/location/G2ZAD7PBKCNTT/services/2YZBK5X2NHLN5JBVDVQUMYN2",
    },
    {
      _id: "svc-jr-kin-cut",
      slug: "jr-kin-cut",
      name: "Jr. Kin Cut",
      price: 25.00,
      displayPrice: "$25.00",
      duration: 45,
      displayDuration: "45 mins",
      description: "A haircut tailored just for the little fellas. Only available for ages 12 & under. Ages 12 & up counts as adult pricing. Suggested upkeep: every 3-4 weeks.",
      addOns: [],
      category: "Haircut",
      finishLookExamples: [],
      ctaLink: "https://book.squareup.com/appointments/30wjsaqndgj3cy/location/G2ZAD7PBKCNTT/services/FTOF3PH6MMK7CJP7RHV5T2U7",
    },
    {
      _id: "svc-buzz-cut",
      slug: "buzz-cut",
      name: "Buzz Cut",
      price: 24.00,
      displayPrice: "$24.00",
      duration: 30,
      displayDuration: "30 mins+",
      description: "All around head buzz. Service does not include skin/zero fade. Suggested upkeep: every 1-3 weeks.",
      addOns: [],
      category: "Haircut",
      finishLookExamples: [],
      ctaLink: "https://book.squareup.com/appointments/30wjsaqndgj3cy/location/G2ZAD7PBKCNTT/services/NGSFHGXBQWB22UQJ36MCQBHE",
    },
    {
      _id: "svc-beard-service",
      slug: "beard-service",
      name: "Beard Service",
      price: 25.00,
      displayPrice: "$25.00",
      duration: 15,
      displayDuration: "15 mins+",
      description: "A meticulous beard trim and styling as per clients requests leaving your face feeling light & clean. Suggested upkeep: weekly.",
      addOns: [],
      category: "Beard",
      finishLookExamples: [],
      ctaLink: "https://book.squareup.com/appointments/30wjsaqndgj3cy/location/G2ZAD7PBKCNTT/services/U6YAZVVPHR2DHAB4TL77DXUI",
    },
    {
      _id: "svc-head-wash-massage",
      slug: "head-wash-massage",
      name: "Head Wash & Massage",
      price: 5.00,
      displayPrice: "$5.00",
      duration: 30,
      displayDuration: "30 mins+",
      description: "A relaxing head wash & massage to pair perfectly with your service.",
      addOns: [],
      category: "Add-on",
      finishLookExamples: [],
      ctaLink: "https://book.squareup.com/appointments/30wjsaqndgj3cy/location/G2ZAD7PBKCNTT/services/KYNCYPHHT7J2ALUZCGAXWOUO",
    },
    {
      _id: "svc-beard-service-add-on",
      slug: "beard-service-add-on",
      name: "Beard Service (Add-on)",
      price: 20.00,
      displayPrice: "$20.00",
      duration: 20,
      displayDuration: "20 mins",
      description: "A meticulous beard trim and styling as per clients requests leaving your face feeling light & clean. This add-on item must be combined with another service.",
      addOns: [],
      category: "Add-on",
      finishLookExamples: [],
      ctaLink: "https://book.squareup.com/appointments/30wjsaqndgj3cy/location/G2ZAD7PBKCNTT/services/ULI6VP3TKLTNMCPM5FQIA6J7",
    },
    {
      _id: "svc-sub-check-in",
      slug: "subscription-check-in",
      name: "Subscription Check-in",
      price: 0.05,
      displayPrice: "$0.05",
      duration: 5, // Assuming 5 minutes for a check-in
      displayDuration: "5 mins",
      description: "Only book this option if you are a subscriber.",
      addOns: [],
      category: "Subscription",
      finishLookExamples: [],
      ctaLink: "https://book.squareup.com/appointments/30wjsaqndgj3cy/location/G2ZAD7PBKCNTT/services/TNPLJQ5BS3G3YFTLQSIFAFKL",
    },
  ];

  return (
    <main id="main" className="container mx-auto px-6 py-16 min-h-screen bg-background text-foreground">
      <h1 className="text-4xl md:text-5xl font-display font-normal tracking-tight text-foreground">Our Services</h1>
      <p className="mt-3 text-muted-foreground font-display text-lg">Crafted for precision, designed for you.</p>

      <section className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((service) => (
          <div key={service.slug} className="bg-card rounded-2xl p-6 shadow-ultra-soft flex flex-col h-full">
            <h2 className="text-xl font-display font-medium text-foreground">{service.name}</h2>
            <p className="text-primary font-display text-lg mt-2">{service.displayPrice} <span className="text-muted-foreground text-base">({service.displayDuration})</span></p>
            <p className="text-muted-foreground mt-4 leading-relaxed flex-grow mb-8 text-lg">{service.description}</p>

            {service.addOns.length > 0 && (
              <div className="mt-4 pt-4 border-t border-muted-foreground/20">
                <h3 className="text-lg font-display font-normal text-foreground mb-2">Add-ons:</h3>
                <ul className="space-y-2">
                  {service.addOns.map((addon, index) => (
                    <li key={index} className="flex justify-between items-center text-muted-foreground text-base">
                      <span>{addon.name}</span>
                      <span className="font-display">${addon.price} ({addon.duration} min)</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <Link href={service.ctaLink} target="_blank" rel="noopener noreferrer" className="mt-6 w-full inline-flex items-center justify-center px-6 py-3 bg-primary text-primary-foreground rounded-full text-lg font-medium can-animate hover:bg-primary/90 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary mt-auto">
              Book {service.name}
            </Link>
          </div>
        ))}
      </section>
    </main>
  );
}