import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const s3Endpoint = process.env.S3_ENDPOINT || '';
const isDev = process.env.NODE_ENV === 'development';

const cspValue = [
  "default-src 'self'",
  `script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ''} https://challenges.cloudflare.com`,
  "style-src 'self' 'unsafe-inline'",
  "font-src 'self' data:",
  `img-src 'self' data: blob: ${s3Endpoint}`,
  'frame-src https://www.google.com https://challenges.cloudflare.com',
  `connect-src 'self' https://challenges.cloudflare.com${isDev ? ' http://localhost:3000 http://admin.localhost:3000' : ''}`,
].join('; ');

export function middleware(request: NextRequest) {
  const hostname = request.headers.get('host') || '';
  const { pathname } = request.nextUrl;

  // Block /admin on main domain — only accessible via admin. subdomain
  if (!hostname.startsWith('admin.') && pathname.startsWith('/admin')) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  // admin.localhost → rewrite to /admin (no CSP)
  if (hostname.startsWith('admin.')) {
    // API routes — pass through
    if (pathname.startsWith('/api')) {
      return NextResponse.next();
    }

    // Already under /admin — pass through (Payload internal routes)
    if (pathname.startsWith('/admin')) {
      return NextResponse.next();
    }

    // Rewrite / → /admin, /login → /admin/login, etc.
    const url = request.nextUrl.clone();
    url.pathname = `/admin${pathname === '/' ? '' : pathname}`;
    return NextResponse.rewrite(url);
  }

  // No CSP on API routes
  if (pathname.startsWith('/api/')) {
    return NextResponse.next();
  }

  // Apply CSP only to frontend pages
  const response = NextResponse.next();
  response.headers.set('Content-Security-Policy', cspValue);
  return response;
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|images|apple-touch-icon.png|manifest.webmanifest).*)',
  ],
};
