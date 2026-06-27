// Clerk configuration
// This file documents the required Clerk environment variables and setup

export const clerkConfig = {
  // Required environment variables:
  // NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY - Get from Clerk Dashboard
  // CLERK_SECRET_KEY - Get from Clerk Dashboard
  
  // OAuth Providers to enable in Clerk Dashboard:
  // - Google (required for Google login)
  // - GitHub (optional)
  // - Microsoft (optional)
  
  // Redirect URLs to configure in Clerk Dashboard:
  // Development: http://localhost:3000
  // Production: your-production-domain.com
  
  // Post-sign-in redirect: /dashboard (handled by middleware)
  // Post-sign-up redirect: /dashboard (handled by middleware)
  // Post-sign-out redirect: / (handled by app)
}

export default clerkConfig
