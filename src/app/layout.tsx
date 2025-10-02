import type { Metadata } from "next";
import { Inter, IBM_Plex_Mono } from "next/font/google";
import Script from "next/script"; // Ensure Script is imported
import "./globals.css";
import { SessionContextProvider } from "@/components/SessionContextProvider";
import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";

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
  description: "Where precision meets kinship. Calgary's premium barbershop experience.",
};

// Define the organization schema directly in the layout file
const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Barbershop",
  "name": "Kith & Kin Barbershop",
  "image": "https://kithkin.family/assets/images/share.jpg",
  "url": "https://kithkin.family",
  "telephone": "+1-403-452-4590",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "1040 12 Ave SW",
    "addressLocality": "Calgary",
    "addressRegion": "AB",
    "postalCode": "",
    "addressCountry": "CA"
  },
  "sameAs": [
    "https://www.instagram.com/kithkinbarberco/",
    "http://facebook.com/kithkinbarberco",
  ]
};

const organizationSchemaString = JSON.stringify(organizationSchema);

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* Organization JSON-LD Schema using next/script */}
        <Script
          id="json-ld-organization"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: organizationSchemaString }}
          strategy="beforeInteractive" // Ensures it's placed in the <head> before hydration
        />
      </head>
      <body
        className={`${inter.variable} ${ibmPlexMono.variable} antialiased font-display bg-background text-foreground`}
      >
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-YOUR_ID" // TODO: Replace GTM-YOUR_ID with your actual GTM ID
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          ></iframe>
        </noscript>
        {/* Google Tag Manager */}
        <Script
          id="google-tag-manager-body"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','GTM-YOUR_ID'); // TODO: Replace GTM-YOUR_ID with your actual GTM ID
            `,
          }}
        />
        <SessionContextProvider>
          <Navbar />
          {children}
          <Footer />
        </SessionContextProvider>
      </body>
    </html>
  );
}