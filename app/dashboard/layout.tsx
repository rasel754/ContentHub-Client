import { ReactNode } from 'react'
import { currentUser } from '@clerk/nextjs/server'
import Link from 'next/link'
import { ROUTES } from '@/config/constants'
import { DashboardSidebar } from '@/components/dashboard/dashboard-sidebar'

const navItems = [
  { iconName: 'home', label: 'Overview', href: ROUTES.DASHBOARD },
  { iconName: 'sparkles', label: 'Content Generator', href: '/dashboard/ai-tools/content-generator' },
  { iconName: 'message-square', label: 'Chat Assistant', href: '/dashboard/ai-tools/chat-assistant' },
  { iconName: 'user', label: 'Profile', href: '/dashboard/profile' },
  { iconName: 'bar-chart-3', label: 'Analytics', href: '/dashboard/analytics' },
]

const adminItems = [
  { iconName: 'users', label: 'Users', href: '/dashboard/admin/users' },
  { iconName: 'file-text', label: 'Content', href: '/dashboard/admin/content' },
  { iconName: 'bar-chart-3', label: 'Stats', href: '/dashboard/admin/stats' },
]

export default async function DashboardLayout({
  children,
}: {
  children: ReactNode
}) {
  const user = await currentUser()

  // Middleware handles authentication redirect, this layout just renders authenticated content
  const isAdmin = user?.publicMetadata?.role === 'admin'

  const plainUser = user ? {
    firstName: user.firstName,
    emailAddresses: user.emailAddresses.map(email => ({
      emailAddress: email.emailAddress
    }))
  } : null

  return (
    <div className="flex h-screen bg-background">
      <DashboardSidebar
        user={plainUser}
        isAdmin={isAdmin}
        navItems={navItems}
        adminItems={adminItems}
      />

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Bar */}
        <header className="border-b h-16 flex items-center px-6">
          <h1 className="text-2xl font-bold">Welcome, {user?.firstName || 'User'}!</h1>
        </header>

        {/* Content */}
        <main className="flex-1 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  )
}
