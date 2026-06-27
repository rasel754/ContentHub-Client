'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useUser, SignOutButton } from '@clerk/nextjs'
import { useEffect, useState } from 'react'
import { Menu, X, LogOut, User, Settings } from 'lucide-react'
import { NAV_ITEMS, ROUTES } from '@/config/constants'
import { Button } from '@/components/ui/button'

export function Navbar() {
  const pathname = usePathname()
  const { user, isLoaded } = useUser()
  const router = useRouter()
  const [isOpen, setIsOpen] = useState(false)
  const [isDark, setIsDark] = useState(false)

  useEffect(() => {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    setIsDark(prefersDark)
  }, [])

  const isPublicRoute = !pathname.startsWith('/dashboard')

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href={ROUTES.HOME} className="flex items-center gap-2 font-bold text-xl">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-emerald-500 rounded-lg flex items-center justify-center text-white font-bold">
              AI
            </div>
            <span className="hidden sm:inline">ContentHub</span>
          </Link>

          {/* Desktop Navigation */}
          {isPublicRoute && (
            <div className="hidden md:flex items-center gap-8">
              {NAV_ITEMS.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`text-sm font-medium transition-colors hover:text-primary ${
                    pathname === item.href ? 'text-primary' : 'text-muted-foreground'
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          )}

          {/* Right Side - Auth / Menu */}
          <div className="flex items-center gap-4">
            {/* Theme Toggle */}
            <button
              onClick={() => {
                document.documentElement.classList.toggle('dark')
                setIsDark(!isDark)
              }}
              className="p-2 rounded-lg hover:bg-muted transition-colors"
              aria-label="Toggle theme"
            >
              {isDark ? '☀️' : '🌙'}
            </button>

            {isLoaded && !user && isPublicRoute && (
              <div className="hidden sm:flex gap-2">
                <Link href={ROUTES.LOGIN}>
                  <Button variant="outline">Sign In</Button>
                </Link>
                <Link href={ROUTES.REGISTER}>
                  <Button>Get Started</Button>
                </Link>
              </div>
            )}

            {isLoaded && user && (
              <div className="hidden sm:flex items-center gap-2">
                <Link href={ROUTES.DASHBOARD}>
                  <Button variant="outline" size="sm">Dashboard</Button>
                </Link>
                <div className="relative group">
                  <button className="flex items-center gap-2 p-2 rounded-lg hover:bg-muted transition-colors">
                    <img
                      src={user.imageUrl}
                      alt={user.firstName || 'User'}
                      className="w-8 h-8 rounded-full"
                    />
                  </button>
                  <div className="absolute right-0 mt-2 w-48 bg-background border rounded-lg shadow-lg hidden group-hover:block">
                    <Link
                      href={ROUTES.DASHBOARD}
                      className="flex items-center gap-2 px-4 py-2 text-sm hover:bg-muted"
                    >
                      <User size={16} />
                      Dashboard
                    </Link>
                    <button
                      onClick={() => router.push('/account')}
                      className="flex items-center gap-2 px-4 py-2 text-sm hover:bg-muted w-full text-left"
                    >
                      <Settings size={16} />
                      Settings
                    </button>
                    <SignOutButton>
                      <button className="flex items-center gap-2 px-4 py-2 text-sm hover:bg-muted w-full text-left text-destructive">
                        <LogOut size={16} />
                        Sign Out
                      </button>
                    </SignOutButton>
                  </div>
                </div>
              </div>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-muted"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden border-t py-4">
            <div className="flex flex-col gap-4">
              {isPublicRoute && NAV_ITEMS.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`text-sm font-medium transition-colors hover:text-primary ${
                    pathname === item.href ? 'text-primary' : 'text-muted-foreground'
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
              {!user && isPublicRoute && (
                <div className="flex gap-2 pt-2 border-t">
                  <Link href={ROUTES.LOGIN} className="flex-1">
                    <Button variant="outline" className="w-full">Sign In</Button>
                  </Link>
                  <Link href={ROUTES.REGISTER} className="flex-1">
                    <Button className="w-full">Get Started</Button>
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
