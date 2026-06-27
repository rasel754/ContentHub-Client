import apiClient from '@/lib/api-client';
import { ApiResponse } from '@/types';

export interface ChatSession {
  _id: string;
  userId: string;
  title: string;
  createdAt: string;
  updatedAt: string;
}

export interface ChatMessage {
  _id: string;
  sessionId: string;
  role: 'user' | 'assistant';
  content: string;
  createdAt: string;
}

export interface ChatSessionMeta {
  page: number;
  limit: number;
  total: number;
  totalPage: number;
}

export interface ChatSessionListResponse {
  success: boolean;
  message: string;
  meta: ChatSessionMeta;
  data: ChatSession[];
}

export const chatService = {
  createSession: async (title: string): Promise<ChatSession> => {
    const response = await apiClient.post<ApiResponse<ChatSession>>('/chat/sessions', { title });
    if (!response.data.success || !response.data.data) {
      throw new Error(response.data.message || 'Failed to create chat session');
    }
    return response.data.data;
  },

  getSessions: async (params?: { page?: number; limit?: number }): Promise<ChatSessionListResponse> => {
    const queryParams: Record<string, string> = {};
    if (params?.page) queryParams.page = String(params.page);
    if (params?.limit) queryParams.limit = String(params.limit);

    const response = await apiClient.get<ChatSessionListResponse>('/chat/sessions', {
      params: queryParams,
    });
    return response.data;
  },

  getSessionMessages: async (sessionId: string): Promise<ChatMessage[]> => {
    const response = await apiClient.get<ApiResponse<ChatMessage[]>>(`/chat/sessions/${sessionId}/messages`);
    if (!response.data.success || !response.data.data) {
      throw new Error(response.data.message || 'Failed to retrieve messages');
    }
    return response.data.data;
  },

  deleteSession: async (sessionId: string): Promise<void> => {
    const response = await apiClient.delete<ApiResponse<null>>(`/chat/sessions/${sessionId}`);
    if (!response.data.success) {
      throw new Error(response.data.message || 'Failed to delete chat session');
    }
  },
};
