'use client'

import React from 'react'
import { Users, FileText, TrendingUp, DollarSign } from 'lucide-react'
import { Bar, Doughnut } from 'react-chartjs-2'
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
  // Bar Chart Data & Options (User Growth)
  const growthData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Users Registered',
        data: [200, 400, 600, 800, 1000, 1200],
        backgroundColor: '#3b82f6',
        borderRadius: 6,
        hoverBackgroundColor: '#2563eb',
      },
    ],
  }

  const growthOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
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

  // Doughnut Chart Data & Options (Content Distribution)
  const distributionData = {
    labels: ['Blog Articles', 'Social Posts', 'Email Copies', 'Scripts'],
    datasets: [
      {
        data: [35, 28, 22, 15],
        backgroundColor: ['#3b82f6', '#10b981', '#f59e0b', '#8b5cf6'],
        borderWidth: 0,
      },
    ],
  }

  const distributionOptions = {
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
        <h1 className="text-3xl font-bold mb-2">Analytics Dashboard</h1>
        <p className="text-muted-foreground">Platform-wide metrics and statistics</p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard icon={Users} label="Total Users" value="1,234" change={12} />
        <StatCard icon={FileText} label="Content Generated" value="45.2K" change={28} />
        <StatCard icon={TrendingUp} label="Avg Engagement" value="6.8%" change={5} />
        <StatCard icon={DollarSign} label="Platform Revenue" value="$12.4K" change={18} />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* User Growth */}
        <div className="p-6 rounded-lg bg-card border">
          <h2 className="text-lg font-semibold mb-4">User Growth</h2>
          <div className="h-64 relative">
            <Bar data={growthData} options={growthOptions} />
          </div>
        </div>

        {/* Content Distribution */}
        <div className="p-6 rounded-lg bg-card border">
          <h2 className="text-lg font-semibold mb-4">Content Types</h2>
          <div className="h-64 relative">
            <Doughnut data={distributionData} options={distributionOptions} />
          </div>
        </div>
      </div>

      {/* Performance Table */}
      <div className="p-6 rounded-lg bg-card border shadow-sm">
        <h2 className="text-lg font-semibold mb-4">Top Performing Content</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="border-b bg-muted/30">
              <tr className="text-left text-xs font-bold text-muted-foreground uppercase tracking-wider">
                <th className="px-4 py-3 font-semibold">Title</th>
                <th className="px-4 py-3 font-semibold">Views</th>
                <th className="px-4 py-3 font-semibold">Engagement</th>
                <th className="px-4 py-3 font-semibold">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {[
                { title: 'AI Content Generation Guide', views: 12500, eng: '8.2%', date: 'Dec 15' },
                { title: 'Top Tools for 2024', views: 9800, eng: '7.1%', date: 'Dec 10' },
                { title: 'Content Strategy Tips', views: 8300, eng: '6.5%', date: 'Dec 5' },
              ].map(item => (
                <tr key={item.title} className="hover:bg-muted/50 transition-colors">
                  <td className="px-4 py-3.5 font-medium">{item.title}</td>
                  <td className="px-4 py-3.5 font-mono">{item.views.toLocaleString()}</td>
                  <td className="px-4 py-3.5 font-mono text-green-600 font-semibold">{item.eng}</td>
                  <td className="px-4 py-3.5 text-muted-foreground">{item.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
