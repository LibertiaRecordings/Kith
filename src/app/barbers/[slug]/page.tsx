import { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Instagram } from "lucide-react"; // Import Instagram icon
import Image from "next/image";
import { Button } from "@/components/ui/button"; // Import Button component
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"; // Import Dialog components
import { useState } from "react"; // Import useState for dialog state

interface BarberDetailPageProps {
  params: { slug: string };
}

// Placeholder function to fetch barber data
async function getBarberBySlug(slug: string) {
  // In a real app, this would fetch from your CMS (e.g., Sanity/Contentful)
  const barbers = [
    {
      slug: "kenneth",
      name: "Kenneth",
      role: "Senior Barber",
      bio: "Kenneth is a master of classic barbering techniques, known for his sharp fades and meticulous attention to detail. He ensures every client leaves with a fresh look and a great experience.",
      specialties: ["Scissor Cuts", "Fades", "Textured Hair"],
      staffId: "STAFF_ID_KENNETH", // Placeholder: Replace with actual Square Staff ID for Kenneth
      socials: { instagram: "https://instagram.com/kenneth_barber" },
      gallery: [
        { _key: "1", url: "/images/barber-trimming-beard-calgary.jpg", alt: "Kenneth performing a precise beard trim at Kith & Kin Barbershop Calgary" },
        { _key: "2", url: "/images/barber-scissors-haircut-detail.jpg", alt: "Close-up of Kenneth's hands expertly cutting hair with scissors for a client" },
        { _key: "3", url: "/images/barber-styling-hair-comb.jpg", alt: "Kenneth styling a client's hair with a comb and product, showcasing his finishing touch" },
      ],
      imageUrl: "/images/kenneth.jpeg", // Updated image path
    },
    {
      slug: "heather",
      name: "Heather",
      role: "Senior Barber",
      bio: "Heather brings a vibrant and modern touch to Kith & Kin. Specializing in contemporary cuts and creative coloring, she loves helping clients express their unique style.",
      specialties: ["Scissor Cuts", "Fades", "Textured Hair"],
      staffId: "STAFF_ID_HEATHER", // Placeholder: Replace with actual Square Staff ID for Heather
      socials: { instagram: "https://instagram.com/heather_stylist" },
      gallery: [
        { _key: "1", url: "/images/barber-client-haircut-calgary.jpg", alt: "Heather giving a modern haircut to a client at Kith & Kin Barbershop Calgary" },
        { _key: "2", url: "/images/layrite-cement-clay-product.jpg", alt: "Layrite Cement Clay, a premium styling product recommended by Heather" },
        { _key: "3", url: "/images/uppercut-salt-spray-product.jpg", alt: "Uppercut Deluxe Salt Spray, a popular grooming product for texture and volume, used by Heather" },
      ],
      imageUrl: "/images/heather.jpeg", // Placeholder image
    },
    {
      slug: "liam",
      name: "Liam",
      role: "Barber",
      bio: "Liam is our expert for longer hair styles and kids' cuts, combining patience with precision. He creates comfortable and enjoyable experiences for clients of all ages.",
      specialties: ["Fades", "Tapers", "Textured Hair"],
      staffId: "STAFF_ID_LIAM", // Placeholder: Replace with actual Square Staff ID for Liam
      socials: { instagram: "https://instagram.com/liam_barber" },
      gallery: [
        { _key: "1", url: "/images/barber-trimming-side-profile.jpg", alt: "Liam giving a haircut to a client at Kith & Kin Barbershop Calgary" },
        { _key: "2", url: "/images/client-centered-face.jpg", alt: "Client with a fresh haircut by Liam" },
        { _key: "3", url: "/images/barber-trimming-side-profile-alt.jpg", alt: "Liam carefully trimming a client's side profile" },
      ],
      imageUrl: "/images/liam.jpeg", // Updated image path
    },
    {
      slug: "bojan-el",
      name: "BOJAN / EL",
      role: "Senior Barber",
      bio: "Bojan, also known as EL is a precision barber, educator, and creative, with experience cutting for elite shops worldwide. His work is a blend of razor-sharp precision and modern artistry, designed for those who value excellence.",
      specialties: ["Scissor Cuts", "Fades", "Tapers", "Textured Hair", "Afro Hair"],
      staffId: "TMev-ZDlgbd5FxgV", // Updated with actual Square Staff ID for Bojan
      socials: { instagram: "https://instagram.com/el.wav" }, // Updated Instagram link
      gallery: [
        { _key: "1", url: "/images/bojan-gallery-1.jpeg", alt: "Bojan / EL showcasing a sharp lineup and fade on a client" },
        { _key: "2", url: "/images/bojan-gallery-2.jpeg", alt: "Bojan / EL's work on a client with textured, curly hair and a clean fade" },
        { _key: "3", url: "/images/bojan-gallery-3.jpeg", alt: "Close-up of a precise fade and clean hairline by Bojan / EL" },
        { _key: "4", url: "/images/bojan-gallery-4.jpeg", alt: "Client with a stylish haircut and beard trim by Bojan / EL" },
        { _key: "5", url: "/images/bojan-gallery-5.jpeg", alt: "Bojan / EL performing a finishing touch with a brush on a client's haircut" },
        { _key: "6", url: "/images/bojan-gallery-6.jpeg", alt: "Bojan / EL with a client, showcasing a modern, artistic haircut" },
      ],
      imageUrl: "/images/bojan.jpeg", // Placeholder image
    },
  ];
  return barbers.find((barber) => barber.slug === slug);
}

