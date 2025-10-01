"use client";

import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import { supabase } from '@/integrations/supabase/client';
import { Metadata } from 'next';

// Note: Metadata cannot be exported from client components.
// This page will use the root layout's metadata or a default.

export default function LoginPage() {
  return (
    <div className="grid grid-rows-[1fr_auto] items-center justify-items-center min-h-screen p-8 pb-20 sm:p-20 font-display bg-background text-foreground">
      <main className="flex flex-col gap-8 row-start-1 items-center text-center max-w-md w-full">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tighter leading-tight text-foreground mb-8">
          Welcome Back
        </h1>
        <div className="bg-card rounded-2xl p-8 shadow-ultra-soft w-full">
          <Auth
            supabaseClient={supabase}
            providers={[]} // No third-party providers by default
            appearance={{
              theme: ThemeSupa,
              variables: {
                default: {
                  colors: {
                    brand: 'hsl(var(--primary))',
                    brandAccent: 'hsl(var(--primary))',
                    inputBackground: 'hsl(var(--background))',
                    inputBorder: 'hsl(var(--muted-foreground))',
                    inputBorderHover: 'hsl(var(--primary))',
                    inputBorderFocus: 'hsl(var(--primary))',
                    inputText: 'hsl(var(--foreground))',
                    defaultButtonBackground: 'hsl(var(--primary))',
                    defaultButtonBackgroundHover: 'hsl(var(--primary))',
                    defaultButtonBorder: 'hsl(var(--primary))',
                    defaultButtonText: 'hsl(var(--primary-foreground))',
                    anchorTextColor: 'hsl(var(--primary))',
                    anchorTextHoverColor: 'hsl(var(--primary))',
                  },
                },
              },
            }}
            theme="dark" // Using dark theme to match the app's aesthetic
            redirectTo={process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000/'}
          />
        </div>
      </main>
    </div>
  );
}