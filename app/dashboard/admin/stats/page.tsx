'use client'

export const dynamic = 'force-dynamic'

import { BarChart as BarChartIcon, TrendingUp, Users, FileText } from 'lucide-react'

const StatCard = ({ icon: Icon, label, value, change }: any) => (
  <div className="p-6 rounded-lg bg-card border hover:border-primary transition-colors">
    <div className="flex items-center justify-between mb-2">
      <h3 className="text-sm font-medium text-muted-foreground">{label}</h3>
      <Icon className="w-4 h-4 text-primary" />
    </div>
    <p className="text-3xl font-bold">{value}</p>
    <p className={`text-xs mt-1 ${change > 0 ? 'text-green-600' : 'text-red-600'}`}>
      {change > 0 ? '+' : ''}{change}% from last period
    </p>
  </div>
)

export default function AdminStatsPage() {
  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">Analytics Dashboard</h1>
        <p className="text-muted-foreground">Platform-wide metrics and statistics</p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard icon={Users} label="Total Users" value="1,234" change={12} />
        <StatCard icon={FileText} label="Content Generated" value="45.2K" change={28} />
        <StatCard icon={TrendingUp} label="Avg Engagement" value="6.8%" change={5} />
        <StatCard icon={BarChartIcon} label="Platform Revenue" value="$12.4K" change={18} />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Users Growth */}
        <div className="p-6 rounded-lg bg-card border">
          <h2 className="text-lg font-semibold mb-4">User Growth</h2>
          <div className="space-y-3">
            {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'].map((month, idx) => {
              const height = (idx + 1) * 15 + 10
              return (
                <div key={month} className="flex items-end gap-2">
                  <span className="text-xs text-muted-foreground w-8">{month}</span>
                  <div
                    className="bg-gradient-to-t from-blue-500 to-blue-400 rounded-t"
                    style={{ height: `${height}px`, width: '100%' }}
                  />
                  <span className="text-xs text-muted-foreground">{(idx + 1) * 200}</span>
                </div>
              )
            })}
          </div>
        </div>

        {/* Content Distribution */}
        <div className="p-6 rounded-lg bg-card border">
          <h2 className="text-lg font-semibold mb-4">Content Types</h2>
          <div className="space-y-4">
            {[
              { label: 'Blog Articles', value: 35, percent: 35 },
              { label: 'Social Posts', value: 28, percent: 28 },
              { label: 'Email Copies', value: 22, percent: 22 },
              { label: 'Scripts', value: 15, percent: 15 },
            ].map(item => (
              <div key={item.label}>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-medium">{item.label}</span>
                  <span className="text-sm text-muted-foreground">{item.percent}%</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div
                    className="bg-primary rounded-full h-2 transition-all"
                    style={{ width: `${item.percent}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Performance Table */}
      <div className="p-6 rounded-lg bg-card border">
        <h2 className="text-lg font-semibold mb-4">Top Performing Content</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="border-b">
              <tr>
                <th className="px-4 py-2 text-left font-medium">Title</th>
                <th className="px-4 py-2 text-left font-medium">Views</th>
                <th className="px-4 py-2 text-left font-medium">Engagement</th>
                <th className="px-4 py-2 text-left font-medium">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {[
                { title: 'AI Content Generation Guide', views: 12500, eng: '8.2%', date: 'Dec 15' },
                { title: 'Top Tools for 2024', views: 9800, eng: '7.1%', date: 'Dec 10' },
                { title: 'Content Strategy Tips', views: 8300, eng: '6.5%', date: 'Dec 5' },
              ].map(item => (
                <tr key={item.title} className="hover:bg-muted/50">
                  <td className="px-4 py-3">{item.title}</td>
                  <td className="px-4 py-3">{item.views.toLocaleString()}</td>
                  <td className="px-4 py-3">{item.eng}</td>
                  <td className="px-4 py-3 text-muted-foreground">{item.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
