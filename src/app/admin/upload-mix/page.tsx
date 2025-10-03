import { Metadata } from "next";
import { redirect } from 'next/navigation';
import { createSupabaseServerClient } from '@/integrations/supabase/server';
import AdminUploadMixForm from '@/components/AdminUploadMixForm';
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export const metadata: Metadata = {
  title: "Upload Radio Mix | Kith & Kin Admin",
  description: "Admin panel for uploading new music tracks and DJ mixes to the Kith & Kin radio station.",
};

export default async function UploadMixPage() {
  const supabase = createSupabaseServerClient();
  const { data: { session } } = await supabase.auth.getSession();

  if (!session) {
    redirect('/login'); // Redirect unauthenticated users to login
  }

  // Fetch user profile to check role
  const { data: profile, error: profileError } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', session.user.id)
    .single();

  if (profileError || profile?.role !== 'admin') {
    console.error('Unauthorized access attempt to /admin/upload-mix:', profileError);
    // Redirect to home or show an unauthorized message
    return (
      <main id="main" className="container mx-auto px-6 py-16 min-h-screen bg-background text-foreground text-center">
        <h1 className="text-4xl md:text-5xl tracking-tight text-foreground">Access Denied</h1>
        <p className="mt-3 text-muted-foreground font-body text-lg">You do not have permission to access this page.</p>
        <Link href="/" className="mt-8 inline-flex items-center text-primary hover:underline">
          <ArrowLeft className="mr-2 h-4 w-4" /> Go to Homepage
        </Link>
      </main>
    );
  }

  return (
    <main id="main" className="container mx-auto px-6 py-16 min-h-screen bg-background text-foreground">
      <h1 className="text-4xl md:text-5xl tracking-tight text-foreground text-center">Upload New Radio Track</h1>
      <p className="mt-3 text-muted-foreground font-body text-lg text-center max-w-2xl mx-auto">
        Add new music or DJ mixes to the Kith & Kin radio station.
      </p>

      <section className="mt-12 max-w-lg mx-auto bg-card rounded-2xl p-8 shadow-ultra-soft border border-muted-foreground/20">
        <AdminUploadMixForm />
      </section>
    </main>
  );
}