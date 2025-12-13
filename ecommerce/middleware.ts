import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Middleware to handle authentication

export function middleware(request: NextRequest) {
    const token = request.cookies.get('token')?.value;
    const { pathname } = request.nextUrl;

    // Define public paths that don't require authentication
    const publicPaths = ['/login', '/signup'];

    // Check if the current path is public
    const isPublicPath = publicPaths.includes(pathname);

    if (isPublicPath && token) {
        // If user is already logged in and tries to access login/signup, redirect to dashboard
        return NextResponse.redirect(new URL('/dashboard', request.url));
    }

    if (!isPublicPath && !token) {
        // If user is not logged in and tries to access protected route, redirect to login
        return NextResponse.redirect(new URL('/login', request.url));
    }

    return NextResponse.next();
}

// Configure which paths the middleware should run on
export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - api (API routes)
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         * - public folder content if any
         */
        '/((?!api|_next/static|_next/image|favicon.ico).*)',
    ],
};
