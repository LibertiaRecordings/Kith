export interface Artist {
  _id: string;
  name: string;
  role: string;
  bio: string;
  specialties: string[];
  staffId: string; // Square Staff ID
  socials: {
    instagram?: string;
    tiktok?: string;
    // Add other socials as needed
  };
  gallery: {
    _key: string;
    url: string;
    alt: string;
  }[];
  rating?: number; // Optional, e.g., average rating
  availabilityNote?: string;
  slug: string;
}

export interface Service {
  _id: string;
  name: string;
  slug: string;
  category: string;
  price: number;
  displayPrice?: string; // Added for display purposes
  duration: number; // in minutes
  displayDuration?: string; // Added for display purposes
  description: string;
  finishLookExamples: {
    _key: string;
    url: string;
    alt: string;
  }[];
  addOns: {
    _key: string;
    name: string;
    price: number;
    duration: number; // in minutes
  }[];
  ctaLink: string; // Added for direct booking links
}

export interface JournalPost {
  _id: string;
  title: string;
  slug: string;
  heroImage: {
    url: string;
    alt: string;
  };
  excerpt: string;
  body: any; // Portable Text or rich text content
  tags: string[];
  seo: {
    title: string;
    description: string;
  };
  publishedAt: string;
}

export interface SpecialOffer {
  _id: string;
  title: string;
  slug: string;
  startDate: string;
  endDate: string;
  terms: string;
  ctaLink: string;
  creativeAssets: {
    _key: string;
    url: string;
    alt: string;
  }[];
  active: boolean;
}