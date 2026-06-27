'use client'

import { useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { AlertCircle, Home } from 'lucide-react'
import Link from 'next/link'

export default function ChatError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="p-6 flex flex-col items-center justify-center min-h-screen gap-6">
      <AlertCircle className="w-16 h-16 text-red-500" />
      <div className="text-center space-y-2">
        <h1 className="text-2xl font-bold">Something went wrong!</h1>
        <p className="text-muted-foreground">
          We encountered an error while loading the chat assistant. Please try again.
        </p>
      </div>
      <div className="flex gap-4">
        <Button onClick={reset}>
          Try again
        </Button>
        <Link href="/dashboard">
          <Button variant="outline">
            <Home className="w-4 h-4 mr-2" />
            Back to Dashboard
          </Button>
        </Link>
      </div>
    </div>
  )
}
