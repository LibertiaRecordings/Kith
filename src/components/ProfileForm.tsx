"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from 'sonner'; // Using sonner for toasts
import { getProfile, updateProfile } from "@/app/actions/profiles";
import { useSession } from "@/components/SessionContextProvider"; // Corrected import to useSession

interface ProfileFormProps {
  // If userId is passed as a prop, uncomment this:
  // userId: string;
}

export function ProfileForm({ /* userId */ }: ProfileFormProps) {
  const { session } = useSession(); // Get session from context
  const userId = session?.user?.id; // Extract userId from session

  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [avatarUrl, setAvatarUrl] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  // Removed useToast as we are using sonner directly

  useEffect(() => {
    async function fetchUserProfile() {
      if (!userId) {
        setLoading(false);
        return;
      }
      setLoading(true);
      const { success, data, error } = await getProfile(userId);
      if (success && data) {
        setFirstName(data.first_name || "");
        setLastName(data.last_name || "");
        setAvatarUrl(data.avatar_url || "");
      } else if (error) {
        toast.error("Error fetching profile", { description: error });
      }
      setLoading(false);
    }

    fetchUserProfile();
  }, [userId]); // Removed toast from dependency array as it's not a state/prop

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userId) {
      toast.error("Error", { description: "User not logged in." });
      return;
    }

    setLoading(true);
    const loadingToastId = toast.loading("Saving profile...");

    try {
      const { success, error } = await updateProfile({
        userId,
        firstName,
        lastName,
        avatarUrl,
      });

      if (success) {
        toast.success("Profile updated!", { id: loadingToastId });
      } else if (error) {
        toast.error("Error updating profile", { description: error, id: loadingToastId });
      }
    } catch (err) {
      console.error("Unexpected error during profile update:", err);
      toast.error("An unexpected error occurred.", { id: loadingToastId });
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="text-center text-muted-foreground font-body text-lg">Loading profile...</div>;
  }

  if (!userId) {
    return <div className="text-center text-muted-foreground font-body text-lg">Please log in to view your profile.</div>;
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <Label htmlFor="firstName" className="text-foreground font-body text-base">First Name</Label>
        <Input
          id="firstName"
          type="text"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          disabled={loading}
          placeholder="John"
          className="bg-background border-muted-foreground/30 text-foreground focus:ring-primary"
        />
      </div>
      <div>
        <Label htmlFor="lastName" className="text-foreground font-body text-base">Last Name</Label>
        <Input
          id="lastName"
          type="text"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          disabled={loading}
          placeholder="Doe"
          className="bg-background border-muted-foreground/30 text-foreground focus:ring-primary"
        />
      </div>
      <div>
        <Label htmlFor="avatarUrl" className="text-foreground font-body text-base">Avatar URL (Optional)</Label>
        <Input
          id="avatarUrl"
          type="text"
          value={avatarUrl}
          onChange={(e) => setAvatarUrl(e.target.value)}
          disabled={loading}
          placeholder="https://example.com/avatar.jpg"
          className="bg-background border-muted-foreground/30 text-foreground focus:ring-primary"
        />
      </div>
      <Button type="submit" disabled={loading} className="w-full px-8 py-4 bg-primary text-primary-foreground rounded-full text-lg font-medium can-animate hover:bg-primary/90 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary">
        {loading ? "Saving..." : "Save Profile"}
      </Button>
    </form>
  );
}