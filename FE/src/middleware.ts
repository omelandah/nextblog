// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtDecode } from 'jwt-decode';

const publicRoutes = ['/login', '/register'];

export function middleware(req: NextRequest) {
  const token = req.cookies.get('accessToken')?.value;

  const pathname = req.nextUrl.pathname;
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

  return NextResponse.next();
}
