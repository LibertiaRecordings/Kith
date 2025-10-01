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
  if (pathname.startsWith('/login') || pathname.startsWith('/_next/') || pathname.startsWith('/api/') || pathname.startsWith('/static/') || pathname.includes('.')) {
    return res;
  }

  if (!session) {
    // Redirect unauthenticated users to the login page
    const redirectUrl = req.nextUrl.clone();
    redirectUrl.pathname = '/login';
    redirectUrl.searchParams.set(`redirectedFrom`, req.nextUrl.pathname);
    return NextResponse.redirect(redirectUrl);
  }

  return res;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - login (authentication page)
     * - api (API routes)
     * - Any file with an extension (e.g., .png, .jpg, .css)
     */
    '/((?!_next/static|_next/image|favicon.ico|login|api/|.*\\..*).*)',
  ],
};