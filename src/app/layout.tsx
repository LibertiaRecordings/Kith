import type { Metadata } from "next";
import { Inter, IBM_Plex_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { SessionContextProvider } from "@/components/SessionContextProvider";
import { Footer } from "@/components/Footer"; // Import the new Footer

const inter = Inter({
  variable: "--font-display",
  subsets: ["latin"],
});

const ibmPlexMono = IBM_Plex_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  title: "Kith & Kin Barbershop",
  description: "Precision cuts, exact times. Reserve in seconds.",
};

// Define organizationSchema outside the component to ensure it's a static constant
const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Barbershop",
  "name": "Kith & Kin Barbershop",
  "image": "https://kithkin.family/assets/images/share.jpg", // Updated OG image URL
  "url": "https://kithkin.family", // Updated with actual site URL
  "telephone": "+1-403-452-4590", // Updated with actual phone number
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "1040 12 Ave SW",
    "addressLocality": "Calgary",
    "addressRegion": "AB",
    "postalCode": "", // Removed as it was not explicitly provided and was a TODO
    "addressCountry": "CA"
  },
  "sameAs": [
    "https://www.instagram.com/kithkinbarberco/", // Updated with actual Instagram URL
    "http://facebook.com/kithkinbarberco", // Updated with actual Facebook URL
    // "https://www.tiktok.com/@..." // Keeping placeholder for TikTok if it exists
  ]
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* Organization JSON-LD Schema */}
        <Script
          id="json-ld-organization" // Unique ID for the script
          type="application/ld+json"
          strategy="beforeInteractive" // Ensures it's part of the initial HTML
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
      </head>
      <body
        className={`${inter.variable} ${ibmPlexMono.variable} antialiased font-display bg-ink text-paper`}
      >
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-XXXXXXX" // TODO: Replace GTM-XXXXXXX with your actual GTM ID
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          ></iframe>
        </noscript>
        {/* Google Tag Manager */}
        <Script
          id="google-tag-manager-body" // Changed ID to reflect new placement
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','GTM-XXXXXXX'); // TODO: Replace GTM-XXXXXXX with your actual GTM ID
            `,
          }}
        />
        <SessionContextProvider>
          {children}
          <Footer /> {/* Render the Footer component */}
        </SessionContextProvider>
      </body>
    </html>
  );
}