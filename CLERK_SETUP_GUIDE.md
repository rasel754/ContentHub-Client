# Clerk Authentication Setup Guide

## Problem Fixed
The 404 error after Google login was caused by:
1. ❌ Client-side redirect using `redirect()` in a client component (not supported)
2. ❌ Missing middleware to handle authentication flow
3. ❌ Explicit `redirectUrl` in SignIn/SignUp components conflicting with auth state

## Solution Implemented
✅ Created proper middleware.ts for route protection and redirects
✅ Fixed dashboard layout to use useRouter and useEffect instead of redirect()
✅ Removed explicit redirectUrl from auth components (letting middleware handle it)
✅ Improved error handling and loading states

---

## Setup Instructions

### 1. Clerk Project Setup (Clerk Dashboard)

Go to: https://dashboard.clerk.com

#### Step 1: Create a Clerk Application
- Click "Create application"
- Choose your application name: "ContentHub"
- Select "Next.js" as the framework

#### Step 2: Configure OAuth Providers
In the Dashboard sidebar, go to: **Integrations → Social Providers**

**Enable Google OAuth:**
1. Click "Google"
2. Toggle "Enabled" ON
3. Add Google OAuth credentials:
   - Go to Google Cloud Console (https://console.cloud.google.com)
   - Create a new project (or select existing)
   - Enable Google+ API
   - Create OAuth 2.0 credentials (type: Web Application)
   - Add redirect URI: `https://accounts.clerk.com/oauth_callback`
   - Copy Client ID and Client Secret to Clerk
4. Click "Save"

**Optional - Enable Other Providers:**
- GitHub OAuth
- Microsoft OAuth
- Facebook
- Apple

#### Step 3: Configure Redirect URLs
In the Dashboard, go to: **Settings → URLs**

**Allowed redirect URLs:**
- Development: `http://localhost:3000`
- Production: `https://yourdomain.com`

**After sign-in URL:** `/dashboard`
**After sign-up URL:** `/dashboard`
**After sign-out URL:** `/`

#### Step 4: Get API Keys
Go to: **API Keys → Copy your credentials**

You need:
- `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` (public)
- `CLERK_SECRET_KEY` (secret)

---

### 2. Environment Variables Setup

Create or update `.env.local` in your project root:

```env
# Clerk API Keys (from Clerk Dashboard)
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_xxxxxxxxxxxxx
CLERK_SECRET_KEY=sk_test_xxxxxxxxxxxxx

# Clerk Sign-in/Sign-up URLs
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/auth/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/auth/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/dashboard
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/dashboard
```

**For Production:**
Replace `pk_test_` and `sk_test_` with `pk_live_` and `sk_live_` keys from production environment in Clerk Dashboard.

---

### 3. Deployment to Vercel

If deploying to Vercel:

1. Go to Vercel Project Settings
2. Add Environment Variables:
   - `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`
   - `CLERK_SECRET_KEY`
3. Add Production Domain to Clerk Dashboard:
   - Go to Clerk Dashboard → Settings → URLs
   - Add your Vercel domain: `https://your-project.vercel.app`
4. Redeploy

---

## Architecture Overview

### Flow Diagram

```
User Login Flow:
┌─────────────────────────────────────────────┐
│ 1. User visits /auth/sign-in                │
│    (SignIn component from Clerk)            │
└────────────────┬────────────────────────────┘
                 │
                 ▼
┌─────────────────────────────────────────────┐
│ 2. User clicks "Continue with Google"       │
│    (Google OAuth popup)                     │
└────────────────┬────────────────────────────┘
                 │
                 ▼
┌─────────────────────────────────────────────┐
│ 3. Google authenticates user                │
│    Clerk creates session                    │
└────────────────┬────────────────────────────┘
                 │
                 ▼
┌─────────────────────────────────────────────┐
│ 4. Middleware checks auth state             │
│    userId exists → user authenticated       │
└────────────────┬────────────────────────────┘
                 │
                 ▼
┌─────────────────────────────────────────────┐
│ 5. User redirected to /dashboard            │
│    DashboardLayout renders with user data   │
└─────────────────────────────────────────────┘
```

### Route Protection

```
Public Routes:          Protected Routes:
├─ /                    ├─ /dashboard
├─ /about               ├─ /dashboard/ai-tools/*
├─ /contact             ├─ /dashboard/analytics
├─ /blog                ├─ /dashboard/admin/*
├─ /explore
├─ /privacy
├─ /auth/sign-in
└─ /auth/sign-up
```

---

## Files Modified/Created

### Created Files:
1. **middleware.ts** - Route protection and auth redirects
2. **clerkConfig.ts** - Configuration documentation
3. **CLERK_SETUP_GUIDE.md** - This file

### Modified Files:
1. **app/auth/sign-in/page.tsx** - Removed explicit redirectUrl
2. **app/auth/sign-up/page.tsx** - Removed explicit redirectUrl  
3. **app/dashboard/layout.tsx** - Fixed redirect logic (useRouter + useEffect)
4. **app/layout.tsx** - Already has ClerkProvider

---

## Troubleshooting

### Issue: Still Getting 404 After Login

**Solution:**
1. Check environment variables in `.env.local`:
   ```bash
   echo "NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=$NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY"
   echo "CLERK_SECRET_KEY is set: $([ -n "$CLERK_SECRET_KEY" ] && echo 'YES' || echo 'NO')"
   ```

2. Verify Clerk Dashboard settings:
   - Go to Settings → URLs
   - Confirm "After sign-in URL" is `/dashboard`
   - Confirm redirect URI matches your domain

3. Clear browser cache and cookies:
   - Hard refresh (Ctrl+Shift+R or Cmd+Shift+R)
   - Clear all cookies for localhost or your domain

4. Check browser console for errors:
   - Press F12
   - Go to Console tab
   - Look for any error messages

### Issue: Google Login Not Available

**Solution:**
1. Verify Google OAuth is enabled in Clerk Dashboard:
   - Integrations → Social Providers → Google
   - Toggle should be ON
   - Client ID and Secret should be filled

2. Check Clerk Dashboard is using correct OAuth credentials:
   - Go to Google Cloud Console
   - Verify redirect URI matches Clerk's URL

3. Test in different browser or incognito mode

### Issue: User Data Not Displaying

**Solution:**
1. Check that user has firstName set:
   - Go to Clerk Dashboard → Users
   - Find your test user
   - Ensure firstName is populated

2. Check browser console for errors in DashboardLayout

---

## Testing

### Test Login Flow

1. **Test Sign Up:**
   ```bash
   npm run dev
   # Visit http://localhost:3000
   # Click "Get Started Free" or "Sign up"
   # Click "Continue with Google"
   # Complete Google auth
   # Should redirect to /dashboard
   ```

2. **Test Sign In:**
   ```bash
   # Visit http://localhost:3000/auth/sign-in
   # Click "Continue with Google"
   # Complete Google auth
   # Should redirect to /dashboard
   ```

3. **Test Protected Routes:**
   ```bash
   # Visit http://localhost:3000/dashboard (without logging in)
   # Should redirect to /auth/sign-in
   ```

4. **Test Public Routes:**
   ```bash
   # Visit http://localhost:3000/explore (without logging in)
   # Should allow access
   ```

---

## Production Deployment

### Vercel Deployment Checklist

- [ ] Add NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY to Vercel env vars
- [ ] Add CLERK_SECRET_KEY to Vercel env vars
- [ ] Add production domain to Clerk Dashboard URLs
- [ ] Update Google OAuth redirect URI for production domain
- [ ] Test login flow on production domain
- [ ] Monitor for errors in Vercel logs

### Custom Domain Setup

1. Add custom domain to Vercel project
2. Update Clerk Dashboard:
   - Settings → URLs
   - Add custom domain to "Allowed redirect URLs"
   - Update "After sign-in URL" if needed

---

## Common Configuration Mistakes

❌ **Wrong:** Environment variables in `.env` (won't work in Next.js)
✅ **Right:** Environment variables in `.env.local` or Vercel dashboard

❌ **Wrong:** Using `redirect()` in client components
✅ **Right:** Using `useRouter().push()` with `useEffect` in client components

❌ **Wrong:** Hardcoding redirect URL in SignIn component
✅ **Right:** Let middleware handle redirects based on auth state

❌ **Wrong:** Missing middleware for route protection
✅ **Right:** Use middleware.ts to protect routes

---

## Support

### Resources
- Clerk Docs: https://clerk.com/docs
- Clerk Next.js Guide: https://clerk.com/docs/nextjs
- Google OAuth Setup: https://clerk.com/docs/social-login/google
- Vercel Deployment: https://clerk.com/docs/deployment/vercel

### Clerk Support
- Dashboard: https://dashboard.clerk.com
- Support Email: support@clerk.dev
- Discord: https://clerk.com/discord
