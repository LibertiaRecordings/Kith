import { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

interface BarberDetailPageProps {
  params: { slug: string };
}

// Placeholder function to fetch barber data
async function getBarberBySlug(slug: string) {
  // In a real app, this would fetch from your CMS (e.g., Sanity/Contentful)
  const barbers = [
    {
      slug: "john-doe",
      name: "John Doe",
      role: "Master Barber",
      bio: "With over 15 years of experience, John specializes in classic fades and intricate beard designs. His precision and attention to detail ensure every client leaves feeling sharp and confident. A true artisan of the craft, John brings a calm and focused energy to every cut.",
      specialties: ["Classic Fades", "Beard Trims", "Straight Razor Shaves"],
      staffId: "STAFF_ID_JOHN", // TODO: Replace with actual Square Staff ID
      socials: { instagram: "https://instagram.com/johndoe_barber" },
      gallery: [
        { _key: "1", url: "https://via.placeholder.com/400x300/305%2530/FFFCF7?text=John+Cut+1", alt: "John Doe's haircut example 1" }, // Updated placeholder color
        { _key: "2", url: "https://via.placeholder.com/400x300/305%2530/FFFCF7?text=John+Cut+2", alt: "John Doe's haircut example 2" }, // Updated placeholder color
        { _key: "3", url: "https://via.placeholder.com/400x300/305%2530/FFFCF7?text=John+Cut+3", alt: "John Doe's haircut example 3" }, // Updated placeholder color
      ],
      imageUrl: "https://via.placeholder.com/200/305%2530/FFFCF7?text=John", // Updated placeholder color
    },
    {
      slug: "jane-smith",
      name: "Jane Smith",
      role: "Stylist & Barber",
      bio: "Jane brings a fresh, modern approach to barbering, excelling in contemporary cuts and hot shaves. Her keen eye for style and commitment to client satisfaction make her a favorite. She loves transforming looks and ensuring a relaxing experience.",
      specialties: ["Modern Cuts", "Hot Shaves", "Textured Hair"],
      staffId: "STAFF_ID_JANE", // TODO: Replace with actual Square Staff ID
      socials: { instagram: "https://instagram.com/janesmith_cuts" },
      gallery: [
        { _key: "1", url: "https://via.placeholder.com/400x300/305%2530/FFFCF7?text=Jane+Cut+1", alt: "Jane Smith's haircut example 1" }, // Updated placeholder color
        { _key: "2", url: "https://via.placeholder.com/400x300/305%2530/FFFCF7?text=Jane+Cut+2", alt: "Jane Smith's haircut example 2" }, // Updated placeholder color
        { _key: "3", url: "https://via.placeholder.com/400x300/305%2530/FFFCF7?text=Jane+Cut+3", alt: "Jane Smith's haircut example 3" }, // Updated placeholder color
      ],
      imageUrl: "https://via.placeholder.com/200/305%2530/FFFCF7?text=Jane", // Updated placeholder color
    },
  ];
  return barbers.find((barber) => barber.slug === slug);
}

export async function generateMetadata({ params }: BarberDetailPageProps): Promise<Metadata> {
  const barber = await getBarberBySlug(params.slug);

  if (!barber) {
    return {
      title: "Barber Not Found | Kith & Kin Barbershop",
      description: "The barber you are looking for could not be found.",
    };
  }

  return {
    title: `${barber.name} | Kith & Kin Barbershop`,
    description: barber.bio.substring(0, 155) + "...",
  };
}

export default async function BarberDetailPage({ params }: BarberDetailPageProps) {
  const barber = await getBarberBySlug(params.slug);

  if (!barber) {
    return (
      <main id="main" className="container mx-auto px-6 py-16 min-h-screen bg-background text-foreground">
        <h1 className="text-4xl md:text-5xl font-display font-semibold tracking-tight text-foreground">Barber Not Found</h1>
        <p className="mt-3 text-muted-foreground font-mono">The barber you are looking for does not exist.</p>
        <Link href="/barbers" className="mt-8 inline-flex items-center text-primary hover:underline">
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Barbers
        </Link>
      </main>
    );
  }

  // Deep-link to Square Appointments for this specific staff member
  // The base URL is updated, but ORG_ID and staffId remain placeholders as they are not in the provided HTML.
  const squareBookingLink = `https://kithkinco.square.site/s/appointments`; // Updated base URL

  return (
    <main id="main" className="container mx-auto px-6 py-16 min-h-screen bg-background text-foreground">
      <Link href="/barbers" className="inline-flex items-center text-primary hover:underline mb-8">
        <ArrowLeft className="mr-2 h-4 w-4" /> Back to Barbers
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1">
          <img src={barber.imageUrl} alt={barber.name} className="w-full h-auto rounded-2xl object-cover border border-muted-foreground/30 shadow-ultra-soft" />
          <h1 className="text-4xl font-display font-semibold tracking-tight text-foreground mt-6">{barber.name}</h1>
          <p className="text-muted-foreground font-mono text-lg mt-1">{barber.role}</p>

          <Link href={squareBookingLink} target="_blank" rel="noopener noreferrer" className="mt-6 w-full inline-flex items-center justify-center px-6 py-3 bg-primary text-primary-foreground rounded-full text-lg font-medium can-animate hover:bg-primary/90 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary">
            Book with {barber.name}
          </Link>

          {barber.socials.instagram && (
            <Link href={barber.socials.instagram} target="_blank" rel="noopener noreferrer" className="mt-4 w-full inline-flex items-center justify-center px-6 py-3 border border-muted-foreground/30 text-muted-foreground rounded-full text-lg font-medium can-animate hover:border-primary hover:text-primary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary">
              Instagram
            </Link>
          )}
        </div>

        <div className="lg:col-span-2 bg-card rounded-2xl p-8 shadow-ultra-soft">
          <h2 className="text-3xl font-display font-semibold text-foreground mb-4">About {barber.name}</h2>
          <p className="text-muted-foreground leading-relaxed mb-6">{barber.bio}</p>

          <h3 className="text-2xl font-display font-semibold text-foreground mb-3">Specialties</h3>
          <ul className="flex flex-wrap gap-3 mb-6">
            {barber.specialties.map((spec, index) => (
              <li key={index} className="bg-background text-primary text-sm px-4 py-2 rounded-full border border-primary">
                {spec}
              </li>
            ))}
          </ul>

          {barber.gallery.length > 0 && (
            <>
              <h3 className="text-2xl font-display font-semibold text-foreground mb-3">Gallery</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {barber.gallery.map((image) => (
                  <img key={image._key} src={image.url} alt={image.alt} className="w-full h-auto rounded-lg object-cover border border-muted-foreground/30" />
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </main>
  );
}