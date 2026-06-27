'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ROUTES } from '@/config/constants'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log error to error reporting service
    console.error('[v0] Application error:', error)
  }, [error])

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full text-center space-y-8">
        {/* Error Illustration */}
        <div className="space-y-4">
          <h1 className="text-4xl font-bold">Something Went Wrong</h1>
          <p className="text-muted-foreground">
            An unexpected error occurred while loading this page.
          </p>
        </div>

        {/* Error Details */}
        {process.env.NODE_ENV === 'development' && error.message && (
          <div className="p-4 bg-destructive/10 border border-destructive/20 rounded-lg">
            <p className="text-xs text-destructive font-mono break-words">
              {error.message}
            </p>
          </div>
        )}

        {/* Action Buttons */}
        <div className="space-y-3">
          <Button size="lg" onClick={reset} className="w-full">
            Try Again
          </Button>
          <Link href={ROUTES.HOME} className="block">
            <Button size="lg" variant="outline" className="w-full">
              Go Home
            </Button>
          </Link>
        </div>

        {/* Support Link */}
        <p className="text-sm text-muted-foreground">
          If the problem persists,{' '}
          <Link href={ROUTES.CONTACT} className="text-primary hover:underline">
            contact support
          </Link>
          .
        </p>
      </div>
    </div>
  )
}
