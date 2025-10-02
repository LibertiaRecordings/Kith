import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image"; // Import Image component
import { MapPin, Phone, Mail, Clock } from "lucide-react";

export const metadata: Metadata = {
  title: "Contact & Visit | Kith & Kin Barbershop",
  description: "Get in touch with Kith & Kin Barbershop. Find our location, hours, parking information, and accessibility details.",
};

export default function ContactPage() {
  return (
    <main id="main" className="container mx-auto px-6 py-16 min-h-screen bg-background text-foreground">
      <h1 className="text-4xl md:text-5xl font-display font-semibold tracking-tight text-foreground">Contact & Visit</h1>
      <p className="mt-3 text-muted-foreground font-mono">We're here to help you look your best.</p>

      {/* Exterior Shop Photo */}
      <section className="mt-8 rounded-2xl overflow-hidden shadow-ultra-soft border border-muted-foreground/30">
        <Image
          src="/images/kith-kin-exterior.jpg"
          alt="Exterior of Kith & Kin Barbershop at night with neon sign"
          width={1200} // Adjust width/height as needed for optimal display
          height={600}
          className="w-full h-auto object-cover"
          priority
        />
      </section>

      <section className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-card rounded-2xl p-8 shadow-ultra-soft">
          <h2 className="text-3xl font-display font-semibold text-foreground mb-4">Get in Touch</h2>
          <div className="space-y-6 text-muted-foreground">
            <div className="flex items-start">
              <MapPin className="h-6 w-6 text-primary mr-4 flex-shrink-0" />
              <div>
                <p className="font-medium text-foreground">Address</p>
                <p>1040 12 Ave SW, Calgary, AB</p>
                <Link href="https://maps.app.goo.gl/YOUR_MAP_LINK" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline text-sm">
                  Get Directions
                </Link>
              </div>
            </div>
            <div className="flex items-start">
              <Phone className="h-6 w-6 text-primary mr-4 flex-shrink-0" />
              <div>
                <p className="font-medium text-foreground">Phone</p>
                <p>+1-403-452-4590</p>
                <Link href="tel:+1-403-452-4590" className="text-primary hover:underline text-sm">
                  Call Us
                </Link>
              </div>
            </div>
            <div className="flex items-start">
              <Mail className="h-6 w-6 text-primary mr-4 flex-shrink-0" />
              <div>
                <p className="font-medium text-foreground">Email</p>
                <p>info@kithandkin.com</p>
                <Link href="mailto:info@kithandkin.com" className="text-primary hover:underline text-sm">
                  Send an Email
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-card rounded-2xl p-8 shadow-ultra-soft">
          <h2 className="text-3xl font-display font-semibold text-foreground mb-4">Hours & Information</h2>
          <div className="space-y-6 text-muted-foreground">
            <div className="flex items-start">
              <Clock className="h-6 w-6 text-primary mr-4 flex-shrink-0" />
              <div>
                <p className="font-medium text-foreground">Opening Hours</p>
                <ul className="list-disc list-inside ml-4">
                  <li>Tuesday - Friday: 10 AM - 8 PM</li>
                  <li>Monday & Saturday: 10 AM - 6 PM</li>
                  <li>Sunday: Closed</li>
                </ul>
              </div>
            </div>
            <div>
              <p className="font-medium text-foreground">Parking</p>
              <p>Street parking available directly in front of our shop. Please do not park in the private lot behind our building.</p>
            </div>
            <div>
              <p className="font-medium text-foreground">Accessibility</p>
              <p>Our barbershop is wheelchair accessible. Please contact us if you have specific accessibility needs.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Interior Shop Photo */}
      <section className="mt-8 bg-card rounded-2xl p-4 shadow-ultra-soft">
        <h2 className="text-3xl font-display font-semibold text-foreground mb-4">Our Space</h2>
        <div className="relative w-full h-96 rounded-xl overflow-hidden border border-muted-foreground/30">
          <Image
            src="/images/kith-kin-interior.jpg"
            alt="Interior of Kith & Kin Barbershop with barber chairs and green wall"
            fill
            style={{ objectFit: "cover" }}
            sizes="100vw"
            className="transition-transform duration-300 ease-in-out hover:scale-105"
          />
        </div>
      </section>

      <section className="mt-8 bg-card rounded-2xl p-4 shadow-ultra-soft">
        <h2 className="sr-only">Location Map</h2>
        {/* Placeholder for a dark-style map embed */}
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2508.4600000000005!2d-114.08000000000001!3d51.040000000000006!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTA0MCAxMiBBdmUgU1csIENhbGdhcnksIEFC!5e0!3m2!1sen!2sca!4v1678901234567!5m2!1sen!2sca" // Updated map title and address in src (if possible, otherwise just title)
          width="100%"
          height="450"
          style={{ border: 0 }}
          allowFullScreen={false}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Kith & Kin Barbershop Location: 1040 12 Ave SW, Calgary, AB"
          className="rounded-xl"
        ></iframe>
      </section>
    </main>
  );
}