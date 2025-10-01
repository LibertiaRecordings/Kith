import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Book an Appointment | Kith & Kin Barbershop",
  description: "Precision cuts, exact times. Reserve your next barbershop appointment in seconds with Square Appointments.",
};

export default function BookPage() {
  return (
    <main id="main" className="container mx-auto px-6 py-10 min-h-screen bg-ink text-paper">
      <h1 className="text-4xl md:text-5xl font-display font-semibold tracking-tight text-paper">Book an Appointment</h1>
      <p className="mt-3 text-chrome font-mono">Precision cuts, exact times. Reserve in seconds.</p>
      <section className="mt-8 rounded-2xl bg-graphite p-4 shadow-ultra-soft">
        {/* Updated Square Appointments embed script or iframe */}
        <iframe
          src="https://kithkinco.square.site/s/appointments"
          className="w-full h-[1400px] rounded-xl border border-graphite"
          loading="lazy"
          title="Square Appointments Booking Widget"
        />
      </section>
    </main>
  );
}