'use client';

import React, { useEffect } from 'react';
import { Users, FileText, TrendingUp, DollarSign, RefreshCw, AlertCircle } from 'lucide-react';
import { useUser } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import { useAllContent } from '@/hooks/useContent';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { ContentCountChart, CategoryDistributionChart } from '@/components/dashboard/charts';

const StatCard = ({ icon: Icon, label, value, change, isLoading }: any) => (
  <div className="p-6 rounded-2xl bg-card border hover:border-primary/40 transition-colors shadow-sm">
    <div className="flex items-center justify-between mb-2">
      <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">{label}</h3>
      <Icon className="w-5 h-5 text-primary" />
    </div>
    {isLoading ? (
      <Skeleton className="h-9 w-20 rounded my-1" />
    ) : (
      <p className="text-3xl font-black font-mono text-foreground">{value}</p>
    )}
    <p className={`text-xs mt-1.5 ${change > 0 ? 'text-green-600' : 'text-red-600'} font-semibold`}>
      {change > 0 ? '+' : ''}{change}% from last period
    </p>
  </div>
);

export default function AdminStatsPage() {
  const { user, isLoaded } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (isLoaded && user?.publicMetadata?.role !== 'admin' && user?.publicMetadata?.role !== 'manager') {
      router.push('/dashboard');
    }
  }, [isLoaded, user, router]);

  // Fetch all contents for admin statistics
  const { data: contentsData, isLoading: isContentLoading, isError, refetch, isFetching } = useAllContent({
    all: true,
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
  const totalContents = contents.length;

  // Process Category distribution
  const categoryCounts = contents.reduce(
    (acc: Record<string, number>, curr) => {
      acc[curr.type] = (acc[curr.type] || 0) + 1;
      return acc;
    },
    { blog: 0, caption: 0, summary: 0 }
  );

  const distributionData = [
    { name: 'Blog Articles', value: categoryCounts.blog || 0, color: '#3b82f6' },
    { name: 'Social Captions', value: categoryCounts.caption || 0, color: '#10b981' },
    { name: 'Text Summaries', value: categoryCounts.summary || 0, color: '#f59e0b' },
  ];

  // User growth (mock structured data for Recharts)
  const growthData = [
    { label: 'Jan', count: 200 },
    { label: 'Feb', count: 400 },
    { label: 'Mar', count: 600 },
    { label: 'Apr', count: 800 },
    { label: 'May', count: 1000 },
    { label: 'Jun', count: 1234 },
  ];

  // Top content sorting
  const topContents = [...contents]
    .sort((a, b) => (b.metadata?.wordCount || 0) - (a.metadata?.wordCount || 0))
    .slice(0, 5)
    .map((item) => ({
      title: item.prompt,
      words: item.metadata?.wordCount || 0,
      model: item.metadata?.model || 'Gemini Pro',
      date: new Date(item.createdAt).toLocaleDateString(undefined, {
        month: 'short',
        day: 'numeric',
      }),
    }));

  if (isError) {
    return (
      <div className="p-6 max-w-lg mx-auto text-center py-20 flex flex-col items-center justify-center space-y-4">
        <AlertCircle className="w-16 h-16 text-red-500" />
        <h2 className="text-2xl font-bold text-red-500">Error Loading Platform Stats</h2>
        <p className="text-muted-foreground">
          There was an error communicating with the backend services. Please retry or contact support.
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
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold mb-1 tracking-tight">Analytics Dashboard</h1>
          <p className="text-muted-foreground">Platform-wide metrics and statistics</p>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={() => refetch()}
          disabled={isFetching}
          className="self-start sm:self-center"
        >
          <RefreshCw className={`w-4 h-4 mr-2 ${isFetching ? 'animate-spin' : ''}`} />
          Refresh Data
        </Button>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard icon={Users} label="Total Users" value="1,234" change={12} isLoading={isContentLoading} />
        <StatCard icon={FileText} label="Content Generated" value={totalContents.toString()} change={28} isLoading={isContentLoading} />
        <StatCard icon={TrendingUp} label="Avg Engagement" value="6.8%" change={5} isLoading={isContentLoading} />
        <StatCard icon={DollarSign} label="Platform Revenue" value="$12.4K" change={18} isLoading={isContentLoading} />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* User Growth */}
        <div className="p-6 rounded-3xl bg-card border shadow-sm">
          <h2 className="text-lg font-bold mb-6 flex items-center gap-2">
            <span className="w-1 h-5 rounded bg-primary" />
            User Growth
          </h2>
          <div className="h-64 relative">
            <ContentCountChart data={growthData} name="Registered Users" />
          </div>
        </div>

        {/* Content Distribution */}
        <div className="p-6 rounded-3xl bg-card border shadow-sm flex flex-col justify-between">
          <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
            <span className="w-1 h-5 rounded bg-primary" />
            Content Types
          </h2>
          <div className="h-64 relative flex-1">
            <CategoryDistributionChart data={distributionData} />
          </div>
        </div>
      </div>

      {/* Performance Table */}
      <div className="p-6 rounded-3xl bg-card border shadow-sm">
        <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
          <span className="w-1 h-5 rounded bg-primary" />
          Top Performing Content
        </h2>
        {isContentLoading ? (
          <div className="space-y-3">
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
          </div>
        ) : topContents.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead className="border-b bg-muted/30">
                <tr className="text-left text-xs font-bold text-muted-foreground uppercase tracking-wider">
                  <th className="px-4 py-3 font-semibold">Title</th>
                  <th className="px-4 py-3 font-semibold">Size</th>
                  <th className="px-4 py-3 font-semibold">AI Model</th>
                  <th className="px-4 py-3 font-semibold">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {topContents.map((item, idx) => (
                  <tr key={idx} className="hover:bg-muted/30 transition-colors">
                    <td className="px-4 py-3.5 font-semibold text-foreground truncate max-w-xs sm:max-w-md">
                      {item.title}
                    </td>
                    <td className="px-4 py-3.5 font-mono text-muted-foreground">{item.words.toLocaleString()} words</td>
                    <td className="px-4 py-3.5">
                      <span className="inline-block px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-purple-100 dark:bg-purple-950/40 text-purple-700 dark:text-purple-300 border border-purple-500/20">
                        {item.model}
                      </span>
                    </td>
                    <td className="px-4 py-3.5 text-muted-foreground">{item.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center py-10 text-muted-foreground text-sm">
            No generated content items found in database yet.
          </div>
        )}
      </div>
    </div>
  );
}

