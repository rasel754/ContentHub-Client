'use client'

export const dynamic = 'force-dynamic'

import Link from 'next/link'
import { useUser } from '@clerk/nextjs'
import { Button } from '@/components/ui/button'
import { BarChart3, FileText, Zap, TrendingUp, Sparkles, MessageSquare } from 'lucide-react'

export default function DashboardPage() {
  const { user } = useUser()
  const isAdmin = user?.publicMetadata?.role === 'admin'
  const isManager = user?.publicMetadata?.role === 'manager'

  return (
    <div className="p-6 space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-6 rounded-lg bg-card border hover:border-primary transition-colors">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium text-muted-foreground">Content Generated</h3>
            <FileText className="w-4 h-4 text-primary" />
          </div>
          <p className="text-3xl font-bold">342</p>
          <p className="text-xs text-muted-foreground mt-1">+12 this month</p>
        </div>

        <div className="p-6 rounded-lg bg-card border hover:border-primary transition-colors">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium text-muted-foreground">Total Views</h3>
            <TrendingUp className="w-4 h-4 text-primary" />
          </div>
          <p className="text-3xl font-bold">24.5K</p>
          <p className="text-xs text-muted-foreground mt-1">+8.2% from last month</p>
        </div>

        <div className="p-6 rounded-lg bg-card border hover:border-primary transition-colors">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium text-muted-foreground">Engagement Rate</h3>
            <BarChart3 className="w-4 h-4 text-primary" />
          </div>
          <p className="text-3xl font-bold">6.2%</p>
          <p className="text-xs text-muted-foreground mt-1">+1.4% from last month</p>
        </div>

        <div className="p-6 rounded-lg bg-card border hover:border-primary transition-colors">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium text-muted-foreground">Credits Used</h3>
            <Zap className="w-4 h-4 text-primary" />
          </div>
          <p className="text-3xl font-bold">780/1000</p>
          <p className="text-xs text-muted-foreground mt-1">78% used this month</p>
        </div>
      </div>

      {/* AI Features */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Content Generator Card */}
        <div className="p-6 rounded-lg bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 border border-blue-200 dark:border-blue-700">
          <div className="flex items-center gap-2 mb-4">
            <Sparkles className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            <h2 className="text-xl font-bold">AI Content Generator</h2>
          </div>
          <p className="text-sm text-muted-foreground mb-4">
            Create engaging blog posts, social media content, emails, and video scripts with AI-powered generation.
          </p>
          <div className="space-y-2">
            <Link href="/dashboard/ai-tools/content-generator?type=article" className="block">
              <Button className="w-full justify-start" variant="outline" size="sm">
                <FileText className="w-4 h-4 mr-2" />
                Create Blog Article
              </Button>
            </Link>
            <Link href="/dashboard/ai-tools/content-generator?type=social" className="block">
              <Button className="w-full justify-start" variant="outline" size="sm">
                <FileText className="w-4 h-4 mr-2" />
                Generate Social Post
              </Button>
            </Link>
            <Link href="/dashboard/ai-tools/content-generator" className="block">
              <Button className="w-full" size="sm">
                <Sparkles className="w-4 h-4 mr-2" />
                Open Generator
              </Button>
            </Link>
          </div>
        </div>

        {/* Chat Assistant Card */}
        <div className="p-6 rounded-lg bg-gradient-to-br from-emerald-50 to-emerald-100 dark:from-emerald-900/20 dark:to-emerald-800/20 border border-emerald-200 dark:border-emerald-700">
          <div className="flex items-center gap-2 mb-4">
            <MessageSquare className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
            <h2 className="text-xl font-bold">AI Chat Assistant</h2>
          </div>
          <p className="text-sm text-muted-foreground mb-4">
            Get instant answers, brainstorm ideas, and get writing suggestions with your personal AI assistant.
          </p>
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">
              <span className="font-semibold">Use for:</span> Questions, brainstorming, writing help, and more.
            </p>
            <Link href="/dashboard/ai-tools/chat-assistant" className="block">
              <Button className="w-full bg-emerald-600 hover:bg-emerald-700" size="sm">
                <MessageSquare className="w-4 h-4 mr-2" />
                Start Chat
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="p-6 rounded-lg bg-card border">
        <h2 className="text-xl font-bold mb-4">Recent Activity</h2>
        <div className="space-y-4">
          {[1, 2, 3].map((item) => (
            <div key={item} className="text-sm border-b pb-3 last:border-0">
              <p className="font-medium">Generated article about AI trends</p>
              <p className="text-xs text-muted-foreground">2 hours ago</p>
            </div>
          ))}
        </div>
      </div>

      {/* Admin / Manager Section */}
      {(isAdmin || isManager) && (
        <div className="p-6 rounded-lg bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800">
          <h2 className="text-xl font-bold mb-4">{isAdmin ? 'Admin Tools' : 'Manager Tools'}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {isAdmin && (
              <Link href="/dashboard/admin/users">
                <Button className="w-full" variant="outline">
                  Manage Users
                </Button>
              </Link>
            )}
            <Link href="/dashboard/admin/content" className={isManager && !isAdmin ? "col-span-1 sm:col-span-1.5" : ""}>
              <Button className="w-full" variant="outline">
                Review Content
              </Button>
            </Link>
            <Link href="/dashboard/admin/stats" className={isManager && !isAdmin ? "col-span-1 sm:col-span-1.5" : ""}>
              <Button className="w-full" variant="outline">
                View Analytics
              </Button>
            </Link>
          </div>
        </div>
      )}
    </div>
  )
}
