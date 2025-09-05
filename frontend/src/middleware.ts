import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  // Get the pathname of the request (e.g. /, /about, /admin)
  const path = request.nextUrl.pathname

  // Check if the path is a valid route
  const validRoutes = [
    '/',
    '/admin',
    '/admin/orders',
    '/sign-in',
    '/sign-up'
  ]

  // If the path is not in valid routes and doesn't start with /_next, /api, or /static
  if (!validRoutes.includes(path) && 
      !path.startsWith('/_next') && 
      !path.startsWith('/api') && 
      !path.startsWith('/static') &&
      !path.includes('.')) {
    // Redirect to home page for invalid routes
    return NextResponse.redirect(new URL('/', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}