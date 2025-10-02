import { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import Image from "next/image"; // Import Image component

interface JournalPostDetailPageProps {
  params: { slug: string };
}

// Placeholder function to fetch journal post data
async function getJournalPostBySlug(slug: string) {
  const posts = [
    {
      slug: "the-art-of-the-fade",
      title: "The Art of the Perfect Fade",
      heroImage: { url: "/images/barber-trimming-beard-calgary.jpg", alt: "Skilled barber performing a precise fade haircut and beard trim at Kith & Kin Barbershop in Calgary" },
      excerpt: "Mastering the fade requires precision, patience, and the right tools. Learn our secrets to a seamless blend.",
      body: `
        <p>The fade haircut is a timeless classic, a symbol of precision and style. At Kith & Kin, we believe a perfect fade is more than just a haircut; it's an art form, especially for our discerning clients in Calgary.</p>
        <h2 class="text-2xl font-display font-semibold text-foreground mt-8 mb-4">Understanding the Fade</h2>
        <p class="text-base">A fade is characterized by its gradual transition from short hair on the sides and back to longer hair on top. The key is a seamless blend, with no harsh lines or visible steps. This requires a steady hand, keen eye, and a deep understanding of hair texture and growth patterns, a hallmark of our Calgary barbers.</p>
        <h3 class="text-xl font-display font-semibold text-foreground mt-6 mb-3">Our Approach to Precision</h3>
        <p class="text-base">Our barbers are trained in the most advanced fading techniques, using a combination of clippers, trimmers, and shears to achieve a flawless finish. We consult with each client to determine the ideal fade height and style, ensuring it complements their head shape and personal aesthetic. We cater to diverse styles and preferences, making us a versatile barbershop in Calgary.</p>
        <p class="text-base">From skin fades to low, mid, and high fades, we execute each with surgical precision, leaving you with a sharp, clean, and confident look, perfect for any occasion in Calgary.</p>
      `,
      tags: ["Haircut", "Fade", "Grooming Tips", "Calgary Barbershop"],
      seo: {
        title: "The Art of the Perfect Fade | Kith & Kin Barbershop Calgary",
        description: "Learn the secrets behind mastering the perfect fade haircut from the expert barbers at Kith & Kin, Calgary's premier grooming destination.",
      },
      publishedAt: "2023-10-26",
    },
    {
      slug: "winter-beard-care",
      title: "Winter Beard Care Essentials",
      heroImage: { url: "/images/layrite-cement-clay-product.jpg", alt: "Layrite Cement Clay product, essential for winter beard care and styling, available at Kith & Kin Barbershop Calgary" },
      excerpt: "Keep your beard healthy and hydrated through the colder months with these essential tips and products.",
      body: `
        <p>Winter can be harsh on your beard, leading to dryness, itchiness, and breakage. But with the right care routine and products from our Calgary barbershop, your beard can thrive even in the coldest months.</p>
        <h2 class="text-2xl font-display font-semibold text-foreground mt-8 mb-4">Hydration is Key</h2>
        <p class="text-base">The cold, dry air strips moisture from your beard and skin. Combat this by using a high-quality beard oil daily. Apply it after showering when your pores are open, ensuring it reaches the skin beneath your beard. We recommend products available at Kith & Kin, your trusted Calgary barbers.</p>
        <h3 class="text-xl font-display font-semibold text-foreground mt-6 mb-3">Washing and Conditioning</h3>
        <p class="text-base">Don't over-wash your beard, as this can strip natural oils. Aim for 2-3 times a week with a dedicated beard shampoo and conditioner. Follow up with a beard balm to lock in moisture and provide light styling. Our Calgary barbers can recommend the best products for your beard type.</p>
        <p class="text-base">Remember, a healthy beard starts with healthy skin. Keep both nourished, and your winter beard will thank you. Visit Kith & Kin Barbershop in Calgary for expert advice and premium products.</p>
      `,
      tags: ["Beard", "Winter", "Grooming Tips", "Products", "Calgary Barbershop"],
      seo: {
        title: "Winter Beard Care Essentials | Kith & Kin Barbershop Calgary",
        description: "Discover essential tips and products to keep your beard healthy and hydrated during the winter months, from Kith & Kin Barbershop in Calgary.",
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
      title: "Post Not Found | Kith & Kin Barbershop Calgary",
      description: "The post you are looking for could not be found at Kith & Kin Barbershop in Calgary.",
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
      <main id="main" className="container mx-auto px-6 py-16 min-h-screen bg-background text-foreground">
        <h1 className="text-4xl md:text-5xl font-display font-semibold tracking-tight text-foreground">Post Not Found</h1>
        <p className="mt-3 text-muted-foreground font-display text-base">The post you are looking for does not exist at Kith & Kin Barbershop Calgary.</p>
        <Link href="/posts" className="mt-8 inline-flex items-center text-primary hover:underline">
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Posts
        </Link>
      </main>
    );
  }

  return (
    <main id="main" className="container mx-auto px-6 py-16 min-h-screen bg-background text-foreground">
      <Link href="/posts" className="inline-flex items-center text-primary hover:underline mb-8">
        <ArrowLeft className="mr-2 h-4 w-4" /> Back to Posts
      </Link>

      <article className="bg-card rounded-2xl p-8 shadow-ultra-soft">
        <div className="relative w-full h-64 md:h-96 rounded-lg overflow-hidden object-cover mb-8 border border-muted-foreground/30 aspect-video">
          <Image src={post.heroImage.url} alt={post.heroImage.alt} fill style={{ objectFit: "cover" }} sizes="100vw" className="transition-transform duration-300 ease-in-out hover:scale-105" />
        </div>
        <h1 className="text-4xl md:text-5xl font-display font-semibold tracking-tight text-foreground mb-4">{post.title}</h1>
        <p className="text-muted-foreground/70 font-display text-sm mb-6">Published on {new Date(post.publishedAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>

        <div
          className="prose prose-invert max-w-none text-muted-foreground leading-relaxed text-base"
          dangerouslySetInnerHTML={{ __html: post.body }}
        />

        {post.tags.length > 0 && (
          <div className="mt-8 pt-6 border-t border-muted-foreground/20">
            <h3 className="text-xl font-display font-semibold text-foreground mb-3">Tags:</h3>
            <ul className="flex flex-wrap gap-3">
              {post.tags.map((tag, index) => (
                <li key={index} className="bg-background text-primary text-sm px-4 py-2 rounded-full border border-primary">
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