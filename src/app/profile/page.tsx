"use client";

import { Metadata } from "next"; // Metadata cannot be exported from client components, but the import is fine.
import { redirect } from 'next/navigation'; // This import is fine, but redirect is a server-side function.
import { cookies } from 'next/headers'; // This import is problematic in a client component.
import { ProfileForm } from '@/components/ProfileForm';
import { getProfile } from '@/app/actions/profiles';
import { useEffect, useState } from 'react'; // Added for client-side state management
import { useSession } from '@/components/SessionContextProvider'; // To get actual session data

// Note: Metadata cannot be exported from client components.
// This page will use the root layout's metadata or a default.
// We will remove the export const metadata for this client component.

export default function ProfilePage() {
  const { session, isLoading } = useSession(); // Use the client-side session context
  const [profileData, setProfileData] = useState<any>(null); // State to hold profile data
  const [error, setError] = useState<string | null>(null); // State to hold error messages

  useEffect(() => {
    if (!isLoading && !session) {
      redirect('/login'); // Redirect unauthenticated users to login
    }

    if (session && !profileData && !error) {
      // Fetch profile data client-side once session is available
      const fetchProfile = async () => {
        const { data, error: fetchError } = await getProfile(session.user.id); // Use actual user ID
        if (fetchError) {
          console.error('Failed to load profile data:', fetchError);
          setError('Could not load profile data. Please try again later.');
        } else {
          setProfileData(data);
        }
      };
      fetchProfile();
    }
  }, [session, isLoading, profileData, error]);

  if (isLoading || !session || !profileData) {
    // Show a loading state or redirect if not authenticated/data not loaded
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