import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | Kith & Kin Barbershop",
  description: "Read the privacy policy for Kith & Kin Barbershop regarding data collection, usage, and protection.",
};

export default function PrivacyPolicyPage() {
  return (
    <main id="main" className="container mx-auto px-6 py-16 min-h-screen bg-background text-foreground">
      <h1 className="text-4xl md:text-5xl font-display font-semibold tracking-tight text-foreground">Privacy Policy</h1>
      <p className="mt-3 text-muted-foreground font-display text-base">Your privacy is important to us.</p>

      <section className="mt-8 bg-card rounded-2xl p-8 shadow-ultra-soft prose prose-invert max-w-none text-muted-foreground leading-relaxed text-base">
        <p>
          This Privacy Policy describes how Kith & Kin Barbershop ("we," "us," or "our") collects, uses, and discloses your personal information when you visit our website and use our services.
        </p>

        <h2 className="text-3xl font-display font-semibold text-foreground mt-8 mb-4">Information We Collect</h2>
        <p>
          We collect information you provide directly to us, such as when you book an appointment, purchase a gift card, sign up for our loyalty program, or contact us. This may include your name, email address, phone number, and payment information.
        </p>
        <p>
          We also automatically collect certain information when you visit our website, including your IP address, browser type, operating system, referring URLs, and information about your interactions with our site (e.g., pages viewed, time spent). This is done through cookies and similar tracking technologies.
        </p>

        <h2 className="text-3xl font-display font-semibold text-foreground mt-8 mb-4">How We Use Your Information</h2>
        <p>We use the information we collect for various purposes, including to:</p>
        <ul>
          <li>Provide, maintain, and improve our services.</li>
          <li>Process your bookings, payments, and gift card purchases.</li>
          <li>Communicate with you about your appointments, services, and promotions.</li>
          <li>Manage our loyalty program.</li>
          <li>Analyze and understand how you use our website to enhance user experience and optimize our marketing efforts.</li>
          <li>Comply with legal obligations.</li>
        </ul>

        <h2 className="text-3xl font-display font-semibold text-foreground mt-8 mb-4">Sharing Your Information</h2>
        <p>
          We may share your information with third-party service providers who perform services on our behalf, such as Square for bookings and payments, and analytics providers (e.g., Google Analytics, Meta Pixel, TikTok Pixel) for website usage analysis and advertising attribution. We ensure these third parties are committed to protecting your privacy.
        </p>
        <p>
          We may also disclose your information if required by law or in response to valid requests by public authorities.
        </p>

        <h2 className="text-3xl font-display font-semibold text-foreground mt-8 mb-4">Your Choices</h2>
        <p>
          You can typically set your browser to remove or reject browser cookies. Please note that if you choose to remove or reject cookies, this could affect the availability and functionality of our website.
        </p>
        <p>
          You may opt out of receiving promotional communications from us by following the instructions in those communications.
        </p>

        <h2 className="text-3xl font-display font-semibold text-foreground mt-8 mb-4">Data Security</h2>
        <p>
          We implement reasonable security measures to protect your personal information from unauthorized access, use, or disclosure. However, no method of transmission over the internet or electronic storage is 100% secure.
        </p>

        <h2 className="text-3xl font-display font-semibold text-foreground mt-8 mb-4">Changes to This Policy</h2>
        <p>
          We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page.
        </p>

        <h2 className="text-3xl font-display font-semibold text-foreground mt-8 mb-4">Contact Us</h2>
        <p>
          If you have any questions about this Privacy Policy, please contact us at info@kithandkin.com.
        </p>
      </section>
    </main>
  );
}