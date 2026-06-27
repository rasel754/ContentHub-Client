'use client';

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { useAllContent, useUpdateContentItem, useDeleteContentItem } from '@/hooks/useContent';
import { Trash2, Eye, Edit3, X, Loader2, Sparkles, Filter, Search, Calendar, User } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import { useUser } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';

export default function AdminContentPage() {
  const { user, isLoaded } = useUser();
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFormat, setSelectedFormat] = useState('all');
  
  // Modal States
  const [editingItem, setEditingItem] = useState<any | null>(null);
  const [editPrompt, setEditPrompt] = useState('');
  const [editOutput, setEditOutput] = useState('');
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

  if (!isLoaded || (user?.publicMetadata?.role !== 'admin' && user?.publicMetadata?.role !== 'manager')) {
    return (
      <div className="flex h-[50vh] items-center justify-center">
        <div className="text-center space-y-2">
          <p className="text-muted-foreground animate-pulse">Checking authorization...</p>
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
    setEditPrompt(item.prompt);
    setEditOutput(item.output);
  };

  const handleSaveEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingItem || !editPrompt.trim() || !editOutput.trim()) return;

    updateMutation.mutate(
      {
        id: editingItem._id,
        data: {
          prompt: editPrompt.trim(),
          output: editOutput.trim(),
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
        <div className="text-xs text-muted-foreground self-start sm:self-center font-semibold bg-card px-3 py-1.5 border rounded-lg">
          Total Items: {contents.length}
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-card border rounded-2xl p-4 shadow-sm flex flex-col md:flex-row gap-4 items-center">
        <div className="relative flex-1 w-full">
          <Search className="absolute left-3 top-2.5 w-4.5 h-4.5 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search prompts, outputs, or user IDs..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 text-sm rounded-xl border bg-background focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
        
        <div className="flex gap-2 w-full md:w-auto">
          {/* Format selector */}
          <select
            value={selectedFormat}
            onChange={(e) => setSelectedFormat(e.target.value)}
            className="px-3 py-2 text-sm rounded-xl border bg-background focus:outline-none focus:ring-2 focus:ring-primary w-full md:w-40 font-semibold"
          >
            <option value="all">All Formats</option>
            <option value="blog">Blog Articles</option>
            <option value="caption">Social Captions</option>
            <option value="summary">Summaries</option>
          </select>
          
          <Button variant="outline" size="sm" onClick={() => refetch()} className="px-4">
            Reload
          </Button>
        </div>
      </div>

      {/* Content Table */}
      {isLoading ? (
        <div className="border rounded-2xl p-4 space-y-4 bg-card">
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-12 w-full" />
          <Skeleton className="h-12 w-full" />
          <Skeleton className="h-12 w-full" />
        </div>
      ) : isError ? (
        <div className="text-center py-16 border rounded-2xl bg-card border-dashed">
          <p className="text-red-500 font-medium text-lg mb-2">Error connecting to the API</p>
          <p className="text-muted-foreground mb-4">Please make sure the backend server is running and try again.</p>
          <Button onClick={() => refetch()}>Retry Connection</Button>
        </div>
      ) : filtered.length > 0 ? (
        <div className="bg-card border rounded-2xl overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead className="border-b bg-muted/30">
                <tr className="text-left text-xs font-bold text-muted-foreground uppercase tracking-wider">
                  <th className="px-6 py-4">Prompt Title</th>
                  <th className="px-6 py-4">User ID (Author)</th>
                  <th className="px-6 py-4">Format</th>
                  <th className="px-6 py-4">Created Date</th>
                  <th className="px-6 py-4 text-right">Actions</th>
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
                        className="p-2 h-9 w-9 rounded-lg"
                      >
                        <Eye size={16} />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleEditClick(item)}
                        className="p-2 h-9 w-9 rounded-lg text-primary hover:text-primary"
                        disabled={isSaving}
                      >
                        <Edit3 size={16} />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDeleteClick(item._id)}
                        className="p-2 h-9 w-9 rounded-lg text-destructive hover:text-destructive"
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
        <div className="text-center py-16 border rounded-2xl bg-card border-dashed">
          <p className="text-muted-foreground">No records found matching your filters.</p>
        </div>
      )}

      {/* Modal: Edit content item */}
      {editingItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-card border rounded-2xl max-w-2xl w-full shadow-xl overflow-hidden flex flex-col max-h-[85vh] animate-in zoom-in-95 duration-200">
            <div className="p-5 border-b flex justify-between items-center bg-muted/20">
              <h2 className="text-lg font-bold flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-primary" />
                Edit Content Item
              </h2>
              <button onClick={() => setEditingItem(null)} className="p-1 hover:bg-muted rounded-lg transition-colors">
                <X size={20} />
              </button>
            </div>
            
            <form onSubmit={handleSaveEdit} className="p-6 space-y-4 overflow-y-auto flex-1">
              <div className="space-y-1.5">
                <label className="text-sm font-semibold">Prompt Title</label>
                <input
                  type="text"
                  value={editPrompt}
                  onChange={(e) => setEditPrompt(e.target.value)}
                  disabled={isSaving}
                  required
                  className="w-full px-4 py-2.5 rounded-lg border bg-background focus:outline-none focus:ring-2 focus:ring-primary text-sm disabled:opacity-50"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-sm font-semibold">Generated Output</label>
                <textarea
                  value={editOutput}
                  onChange={(e) => setEditOutput(e.target.value)}
                  disabled={isSaving}
                  required
                  rows={10}
                  className="w-full px-4 py-2.5 rounded-lg border bg-background focus:outline-none focus:ring-2 focus:ring-primary text-sm resize-none disabled:opacity-50 font-mono"
                />
              </div>

              <div className="border-t pt-4 flex justify-end gap-3">
                <Button type="button" variant="outline" onClick={() => setEditingItem(null)} disabled={isSaving}>
                  Cancel
                </Button>
                <Button type="submit" disabled={isSaving} className="min-w-[100px]">
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
          <div className="bg-card border rounded-2xl max-w-2xl w-full shadow-xl overflow-hidden flex flex-col max-h-[80vh] animate-in zoom-in-95 duration-200">
            <div className="p-5 border-b flex justify-between items-center bg-muted/20">
              <div>
                <span className={`inline-block px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider mb-1 ${getFormatColor(viewingItem.type)}`}>
                  {getFormatLabel(viewingItem.type)}
                </span>
                <h2 className="text-base font-bold text-foreground leading-tight">{viewingItem.prompt}</h2>
              </div>
              <button onClick={() => setViewingItem(null)} className="p-1 hover:bg-muted rounded-lg transition-colors">
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
                <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider block">Generated Text Output</span>
                <div className="p-4 rounded-xl border bg-muted/25 font-mono text-sm leading-relaxed whitespace-pre-wrap max-h-72 overflow-y-auto text-foreground">
                  {viewingItem.output}
                </div>
              </div>
            </div>

            <div className="p-4 border-t flex justify-end bg-muted/10">
              <Button onClick={() => setViewingItem(null)}>Dismiss</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
