'use client'

export const dynamic = 'force-dynamic'

import { LineChart, BarChart3, TrendingUp, Eye } from 'lucide-react'

export default function AnalyticsPage() {
  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">Analytics</h1>
        <p className="text-muted-foreground">Track your content performance and insights</p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-6 rounded-lg bg-card border hover:border-primary transition-colors">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium text-muted-foreground">Total Views</h3>
            <Eye className="w-4 h-4 text-primary" />
          </div>
          <p className="text-3xl font-bold">24.5K</p>
          <p className="text-xs text-green-600 mt-1">+12% from last month</p>
        </div>

        <div className="p-6 rounded-lg bg-card border hover:border-primary transition-colors">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium text-muted-foreground">Avg Session Time</h3>
            <BarChart3 className="w-4 h-4 text-primary" />
          </div>
          <p className="text-3xl font-bold">4m 32s</p>
          <p className="text-xs text-green-600 mt-1">+8% from last month</p>
        </div>

        <div className="p-6 rounded-lg bg-card border hover:border-primary transition-colors">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium text-muted-foreground">Engagement Rate</h3>
            <TrendingUp className="w-4 h-4 text-primary" />
          </div>
          <p className="text-3xl font-bold">6.2%</p>
          <p className="text-xs text-green-600 mt-1">+3% from last month</p>
        </div>

        <div className="p-6 rounded-lg bg-card border hover:border-primary transition-colors">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium text-muted-foreground">Bounce Rate</h3>
            <LineChart className="w-4 h-4 text-primary" />
          </div>
          <p className="text-3xl font-bold">32%</p>
          <p className="text-xs text-green-600 mt-1">-5% from last month</p>
        </div>
      </div>

      {/* Traffic Trend */}
      <div className="p-6 rounded-lg bg-card border">
        <h2 className="text-lg font-semibold mb-6">Traffic Trend</h2>
        <div className="space-y-4">
          {[
            { day: 'Mon', views: 1200, color: 'w-1/4' },
            { day: 'Tue', views: 1900, color: 'w-2/4' },
            { day: 'Wed', views: 1600, color: 'w-3/5' },
            { day: 'Thu', views: 2100, color: 'w-2/3' },
            { day: 'Fri', views: 2800, color: 'w-4/5' },
            { day: 'Sat', views: 2200, color: 'w-3/4' },
            { day: 'Sun', views: 1800, color: 'w-7/12' },
          ].map((item, idx) => (
            <div key={idx}>
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium">{item.day}</span>
                <span className="text-sm text-muted-foreground">{item.views.toLocaleString()} views</span>
              </div>
              <div className="w-full bg-muted rounded-full h-2">
                <div className={`bg-gradient-to-r from-blue-500 to-emerald-500 rounded-full h-2 ${item.color}`} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Top Content */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="p-6 rounded-lg bg-card border">
          <h2 className="text-lg font-semibold mb-4">Top Content</h2>
          <div className="space-y-3">
            {[
              { title: 'AI Generation Guide', views: 4200 },
              { title: 'Content Strategy 101', views: 3800 },
              { title: 'Tools Review 2024', views: 3100 },
              { title: 'Prompt Engineering', views: 2900 },
              { title: 'Future of AI', views: 2400 },
            ].map((item, idx) => (
              <div key={idx} className="flex items-center justify-between text-sm">
                <span className="font-medium">{item.title}</span>
                <span className="text-muted-foreground">{item.views.toLocaleString()}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="p-6 rounded-lg bg-card border">
          <h2 className="text-lg font-semibold mb-4">Traffic Source</h2>
          <div className="space-y-4">
            {[
              { source: 'Direct', views: 45, percent: 45 },
              { source: 'Search', views: 30, percent: 30 },
              { source: 'Social', views: 20, percent: 20 },
              { source: 'Referral', views: 5, percent: 5 },
            ].map(item => (
              <div key={item.source}>
                <div className="flex justify-between mb-2 text-sm">
                  <span>{item.source}</span>
                  <span className="font-medium">{item.percent}%</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div
                    className="bg-primary rounded-full h-2"
                    style={{ width: `${item.percent}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
