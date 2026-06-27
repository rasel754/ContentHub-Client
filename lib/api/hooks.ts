import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axiosInstance from './client';
import { Content, BlogPost, Message, DashboardStats, PaginatedResponse } from '@/types';

// Content Queries
export const useContents = (page: number = 1, pageSize: number = 12, category?: string) => {
  return useQuery({
    queryKey: ['contents', page, pageSize, category],
    queryFn: async () => {
      const response = await axiosInstance.get<PaginatedResponse<Content>>('/contents', {
        params: { page, pageSize, category },
      });
      return response.data;
    },
  });
};

export const useContent = (id: string) => {
  return useQuery({
    queryKey: ['content', id],
    queryFn: async () => {
      const response = await axiosInstance.get<Content>(`/contents/${id}`);
      return response.data;
    },
    enabled: !!id,
  });
};

// Blog Queries
export const useBlogPosts = (page: number = 1, pageSize: number = 10) => {
  return useQuery({
    queryKey: ['blog-posts', page, pageSize],
    queryFn: async () => {
      const response = await axiosInstance.get<PaginatedResponse<BlogPost>>('/blog', {
        params: { page, pageSize },
      });
      return response.data;
    },
  });
};

export const useBlogPost = (slug: string) => {
  return useQuery({
    queryKey: ['blog-post', slug],
    queryFn: async () => {
      const response = await axiosInstance.get<BlogPost>(`/blog/${slug}`);
      return response.data;
    },
    enabled: !!slug,
  });
};

// Dashboard Stats
export const useDashboardStats = () => {
  return useQuery({
    queryKey: ['dashboard-stats'],
    queryFn: async () => {
      const response = await axiosInstance.get<DashboardStats>('/dashboard/stats');
      return response.data;
    },
  });
};

// Messages Mutation
export const useSendMessage = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (message: Omit<Message, 'id' | 'createdAt'>) => {
      const response = await axiosInstance.post('/messages', message);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['messages'] });
    },
  });
};

// Content Generation
export const useGenerateContent = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (params: { type: string; prompt: string }) => {
      const response = await axiosInstance.post('/generate', params);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['generated-content'] });
    },
  });
};
