import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'

// Define public routes that don't require authentication
const isPublicRoute = createRouteMatcher([
  '/',
  '/about',
  '/contact',
  '/blog',
  '/explore(.*)',
  '/privacy',
  '/auth/sign-in(.*)',
  '/auth/sign-up(.*)',
  '/api(.*)',
  '/_not-found',
  '/error',
])

export default clerkMiddleware(async (auth, req) => {
  const { userId } = await auth()

  // If user is not authenticated and trying to access protected route
  if (!userId && !isPublicRoute(req)) {
    return NextResponse.redirect(new URL('/auth/sign-in', req.url))
  }

  // If user is authenticated and trying to access sign-in/sign-up, redirect to dashboard
  if (userId && (req.nextUrl.pathname === '/auth/sign-in' || req.nextUrl.pathname === '/auth/sign-up')) {
    return NextResponse.redirect(new URL('/dashboard', req.url))
  }

  return NextResponse.next()
})

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
}
