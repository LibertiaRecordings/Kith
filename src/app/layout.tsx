import type { Metadata } from "next";
import { Inter, IBM_Plex_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { SessionContextProvider } from "@/components/SessionContextProvider"; // Import the new context provider

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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Barbershop",
    "name": "Kith & Kin Barbershop",
    "image": "https://kithandkin.com/og.jpg", // TODO: Replace with actual OG image URL
    "url": "https://kithandkin.com", // TODO: Replace with actual site URL
    "telephone": "+1-XXX-XXX-XXXX", // TODO: Replace with actual phone number
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "1118 12 Ave SW",
      "addressLocality": "Calgary",
      "addressRegion": "AB",
      "postalCode": "T2R ...", // TODO: Replace with actual postal code
      "addressCountry": "CA"
    },
    "sameAs": [
      "https://www.instagram.com/...", // TODO: Replace with actual Instagram URL
      "https://www.tiktok.com/@..." // TODO: Replace with actual TikTok URL
    ]
  };

  return (
    <html lang="en">
      <head>
        {/* Google Tag Manager */}
        <Script id="google-tag-manager" strategy="afterInteractive">
          {`
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-XXXXXXX'); // TODO: Replace GTM-XXXXXXX with your actual GTM ID
          `}
        </Script>
        {/* Organization JSON-LD Schema */}
        <script
          type="application/ld+json"
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
        <SessionContextProvider>
          {children}
        </SessionContextProvider>
      </body>
    </html>
  );
}