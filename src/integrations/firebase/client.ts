// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAIkz4kX4arW3xN0ey5lFM0Y3WvnDlQCGM",
  authDomain: "kith-kin-barbershop.firebaseapp.com",
  projectId: "kith-kin-barbershop",
  storageBucket: "kith-kin-barbershop.firebasestorage.app",
  messagingSenderId: "136126102365",
  appId: "1:136126102365:web:bb7d40783873f4b93b06b4",
  measurementId: "G-GHFDBMCDW7"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
// Export analytics if you plan to use it, otherwise it can be removed if not needed.
export const analytics = getAnalytics(app);

// You can now import `app` and `analytics` from this file in your components.
// Example:
// import { app, analytics } from '@/integrations/firebase/client';