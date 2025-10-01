import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Journal | Kith & Kin Barbershop",
  description: "Stay updated with Kith & Kin's journal. Discover grooming tips, culture insights, product features, and community stories.",
};

export default function JournalPage() {
  // Placeholder data for journal posts
  const posts = [
    {
      slug: "the-art-of-the-fade",
      title: "The Art of the Perfect Fade",
      excerpt: "Mastering the fade requires precision, patience, and the right tools. Learn our secrets to a seamless blend.",
      imageUrl: "https://via.placeholder.com/400x250/1C1C1C/FAFAFA?text=Fade+Art",
      publishedAt: "2023-10-26",
    },
    {
      slug: "winter-beard-care",
      title: "Winter Beard Care Essentials",
      excerpt: "Keep your beard healthy and hydrated through the colder months with these essential tips and products.",
      imageUrl: "https://via.placeholder.com/400x250/1C1C1C/FAFAFA?text=Beard+Care",
      publishedAt: "2023-11-15",
    },
    {
      slug: "behind-the-chair",
      title: "Behind the Chair: A Day with Our Barbers",
      excerpt: "Get a glimpse into the daily life and philosophy of Kith & Kin's dedicated team of barbers.",
      imageUrl: "https://via.placeholder.com/400x250/1C1C1C/FAFAFA?text=Barber+Life",
      publishedAt: "2023-12-01",
    },
  ];

  return (
    <main id="main" className="container mx-auto px-6 py-10 min-h-screen bg-ink text-paper">
      <h1 className="text-4xl md:text-5xl font-display font-semibold tracking-tight text-paper">Journal</h1>
      <p className="mt-3 text-chrome font-mono">Culture, tips, and community stories.</p>

      <section className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map((post) => (
          <Link href={`/journal/${post.slug}`} key={post.slug} className="block">
            <div className="bg-graphite rounded-2xl p-6 shadow-ultra-soft can-animate group">
              <img src={post.imageUrl} alt={post.title} className="w-full h-48 object-cover rounded-lg mb-4 border border-chrome group-hover:border-neon transition-colors" />
              <h2 className="text-2xl font-display font-medium text-paper group-hover:text-neon transition-colors">{post.title}</h2>
              <p className="text-chrome mt-2 leading-relaxed text-sm">{post.excerpt}</p>
              <p className="text-chrome/70 font-mono text-xs mt-4">{new Date(post.publishedAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
            </div>
          </Link>
        ))}
      </section>
    </main>
  );
}