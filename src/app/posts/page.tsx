import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Posts | Kith & Kin Barbershop",
  description: "Stay updated with Kith & Kin's posts. Discover grooming tips, culture insights, product features, and community stories.",
};

export default function PostsPage() {
  // Placeholder data for journal posts
  const posts = [
    {
      slug: "the-art-of-the-fade",
      title: "The Art of the Perfect Fade",
      excerpt: "Mastering the fade requires precision, patience, and the right tools. Learn our secrets to a seamless blend.",
      imageUrl: "https://via.placeholder.com/400x250/305%2530/FFFCF7?text=Fade+Art", // Updated placeholder color
      publishedAt: "2023-10-26",
    },
    {
      slug: "winter-beard-care",
      title: "Winter Beard Care Essentials",
      excerpt: "Keep your beard healthy and hydrated through the colder months with these essential tips and products.",
      imageUrl: "https://via.placeholder.com/400x250/305%2530/FFFCF7?text=Beard+Care", // Updated placeholder color
      publishedAt: "2023-11-15",
    },
    {
      slug: "behind-the-chair",
      title: "Behind the Chair: A Day with Our Barbers",
      excerpt: "Get a glimpse into the daily life and philosophy of Kith & Kin's dedicated team of barbers.",
      imageUrl: "https://via.placeholder.com/400x250/305%2530/FFFCF7?text=Barber+Life", // Updated placeholder color
      publishedAt: "2023-12-01",
    },
  ];

  return (
    <main id="main" className="container mx-auto px-6 py-16 min-h-screen bg-background text-foreground">
      <h1 className="text-4xl md:text-5xl tracking-tight text-foreground">Posts</h1>
      <p className="mt-3 text-muted-foreground font-body text-lg">Culture, tips, and community stories.</p>

      <section className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map((post) => (
          <Link href={`/posts/${post.slug}`} key={post.slug} className="block">
            <div className="bg-card rounded-2xl p-6 shadow-ultra-soft can-animate group">
              <img src={post.imageUrl} alt={post.title} className="w-full h-48 object-cover rounded-lg mb-4 border border-muted-foreground/30 group-hover:border-primary transition-colors" />
              <h2 className="text-2xl font-hero text-foreground group-hover:text-primary transition-colors">{post.title}</h2>
              <p className="text-muted-foreground mt-2 leading-relaxed text-base font-body">{post.excerpt}</p>
              <p className="text-muted-foreground/70 font-body text-sm mt-4">{new Date(post.publishedAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
            </div>
          </Link>
        ))}
      </section>
    </main>
  );
}