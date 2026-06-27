'use client';

import React, { useEffect, useState } from 'react';
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { Skeleton } from '@/components/ui/skeleton';

// Hydration guard wrapper to prevent SSR mismatch in Next.js
function ChartHydrationGuard({ children }: { children: React.ReactNode }) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return (
      <div className="w-full h-full flex flex-col justify-between p-4 space-y-4">
        <Skeleton className="h-6 w-1/3 rounded-lg" />
        <div className="flex-1 flex items-end gap-2 pt-4">
          <Skeleton className="h-[20%] flex-1 rounded-t animate-pulse" />
          <Skeleton className="h-[45%] flex-1 rounded-t animate-pulse" />
          <Skeleton className="h-[75%] flex-1 rounded-t animate-pulse" />
          <Skeleton className="h-[50%] flex-1 rounded-t animate-pulse" />
          <Skeleton className="h-[90%] flex-1 rounded-t animate-pulse" />
          <Skeleton className="h-[60%] flex-1 rounded-t animate-pulse" />
        </div>
      </div>
    );
  }

  return <>{children}</>;
}

// Custom Tooltip component for a highly premium, modern dark/light glassmorphic look
interface CustomTooltipProps {
  active?: boolean;
  payload?: any[];
  label?: string;
  valueFormatter?: (val: any) => string;
}

const CustomTooltip = ({ active, payload, label, valueFormatter }: CustomTooltipProps) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-card/95 border border-border backdrop-blur-md px-4 py-3 rounded-xl shadow-xl space-y-1 animate-in fade-in duration-200">
        <p className="text-xs font-semibold text-muted-foreground">{label}</p>
        {payload.map((entry, index) => (
          <p key={index} className="text-sm font-bold text-foreground">
            <span className="inline-block w-2.5 h-2.5 rounded-full mr-2" style={{ backgroundColor: entry.color || entry.fill }} />
            {entry.name}: <span className="font-mono">{valueFormatter ? valueFormatter(entry.value) : entry.value}</span>
          </p>
        ))}
      </div>
    );
  }
  return null;
};

// 1. Line/Area Chart for Activity Over Time
export interface ActivityChartData {
  date: string;
  count: number;
}

interface ActivityOverTimeChartProps {
  data: ActivityChartData[];
  height?: number | string;
  name?: string;
}

export function ActivityOverTimeChart({ data, height = 300, name = 'Creations' }: ActivityOverTimeChartProps) {
  return (
    <div style={{ width: '100%', height }} className="relative font-sans text-xs">
      <ChartHydrationGuard>
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="colorActivity" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="var(--primary, #3b82f6)" stopOpacity={0.35} />
                <stop offset="95%" stopColor="var(--primary, #3b82f6)" stopOpacity={0.0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(156, 163, 175, 0.15)" />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tick={{ fill: '#9ca3af', fontSize: 11 }}
              dy={10}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              tick={{ fill: '#9ca3af', fontSize: 11 }}
              dx={-5}
            />
            <Tooltip content={<CustomTooltip valueFormatter={(v) => `${v} items`} />} />
            <Area
              type="monotone"
              dataKey="count"
              name={name}
              stroke="var(--primary, #3b82f6)"
              strokeWidth={2.5}
              fillOpacity={1}
              fill="url(#colorActivity)"
              activeDot={{ r: 6, strokeWidth: 0, fill: 'var(--primary, #3b82f6)' }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </ChartHydrationGuard>
    </div>
  );
}

// 2. Bar Chart for Content/Posts Count
export interface BarChartData {
  label: string;
  count: number;
}

interface ContentCountChartProps {
  data: BarChartData[];
  height?: number | string;
  name?: string;
  color?: string;
}

export function ContentCountChart({ data, height = 300, name = 'Posts', color = '#3b82f6' }: ContentCountChartProps) {
  return (
    <div style={{ width: '100%', height }} className="relative font-sans text-xs">
      <ChartHydrationGuard>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(156, 163, 175, 0.15)" />
            <XAxis
              dataKey="label"
              tickLine={false}
              axisLine={false}
              tick={{ fill: '#9ca3af', fontSize: 11 }}
              dy={10}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              tick={{ fill: '#9ca3af', fontSize: 11 }}
              dx={-5}
            />
            <Tooltip content={<CustomTooltip valueFormatter={(v) => `${v} posts`} />} cursor={{ fill: 'rgba(156, 163, 175, 0.08)', radius: 4 }} />
            <Bar
              dataKey="count"
              name={name}
              fill={color}
              radius={[6, 6, 0, 0]}
              maxBarSize={45}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={index % 2 === 0 ? 'var(--primary, #3b82f6)' : 'var(--secondary, #8b5cf6)'} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </ChartHydrationGuard>
    </div>
  );
}

// 3. Doughnut/Pie Chart for Category Distribution
export interface PieChartData {
  name: string;
  value: number;
  color?: string;
}

interface CategoryDistributionChartProps {
  data: PieChartData[];
  height?: number | string;
}

const DEFAULT_COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#8b5cf6', '#ef4444'];

export function CategoryDistributionChart({ data, height = 300 }: CategoryDistributionChartProps) {
  const total = data.reduce((acc, curr) => acc + curr.value, 0);

  return (
    <div style={{ width: '100%', height }} className="relative font-sans flex flex-col items-center justify-center">
      <ChartHydrationGuard>
        <div className="w-full h-full relative">
          <ResponsiveContainer width="100%" height="90%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius="65%"
                outerRadius="85%"
                paddingAngle={4}
                dataKey="value"
              >
                {data.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={entry.color || DEFAULT_COLORS[index % DEFAULT_COLORS.length]}
                    className="transition-all duration-300 focus:outline-none"
                  />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip valueFormatter={(v) => `${v} (${((v / (total || 1)) * 100).toFixed(1)}%)`} />} />
            </PieChart>
          </ResponsiveContainer>

          {/* Absolute Center Stats Overlay */}
          <div className="absolute top-[45%] left-1/2 -translate-x-1/2 -translate-y-1/2 text-center pointer-events-none">
            <span className="block text-[10px] font-bold text-muted-foreground uppercase tracking-widest leading-none">Total</span>
            <span className="block text-2xl font-black text-foreground mt-1 leading-none font-mono">
              {total.toLocaleString()}
            </span>
          </div>
        </div>

        {/* Legend list below */}
        <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1.5 text-xs text-muted-foreground pb-2">
          {data.map((item, idx) => (
            <div key={idx} className="flex items-center gap-1.5">
              <span
                className="w-2.5 h-2.5 rounded-full inline-block"
                style={{ backgroundColor: item.color || DEFAULT_COLORS[idx % DEFAULT_COLORS.length] }}
              />
              <span className="font-semibold text-foreground">{item.name}</span>
              <span className="font-mono text-[10px] bg-muted px-1.5 py-0.5 rounded">
                {item.value}
              </span>
            </div>
          ))}
        </div>
      </ChartHydrationGuard>
    </div>
  );
}
