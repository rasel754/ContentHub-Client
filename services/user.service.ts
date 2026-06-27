import apiClient from '@/lib/api-client';
import { ApiResponse } from '@/types';

export interface UserProfile {
  _id: string;
  clerkId: string;
  email: string;
  firstName: string;
  lastName: string;
  role: 'user' | 'admin';
  profileImageUrl?: string;
  createdAt: string;
  updatedAt: string;
}

export const userService = {
  getProfile: async (): Promise<UserProfile> => {
    const response = await apiClient.get<ApiResponse<UserProfile>>('/users/profile');
    if (!response.data.success || !response.data.data) {
      throw new Error(response.data.message || 'Failed to fetch user profile');
    }
    return response.data.data;
  },

  updateProfile: async (data: {
    firstName?: string;
    lastName?: string;
    profileImageUrl?: string;
  }): Promise<UserProfile> => {
    const response = await apiClient.patch<ApiResponse<UserProfile>>('/users/profile', data);
    if (!response.data.success || !response.data.data) {
      throw new Error(response.data.message || 'Failed to update profile');
    }
    return response.data.data;
  },

  syncProfile: async (data: {
    clerkId: string;
    email: string;
    firstName: string;
    lastName: string;
    role?: string;
    profileImageUrl?: string;
  }): Promise<UserProfile> => {
    const response = await apiClient.post<ApiResponse<UserProfile>>('/users/sync', data);
    if (!response.data.success || !response.data.data) {
      throw new Error(response.data.message || 'Failed to sync user session');
    }
    return response.data.data;
  },
};
