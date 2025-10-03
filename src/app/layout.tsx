import type { Metadata } from "next";
import { Inter, IBM_Plex_Mono, Montserrat, Archivo_Black } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { SessionContextProvider } from "@/components/SessionContextProvider";
import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import FloatingBookButton from "@/components/FloatingBookButton";
import { RadioPlayerProvider } from "@/components/radio/RadioPlayerProvider";
import RadioStationSheet from "@/components/radio/RadioStationSheet";
import GoogleTagManager from "@/components/GoogleTagManager";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'; // Import QueryClient and QueryClientProvider

const inter = Inter({
  variable: "--font-body",
  subsets: ["latin"],
});

const montserrat = Montserrat({
  variable: "--font-display",
  subsets: ["latin"],
  display: "swap",
});

const archivoBlack = Archivo_Black({
  variable: "--font-hero",
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
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
    "postalCode": "T2R 0H4",
    "addressCountry": "CA"
  },
  "sameAs": [
    "https://www.instagram.com/kithkinbarberco/",
    "http://facebook.com/kithkinbarberco",
  ]
};

const organizationSchemaString = JSON.stringify(organizationSchema);

// Create a client for TanStack Query
const queryClient = new QueryClient();

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const gtmId = process.env.NEXT_PUBLIC_GTM_ID || 'GTM-XXXXXXX';

  return (
    <html lang="en">
      <head>
        <script
          id="json-ld-organization"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: organizationSchemaString }}
        />
      </head>
      <body
        className={`${montserrat.variable} ${inter.variable} ${ibmPlexMono.variable} ${archivoBlack.variable} antialiased font-body bg-background text-foreground`}
      >
        <noscript>
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=${gtmId}`}
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          ></iframe>
        </noscript>
        <GoogleTagManager gtmId={gtmId} />
        <QueryClientProvider client={queryClient}> {/* Wrap with QueryClientProvider */}
          <SessionContextProvider>
            <RadioPlayerProvider>
              <Navbar />
              {children}
              <Footer />
              <FloatingBookButton />
              <RadioStationSheet />
            </RadioPlayerProvider>
          </SessionContextProvider>
        </QueryClientProvider>
      </body>
    </html>
  );
}