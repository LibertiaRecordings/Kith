"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { Session, SupabaseClient } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { useRouter, usePathname } from 'next/navigation';
import { Toaster, toast } from 'sonner';
import FirstVisitSpecialDialog from './FirstVisitSpecialDialog';

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
  const [showSpecialDialog, setShowSpecialDialog] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, currentSession) => {
      if (event === 'SIGNED_OUT') {
        setSession(null);
        toast.success("You have been signed out.");
        if (pathname !== '/login') {
          router.push('/login');
        }
      } else if (currentSession) {
        setSession(currentSession);
        if (pathname === '/login') {
          router.push('/');
        }
      } else {
        setSession(null);
      }
      setIsLoading(false);
    });

    supabase.auth.getSession().then(({ data: { session: initialSession } }) => {
      setSession(initialSession);
      setIsLoading(false);
      if (initialSession && pathname === '/login') {
        router.push('/');
      }
    });

    return () => subscription.unsubscribe();
  }, [router, pathname]);

  // Effect to show the special dialog after a delay
  useEffect(() => {
    const hasSeenSpecial = localStorage.getItem('hasSeenFirstVisitSpecial');
    if (!hasSeenSpecial) {
      const timer = setTimeout(() => {
        setShowSpecialDialog(true);
        localStorage.setItem('hasSeenFirstVisitSpecial', 'true'); // Mark as seen
      }, 1500); // Show after 1.5 seconds

      return () => clearTimeout(timer);
    }
  }, []); // Run only once on component mount

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