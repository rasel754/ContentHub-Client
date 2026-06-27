import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { userService, UserProfile } from '@/services/user.service';
import { useToast } from '@/components/ui/toast';

export const useUserProfile = () => {
  return useQuery({
    queryKey: ['user-profile'],
    queryFn: userService.getProfile,
    retry: 1,
    staleTime: 1000 * 60 * 15, // 15 mins cache
  });
};

export const useUpdateProfile = () => {
  const queryClient = useQueryClient();
  const { success, error } = useToast();

  return useMutation({
    mutationFn: userService.updateProfile,
    onSuccess: (data) => {
      queryClient.setQueryData(['user-profile'], data);
      success('Your profile has been updated successfully!');
    },
    onError: (err: any) => {
      error(err.message || 'Failed to update profile');
    },
  });
};

export const useSyncUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: userService.syncProfile,
    onSuccess: (data) => {
      queryClient.setQueryData(['user-profile'], data);
      console.log('User synced with backend successfully:', data);
    },
    onError: (err: any) => {
      console.error('Failed to sync user with backend:', err);
    },
  });
};
