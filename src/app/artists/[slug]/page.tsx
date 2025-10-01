import { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

interface ArtistDetailPageProps {
  params: { slug: string };
}

// Placeholder function to fetch artist data
async function getArtistBySlug(slug: string) {
  // In a real app, this would fetch from your CMS (e.g., Sanity/Contentful)
  const artists = [
    {
      slug: "john-doe",
      name: "John Doe",
      role: "Master Barber",
      bio: "With over 15 years of experience, John specializes in classic fades and intricate beard designs. His precision and attention to detail ensure every client leaves feeling sharp and confident. A true artisan of the craft, John brings a calm and focused energy to every cut.",
      specialties: ["Classic Fades", "Beard Trims", "Straight Razor Shaves"],
      staffId: "STAFF_ID_JOHN", // TODO: Replace with actual Square Staff ID
      socials: { instagram: "https://instagram.com/johndoe_barber" },
      gallery: [
        { _key: "1", url: "https://via.placeholder.com/400x300/1C1C1C/FAFAFA?text=John+Cut+1", alt: "John Doe's haircut example 1" },
        { _key: "2", url: "https://via.placeholder.com/400x300/1C1C1C/FAFAFA?text=John+Cut+2", alt: "John Doe's haircut example 2" },
        { _key: "3", url: "https://via.placeholder.com/400x300/1C1C1C/FAFAFA?text=John+Cut+3", alt: "John Doe's haircut example 3" },
      ],
      imageUrl: "https://via.placeholder.com/200/1C1C1C/FAFAFA?text=John",
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
        { _key: "1", url: "https://via.placeholder.com/400x300/1C1C1C/FAFAFA?text=Jane+Cut+1", alt: "Jane Smith's haircut example 1" },
        { _key: "2", url: "https://via.placeholder.com/400x300/1C1C1C/FAFAFA?text=Jane+Cut+2", alt: "Jane Smith's haircut example 2" },
        { _key: "3", url: "https://via.placeholder.com/400x300/1C1C1C/FAFAFA?text=Jane+Cut+3", alt: "Jane Smith's haircut example 3" },
      ],
      imageUrl: "https://via.placeholder.com/200/1C1C1C/FAFAFA?text=Jane",
    },
  ];
  return artists.find((artist) => artist.slug === slug);
}

export async function generateMetadata({ params }: ArtistDetailPageProps): Promise<Metadata> {
  const artist = await getArtistBySlug(params.slug);

  if (!artist) {
    return {
      title: "Artist Not Found | Kith & Kin Barbershop",
      description: "The artist you are looking for could not be found.",
    };
  }

  return {
    title: `${artist.name} | Kith & Kin Barbershop`,
    description: artist.bio.substring(0, 155) + "...",
  };
}

export default async function ArtistDetailPage({ params }: ArtistDetailPageProps) {
  const artist = await getArtistBySlug(params.slug);

  if (!artist) {
    return (
      <main id="main" className="container mx-auto px-6 py-10 min-h-screen bg-ink text-paper">
        <h1 className="text-4xl md:text-5xl font-display font-semibold tracking-tight text-paper">Artist Not Found</h1>
        <p className="mt-3 text-chrome font-mono">The artist you are looking for does not exist.</p>
        <Link href="/artists" className="mt-8 inline-flex items-center text-neon hover:underline">
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Artists
        </Link>
      </main>
    );
  }

  // Deep-link to Square Appointments for this specific staff member
  const squareBookingLink = `https://square.site/appointments/buyer/widget/ORG_ID/staff/${artist.staffId}`; // TODO: Replace ORG_ID with your actual Square Organization ID

  return (
    <main id="main" className="container mx-auto px-6 py-10 min-h-screen bg-ink text-paper">
      <Link href="/artists" className="inline-flex items-center text-neon hover:underline mb-8">
        <ArrowLeft className="mr-2 h-4 w-4" /> Back to Artists
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1">
          <img src={artist.imageUrl} alt={artist.name} className="w-full h-auto rounded-2xl object-cover border border-graphite shadow-ultra-soft" />
          <h1 className="text-4xl font-display font-semibold tracking-tight text-paper mt-6">{artist.name}</h1>
          <p className="text-chrome font-mono text-lg mt-1">{artist.role}</p>

          <Link href={squareBookingLink} target="_blank" rel="noopener noreferrer" className="mt-6 w-full inline-flex items-center justify-center px-6 py-3 border border-neon text-neon rounded-full text-lg font-medium can-animate hover:bg-neon hover:text-ink transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neon">
            Book with {artist.name}
          </Link>

          {artist.socials.instagram && (
            <Link href={artist.socials.instagram} target="_blank" rel="noopener noreferrer" className="mt-4 w-full inline-flex items-center justify-center px-6 py-3 border border-graphite text-chrome rounded-full text-lg font-medium can-animate hover:border-neon hover:text-neon transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neon">
              Instagram
            </Link>
          )}
        </div>

        <div className="lg:col-span-2 bg-graphite rounded-2xl p-8 shadow-ultra-soft">
          <h2 className="text-3xl font-display font-semibold text-paper mb-4">About {artist.name}</h2>
          <p className="text-chrome leading-relaxed mb-6">{artist.bio}</p>

          <h3 className="text-2xl font-display font-semibold text-paper mb-3">Specialties</h3>
          <ul className="flex flex-wrap gap-3 mb-6">
            {artist.specialties.map((spec, index) => (
              <li key={index} className="bg-ink text-neon text-sm px-4 py-2 rounded-full border border-neon">
                {spec}
              </li>
            ))}
          </ul>

          {artist.gallery.length > 0 && (
            <>
              <h3 className="text-2xl font-display font-semibold text-paper mb-3">Gallery</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {artist.gallery.map((image) => (
                  <img key={image._key} src={image.url} alt={image.alt} className="w-full h-auto rounded-lg object-cover border border-chrome" />
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </main>
  );
}