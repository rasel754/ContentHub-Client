'use client';

export const dynamic = 'force-dynamic';

import Link from 'next/link';
import { useUser } from '@clerk/nextjs';
import { Button } from '@/components/ui/button';
import { BarChart3, FileText, Zap, TrendingUp, Sparkles, MessageSquare } from 'lucide-react';
import { useAllContent } from '@/hooks/useContent';
import { Skeleton } from '@/components/ui/skeleton';

export default function DashboardPage() {
  const { user } = useUser();
  const isAdmin = user?.publicMetadata?.role === 'admin';
  const isManager = user?.publicMetadata?.role === 'manager';

  const { data: contentsData, isLoading } = useAllContent({ all: true });
  const contents = contentsData?.data || [];

  const totalContentGenerated = contents.length;
  
  // Compute total words generated
  const totalWords = contents.reduce((acc, curr) => acc + (curr.metadata?.wordCount || 0), 0);

  // Compute mock-based real credit usage: e.g., 15 credits per content item, capped at 1000
  const creditsUsed = Math.min(1000, totalContentGenerated * 15);
  const creditPercentage = Math.round((creditsUsed / 1000) * 100);

  // Get last 3 activities dynamically
  const recentActivities = [...contents]
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 3)
    .map((item) => {
      const timeDiff = Date.now() - new Date(item.createdAt).getTime();
      const hours = Math.floor(timeDiff / (1000 * 60 * 60));
      const timeStr = hours === 0 ? 'Just now' : hours === 1 ? '1 hour ago' : `${hours} hours ago`;
      
      const typeLabel = item.type === 'blog' ? 'Blog Article' : item.type === 'caption' ? 'Social Caption' : 'Text Summary';

      return {
        description: `Generated ${typeLabel.toLowerCase()} about "${item.prompt.length > 30 ? item.prompt.substring(0, 30) + '...' : item.prompt}"`,
        time: timeStr,
      };
    });

  return (
    <div className="p-6 space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-6 rounded-2xl bg-card border hover:border-primary/40 transition-colors shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Content Generated</h3>
            <FileText className="w-5 h-5 text-primary" />
          </div>
          {isLoading ? (
            <Skeleton className="h-9 w-20 rounded my-1 animate-pulse" />
          ) : (
            <p className="text-3xl font-black font-mono text-foreground">{totalContentGenerated}</p>
          )}
          <p className="text-xs text-muted-foreground mt-1.5">+100% saved in database</p>
        </div>

        <div className="p-6 rounded-2xl bg-card border hover:border-primary/40 transition-colors shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Total Words</h3>
            <TrendingUp className="w-5 h-5 text-primary" />
          </div>
          {isLoading ? (
            <Skeleton className="h-9 w-24 rounded my-1 animate-pulse" />
          ) : (
            <p className="text-3xl font-black font-mono text-foreground">{totalWords.toLocaleString()}</p>
          )}
          <p className="text-xs text-muted-foreground mt-1.5">Across all outputs generated</p>
        </div>

        <div className="p-6 rounded-2xl bg-card border hover:border-primary/40 transition-colors shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Engagement Rate</h3>
            <BarChart3 className="w-5 h-5 text-primary" />
          </div>
          <p className="text-3xl font-black font-mono text-foreground">6.2%</p>
          <p className="text-xs text-muted-foreground mt-1.5">+1.4% from last month</p>
        </div>

        <div className="p-6 rounded-2xl bg-card border hover:border-primary/40 transition-colors shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Credits Used</h3>
            <Zap className="w-5 h-5 text-primary" />
          </div>
          {isLoading ? (
            <Skeleton className="h-9 w-28 rounded my-1 animate-pulse" />
          ) : (
            <p className="text-3xl font-black font-mono text-foreground">{creditsUsed}/1000</p>
          )}
          <p className="text-xs text-muted-foreground mt-1.5">{creditPercentage}% used this month</p>
        </div>
      </div>

      {/* AI Features */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Content Generator Card */}
        <div className="p-6 rounded-3xl bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950/20 dark:to-blue-900/10 border border-blue-200 dark:border-blue-800/40 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Sparkles className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              <h2 className="text-xl font-bold">AI Content Generator</h2>
            </div>
            <p className="text-sm text-muted-foreground mb-6 leading-relaxed">
              Create engaging blog posts, social media captions, and video scripts with advanced AI-powered text generation.
            </p>
          </div>
          <div className="space-y-2.5">
            <Link href="/dashboard/ai-tools/content-generator?type=blog" className="block">
              <Button className="w-full justify-start py-5 rounded-xl border-blue-200 dark:border-blue-800/60" variant="outline" size="sm">
                <FileText className="w-4 h-4 mr-2 text-blue-500" />
                Create Blog Article
              </Button>
            </Link>
            <Link href="/dashboard/ai-tools/content-generator?type=caption" className="block">
              <Button className="w-full justify-start py-5 rounded-xl border-blue-200 dark:border-blue-800/60" variant="outline" size="sm">
                <FileText className="w-4 h-4 mr-2 text-blue-500" />
                Generate Social Caption
              </Button>
            </Link>
            <Link href="/dashboard/ai-tools/content-generator" className="block">
              <Button className="w-full py-5 rounded-xl font-bold bg-blue-600 hover:bg-blue-700 text-white shadow-sm" size="sm">
                <Sparkles className="w-4 h-4 mr-2" />
                Open Generator
              </Button>
            </Link>
          </div>
        </div>

        {/* Chat Assistant Card */}
        <div className="p-6 rounded-3xl bg-gradient-to-br from-emerald-50 to-emerald-100 dark:from-emerald-950/20 dark:to-emerald-900/10 border border-emerald-200 dark:border-emerald-800/40 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <MessageSquare className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
              <h2 className="text-xl font-bold">AI Chat Assistant</h2>
            </div>
            <p className="text-sm text-muted-foreground mb-6 leading-relaxed">
              Get instant answers, brainstorm ideas, draft outlines, and get copy suggestions with a persistent contextual helper.
            </p>
          </div>
          <div className="space-y-3.5">
            <p className="text-xs text-muted-foreground font-semibold flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
              Maintains session history and message context
            </p>
            <Link href="/dashboard/ai-tools/chat-assistant" className="block">
              <Button className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-5 rounded-xl shadow-sm" size="sm">
                <MessageSquare className="w-4 h-4 mr-2" />
                Start Chat Session
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="p-6 rounded-3xl bg-card border shadow-sm">
        <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
          <span className="w-1 h-5 rounded bg-primary" />
          Recent Activity
        </h2>
        {isLoading ? (
          <div className="space-y-3">
            <Skeleton className="h-10 w-full rounded-lg animate-pulse" />
            <Skeleton className="h-10 w-full rounded-lg animate-pulse" />
          </div>
        ) : recentActivities.length > 0 ? (
          <div className="space-y-4">
            {recentActivities.map((act, index) => (
              <div key={index} className="text-sm border-b pb-3.5 last:border-0 last:pb-0 hover:bg-muted/10 transition-colors rounded px-2 py-1">
                <p className="font-semibold text-foreground">{act.description}</p>
                <p className="text-xs text-muted-foreground mt-1 font-medium">{act.time}</p>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8 text-muted-foreground text-sm">
            No recent activity records. Start generating content to populate activity.
          </div>
        )}
      </div>

      {/* Admin / Manager Section */}
      {(isAdmin || isManager) && (
        <div className="p-6 rounded-3xl bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800/40 shadow-sm">
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
            <span className="w-1 h-5 rounded bg-blue-500" />
            {isAdmin ? 'Admin Console' : 'Manager Console'}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {isAdmin && (
              <Link href="/dashboard/admin/users">
                <Button className="w-full py-5 rounded-xl font-semibold border-blue-200 dark:border-blue-800/40" variant="outline">
                  Manage Users
                </Button>
              </Link>
            )}
            <Link href="/dashboard/admin/content" className={isManager && !isAdmin ? "col-span-1 sm:col-span-1.5" : ""}>
              <Button className="w-full py-5 rounded-xl font-semibold border-blue-200 dark:border-blue-800/40" variant="outline">
                Review Content
              </Button>
            </Link>
            <Link href="/dashboard/admin/stats" className={isManager && !isAdmin ? "col-span-1 sm:col-span-1.5" : ""}>
              <Button className="w-full py-5 rounded-xl font-semibold border-blue-200 dark:border-blue-800/40" variant="outline">
                View Analytics
              </Button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
