import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();
  const supabase = createMiddlewareClient({ req, res });

  const {
    data: { session },
  } = await supabase.auth.getSession();

  const { pathname } = req.nextUrl;

  // Allow access to login page and static assets without authentication
  // All other pages are now publicly accessible by default.
  // If specific admin routes need protection, they should be added here.
  if (pathname.startsWith('/_next/') || pathname.startsWith('/api/') || pathname.startsWith('/static/') || pathname.includes('.')) {
    return res;
  }

  // If a user is on the login page and already authenticated, redirect to home.
  if (session && pathname.startsWith('/login')) {
    return NextResponse.redirect(new URL('/', req.url));
  }

  // If a user is not authenticated and tries to access a protected route (none defined yet, but for future use),
  // they would be redirected to login. For now, all routes are public.
  // Example: if (!session && pathname.startsWith('/admin')) { ... }

  return res;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - api (API routes)
     * - Any file with an extension (e.g., .png, .jpg, .css)
     */
    '/((?!_next/static|_next/image|favicon.ico|api/|.*\\..*).*)',
  ],
};