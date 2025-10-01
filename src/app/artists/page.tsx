import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Our Artists | Kith & Kin Barbershop",
  description: "Meet the skilled barbers of Kith & Kin. Explore their bios, specialties, and book your next cut with your preferred artist.",
};

export default function ArtistsPage() {
  // Placeholder data for artists
  const artists = [
    { slug: "john-doe", name: "John Doe", role: "Master Barber", specialties: ["Classic Fades", "Beard Trims"], imageUrl: "https://via.placeholder.com/150/1C1C1C/FAFAFA?text=John" },
    { slug: "jane-smith", name: "Jane Smith", role: "Stylist & Barber", specialties: ["Modern Cuts", "Hot Shaves"], imageUrl: "https://via.placeholder.com/150/1C1C1C/FAFAFA?text=Jane" },
    { slug: "peter-jones", name: "Peter Jones", role: "Senior Barber", specialties: ["Long Hair Styling", "Kids Cuts"], imageUrl: "https://via.placeholder.com/150/1C1C1C/FAFAFA?text=Peter" },
  ];

  return (
    <main id="main" className="container mx-auto px-6 py-10 min-h-screen bg-ink text-paper">
      <h1 className="text-4xl md:text-5xl font-display font-semibold tracking-tight text-paper">Our Artists</h1>
      <p className="mt-3 text-chrome font-mono">Meet the hands behind the precision.</p>

      <section className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {artists.map((artist) => (
          <Link href={`/artists/${artist.slug}`} key={artist.slug} className="block">
            <div className="bg-graphite rounded-2xl p-6 shadow-ultra-soft can-animate group">
              <img src={artist.imageUrl} alt={artist.name} className="w-24 h-24 rounded-full mx-auto mb-4 border-2 border-chrome group-hover:border-neon transition-colors" />
              <h2 className="text-2xl font-display font-medium text-paper text-center group-hover:text-neon transition-colors">{artist.name}</h2>
              <p className="text-chrome text-center font-mono text-sm mt-1">{artist.role}</p>
              <ul className="mt-4 flex flex-wrap justify-center gap-2">
                {artist.specialties.map((spec, index) => (
                  <li key={index} className="bg-ink text-chrome text-xs px-3 py-1 rounded-full border border-graphite group-hover:border-neon transition-colors">
                    {spec}
                  </li>
                ))}
              </ul>
              <div className="mt-4 text-center">
                <span className="inline-flex items-center justify-center px-4 py-2 border border-chrome text-chrome rounded-full text-sm font-medium group-hover:border-neon group-hover:text-neon transition-colors">
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