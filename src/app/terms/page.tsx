import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms & Conditions | Kith & Kin Barbershop",
  description: "Read the terms and conditions for using Kith & Kin Barbershop's website and services.",
};

export default function TermsAndConditionsPage() {
  return (
    <main id="main" className="container mx-auto px-6 py-10 min-h-screen bg-ink text-paper">
      <h1 className="text-4xl md:text-5xl font-display font-semibold tracking-tight text-paper">Terms & Conditions</h1>
      <p className="mt-3 text-chrome font-mono">Please read these terms carefully.</p>

      <section className="mt-8 bg-graphite rounded-2xl p-8 shadow-ultra-soft prose prose-invert max-w-none text-chrome leading-relaxed text-lg">
        <p>
          Welcome to Kith & Kin Barbershop. These Terms and Conditions ("Terms") govern your use of our website and services. By accessing or using our website and services, you agree to be bound by these Terms.
        </p>

        <h2 className="text-3xl font-display font-semibold text-paper mt-8 mb-4">Appointments & Cancellations</h2>
        <p>
          All appointments must be booked through our Square Appointments system. We require at least 24 hours' notice for cancellations or rescheduling. Appointments canceled or rescheduled with less than 24 hours' notice may incur a cancellation fee.
        </p>

        <h2 className="text-3xl font-display font-semibold text-paper mt-8 mb-4">Pricing & Payments</h2>
        <p>
          All prices for services and products are listed on our website and are subject to change without prior notice. Payments are processed securely through Square. We accept major credit cards and other payment methods as indicated.
        </p>

        <h2 className="text-3xl font-display font-semibold text-paper mt-8 mb-4">Gift Cards</h2>
        <p>
          Kith & Kin gift cards are non-refundable and cannot be exchanged for cash. They are valid for services and products at our barbershop. Lost or stolen gift cards will not be replaced.
        </p>

        <h2 className="text-3xl font-display font-semibold text-paper mt-8 mb-4">Loyalty Program</h2>
        <p>
          Participation in our loyalty program is subject to its specific terms and conditions, which may be updated from time to time. Points have no cash value and are non-transferable.
        </p>

        <h2 className="text-3xl font-display font-semibold text-paper mt-8 mb-4">Website Use</h2>
        <p>
          You agree to use our website only for lawful purposes and in a way that does not infringe the rights of, restrict, or inhibit anyone else's use and enjoyment of the website.
        </p>

        <h2 className="text-3xl font-display font-semibold text-paper mt-8 mb-4">Intellectual Property</h2>
        <p>
          All content on this website, including text, graphics, logos, images, and software, is the property of Kith & Kin Barbershop or its content suppliers and is protected by intellectual property laws.
        </p>

        <h2 className="text-3xl font-display font-semibold text-paper mt-8 mb-4">Limitation of Liability</h2>
        <p>
          Kith & Kin Barbershop will not be liable for any damages arising out of or in connection with the use of this website or our services.
        </p>

        <h2 className="text-3xl font-display font-semibold text-paper mt-8 mb-4">Governing Law</h2>
        <p>
          These Terms are governed by and construed in accordance with the laws of Alberta, Canada.
        </p>

        <h2 className="text-3xl font-display font-semibold text-paper mt-8 mb-4">Changes to Terms</h2>
        <p>
          We reserve the right to modify these Terms at any time. Your continued use of the website and services after any such changes constitutes your acceptance of the new Terms.
        </p>

        <h2 className="text-3xl font-display font-semibold text-paper mt-8 mb-4">Contact Us</h2>
        <p>
          If you have any questions about these Terms, please contact us at info@kithandkin.com.
        </p>
      </section>
    </main>
  );
}