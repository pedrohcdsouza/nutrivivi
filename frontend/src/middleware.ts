import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const token = request.cookies.get('access_token')?.value;

  if (request.nextUrl.pathname.startsWith('/painel')) {
    if (!token) {
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }

  if (request.nextUrl.pathname === '/login' && token) {
    return NextResponse.redirect(new URL('/painel/anamneses', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/painel/:path*', '/login'],
};
