'use client';

import React, { useState, useEffect } from 'react';
import { useUserProfile, useUpdateProfile } from '@/hooks/useUser';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { User, Mail, Shield, Calendar, IdCard, Loader2, Sparkles } from 'lucide-react';

export default function ProfilePage() {
  const { data: profile, isLoading: isProfileLoading, isError } = useUserProfile();
  const updateProfileMutation = useUpdateProfile();

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [profileImageUrl, setProfileImageUrl] = useState('');

  // Update form inputs when profile loads
  useEffect(() => {
    if (profile) {
      setFirstName(profile.firstName || '');
      setLastName(profile.lastName || '');
      setProfileImageUrl(profile.profileImageUrl || '');
    }
  }, [profile]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!firstName.trim() || !lastName.trim()) return;

    updateProfileMutation.mutate({
      firstName,
      lastName,
      profileImageUrl: profileImageUrl || undefined,
    });
  };

  const isUpdating = updateProfileMutation.isPending;

  if (isProfileLoading) {
    return (
      <div className="p-6 max-w-4xl mx-auto space-y-6">
        <div>
          <Skeleton className="h-10 w-48 mb-2" />
          <Skeleton className="h-5 w-72" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Skeleton className="h-64 col-span-1" />
          <Skeleton className="h-64 col-span-2" />
        </div>
      </div>
    );
  }

  if (isError || !profile) {
    return (
      <div className="p-6 max-w-4xl mx-auto text-center py-20">
        <h2 className="text-xl font-bold text-red-500 mb-2">Error Loading Profile</h2>
        <p className="text-muted-foreground">There was a problem communicating with the backend. Please try reloading or log in again.</p>
      </div>
    );
  }

  const joinDate = profile.createdAt
    ? new Date(profile.createdAt).toLocaleDateString(undefined, {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    : 'Unknown';

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6 animate-in fade-in duration-300">
      <div>
        <div className="flex items-center gap-2 mb-2">
          <User className="w-6 h-6 text-primary" />
          <h1 className="text-3xl font-bold">My Profile</h1>
        </div>
        <p className="text-muted-foreground">Manage your account information and preferences</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Left Side: Avatar Card */}
        <div className="bg-card border rounded-2xl p-6 flex flex-col items-center justify-center text-center space-y-4 hover:border-primary/40 transition-colors">
          <div className="relative w-32 h-32 rounded-full overflow-hidden border-4 border-muted shadow-md group">
            {profile.profileImageUrl ? (
              <img
                src={profile.profileImageUrl}
                alt={`${profile.firstName} ${profile.lastName}`}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white text-3xl font-bold">
                {profile.firstName?.[0] || ''}
                {profile.lastName?.[0] || ''}
              </div>
            )}
          </div>
          <div>
            <h2 className="text-xl font-bold">
              {profile.firstName} {profile.lastName}
            </h2>
            <div className="flex items-center justify-center gap-1.5 mt-1">
              <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold uppercase ${
                profile.role === 'admin'
                  ? 'bg-purple-100 dark:bg-purple-950/40 text-purple-700 dark:text-purple-300 border border-purple-500/20'
                  : 'bg-blue-100 dark:bg-blue-950/40 text-blue-700 dark:text-blue-300 border border-blue-500/20'
              }`}>
                <Shield className="w-3 h-3" />
                {profile.role}
              </span>
            </div>
          </div>

          <div className="w-full border-t pt-4 text-left space-y-3 text-sm">
            <div className="flex items-center gap-3 text-muted-foreground">
              <Mail className="w-4 h-4 text-primary" />
              <span className="truncate">{profile.email}</span>
            </div>
            <div className="flex items-center gap-3 text-muted-foreground">
              <Calendar className="w-4 h-4 text-primary" />
              <span>Joined: {joinDate}</span>
            </div>
            <div className="flex items-center gap-3 text-muted-foreground">
              <IdCard className="w-4 h-4 text-primary" />
              <span className="font-mono text-xs truncate">ID: {profile.clerkId}</span>
            </div>
          </div>
        </div>

        {/* Right Side: Profile Forms */}
        <div className="bg-card border rounded-2xl p-6 md:col-span-2 space-y-6 hover:border-primary/40 transition-colors">
          <h2 className="text-lg font-bold border-b pb-2 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-secondary" />
            Edit Profile Details
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-sm font-semibold">First Name</label>
                <input
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  disabled={isUpdating}
                  required
                  placeholder="John"
                  className="w-full px-4 py-2.5 rounded-lg border bg-background focus:outline-none focus:ring-2 focus:ring-primary disabled:opacity-50"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-sm font-semibold">Last Name</label>
                <input
                  type="text"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  disabled={isUpdating}
                  required
                  placeholder="Doe"
                  className="w-full px-4 py-2.5 rounded-lg border bg-background focus:outline-none focus:ring-2 focus:ring-primary disabled:opacity-50"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-sm font-semibold">Profile Image URL</label>
              <input
                type="url"
                value={profileImageUrl}
                onChange={(e) => setProfileImageUrl(e.target.value)}
                disabled={isUpdating}
                placeholder="https://example.com/avatar.jpg"
                className="w-full px-4 py-2.5 rounded-lg border bg-background focus:outline-none focus:ring-2 focus:ring-primary disabled:opacity-50"
              />
            </div>

            <div className="border-t pt-4 flex justify-end">
              <Button type="submit" disabled={isUpdating} size="lg" className="min-w-[120px]">
                {isUpdating ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Saving...
                  </>
                ) : (
                  'Save Changes'
                )}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
