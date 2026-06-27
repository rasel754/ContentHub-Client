'use client'

import React from 'react'
import { Eye, Clock, BarChart3, TrendingUp } from 'lucide-react'
import { Line, Doughnut } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
} from 'chart.js'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
)

export default function AnalyticsPage() {
  // Line Chart Data & Options (Traffic Trend)
  const trafficData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
      {
        label: 'Daily Views',
        data: [1200, 1900, 1600, 2100, 2800, 2200, 1800],
        borderColor: '#3b82f6',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        tension: 0.4,
        fill: true,
        pointBackgroundColor: '#3b82f6',
      },
    ],
  }

  const trafficOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: '#1f2937',
        titleColor: '#fff',
        bodyColor: '#fff',
        padding: 12,
        borderRadius: 8,
      },
    },
    scales: {
      y: {
        grid: {
          color: 'rgba(156, 163, 175, 0.15)',
        },
        ticks: {
          color: '#9ca3af',
        },
      },
      x: {
        grid: {
          display: false,
        },
        ticks: {
          color: '#9ca3af',
        },
      },
    },
  }

  // Doughnut Chart Data & Options (Traffic Sources)
  const sourceData = {
    labels: ['Direct', 'Search', 'Social', 'Referral'],
    datasets: [
      {
        data: [45, 30, 20, 5],
        backgroundColor: ['#3b82f6', '#10b981', '#f59e0b', '#ef4444'],
        borderWidth: 0,
      },
    ],
  }

  const sourceOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom' as const,
        labels: {
          color: '#9ca3af',
          padding: 15,
          font: {
            size: 12,
          },
        },
      },
      tooltip: {
        padding: 12,
        borderRadius: 8,
      },
    },
    cutout: '70%',
  }

  return (
    <div className="p-6 space-y-6 animate-in fade-in duration-300">
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
            <Clock className="w-4 h-4 text-primary" />
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
            <BarChart3 className="w-4 h-4 text-primary" />
          </div>
          <p className="text-3xl font-bold">32%</p>
          <p className="text-xs text-green-600 mt-1">-5% from last month</p>
        </div>
      </div>

      {/* Traffic Trend Section */}
      <div className="p-6 rounded-lg bg-card border">
        <h2 className="text-lg font-semibold mb-6">Traffic Trend</h2>
        <div className="h-80 relative">
          <Line data={trafficData} options={trafficOptions} />
        </div>
      </div>

      {/* Top Content and Traffic Sources Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="p-6 rounded-lg bg-card border">
          <h2 className="text-lg font-semibold mb-4">Top Content</h2>
          <div className="space-y-4">
            {[
              { title: 'AI Generation Guide', views: 4200 },
              { title: 'Content Strategy 101', views: 3800 },
              { title: 'Tools Review 2024', views: 3100 },
              { title: 'Prompt Engineering', views: 2900 },
              { title: 'Future of AI', views: 2400 },
            ].map((item, idx) => (
              <div key={idx} className="flex items-center justify-between text-sm border-b pb-2 last:border-0 last:pb-0">
                <span className="font-medium text-foreground">{item.title}</span>
                <span className="text-muted-foreground font-mono font-semibold">{item.views.toLocaleString()}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="p-6 rounded-lg bg-card border">
          <h2 className="text-lg font-semibold mb-4">Traffic Source</h2>
          <div className="h-64 relative">
            <Doughnut data={sourceData} options={sourceOptions} />
          </div>
        </div>
      </div>
    </div>
  )
}
