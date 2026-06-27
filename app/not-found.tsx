import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ROUTES } from '@/config/constants'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full text-center space-y-8">
        {/* 404 Illustration */}
        <div className="space-y-4">
          <h1 className="text-6xl sm:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-emerald-600">
            404
          </h1>
          <p className="text-3xl font-bold">Page Not Found</p>
        </div>

        {/* Description */}
        <div className="space-y-2">
          <p className="text-muted-foreground">
            The page you&apos;re looking for doesn&apos;t exist or has been moved.
          </p>
          <p className="text-sm text-muted-foreground">
            Let&apos;s get you back on track.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3">
          <Link href={ROUTES.HOME} className="block">
            <Button size="lg" className="w-full">
              Go Home
            </Button>
          </Link>
          <Link href={ROUTES.EXPLORE} className="block">
            <Button size="lg" variant="outline" className="w-full">
              Explore Content
            </Button>
          </Link>
          <Link href={ROUTES.CONTACT} className="block">
            <Button size="lg" variant="ghost" className="w-full">
              Contact Support
            </Button>
          </Link>
        </div>

        {/* Navigation Links */}
        <nav className="flex flex-wrap justify-center gap-4 text-sm">
          <Link href={ROUTES.HOME} className="text-primary hover:underline">
            Home
          </Link>
          <span className="text-muted-foreground">•</span>
          <Link href={ROUTES.ABOUT} className="text-primary hover:underline">
            About
          </Link>
          <span className="text-muted-foreground">•</span>
          <Link href={ROUTES.BLOG} className="text-primary hover:underline">
            Blog
          </Link>
          <span className="text-muted-foreground">•</span>
          <Link href={ROUTES.PRIVACY} className="text-primary hover:underline">
            Privacy
          </Link>
        </nav>
      </div>
    </div>
  )
}
