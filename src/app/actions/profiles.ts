"use server";

import { revalidatePath } from 'next/cache';
import { initializeApp, getApps, getApp } from 'firebase/app';
import { getFirebaseDataConnect, connectorConfig } from '@firebasegen/default-connector';

// Firebase configuration from environment variables
const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID,
  measurementId: process.env.FIREBASE_MEASUREMENT_ID, // Optional
};

// Initialize Firebase App and Data Connect client for server-side use
const getOrCreateFirebaseApp = () => {
  if (getApps().length === 0) {
    return initializeApp(firebaseConfig);
  }
  return getApp();
};

const firebaseApp = getOrCreateFirebaseApp();
const dataConnect = getFirebaseDataConnect(firebaseApp, connectorConfig);

interface UpdateProfileParams {
  userId: string;
  firstName?: string | null;
  lastName?: string | null;
  avatarUrl?: string | null;
}

export async function getProfile(userId: string) {
  // Use Data Connect's generated query to fetch the profile
  const { data, error } = await dataConnect.queries.getProfileById({ id: userId });

  if (error) {
    console.error('Error fetching profile:', error);
    return { success: false, error: error.message };
  }

  // Map Data Connect's camelCase response back to the expected snake_case for existing components
  return {
    success: true,
    data: {
      first_name: data?.profile?.firstName || null,
      last_name: data?.profile?.lastName || null,
      avatar_url: data?.profile?.avatarUrl || null,
    },
  };
}

export async function updateProfile({ userId, firstName, lastName, avatarUrl }: UpdateProfileParams) {
  // Use Data Connect's generated mutation to update the profile
  const { error } = await dataConnect.mutations.updateProfile({
    id: userId,
    input: {
      firstName: firstName,
      lastName: lastName,
      avatarUrl: avatarUrl,
      updatedAt: new Date().toISOString(), // Pass current timestamp
    },
  });

  if (error) {
    console.error('Error updating profile:', error);
    return { success: false, error: error.message };
  }

  revalidatePath('/profile'); // Revalidate the profile page to show updated data
  return { success: true };
}