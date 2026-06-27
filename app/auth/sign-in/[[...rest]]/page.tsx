'use client'

import Link from 'next/link'
import { SignIn } from '@clerk/nextjs'
import { ROUTES } from '@/config/constants'
import { Button } from '@/components/ui/button'

export default function SignInPage() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        {/* Header */}
        <div className="text-center">
          <Link href={ROUTES.HOME} className="inline-flex items-center gap-2 font-bold text-xl mb-8">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-emerald-500 rounded-lg flex items-center justify-center text-white font-bold">
              AI
            </div>
            <span>ContentHub</span>
          </Link>
          <h1 className="text-3xl font-bold">Sign In</h1>
          <p className="mt-2 text-muted-foreground">
            Welcome back! Sign in to your account to continue.
          </p>
        </div>

        {/* Clerk Sign In */}
        <div className="w-full">
          <SignIn
            appearance={{
              elements: {
                formButtonPrimary: 'bg-primary text-primary-foreground hover:bg-primary/90 w-full',
                card: 'bg-background border border-border',
                headerTitle: 'hidden',
                headerSubtitle: 'hidden',
              }
            }}
          />
        </div>

        {/* Footer */}
        <div className="text-center">
          <p className="text-muted-foreground">
            Don&apos;t have an account?{' '}
            <Link href={ROUTES.REGISTER} className="text-primary hover:underline font-medium">
              Sign up
            </Link>
          </p>
        </div>

        {/* Back Link */}
        <div className="text-center">
          <Link href={ROUTES.HOME}>
            <Button variant="outline" className="w-full">
              Back to Home
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
