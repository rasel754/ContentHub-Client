'use client';

import React, { ReactNode, useEffect, useRef } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useAuth, useUser } from '@clerk/nextjs';
import { registerTokenResolver } from '@/lib/api-client';
import { useSyncUser } from '@/hooks/useUser';
import { ToastProvider } from '@/components/ui/toast';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      gcTime: 1000 * 60 * 10, // 10 minutes (formerly cacheTime)
      refetchOnWindowFocus: false, // Prevents aggressive refetches on focus
    },
  },
});

function ClerkTokenRegister() {
  const { getToken } = useAuth();
  const { user, isLoaded, isSignedIn } = useUser();
  const { mutate: syncUser } = useSyncUser();
  const syncedUserId = useRef<string | null>(null);

  // Register token resolver with Axios instance
  useEffect(() => {
    registerTokenResolver(async () => {
      try {
        return await getToken();
      } catch (err) {
        console.error('Error retrieving Clerk auth token:', err);
        return null;
      }
    });
  }, [getToken]);

  // Sync Clerk profile data to our MongoDB database on sign-in
  useEffect(() => {
    if (isLoaded && isSignedIn && user) {
      if (syncedUserId.current === user.id) return; // Prevent double trigger
      syncedUserId.current = user.id;

      const primaryEmail = user.primaryEmailAddress?.emailAddress || '';
      
      syncUser({
        clerkId: user.id,
        email: primaryEmail,
        firstName: user.firstName || '',
        lastName: user.lastName || '',
        profileImageUrl: user.imageUrl || '',
        role: 'user', // Default role
      });
    } else if (isLoaded && !isSignedIn) {
      syncedUserId.current = null;
    }
  }, [isLoaded, isSignedIn, user, syncUser]);

  return null;
}

export function Providers({ children }: { children: ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <ToastProvider>
        <ClerkTokenRegister />
        {children}
      </ToastProvider>
    </QueryClientProvider>
  );
}
export default Providers;
