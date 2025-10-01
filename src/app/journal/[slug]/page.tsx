import { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

interface JournalPostDetailPageProps {
  params: { slug: string };
}

// Placeholder function to fetch journal post data
async function getJournalPostBySlug(slug: string) {
  const posts = [
    {
      slug: "the-art-of-the-fade",
      title: "The Art of the Perfect Fade",
      heroImage: { url: "https://via.placeholder.com/800x450/1C1C1C/FAFAFA?text=Fade+Art+Hero", alt: "Close-up of a barber performing a fade haircut" },
      excerpt: "Mastering the fade requires precision, patience, and the right tools. Learn our secrets to a seamless blend.",
      body: `
        <p>The fade haircut is a timeless classic, a symbol of precision and style. At Kith & Kin, we believe a perfect fade is more than just a haircut; it's an art form.</p>
        <h2 class="text-3xl font-display font-semibold text-paper mt-8 mb-4">Understanding the Fade</h2>
        <p>A fade is characterized by its gradual transition from short hair on the sides and back to longer hair on top. The key is a seamless blend, with no harsh lines or visible steps. This requires a steady hand, keen eye, and a deep understanding of hair texture and growth patterns.</p>
        <h3 class="text-2xl font-display font-semibold text-paper mt-6 mb-3">Our Approach to Precision</h3>
        <p>Our barbers are trained in the most advanced fading techniques, using a combination of clippers, trimmers, and shears to achieve a flawless finish. We consult with each client to determine the ideal fade height and style, ensuring it complements their head shape and personal aesthetic.</p>
        <p>From skin fades to low, mid, and high fades, we execute each with surgical precision, leaving you with a sharp, clean, and confident look.</p>
      `,
      tags: ["Haircut", "Fade", "Grooming Tips"],
      seo: {
        title: "The Art of the Perfect Fade | Kith & Kin Journal",
        description: "Learn the secrets behind mastering the perfect fade haircut from the expert barbers at Kith & Kin.",
      },
      publishedAt: "2023-10-26",
    },
    {
      slug: "winter-beard-care",
      title: "Winter Beard Care Essentials",
      heroImage: { url: "https://via.placeholder.com/800x450/1C1C1C/FAFAFA?text=Beard+Care+Hero", alt: "Man with a well-groomed beard in winter" },
      excerpt: "Keep your beard healthy and hydrated through the colder months with these essential tips and products.",
      body: `
        <p>Winter can be harsh on your beard, leading to dryness, itchiness, and breakage. But with the right care routine, your beard can thrive even in the coldest months.</p>
        <h2 class="text-3xl font-display font-semibold text-paper mt-8 mb-4">Hydration is Key</h2>
        <p>The cold, dry air strips moisture from your beard and skin. Combat this by using a high-quality beard oil daily. Apply it after showering when your pores are open, ensuring it reaches the skin beneath your beard.</p>
        <h3 class="text-2xl font-display font-semibold text-paper mt-6 mb-3">Washing and Conditioning</h3>
        <p>Don't over-wash your beard, as this can strip natural oils. Aim for 2-3 times a week with a dedicated beard shampoo and conditioner. Follow up with a beard balm to lock in moisture and provide light styling.</p>
        <p>Remember, a healthy beard starts with healthy skin. Keep both nourished, and your winter beard will thank you.</p>
      `,
      tags: ["Beard", "Winter", "Grooming Tips", "Products"],
      seo: {
        title: "Winter Beard Care Essentials | Kith & Kin Journal",
        description: "Discover essential tips and products to keep your beard healthy and hydrated during the winter months.",
      },
      publishedAt: "2023-11-15",
    },
  ];
  return posts.find((post) => post.slug === slug);
}

export async function generateMetadata({ params }: JournalPostDetailPageProps): Promise<Metadata> {
  const post = await getJournalPostBySlug(params.slug);

  if (!post) {
    return {
      title: "Journal Post Not Found | Kith & Kin Barbershop",
      description: "The journal post you are looking for could not be found.",
    };
  }

  return {
    title: post.seo.title,
    description: post.seo.description,
  };
}

export default async function JournalPostDetailPage({ params }: JournalPostDetailPageProps) {
  const post = await getJournalPostBySlug(params.slug);

  if (!post) {
    return (
      <main id="main" className="container mx-auto px-6 py-10 min-h-screen bg-ink text-paper">
        <h1 className="text-4xl md:text-5xl font-display font-semibold tracking-tight text-paper">Post Not Found</h1>
        <p className="mt-3 text-chrome font-mono">The journal post you are looking for does not exist.</p>
        <Link href="/journal" className="mt-8 inline-flex items-center text-neon hover:underline">
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Journal
        </Link>
      </main>
    );
  }

  return (
    <main id="main" className="container mx-auto px-6 py-10 min-h-screen bg-ink text-paper">
      <Link href="/journal" className="inline-flex items-center text-neon hover:underline mb-8">
        <ArrowLeft className="mr-2 h-4 w-4" /> Back to Journal
      </Link>

      <article className="bg-graphite rounded-2xl p-8 shadow-ultra-soft">
        <img src={post.heroImage.url} alt={post.heroImage.alt} className="w-full h-auto rounded-lg object-cover mb-8 border border-chrome" />
        <h1 className="text-4xl md:text-5xl font-display font-semibold tracking-tight text-paper mb-4">{post.title}</h1>
        <p className="text-chrome/70 font-mono text-sm mb-6">Published on {new Date(post.publishedAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>

        <div
          className="prose prose-invert max-w-none text-chrome leading-relaxed text-lg"
          dangerouslySetInnerHTML={{ __html: post.body }}
        />

        {post.tags.length > 0 && (
          <div className="mt-8 pt-6 border-t border-chrome/20">
            <h3 className="text-xl font-display font-semibold text-paper mb-3">Tags:</h3>
            <ul className="flex flex-wrap gap-3">
              {post.tags.map((tag, index) => (
                <li key={index} className="bg-ink text-neon text-sm px-4 py-2 rounded-full border border-neon">
                  {tag}
                </li>
              ))}
            </ul>
          </div>
        )}
      </article>
    </main>
  );
}