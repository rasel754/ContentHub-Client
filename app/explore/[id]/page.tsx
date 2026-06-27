'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Heart, Share2, BookmarkIcon, Calendar, Clock, RefreshCw, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ROUTES } from '@/config/constants';
import { useContentItem, useAllContent } from '@/hooks/useContent';
import { Skeleton } from '@/components/ui/skeleton';
import { useToast } from '@/components/ui/toast';

const typeImages: Record<string, string> = {
  blog: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=1200&h=600&fit=crop',
  caption: 'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=1200&h=600&fit=crop',
  summary: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?w=1200&h=600&fit=crop',
};

const typeLabels: Record<string, string> = {
  blog: 'Blog Article',
  caption: 'Social Caption',
  summary: 'Text Summary',
};

interface PageProps {
  params: Promise<{ id: string }> | { id: string };
}

export default function DetailPage({ params }: PageProps) {
  // Handle async params in Next.js 16/15
  const resolvedParams = React.use(params as any) as { id: string };
  const id = resolvedParams.id;

  const { success } = useToast();
  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);

  // Fetch target content item
  const { data: item, isLoading, isError, refetch } = useContentItem(id);

  // Fetch related items of the same type
  const { data: relatedData } = useAllContent({
    type: item?.type,
    limit: 4,
  });

  const relatedArticles = (relatedData?.data || []).filter((r) => r._id !== id).slice(0, 3);

  const copyLink = () => {
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(window.location.href);
      success('Link copied to clipboard!');
    }
  };

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

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background py-12">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 space-y-6">
          <Skeleton className="h-6 w-32" />
          <Skeleton className="h-12 w-3/4 mt-4" />
          <Skeleton className="h-6 w-48 mt-2" />
          <Skeleton className="h-96 w-full rounded-2xl mt-6" />
          <div className="space-y-4 pt-6">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-5/6" />
          </div>
        </div>
      </div>
    );
  }

  if (isError || !item) {
    return (
      <div className="min-h-screen bg-background py-20 text-center space-y-4">
        <FileText className="w-12 h-12 text-destructive mx-auto" />
        <h1 className="text-2xl font-bold text-red-500">Error Loading Content</h1>
        <p className="text-muted-foreground">The requested content could not be found or the server returned an error.</p>
        <div className="flex justify-center gap-4">
          <Link href={ROUTES.EXPLORE}>
            <Button variant="outline">Back to Explore</Button>
          </Link>
          <Button onClick={() => refetch()}>
            <RefreshCw className="w-4 h-4 mr-2" />
            Retry
          </Button>
        </div>
      </div>
    );
  }

  const creationDate = new Date(item.createdAt).toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  // Calculate dynamic reading time based on output length (average 200 words per minute)
  const wordCount = item.output.trim().split(/\s+/).length;
  const readTime = Math.max(1, Math.ceil(wordCount / 200));

  return (
    <article className="min-h-screen bg-background py-12 animate-in fade-in duration-300">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <Link href={ROUTES.EXPLORE} className="inline-flex items-center gap-2 text-primary hover:underline mb-8">
          <ArrowLeft className="w-4 h-4" />
          Back to Explore
        </Link>

        {/* Header */}
        <div className="mb-8 space-y-4">
          <div>
            <span className={`inline-block px-3 py-1 rounded-full text-sm font-semibold uppercase tracking-wider ${getFormatBadgeColor(item.type)}`}>
              {typeLabels[item.type]}
            </span>
          </div>

          <h1 className="text-4xl sm:text-5xl font-extrabold mb-4 text-balance text-foreground leading-tight">
            {item.prompt}
          </h1>

          {/* Metadata Info */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 py-4 border-y border-muted">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-primary to-secondary flex items-center justify-center text-white font-bold text-sm">
                AI
              </div>
              <div>
                <p className="font-semibold text-sm text-foreground">ContentHub Generator</p>
                <p className="text-xs text-muted-foreground">Model: {item.metadata?.model || 'gpt-4o-mini'}</p>
              </div>
            </div>

            <div className="flex items-center gap-4 text-xs sm:text-sm text-muted-foreground">
              <span className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4" />
                {creationDate}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1.5">
                <Clock className="w-4 h-4" />
                {readTime} min read
              </span>
            </div>
          </div>
        </div>

        {/* Featured Cover Image */}
        <div className="relative h-64 sm:h-96 mb-10 rounded-2xl overflow-hidden border shadow-sm">
          <img
            src={typeImages[item.type] || typeImages.blog}
            alt={typeLabels[item.type]}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2.5 mb-10 pb-6 border-b border-muted">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setLiked(!liked)}
            className={`flex items-center gap-2 ${liked ? 'text-destructive border-destructive/20 bg-destructive/5' : ''}`}
          >
            <Heart className={`w-4 h-4 ${liked ? 'fill-current' : ''}`} />
            <span>{liked ? 'Liked' : 'Like'}</span>
          </Button>
          <Button variant="outline" size="sm" onClick={copyLink} className="flex items-center gap-2">
            <Share2 className="w-4 h-4" />
            <span>Share Link</span>
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setSaved(!saved)}
            className={`ml-auto ${saved ? 'text-primary border-primary/20 bg-primary/5' : ''}`}
          >
            <BookmarkIcon className={`w-4 h-4 ${saved ? 'fill-current' : ''}`} />
          </Button>
        </div>

        {/* Generated Content Body */}
        <div className="prose dark:prose-invert max-w-none text-foreground leading-relaxed text-base sm:text-lg mb-16 whitespace-pre-wrap">
          {item.output}
        </div>

        {/* Additional Stats Section */}
        <div className="grid grid-cols-3 gap-4 py-8 border-t border-b border-muted mb-12 text-center bg-card rounded-2xl border shadow-sm">
          <div>
            <p className="text-xl sm:text-2xl font-bold text-foreground">{wordCount}</p>
            <p className="text-xs sm:text-sm text-muted-foreground">Word Count</p>
          </div>
          <div>
            <p className="text-xl sm:text-2xl font-bold text-foreground">
              {item.metadata?.generationTimeMs ? `${(item.metadata.generationTimeMs / 1000).toFixed(2)}s` : 'N/A'}
            </p>
            <p className="text-xs sm:text-sm text-muted-foreground">Generation Time</p>
          </div>
          <div>
            <p className="text-xl sm:text-2xl font-bold text-foreground">Active</p>
            <p className="text-xs sm:text-sm text-muted-foreground">Status</p>
          </div>
        </div>

        {/* Related Articles */}
        {relatedArticles.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold mb-6 tracking-tight text-foreground">Related Creations</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {relatedArticles.map((article) => (
                <Link key={article._id} href={`/explore/${article._id}`} className="group">
                  <div className="p-4 rounded-xl border bg-card hover:border-primary/40 hover:shadow-md transition-all duration-300 h-full flex flex-col justify-between">
                    <h3 className="font-semibold text-sm sm:text-base line-clamp-2 text-foreground group-hover:text-primary transition-colors mb-2 leading-tight">
                      {article.prompt}
                    </h3>
                    <p className="text-xs text-muted-foreground mt-2 border-t pt-2 flex justify-between">
                      <span className="capitalize">{typeLabels[article.type]}</span>
                      <span>
                        {new Date(article.createdAt).toLocaleDateString(undefined, {
                          month: 'short',
                          day: 'numeric',
                        })}
                      </span>
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </article>
  );
}
