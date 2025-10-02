import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Book an Appointment | Kith & Kin Barbershop",
  description: "Precision cuts, exact times. Reserve your next barbershop appointment in seconds with Square Appointments.",
};

export default function BookPage() {
  return (
    <main id="main" className="container mx-auto px-6 py-16 min-h-screen bg-background text-foreground">
      <h1 className="text-4xl md:text-5xl font-display font-semibold tracking-tight text-foreground">Book an Appointment</h1>
      <p className="mt-3 text-muted-foreground font-mono">Precision cuts, exact times. Reserve in seconds.</p>
      <section className="mt-8 rounded-2xl bg-card p-4 shadow-ultra-soft">
        {/* Updated Square Appointments embed script or iframe */}
        <iframe
          src="https://kithkinco.square.site/s/appointments"
          className="w-full h-[1400px] rounded-xl border border-muted-foreground/30"
          loading="lazy"
          title="Square Appointments Booking Widget"
        />
      </section>
    </main>
  );
}