'use client';

import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { useAllContent, useUpdateContentItem, useDeleteContentItem } from '@/hooks/useContent';
import { Trash2, Eye, Edit3, X, Loader2, Sparkles, Search, Calendar, User } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import { useUser } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';

const contentEditSchema = z.object({
  prompt: z
    .string()
    .trim()
    .min(10, 'Prompt title must be at least 10 characters long')
    .max(1000, 'Prompt title cannot exceed 1000 characters'),
  output: z
    .string()
    .trim()
    .min(10, 'Generated output content must be at least 10 characters long'),
});

type ContentEditFormData = z.infer<typeof contentEditSchema>;

export default function AdminContentPage() {
  const { user, isLoaded } = useUser();
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFormat, setSelectedFormat] = useState('all');
  
  // Modal States
  const [editingItem, setEditingItem] = useState<any | null>(null);
  const [viewingItem, setViewingItem] = useState<any | null>(null);

  // Guard access before fetching or rendering
  useEffect(() => {
    if (isLoaded && user?.publicMetadata?.role !== 'admin' && user?.publicMetadata?.role !== 'manager') {
      router.push('/dashboard');
    }
  }, [isLoaded, user, router]);

  // TanStack Hooks
  const { data: contentsData, isLoading, isError, refetch } = useAllContent({
    limit: 100,
    all: true,
  });

  const updateMutation = useUpdateContentItem();
  const deleteMutation = useDeleteContentItem();

  // Form Setup
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContentEditFormData>({
    resolver: zodResolver(contentEditSchema),
    defaultValues: {
      prompt: '',
      output: '',
    },
  });

  if (!isLoaded || (user?.publicMetadata?.role !== 'admin' && user?.publicMetadata?.role !== 'manager')) {
    return (
      <div className="flex h-[50vh] items-center justify-center">
        <div className="text-center space-y-2">
          <p className="text-muted-foreground animate-pulse font-semibold">Checking authorization...</p>
        </div>
      </div>
    );
  }

  const contents = contentsData?.data || [];

  // Filter content
  const filtered = contents.filter((item) => {
    const matchesSearch =
      item.prompt.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.output.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.userId.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesFormat = selectedFormat === 'all' || item.type === selectedFormat;
    
    return matchesSearch && matchesFormat;
  });

  const handleEditClick = (item: any) => {
    setEditingItem(item);
    reset({
      prompt: item.prompt,
      output: item.output,
    });
  };

  const handleSaveEdit = (data: ContentEditFormData) => {
    if (!editingItem) return;

    updateMutation.mutate(
      {
        id: editingItem._id,
        data: {
          prompt: data.prompt.trim(),
          output: data.output.trim(),
        },
      },
      {
        onSuccess: () => {
          setEditingItem(null);
        },
      }
    );
  };

  const handleDeleteClick = (id: string) => {
    if (confirm('Are you sure you want to permanently delete this content from the database?')) {
      deleteMutation.mutate(id);
    }
  };

  const getFormatColor = (type: string) => {
    switch (type) {
      case 'blog':
        return 'bg-blue-100 dark:bg-blue-950/40 text-blue-700 dark:text-blue-300 border border-blue-500/20';
      case 'caption':
        return 'bg-emerald-100 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 border border-emerald-500/20';
      case 'summary':
        return 'bg-amber-100 dark:bg-amber-950/40 text-amber-700 dark:text-amber-300 border border-amber-500/20';
      default:
        return 'bg-gray-100 dark:bg-gray-900/30 text-gray-700 dark:text-gray-300';
    }
  };

  const getFormatLabel = (type: string) => {
    switch (type) {
      case 'blog': return 'Blog Article';
      case 'caption': return 'Social Caption';
      case 'summary': return 'Text Summary';
      default: return type;
    }
  };

  const isSaving = updateMutation.isPending;

  return (
    <div className="p-6 space-y-6 animate-in fade-in duration-300">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight mb-1">Manage Database Content</h1>
          <p className="text-muted-foreground">Modify, inspect, or remove AI-generated records globally</p>
        </div>
        <div className="text-xs text-muted-foreground self-start sm:self-center font-bold bg-card px-3 py-1.5 border rounded-lg shadow-sm">
          Total Items: {contents.length}
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-card border rounded-3xl p-4 shadow-sm flex flex-col md:flex-row gap-4 items-center">
        <div className="relative flex-1 w-full">
          <Search className="absolute left-3.5 top-3 w-4.5 h-4.5 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search prompts, outputs, or user IDs..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 text-sm rounded-2xl border bg-background focus:outline-none focus:ring-2 focus:ring-primary transition-all"
          />
        </div>
        
        <div className="flex gap-2 w-full md:w-auto">
          {/* Format selector */}
          <select
            value={selectedFormat}
            onChange={(e) => setSelectedFormat(e.target.value)}
            className="px-3.5 py-2.5 text-sm rounded-2xl border bg-background focus:outline-none focus:ring-2 focus:ring-primary w-full md:w-40 font-bold"
          >
            <option value="all">All Formats</option>
            <option value="blog">Blog Articles</option>
            <option value="caption">Social Captions</option>
            <option value="summary">Summaries</option>
          </select>
          
          <Button variant="outline" size="sm" onClick={() => refetch()} className="px-4 py-5 rounded-2xl font-semibold cursor-pointer">
            Reload
          </Button>
        </div>
      </div>

      {/* Content Table */}
      {isLoading ? (
        <div className="border rounded-3xl p-6 space-y-4 bg-card shadow-sm">
          <Skeleton className="h-10 w-full rounded" />
          <Skeleton className="h-12 w-full rounded" />
          <Skeleton className="h-12 w-full rounded" />
          <Skeleton className="h-12 w-full rounded" />
        </div>
      ) : isError ? (
        <div className="text-center py-16 border border-dashed rounded-3xl bg-card">
          <p className="text-red-500 font-bold text-lg mb-2">Error connecting to the API</p>
          <p className="text-muted-foreground mb-4">Please make sure the backend server is running and try again.</p>
          <Button onClick={() => refetch()} className="rounded-2xl cursor-pointer">Retry Connection</Button>
        </div>
      ) : filtered.length > 0 ? (
        <div className="bg-card border rounded-3xl overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead className="border-b bg-muted/30">
                <tr className="text-left text-xs font-bold text-muted-foreground uppercase tracking-wider">
                  <th className="px-6 py-4 font-bold">Prompt Title</th>
                  <th className="px-6 py-4 font-bold">User ID (Author)</th>
                  <th className="px-6 py-4 font-bold">Format</th>
                  <th className="px-6 py-4 font-bold">Created Date</th>
                  <th className="px-6 py-4 text-right font-bold">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y text-sm">
                {filtered.map((item) => (
                  <tr key={item._id} className="hover:bg-muted/30 transition-colors">
                    <td className="px-6 py-4 font-semibold max-w-xs truncate">{item.prompt}</td>
                    <td className="px-6 py-4 text-muted-foreground font-mono text-xs max-w-[120px] truncate">
                      {item.userId}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-semibold uppercase tracking-wider ${getFormatColor(item.type)}`}>
                        {getFormatLabel(item.type)}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-muted-foreground">
                      {new Date(item.createdAt).toLocaleDateString(undefined, {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric',
                      })}
                    </td>
                    <td className="px-6 py-4 text-right space-x-1.5 flex justify-end">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setViewingItem(item)}
                        className="p-2 h-9 w-9 rounded-xl cursor-pointer shadow-sm"
                      >
                        <Eye size={16} />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleEditClick(item)}
                        className="p-2 h-9 w-9 rounded-xl text-primary hover:text-primary cursor-pointer shadow-sm"
                        disabled={isSaving}
                      >
                        <Edit3 size={16} />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDeleteClick(item._id)}
                        className="p-2 h-9 w-9 rounded-xl text-destructive hover:text-destructive cursor-pointer shadow-sm"
                        disabled={deleteMutation.isPending}
                      >
                        <Trash2 size={16} />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="text-center py-16 border border-dashed rounded-3xl bg-card">
          <p className="text-muted-foreground font-semibold">No records found matching your filters.</p>
        </div>
      )}

      {/* Modal: Edit content item */}
      {editingItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-card border rounded-3xl max-w-2xl w-full shadow-xl overflow-hidden flex flex-col max-h-[85vh] animate-in zoom-in-95 duration-200">
            <div className="p-5 border-b flex justify-between items-center bg-muted/20">
              <h2 className="text-lg font-bold flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-primary" />
                Edit Content Item
              </h2>
              <button onClick={() => setEditingItem(null)} className="p-1 hover:bg-muted rounded-xl transition-colors">
                <X size={20} />
              </button>
            </div>
            
            <form onSubmit={handleSubmit(handleSaveEdit)} className="p-6 space-y-4 overflow-y-auto flex-1">
              <div className="space-y-1.5">
                <label className="text-sm font-semibold">Prompt Title</label>
                <input
                  type="text"
                  {...register('prompt')}
                  disabled={isSaving}
                  className={`w-full px-4 py-2.5 rounded-xl border bg-background focus:outline-none focus:ring-2 focus:ring-primary text-sm disabled:opacity-50 transition-all ${
                    errors.prompt ? 'border-destructive focus:ring-destructive' : ''
                  }`}
                />
                {errors.prompt && (
                  <p className="text-xs text-destructive font-semibold">{errors.prompt.message}</p>
                )}
              </div>

              <div className="space-y-1.5">
                <label className="text-sm font-semibold">Generated Output</label>
                <textarea
                  {...register('output')}
                  disabled={isSaving}
                  rows={10}
                  className={`w-full px-4 py-2.5 rounded-xl border bg-background focus:outline-none focus:ring-2 focus:ring-primary text-sm resize-none disabled:opacity-50 font-mono transition-all ${
                    errors.output ? 'border-destructive focus:ring-destructive' : ''
                  }`}
                />
                {errors.output && (
                  <p className="text-xs text-destructive font-semibold">{errors.output.message}</p>
                )}
              </div>

              <div className="border-t pt-4 flex justify-end gap-3">
                <Button type="button" variant="outline" onClick={() => setEditingItem(null)} disabled={isSaving} className="rounded-2xl cursor-pointer">
                  Cancel
                </Button>
                <Button type="submit" disabled={isSaving} className="min-w-[100px] rounded-2xl cursor-pointer font-semibold">
                  {isSaving ? (
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
      )}

      {/* Modal: View content item details */}
      {viewingItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-card border rounded-3xl max-w-2xl w-full shadow-xl overflow-hidden flex flex-col max-h-[80vh] animate-in zoom-in-95 duration-200">
            <div className="p-5 border-b flex justify-between items-center bg-muted/20">
              <div>
                <span className={`inline-block px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider mb-1 ${getFormatColor(viewingItem.type)}`}>
                  {getFormatLabel(viewingItem.type)}
                </span>
                <h2 className="text-base font-bold text-foreground leading-tight">{viewingItem.prompt}</h2>
              </div>
              <button onClick={() => setViewingItem(null)} className="p-1 hover:bg-muted rounded-xl transition-colors">
                <X size={20} />
              </button>
            </div>

            <div className="p-6 overflow-y-auto space-y-4 flex-1">
              <div className="grid grid-cols-2 gap-4 text-xs bg-muted/30 p-3.5 rounded-xl border border-muted">
                <div className="space-y-1">
                  <span className="text-muted-foreground block">Author / User ID</span>
                  <span className="font-mono text-foreground font-semibold truncate block flex items-center gap-1">
                    <User className="w-3.5 h-3.5" />
                    {viewingItem.userId}
                  </span>
                </div>
                <div className="space-y-1">
                  <span className="text-muted-foreground block">Created Timestamp</span>
                  <span className="text-foreground font-semibold flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5" />
                    {new Date(viewingItem.createdAt).toLocaleString()}
                  </span>
                </div>
              </div>

              <div className="space-y-1.5 pt-2">
                <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider block font-bold">Generated Text Output</span>
                <div className="p-4 rounded-xl border bg-muted/25 font-mono text-sm leading-relaxed whitespace-pre-wrap max-h-72 overflow-y-auto text-foreground">
                  {viewingItem.output}
                </div>
              </div>
            </div>

            <div className="p-4 border-t flex justify-end bg-muted/10">
              <Button onClick={() => setViewingItem(null)} className="rounded-2xl cursor-pointer">Dismiss</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

