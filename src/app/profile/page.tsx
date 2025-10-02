import { Metadata } from "next";
import { redirect } from 'next/navigation';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import ProfileForm from '@/components/ProfileForm';
import { getProfile } from '@/app/actions/profiles';

export const metadata: Metadata = {
  title: "My Profile | Kith & Kin Barbershop",
  description: "Manage your Kith & Kin Barbershop profile details.",
};

export default async function ProfilePage() {
  const supabase = createServerComponentClient({ cookies });
  const { data: { session } } = await supabase.auth.getSession();

  if (!session) {
    redirect('/login'); // Redirect unauthenticated users to login
  }

  const { data: profileData, error } = await getProfile(session.user.id);

  if (error || !profileData) {
    console.error('Failed to load profile data:', error);
    // Handle error, maybe show a message or redirect
    return (
      <main id="main" className="container mx-auto px-6 py-16 min-h-screen bg-background text-foreground text-center">
        <h1 className="text-4xl md:text-5xl font-display font-normal tracking-tight text-foreground">Profile</h1>
        <p className="mt-3 text-muted-foreground font-body text-lg">Could not load profile data. Please try again later.</p>
      </main>
    );
  }

  return (
    <main id="main" className="container mx-auto px-6 py-16 min-h-screen bg-background text-foreground">
      <h1 className="text-4xl md:text-5xl font-display font-normal tracking-tight text-foreground text-center">My Profile</h1>
      <p className="mt-3 text-muted-foreground font-body text-lg text-center max-w-2xl mx-auto">Update your personal information.</p>

      <section className="mt-12 max-w-md mx-auto bg-card rounded-2xl p-8 shadow-ultra-soft">
        <ProfileForm initialData={profileData} />
      </section>
    </main>
  );
}