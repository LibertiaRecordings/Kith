"use client";

import { ProfileForm } from '@/components/ProfileForm';
import { getProfile } from '@/app/actions/profiles';
import { useEffect, useState } from 'react';
import { useSession } from '@/components/SessionContextProvider';
import { useRouter } from 'next/navigation'; // Import useRouter for client-side navigation

export default function ProfilePage() {
  const { session, isLoading } = useSession();
  const [profileData, setProfileData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter(); // Initialize useRouter

  useEffect(() => {
    if (!isLoading && !session) {
      router.push('/login'); // Use client-side router.push for redirect
      return; // Exit early to prevent further execution if not authenticated
    }

    if (session && !profileData && !error) {
      const fetchProfile = async () => {
        const { data, error: fetchError } = await getProfile(session.user.id);
        if (fetchError) {
          console.error('Failed to load profile data:', fetchError);
          setError('Could not load profile data. Please try again later.');
        } else {
          setProfileData(data);
        }
      };
      fetchProfile();
    }
  }, [session, isLoading, profileData, error, router]); // Add router to dependency array

  if (isLoading || !session || !profileData) {
    return (
      <main id="main" className="container mx-auto px-6 py-16 min-h-screen bg-background text-foreground text-center">
        <h1 className="text-4xl md:text-5xl tracking-tight text-foreground">Loading Profile...</h1>
        <p className="mt-3 text-muted-foreground font-body text-lg">Please wait while we load your profile.</p>
      </main>
    );
  }

  if (error) {
    return (
      <main id="main" className="container mx-auto px-6 py-16 min-h-screen bg-background text-foreground text-center">
        <h1 className="text-4xl md:text-5xl tracking-tight text-foreground">Profile</h1>
        <p className="mt-3 text-muted-foreground font-body text-lg">{error}</p>
      </main>
    );
  }

  return (
    <main id="main" className="container mx-auto px-6 py-16 min-h-screen bg-background text-foreground">
      <h1 className="text-4xl md:text-5xl tracking-tight text-foreground text-center">My Profile</h1>
      <p className="mt-3 text-muted-foreground font-body text-lg text-center max-w-2xl mx-auto">Update your personal information.</p>

      <section className="mt-12 max-w-md mx-auto bg-card rounded-2xl p-8 shadow-ultra-soft">
        <ProfileForm initialData={profileData} userId={session.user.id} />
      </section>
    </main>
  );
}