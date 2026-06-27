import { useMutation, useQueryClient } from '@tanstack/react-query';
import { aiService, GenerateContentRequest, ChatWithAIRequest } from '@/services/ai.service';
import { useToast } from '@/components/ui/toast';
import { ChatMessage } from '@/services/chat.service';

export const useGenerateContent = () => {
  const queryClient = useQueryClient();
  const { success, error } = useToast();

  return useMutation({
    mutationFn: (data: GenerateContentRequest) => aiService.generateContent(data),
    onSuccess: (newContent) => {
      // Invalidate all content lists since backend auto-saves generated contents
      queryClient.invalidateQueries({ queryKey: ['contents'] });
      success('AI content generated and saved successfully!');
    },
    onError: (err: any) => {
      error(err.message || 'Failed to generate content');
    },
  });
};

export const useChatWithAI = () => {
  const queryClient = useQueryClient();
  const { error } = useToast();

  return useMutation({
    mutationFn: (data: ChatWithAIRequest) => aiService.chatWithAssistant(data),
    onSuccess: (data, variables) => {
      // Update messages cache immediately for instant UI feedback
      queryClient.setQueryData(
        ['chat-messages', variables.conversationId],
        (oldMessages: ChatMessage[] | undefined) => {
          if (!oldMessages) return [data.userMessage, data.assistantMessage];
          return [...oldMessages, data.userMessage, data.assistantMessage];
        }
      );
      // Also trigger background refetch to ensure alignment with DB
      queryClient.invalidateQueries({
        queryKey: ['chat-messages', variables.conversationId],
        refetchType: 'none', // Don't trigger load state flash
      });
    },
    onError: (err: any) => {
      error(err.message || 'Failed to send message');
    },
  });
};
