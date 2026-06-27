import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { chatService } from '@/services/chat.service';
import { useToast } from '@/components/ui/toast';

export const useCreateSession = () => {
  const queryClient = useQueryClient();
  const { error } = useToast();

  return useMutation({
    mutationFn: chatService.createSession,
    onSuccess: (newSession) => {
      queryClient.invalidateQueries({ queryKey: ['chat-sessions'] });
      console.log('Chat session created:', newSession);
    },
    onError: (err: any) => {
      error(err.message || 'Failed to create chat session');
    },
  });
};

export const useChatSessions = (params?: { page?: number; limit?: number }) => {
  return useQuery({
    queryKey: ['chat-sessions', params],
    queryFn: () => chatService.getSessions(params),
    placeholderData: (previousData) => previousData,
    staleTime: 1000 * 60 * 5, // 5 mins
  });
};

export const useSessionMessages = (sessionId: string) => {
  return useQuery({
    queryKey: ['chat-messages', sessionId],
    queryFn: () => chatService.getSessionMessages(sessionId),
    enabled: !!sessionId,
    staleTime: 1000 * 60 * 1, // 1 min stale time for message threads
  });
};

export const useDeleteSession = () => {
  const queryClient = useQueryClient();
  const { success, error } = useToast();

  return useMutation({
    mutationFn: chatService.deleteSession,
    onSuccess: (_, deletedSessionId) => {
      queryClient.invalidateQueries({ queryKey: ['chat-sessions'] });
      queryClient.removeQueries({ queryKey: ['chat-messages', deletedSessionId] });
      success('Chat history cleared!');
    },
    onError: (err: any) => {
      error(err.message || 'Failed to delete chat session');
    },
  });
};
