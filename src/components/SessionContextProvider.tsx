"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { Session, SupabaseClient } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { useRouter, usePathname } from 'next/navigation';
import { Toaster, toast } from 'sonner';
import FirstVisitSpecialDialog from './FirstVisitSpecialDialog'; // Import the new dialog

interface SessionContextType {
  session: Session | null;
  isLoading: boolean;
  supabase: SupabaseClient;
  showSpecialDialog: boolean;
  setShowSpecialDialog: (show: boolean) => void;
}

const SessionContext = createContext<SessionContextType | undefined>(undefined);

export const SessionContextProvider = ({ children }: { children: ReactNode }) => {
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showSpecialDialog, setShowSpecialDialog] = useState(false); // New state for the dialog
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, currentSession) => {
      if (event === 'SIGNED_OUT') {
        setSession(null);
        toast.success("You have been signed out.");
        // Only redirect to login if not already on the login page
        if (pathname !== '/login') {
          router.push('/login');
        }
      } else if (currentSession) {
        setSession(currentSession);
        // If signed in and on the login page, redirect to home
        if (pathname === '/login') {
          router.push('/');
        }
      } else {
        setSession(null);
        // No automatic redirect for unauthenticated users on public pages
      }
      setIsLoading(false);
    });

    // Initial session check
    supabase.auth.getSession().then(({ data: { session: initialSession } }) => {
      setSession(initialSession);
      setIsLoading(false);
      if (initialSession && pathname === '/login') {
        router.push('/');
      }
      // No automatic redirect for unauthenticated users on public pages
    });

    return () => subscription.unsubscribe();
  }, [router, pathname]);

  return (
    <SessionContext.Provider value={{ session, isLoading, supabase, showSpecialDialog, setShowSpecialDialog }}>
      {children}
      <Toaster />
      <FirstVisitSpecialDialog isOpen={showSpecialDialog} onClose={() => setShowSpecialDialog(false)} />
    </SessionContext.Provider>
  );
};

export const useSession = () => {
  const context = useContext(SessionContext);
  if (context === undefined) {
    throw new Error('useSession must be used within a SessionContextProvider');
  }
  return context;
};