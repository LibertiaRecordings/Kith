import { createServerClient, type CookieOptions } from '@supabase/ssr';
import { cookies } from 'next/headers';

export function createSupabaseServerClient() {
  const cookieStore = cookies();

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!, // Using service role key for server-side operations
    {
      cookies: {
        get: (name: string) => cookieStore.get(name)?.value,
        set: (name: string, value: string, options: CookieOptions) => {
          // Type assertion needed as `cookies()` from `next/headers` is `ReadonlyRequestCookies`
          // but gains `set` in a Server Action context.
          (cookieStore as any).set(name, value, options);
        },
        remove: (name: string, options: CookieOptions) => {
          // Type assertion needed for `delete` as well.
          (cookieStore as any).delete(name, options);
        },
      },
    }
  );
}