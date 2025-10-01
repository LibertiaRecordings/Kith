import { Metadata } from "next";
import Link from "next/link";
import { MapPin, Phone, Mail, Clock } from "lucide-react";

export const metadata: Metadata = {
  title: "Contact & Visit | Kith & Kin Barbershop",
  description: "Get in touch with Kith & Kin Barbershop. Find our location, hours, parking information, and accessibility details.",
};

export default function ContactPage() {
  return (
    <main id="main" className="container mx-auto px-6 py-10 min-h-screen bg-ink text-paper">
      <h1 className="text-4xl md:text-5xl font-display font-semibold tracking-tight text-paper">Contact & Visit</h1>
      <p className="mt-3 text-chrome font-mono">We're here to help you look your best.</p>

      <section className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-graphite rounded-2xl p-8 shadow-ultra-soft">
          <h2 className="text-3xl font-display font-semibold text-paper mb-4">Get in Touch</h2>
          <div className="space-y-6 text-chrome">
            <div className="flex items-start">
              <MapPin className="h-6 w-6 text-neon mr-4 flex-shrink-0" />
              <div>
                <p className="font-medium text-paper">Address</p>
                <p>1118 12 Ave SW, Calgary, AB T2R ...</p> {/* TODO: Update postal code */}
                <Link href="https://maps.app.goo.gl/YOUR_MAP_LINK" target="_blank" rel="noopener noreferrer" className="text-neon hover:underline text-sm">
                  Get Directions
                </Link>
              </div>
            </div>
            <div className="flex items-start">
              <Phone className="h-6 w-6 text-neon mr-4 flex-shrink-0" />
              <div>
                <p className="font-medium text-paper">Phone</p>
                <p>+1-XXX-XXX-XXXX</p> {/* TODO: Update phone number */}
                <Link href="tel:+1-XXX-XXX-XXXX" className="text-neon hover:underline text-sm">
                  Call Us
                </Link>
              </div>
            </div>
            <div className="flex items-start">
              <Mail className="h-6 w-6 text-neon mr-4 flex-shrink-0" />
              <div>
                <p className="font-medium text-paper">Email</p>
                <p>info@kithandkin.com</p> {/* TODO: Update email address */}
                <Link href="mailto:info@kithandkin.com" className="text-neon hover:underline text-sm">
                  Send an Email
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-graphite rounded-2xl p-8 shadow-ultra-soft">
          <h2 className="text-3xl font-display font-semibold text-paper mb-4">Hours & Information</h2>
          <div className="space-y-6 text-chrome">
            <div className="flex items-start">
              <Clock className="h-6 w-6 text-neon mr-4 flex-shrink-0" />
              <div>
                <p className="font-medium text-paper">Opening Hours</p>
                <ul className="list-disc list-inside ml-4">
                  <li>Tuesday - Friday: 10 AM - 7 PM</li>
                  <li>Saturday: 9 AM - 5 PM</li>
                  <li>Sunday - Monday: Closed</li>
                </ul>
              </div>
            </div>
            <div>
              <p className="font-medium text-paper">Parking</p>
              <p>Street parking available on 12 Ave SW and surrounding blocks. Paid parking lots nearby.</p>
            </div>
            <div>
              <p className="font-medium text-paper">Accessibility</p>
              <p>Our barbershop is wheelchair accessible. Please contact us if you have specific accessibility needs.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="mt-8 bg-graphite rounded-2xl p-4 shadow-ultra-soft">
        <h2 className="sr-only">Location Map</h2>
        {/* Placeholder for a dark-style map embed */}
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2508.4600000000005!2d-114.08000000000001!3d51.040000000000006!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTHDkDE4IDEyIEF2ZSBTdywgQ2FsZ2FyeSwgQUIgVjJSMi4uLiwgQ0E!5e0!3m2!1sen!2sca!4v1678901234567!5m2!1sen!2sca" // TODO: Replace with actual map embed URL for Kith & Kin
          width="100%"
          height="450"
          style={{ border: 0 }}
          allowFullScreen={false}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Kith & Kin Barbershop Location"
          className="rounded-xl"
        ></iframe>
      </section>
    </main>
  );
}