import apiClient from '@/lib/api-client';
import { ApiResponse } from '@/types';
import { ContentItem } from './content.service';
import { ChatMessage } from './chat.service';

export interface GenerateContentRequest {
  prompt: string;
  type: 'blog' | 'caption' | 'summary';
}

export interface ChatWithAIRequest {
  message: string;
  conversationId: string;
}

export interface ChatWithAIResponse {
  response: string;
  userMessage: ChatMessage;
  assistantMessage: ChatMessage;
}

export const aiService = {
  generateContent: async (data: GenerateContentRequest): Promise<ContentItem> => {
    const response = await apiClient.post<ApiResponse<ContentItem>>('/ai/generate', data);
    if (!response.data.success || !response.data.data) {
      throw new Error(response.data.message || 'Failed to generate content');
    }
    return response.data.data;
  },

  chatWithAssistant: async (data: ChatWithAIRequest): Promise<ChatWithAIResponse> => {
    const response = await apiClient.post<ApiResponse<ChatWithAIResponse>>('/ai/chat', data);
    if (!response.data.success || !response.data.data) {
      throw new Error(response.data.message || 'Failed to communicate with AI assistant');
    }
    return response.data.data;
  },
};