export async function generateMetadata({ params }: BarberDetailPageProps): Promise<Metadata> {
  const barber = await getBarberBySlug(params.slug);

  if (!barber) {
    return {
      title: "Barber Not Found | Kith & Kin Barbershop Calgary",
      description: "The barber you are looking for could not be found at Kith & Kin Barbershop in Calgary.",
    };
  }

  return {
    title: `${barber.name} - Expert Barber | Kith & Kin Barbershop Calgary`,
    description: barber.bio.substring(0, 155) + "...",
  };
}

export default async function BarberDetailPage({ params }: BarberDetailPageProps) {
  const barber = await getBarberBySlug(params.slug);
  const [isBookingDialogOpen, setIsBookingDialogOpen] = useState(false); // State for dialog

  if (!barber) {
    return (
      <main id="main" className="container mx-auto px-6 py-16 min-h-screen bg-background text-foreground">
        <h1 className="text-4xl md:text-5xl tracking-tight text-foreground">Barber Not Found</h1>
        <p className="mt-3 text-muted-foreground font-body text-lg">The barber you are looking for does not exist at Kith & Kin Barbershop Calgary.</p>
        <Link href="/barbers" className="mt-8 inline-flex items-center text-primary hover:underline">
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Barbers
        </Link>
      </main>
    );
  }

  // Construct the Square booking link for this specific staff member
  const squareBookingLink = `https://book.squareup.com/appointments/30wjsaqndgj3cy/location/G2ZAD7PBKCNTT/services?buttonTextColor=ffffff&color=000000&locale=en&referrer=so&team_member_id=${barber.staffId}`;

  return (
    <main id="main" className="container mx-auto px-6 py-16 min-h-screen bg-background text-foreground">
      <Link href="/barbers" className="inline-flex items-center text-primary hover:underline mb-8">
        <ArrowLeft className="mr-2 h-4 w-4" /> Back to Barbers
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1">
          <div className="relative w-full h-80 rounded-2xl overflow-hidden object-cover border border-muted-foreground/30 shadow-ultra-soft aspect-square">
            <Image src={barber.imageUrl} alt={`${barber.name}, ${barber.role} at Kith & Kin Barbershop Calgary`} fill style={{ objectFit: "cover" }} sizes="(max-width: 1024px) 100vw, 33vw" className="transition-transform duration-300 ease-in-out hover:scale-105" />
          </div>
          <h1 className="text-4xl font-hero tracking-tight text-foreground mt-6">{barber.name}</h1>
          <p className="text-muted-foreground font-body text-lg mt-1">{barber.role} in Calgary</p>

          <Button 
            onClick={() => setIsBookingDialogOpen(true)}
            className="mt-6 w-full inline-flex items-center justify-center px-6 py-3 bg-primary text-primary-foreground rounded-full text-lg font-medium can-animate hover:bg-primary/90 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          >
            Book with {barber.name}
          </Button>

          {barber.socials.instagram && (
            <Link href={barber.socials.instagram} target="_blank" rel="noopener noreferrer" className="mt-4 w-full inline-flex items-center justify-center px-6 py-3 border border-muted-foreground/30 text-muted-foreground rounded-full text-lg font-medium can-animate hover:border-primary hover:text-primary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary font-body">
              <Instagram className="mr-2 h-5 w-5" /> Instagram
            </Link>
          )}
        </div>

        <div className="lg:col-span-2 bg-card rounded-2xl p-8 shadow-ultra-soft">
          <h2 className="text-3xl font-hero text-foreground mb-4">About {barber.name}</h2>
          <p className="text-muted-foreground leading-relaxed mb-6 text-lg font-body">{barber.bio}</p>

          <h3 className="text-2xl font-hero text-foreground mb-3">Specialties</h3>
          <ul className="flex flex-wrap gap-3 mb-6">
            {barber.specialties.map((spec, index) => (
              <li key={index} className="bg-background text-primary text-base px-4 py-2 rounded-full border border-primary font-body">
                {spec}
              </li>
            ))}
          </ul>

          {barber.gallery.length > 0 && (
            <>
              <h3 className="text-2xl font-hero text-foreground mb-3">Gallery</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {barber.gallery.map((image) => (
                  <div key={image._key} className="relative w-full h-48 rounded-lg overflow-hidden border border-muted-foreground/30 aspect-video">
                    <Image src={image.url} alt={image.alt} fill style={{ objectFit: "cover" }} sizes="(max-width: 768px) 100vw, 50vw" className="transition-transform duration-300 ease-in-out hover:scale-105" />
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>

      {/* Booking Dialog */}
      <Dialog open={isBookingDialogOpen} onOpenChange={setIsBookingDialogOpen}>
        <DialogContent className="sm:max-w-[90vw] max-h-[90vh] flex flex-col bg-card text-foreground p-0 rounded-2xl shadow-ultra-soft border-muted-foreground/30">
          <DialogHeader className="p-6 pb-0">
            <DialogTitle className="text-3xl font-hero text-foreground">Book with {barber.name}</DialogTitle>
          </DialogHeader>
          <div className="flex-grow p-6 pt-0 overflow-hidden">
            <iframe
              src={squareBookingLink}
              className="w-full h-full rounded-xl border border-muted-foreground/30"
              loading="lazy"
              title={`Book an appointment with ${barber.name}`}
            />
          </div>
        </DialogContent>
      </Dialog>
    </main>
  );
}