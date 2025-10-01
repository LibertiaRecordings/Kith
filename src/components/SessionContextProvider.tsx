"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { Session, SupabaseClient } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { useRouter, usePathname } from 'next/navigation';
import { Toaster, toast } from 'sonner';

interface SessionContextType {
  session: Session | null;
  isLoading: boolean;
  supabase: SupabaseClient;
}

const SessionContext = createContext<SessionContextType | undefined>(undefined);

export const SessionContextProvider = ({ children }: { children: ReactNode }) => {
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, currentSession) => {
      if (event === 'SIGNED_OUT') {
        setSession(null);
        toast.success("You have been signed out.");
        router.push('/login');
      } else if (currentSession) {
        setSession(currentSession);
        if (pathname === '/login') {
          router.push('/'); // Redirect to home if already logged in and on login page
        }
      } else {
        setSession(null);
        if (pathname !== '/login') {
          router.push('/login'); // Redirect to login if not authenticated and not on login page
        }
      }
      setIsLoading(false);
    });

    // Initial session check
    supabase.auth.getSession().then(({ data: { session: initialSession } }) => {
      setSession(initialSession);
      setIsLoading(false);
      if (initialSession && pathname === '/login') {
        router.push('/');
      } else if (!initialSession && pathname !== '/login') {
        router.push('/login');
      }
    });

    return () => subscription.unsubscribe();
  }, [router, pathname]);

  return (
    <SessionContext.Provider value={{ session, isLoading, supabase }}>
      {children}
      <Toaster />
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