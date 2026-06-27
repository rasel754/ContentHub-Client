import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { contentService, ContentQueryParams } from '@/services/content.service';
import { useToast } from '@/components/ui/toast';

export const useAllContent = (params?: ContentQueryParams) => {
  return useQuery({
    queryKey: ['contents', params],
    queryFn: () => contentService.getAllContent(params),
    placeholderData: (previousData) => previousData, // keep old data while fetching new pages
    staleTime: 1000 * 60 * 2, // 2 mins
  });
};

export const useContentItem = (id: string) => {
  return useQuery({
    queryKey: ['content', id],
    queryFn: () => contentService.getContent(id),
    enabled: !!id,
    staleTime: 1000 * 60 * 10, // 10 mins
  });
};

export const useUpdateContentItem = () => {
  const queryClient = useQueryClient();
  const { success, error } = useToast();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: any }) => contentService.updateContent(id, data),
    onSuccess: (updatedItem) => {
      queryClient.invalidateQueries({ queryKey: ['contents'] });
      queryClient.setQueryData(['content', updatedItem._id], updatedItem);
      success('Content updated successfully!');
    },
    onError: (err: any) => {
      error(err.message || 'Failed to update content');
    },
  });
};

export const useDeleteContentItem = () => {
  const queryClient = useQueryClient();
  const { success, error } = useToast();

  return useMutation({
    mutationFn: contentService.deleteContent,
    onSuccess: (_, deletedId) => {
      queryClient.invalidateQueries({ queryKey: ['contents'] });
      queryClient.removeQueries({ queryKey: ['content', deletedId] });
      success('Content deleted successfully!');
    },
    onError: (err: any) => {
      error(err.message || 'Failed to delete content');
    },
  });
};
