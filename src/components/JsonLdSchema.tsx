// src/components/JsonLdSchema.tsx
// This is a Server Component

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

export function JsonLdSchema() {
  return (
    <script
      id="json-ld-organization"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: organizationSchemaString }}
    />
  );
}