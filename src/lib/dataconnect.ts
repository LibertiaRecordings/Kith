// src/lib/dataconnect.ts
import { getFirebaseDataConnect } from '@firebasegen/default-connector';
import { getApp } from 'firebase/app'; // Assuming you have a Firebase app initialized

// Initialize the Firebase Data Connect client
// This assumes you have already initialized a Firebase app in your project.
// If not, you'll need to initialize Firebase first (e.g., in a separate firebase.ts file).
export const dataConnect = getFirebaseDataConnect(getApp());

// You can now use 'dataConnect' to access the generated hooks and functions.
// For example, in a React component:
// import { useProfile } from '@/lib/dataconnect';
// const { data: profile, isLoading } = useProfile({ id: 'some-id' });