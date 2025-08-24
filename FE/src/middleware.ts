// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtDecode } from 'jwt-decode';
import i18nConfig from '../next-i18next.config';

const publicRoutes = ['/login', '/register'];
const PUBLIC_FILE = /\.(.*)$/;

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Skip Next.js internals & static files
  if (
    pathname.startsWith('/_next') ||
    pathname.includes('/api/') ||
    PUBLIC_FILE.test(pathname)
  ) {
    return NextResponse.next();
  }

  // Auth
  const token = req.cookies.get('accessToken')?.value;
  const isPublic = publicRoutes.includes(pathname);

  let user = null;
  if (token) {
    try {
      user = jwtDecode<{ id: string }>(token);
    } catch (e) {
      console.error('Invalid token', e);
    }
  }

  // Not logged in → trying to access protected route
  if (!user && !isPublic) {
    return NextResponse.redirect(new URL('/login', req.url));
  }

  // Logged in → trying to access public route
  if (user && isPublic) {
    return NextResponse.redirect(new URL('/blogs', req.url));
  }

  // Local detection
  // Check cookie first
  let locale = req.cookies.get('NEXT_LOCALE')?.value;

  // If no cookie, try browser language
  if (!locale) {
    const acceptLang = req.headers.get('accept-language');
    const supported = i18nConfig.i18n.locales;

    if (acceptLang) {
      const preferred = acceptLang.split(',')[0].split('-')[0];
      if (supported.includes(preferred)) {
        locale = preferred;
      }
    }
  }

  // Fallback to default locale
  if (!locale) {
    locale = i18nConfig.i18n.defaultLocale;
  }

  // Pass locale via custom header → available in Server Components
  const res = NextResponse.next({
    request: {
      headers: new Headers(req.headers),
    },
  });
  res.headers.set('x-locale', locale);

  return res;
}
