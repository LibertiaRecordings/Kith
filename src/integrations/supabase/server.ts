import { createServerClient, type CookieOptions } from '@supabase/ssr';
import { cookies } from 'next/headers';
import type { ReadonlyRequestCookies } from 'next/dist/server/web/spec-extension/cookies';

export function createSupabaseServerClient() {
  // Explicitly cast cookies() to ReadonlyRequestCookies to resolve the Promise inference issue
  const cookieStore = cookies() as ReadonlyRequestCookies;

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!, // Using service role key for server-side operations
    {
      cookies: {
        get: (name: string) => {
          return cookieStore.get(name)?.value;
        },
        set: (name: string, value: string, options: CookieOptions) => {
          // Use type assertion for 'set' as it's available at runtime but not in ReadonlyRequestCookies type
          (cookieStore as any).set(name, value, options);
        },
        remove: (name: string, options: CookieOptions) => {
          // Use type assertion for 'delete' as it's available at runtime but not in ReadonlyRequestCookies type
          (cookieStore as any).delete(name, options);
        },
      },
    }
  );
}