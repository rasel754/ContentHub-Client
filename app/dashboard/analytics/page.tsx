'use client';

import React from 'react';
import { Eye, FileText, Cpu, Clock, RefreshCw, BarChart3 } from 'lucide-react';
import { useAllContent } from '@/hooks/useContent';
import { Button } from '@/components/ui/button';
import { ActivityOverTimeChart, CategoryDistributionChart } from '@/components/dashboard/charts';
import { Skeleton } from '@/components/ui/skeleton';

export default function AnalyticsPage() {
  const { data: contentsData, isLoading, isError, refetch, isFetching } = useAllContent({ limit: 1000 });
  const contents = contentsData?.data || [];

  // 1. Core aggregates
  const totalContents = contents.length;
  
  let totalWordCount = 0;
  let totalGenerationTime = 0;
  let itemsWithGenTime = 0;
  const modelUsage: Record<string, number> = {};

  contents.forEach((item) => {
    if (item.metadata?.wordCount) {
      totalWordCount += item.metadata.wordCount;
    }
    if (item.metadata?.generationTimeMs) {
      totalGenerationTime += item.metadata.generationTimeMs;
      itemsWithGenTime++;
    }
    if (item.metadata?.model) {
      const model = item.metadata.model;
      modelUsage[model] = (modelUsage[model] || 0) + 1;
    }
  });

  const averageGenTimeSec = itemsWithGenTime > 0 ? (totalGenerationTime / itemsWithGenTime / 1000).toFixed(2) : '0.0';

  // 2. Category distribution formatting
  const categoryCounts = contents.reduce(
    (acc: Record<string, number>, curr) => {
      acc[curr.type] = (acc[curr.type] || 0) + 1;
      return acc;
    },
    { blog: 0, caption: 0, summary: 0 }
  );

  const categoryDistribution = [
    { name: 'Blog Articles', value: categoryCounts.blog || 0, color: '#3b82f6' },
    { name: 'Social Captions', value: categoryCounts.caption || 0, color: '#10b981' },
    { name: 'Text Summaries', value: categoryCounts.summary || 0, color: '#f59e0b' },
  ];

  // 3. Activity over time formatting (Creations by Day)
  const activityMap = contents.reduce((acc: Record<string, number>, curr) => {
    try {
      const dateKey = new Date(curr.createdAt).toLocaleDateString(undefined, {
        month: 'short',
        day: 'numeric',
      });
      acc[dateKey] = (acc[dateKey] || 0) + 1;
    } catch {
      // ignore
    }
    return acc;
  }, {});

  // Sort dates chronologically
  const activityData = Object.entries(activityMap)
    .map(([date, count]) => ({ date, count: count as number }))
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .slice(-10); // Show last 10 days of activity

  const finalActivityData =
    activityData.length > 0
      ? activityData
      : [
          { date: 'Mon', count: 0 },
          { date: 'Tue', count: 0 },
          { date: 'Wed', count: 0 },
          { date: 'Thu', count: 0 },
          { date: 'Fri', count: 0 },
          { date: 'Sat', count: 0 },
          { date: 'Sun', count: 0 },
        ];

  // 4. Extract Top Content Items
  const topContentItems = [...contents]
    .sort((a, b) => (b.metadata?.wordCount || 0) - (a.metadata?.wordCount || 0))
    .slice(0, 5)
    .map((item) => ({
      title: item.prompt.length > 40 ? item.prompt.substring(0, 40) + '...' : item.prompt,
      words: item.metadata?.wordCount || 0,
      format: item.type,
    }));

  if (isLoading) {
    return (
      <div className="p-6 space-y-6">
        <div className="space-y-2">
          <Skeleton className="h-10 w-48 rounded-lg animate-pulse" />
          <Skeleton className="h-5 w-72 rounded-lg animate-pulse" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="h-32 rounded-2xl animate-pulse" />
          ))}
        </div>
        <Skeleton className="h-80 w-full rounded-2xl animate-pulse" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="p-6 max-w-lg mx-auto text-center py-20 flex flex-col items-center justify-center space-y-4">
        <div className="p-4 bg-red-100 dark:bg-red-950/40 text-red-600 dark:text-red-400 rounded-full border border-red-500/20">
          <BarChart3 className="w-12 h-12" />
        </div>
        <h2 className="text-2xl font-bold text-red-500">Error Loading Analytics</h2>
        <p className="text-muted-foreground leading-relaxed">
          Failed to fetch real content data from the server. Check if the database connection and backend server are running.
        </p>
        <Button onClick={() => refetch()} className="flex items-center gap-2">
          <RefreshCw className="w-4 h-4" />
          Retry Connection
        </Button>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6 animate-in fade-in duration-300">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold mb-2 tracking-tight">Analytics Dashboard</h1>
          <p className="text-muted-foreground">Real-time content performance and platform metrics</p>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={() => refetch()}
          disabled={isFetching}
          className="shadow-sm"
        >
          <RefreshCw className={`w-4 h-4 mr-2 ${isFetching ? 'animate-spin' : ''}`} />
          Refresh Stats
        </Button>
      </div>

      {/* Dynamic Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-6 rounded-2xl bg-card border hover:border-primary/40 transition-colors shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Total Creations</h3>
            <FileText className="w-5 h-5 text-primary" />
          </div>
          <p className="text-3xl font-black font-mono text-foreground">{totalContents}</p>
          <p className="text-xs text-muted-foreground mt-1.5">+100% saved in MongoDB</p>
        </div>

        <div className="p-6 rounded-2xl bg-card border hover:border-primary/40 transition-colors shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Total Words Generated</h3>
            <Eye className="w-5 h-5 text-primary" />
          </div>
          <p className="text-3xl font-black font-mono text-foreground">{totalWordCount.toLocaleString()}</p>
          <p className="text-xs text-muted-foreground mt-1.5">Across all generated output formats</p>
        </div>

        <div className="p-6 rounded-2xl bg-card border hover:border-primary/40 transition-colors shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Avg Gen Speed</h3>
            <Clock className="w-5 h-5 text-primary" />
          </div>
          <p className="text-3xl font-black font-mono text-foreground">{averageGenTimeSec}s</p>
          <p className="text-xs text-muted-foreground mt-1.5">Average roundtrip LLM inference time</p>
        </div>

        <div className="p-6 rounded-2xl bg-card border hover:border-primary/40 transition-colors shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Active Models</h3>
            <Cpu className="w-5 h-5 text-primary" />
          </div>
          <p className="text-3xl font-black text-foreground">
            {Object.keys(modelUsage).length > 0 ? Object.keys(modelUsage).length : '1'}
          </p>
          <p className="text-xs text-muted-foreground mt-1.5 truncate">
            {Object.keys(modelUsage).join(', ') || 'Gemini Pro'}
          </p>
        </div>
      </div>

      {totalContents === 0 ? (
        <div className="border border-dashed rounded-3xl p-16 text-center bg-card/20 space-y-4">
          <BarChart3 className="w-12 h-12 mx-auto text-muted-foreground" />
          <h3 className="text-xl font-bold">No Content Created Yet</h3>
          <p className="text-muted-foreground max-w-sm mx-auto text-sm">
            Generate some articles, social captions, or summaries to view dynamic analytics charts here.
          </p>
        </div>
      ) : (
        <>
          {/* Traffic Trend / Activity over time */}
          <div className="p-6 rounded-3xl bg-card border shadow-sm">
            <h2 className="text-lg font-bold mb-6 flex items-center gap-2">
              <span className="w-1 h-5 rounded bg-primary" />
              Activity Over Time (Creations per Day)
            </h2>
            <div className="h-80 relative">
              <ActivityOverTimeChart data={finalActivityData} name="Creations" />
            </div>
          </div>

          {/* Distribution and Top Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="p-6 rounded-3xl bg-card border shadow-sm flex flex-col justify-between">
              <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
                <span className="w-1 h-5 rounded bg-primary" />
                Format Distribution
              </h2>
              <div className="h-64 relative flex-1">
                <CategoryDistributionChart data={categoryDistribution} />
              </div>
            </div>

            <div className="p-6 rounded-3xl bg-card border shadow-sm">
              <h2 className="text-lg font-bold mb-6 flex items-center gap-2">
                <span className="w-1 h-5 rounded bg-primary" />
                Top Content (By Word Count)
              </h2>
              <div className="space-y-4">
                {topContentItems.map((item, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between text-sm border-b pb-3.5 last:border-0 last:pb-0"
                  >
                    <div className="flex flex-col space-y-1">
                      <span className="font-semibold text-foreground truncate max-w-xs sm:max-w-md">
                        {item.title}
                      </span>
                      <span className="text-[10px] uppercase font-bold text-muted-foreground tracking-wider">
                        {item.format}
                      </span>
                    </div>
                    <span className="text-muted-foreground font-mono font-semibold bg-muted px-2 py-1 rounded">
                      {item.words.toLocaleString()} words
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

