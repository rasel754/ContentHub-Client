'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Search, ChevronLeft, ChevronRight, FileText, Sparkles, Filter, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAllContent } from '@/hooks/useContent';
import { Skeleton } from '@/components/ui/skeleton';

const categories = [
  { value: 'All', label: 'All Formats' },
  { value: 'blog', label: 'Blog Articles' },
  { value: 'caption', label: 'Social Captions' },
  { value: 'summary', label: 'Summaries' },
];

const typeImages: Record<string, string> = {
  blog: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=500&auto=format&fit=crop&q=80',
  caption: 'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=500&auto=format&fit=crop&q=80',
  summary: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?w=500&auto=format&fit=crop&q=80',
};

const typeLabels: Record<string, string> = {
  blog: 'Blog Article',
  caption: 'Social Caption',
  summary: 'Text Summary',
};

export default function ExplorePage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState('latest'); // latest, oldest

  // Fetch all contents from backend (with optional backend format filter)
  const {
    data,
    isLoading,
    isError,
    refetch,
    isFetching,
  } = useAllContent({
    type: selectedCategory !== 'All' ? (selectedCategory as any) : undefined,
    page: 1, // we fetch a larger page size or handle pagination client-side for smoother searching
    limit: 100,
    sortBy: 'createdAt',
    sortOrder: sortBy === 'latest' ? 'desc' : 'asc',
  });

  const contentList = data?.data || [];

  // Filter content items client-side via the search term
  const filtered = contentList.filter((item) => {
    const matchesSearch =
      item.prompt.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.output.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesSearch;
  });

  // Client-side pagination
  const itemsPerPage = 8;
  const totalPages = Math.ceil(filtered.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedItems = filtered.slice(startIndex, startIndex + itemsPerPage);

  const getFormatBadgeColor = (type: string) => {
    switch (type) {
      case 'blog':
        return 'bg-blue-100 dark:bg-blue-950/40 text-blue-700 dark:text-blue-300 border border-blue-500/20';
      case 'caption':
        return 'bg-emerald-100 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 border border-emerald-500/20';
      case 'summary':
        return 'bg-amber-100 dark:bg-amber-950/40 text-amber-700 dark:text-amber-300 border border-amber-500/20';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  return (
    <div className="min-h-screen bg-background py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-4xl font-bold mb-2 tracking-tight">Explore AI Content</h1>
            <p className="text-muted-foreground text-lg">
              Browse public creations, prompts, and AI-generated copy.
            </p>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => refetch()}
            disabled={isLoading || isFetching}
            className="self-start sm:self-center"
          >
            <RefreshCw className={`w-4 h-4 mr-2 ${isFetching ? 'animate-spin' : ''}`} />
            Refresh Feed
          </Button>
        </div>

        {/* Search and Filters */}
        <div className="bg-card border rounded-2xl p-6 shadow-sm space-y-4">
          <div className="relative">
            <Search className="absolute left-4 top-3.5 w-5 h-5 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search in prompts or generated outputs..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full pl-12 pr-4 py-3 rounded-xl border bg-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary transition-all text-sm sm:text-base"
            />
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            {/* Format Filter */}
            <div className="flex-1 space-y-1.5">
              <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider flex items-center gap-1.5">
                <Filter className="w-3.5 h-3.5" />
                Format
              </label>
              <select
                value={selectedCategory}
                onChange={(e) => {
                  setSelectedCategory(e.target.value);
                  setCurrentPage(1);
                }}
                className="w-full px-4 py-2.5 rounded-lg border bg-background focus:outline-none focus:ring-2 focus:ring-primary text-sm"
              >
                {categories.map((cat) => (
                  <option key={cat.value} value={cat.value}>
                    {cat.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Sort Order */}
            <div className="flex-1 space-y-1.5">
              <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                Sort By
              </label>
              <select
                value={sortBy}
                onChange={(e) => {
                  setSortBy(e.target.value);
                  setCurrentPage(1);
                }}
                className="w-full px-4 py-2.5 rounded-lg border bg-background focus:outline-none focus:ring-2 focus:ring-primary text-sm"
              >
                <option value="latest">Newest First</option>
                <option value="oldest">Oldest First</option>
              </select>
            </div>
          </div>
        </div>

        {/* Results Info */}
        {!isLoading && (
          <p className="text-sm text-muted-foreground">
            Showing {filtered.length > 0 ? startIndex + 1 : 0}–
            {Math.min(startIndex + itemsPerPage, filtered.length)} of {filtered.length} results
          </p>
        )}

        {/* Content Loading Skeleton */}
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {Array.from({ length: 8 }).map((_, idx) => (
              <div key={idx} className="border rounded-2xl overflow-hidden bg-card p-4 space-y-4">
                <Skeleton className="h-40 w-full rounded-xl" />
                <Skeleton className="h-6 w-3/4" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-5/6" />
                <Skeleton className="h-10 w-full mt-4" />
              </div>
            ))}
          </div>
        ) : isError ? (
          <div className="text-center py-16 border rounded-2xl bg-card border-dashed">
            <p className="text-red-500 font-medium text-lg mb-2">Error connecting to the API</p>
            <p className="text-muted-foreground mb-4">Please make sure the backend server is running and try again.</p>
            <Button onClick={() => refetch()}>Retry Connection</Button>
          </div>
        ) : paginatedItems.length > 0 ? (
          <>
            {/* Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {paginatedItems.map((item) => (
                <Link key={item._id} href={`/explore/${item._id}`} className="group h-full">
                  <div className="border rounded-2xl overflow-hidden bg-card hover:border-primary/40 transition-all duration-300 hover:shadow-lg flex flex-col h-full cursor-pointer relative">
                    {/* Image Header */}
                    <div className="relative h-40 bg-muted overflow-hidden">
                      <img
                        src={typeImages[item.type] || typeImages.blog}
                        alt={typeLabels[item.type]}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute top-3 right-3">
                        <span className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-semibold uppercase tracking-wider backdrop-blur-md ${getFormatBadgeColor(item.type)}`}>
                          {typeLabels[item.type]}
                        </span>
                      </div>
                    </div>

                    {/* Content Preview */}
                    <div className="p-5 flex flex-col flex-1 space-y-2">
                      <h3 className="font-bold text-base line-clamp-2 group-hover:text-primary transition-colors text-foreground min-h-[3rem] leading-tight">
                        {item.prompt}
                      </h3>
                      <p className="text-sm text-muted-foreground line-clamp-3 flex-1 leading-relaxed">
                        {item.output}
                      </p>

                      {/* Footer Details */}
                      <div className="flex items-center justify-between text-xs text-muted-foreground pt-4 border-t border-muted">
                        <span>Created</span>
                        <span>
                          {new Date(item.createdAt).toLocaleDateString(undefined, {
                            month: 'short',
                            day: 'numeric',
                          })}
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-4 pt-6">
                <Button
                  variant="outline"
                  onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                  disabled={currentPage === 1}
                  size="sm"
                >
                  <ChevronLeft className="w-4 h-4 mr-1" />
                  Previous
                </Button>

                <div className="flex items-center gap-1.5">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <button
                      key={page}
                      onClick={() => setCurrentPage(page)}
                      className={`w-8 h-8 rounded-lg text-sm font-semibold transition-colors ${
                        currentPage === page
                          ? 'bg-primary text-white shadow-sm'
                          : 'hover:bg-muted text-muted-foreground'
                      }`}
                    >
                      {page}
                    </button>
                  ))}
                </div>

                <Button
                  variant="outline"
                  onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                  disabled={currentPage === totalPages}
                  size="sm"
                >
                  Next
                  <ChevronRight className="w-4 h-4 ml-1" />
                </Button>
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-20 border rounded-2xl bg-card border-dashed">
            <FileText className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground text-lg">No content found matching your criteria.</p>
            {(searchTerm || selectedCategory !== 'All') && (
              <Button
                variant="outline"
                onClick={() => {
                  setSearchTerm('');
                  setSelectedCategory('All');
                  setCurrentPage(1);
                }}
                className="mt-4"
              >
                Clear Filters
              </Button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
