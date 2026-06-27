import apiClient from '@/lib/api-client';
import { ApiResponse } from '@/types';

export interface ContentMetadata {
  model?: string;
  generationTimeMs?: number;
  wordCount?: number;
  [key: string]: any;
}

export interface ContentItem {
  _id: string;
  userId: string;
  prompt: string;
  type: 'blog' | 'caption' | 'summary';
  output: string;
  metadata?: ContentMetadata;
  createdAt: string;
  updatedAt: string;
}

export interface ContentQueryParams {
  type?: 'blog' | 'caption' | 'summary';
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export interface ContentMeta {
  page: number;
  limit: number;
  total: number;
  totalPage: number;
}

export interface ContentListResponse {
  success: boolean;
  message: string;
  meta: ContentMeta;
  data: ContentItem[];
}

export const contentService = {
  getAllContent: async (params?: ContentQueryParams): Promise<ContentListResponse> => {
    // Stringify parameters as expected by backend validator
    const queryParams: Record<string, string> = {};
    if (params?.type) queryParams.type = params.type;
    if (params?.page) queryParams.page = String(params.page);
    if (params?.limit) queryParams.limit = String(params.limit);
    if (params?.sortBy) queryParams.sortBy = params.sortBy;
    if (params?.sortOrder) queryParams.sortOrder = params.sortOrder;

    const response = await apiClient.get<ContentListResponse>('/content', {
      params: queryParams,
    });
    return response.data;
  },

  getContent: async (id: string): Promise<ContentItem> => {
    const response = await apiClient.get<ApiResponse<ContentItem>>(`/content/${id}`);
    if (!response.data.success || !response.data.data) {
      throw new Error(response.data.message || 'Failed to fetch content item');
    }
    return response.data.data;
  },

  updateContent: async (
    id: string,
    data: {
      prompt?: string;
      type?: 'blog' | 'caption' | 'summary';
      output?: string;
      metadata?: ContentMetadata;
    }
  ): Promise<ContentItem> => {
    const response = await apiClient.patch<ApiResponse<ContentItem>>(`/content/${id}`, data);
    if (!response.data.success || !response.data.data) {
      throw new Error(response.data.message || 'Failed to update content');
    }
    return response.data.data;
  },

  deleteContent: async (id: string): Promise<void> => {
    const response = await apiClient.delete<ApiResponse<null>>(`/content/${id}`);
    if (!response.data.success) {
      throw new Error(response.data.message || 'Failed to delete content');
    }
  },
};
