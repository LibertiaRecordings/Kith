import { createServerClient, type CookieOptions } from '@supabase/ssr';
import { cookies } from 'next/headers';

export function createSupabaseServerClient() {
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!, // Using service role key for server-side operations
    {
      cookies: {
        get: (name: string) => {
          // Explicitly cast cookies() to any to resolve the incorrect Promise inference
          return (cookies() as any).get(name)?.value;
        },
        set: (name: string, value: string, options: CookieOptions) => {
          // Explicitly cast cookies() to any
          (cookies() as any).set(name, value, options);
        },
        remove: (name: string, options: CookieOptions) => {
          // Explicitly cast cookies() to any
          (cookies() as any).delete(name, options);
        },
      },
    }
  );
}