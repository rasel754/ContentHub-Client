'use client'

import { useState } from 'react'
import Link from 'next/link'
import { UserButton } from '@clerk/nextjs'
import { ROUTES } from '@/config/constants'
import { Menu, Home, Sparkles, MessageSquare, BarChart3, Users, FileText, User } from 'lucide-react'

const iconMap = {
  home: Home,
  sparkles: Sparkles,
  'message-square': MessageSquare,
  'bar-chart-3': BarChart3,
  users: Users,
  'file-text': FileText,
  user: User,
}

interface DashboardSidebarProps {
  user: {
    firstName: string | null
    emailAddresses: Array<{ emailAddress: string }>
  } | null
  isAdmin: boolean
  navItems: Array<{
    iconName: string
    label: string
    href: string
  }>
  adminItems: Array<{
    iconName: string
    label: string
    href: string
  }>
}

export function DashboardSidebar({
  user,
  isAdmin,
  navItems,
  adminItems,
}: DashboardSidebarProps) {
  const [sidebarOpen, setSidebarOpen] = useState(true)

  return (
    <aside className={`${sidebarOpen ? 'w-64' : 'w-20'} border-r transition-all duration-300 flex flex-col bg-card`}>
      <div className="p-6 border-b flex items-center justify-between">
        {sidebarOpen && (
          <Link href={ROUTES.DASHBOARD} className="flex items-center gap-2 font-bold">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-emerald-500 rounded-lg flex items-center justify-center text-white text-sm font-bold">
              AI
            </div>
            <span className="hidden sm:inline">Dashboard</span>
          </Link>
        )}
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="p-2 hover:bg-muted rounded-lg"
        >
          <Menu size={20} />
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto p-4 space-y-2">
        {/* User Nav */}
        <div>
          {sidebarOpen && <p className="text-xs font-semibold text-muted-foreground mb-3 px-2 uppercase">Menu</p>}
          {navItems.map((item) => {
            const IconComponent = iconMap[item.iconName as keyof typeof iconMap]
            return (
              <Link
                key={item.href}
                href={item.href}
                className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-muted transition-colors text-sm"
              >
                {IconComponent && <IconComponent size={20} />}
                {sidebarOpen && <span>{item.label}</span>}
              </Link>
            )
          })}
        </div>

        {/* Admin Nav */}
        {isAdmin && (
          <div>
            {sidebarOpen && <p className="text-xs font-semibold text-muted-foreground mb-3 px-2 uppercase pt-4">Admin</p>}
            {adminItems.map((item) => {
              const IconComponent = iconMap[item.iconName as keyof typeof iconMap]
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-muted transition-colors text-sm"
                >
                  {IconComponent && <IconComponent size={20} />}
                  {sidebarOpen && <span>{item.label}</span>}
                </Link>
              )
            })}
          </div>
        )}
      </nav>

      {/* User Profile */}
      <div className="border-t p-4">
        <div className="flex items-center gap-3">
          <UserButton
            appearance={{
              elements: {
                avatarBox: 'w-10 h-10'
              }
            }}
          />
          {sidebarOpen && user && (
            <Link href="/dashboard/profile" className="flex-1 min-w-0 hover:text-primary transition-colors cursor-pointer">
              <p className="text-sm font-semibold truncate">{user.firstName || 'User'}</p>
              <p className="text-xs text-muted-foreground truncate">{user.emailAddresses?.[0]?.emailAddress || 'user@example.com'}</p>
            </Link>
          )}
        </div>
      </div>
    </aside>
  )
}
