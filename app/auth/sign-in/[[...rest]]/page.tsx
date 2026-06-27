'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { SignIn, useSignIn } from '@clerk/nextjs'
import { ROUTES } from '@/config/constants'
import { Button } from '@/components/ui/button'
import { useToast } from '@/components/ui/toast'
import { Loader2 } from 'lucide-react'

export default function SignInPage() {
  const { signIn, setActive, isLoaded } = useSignIn()
  const router = useRouter()
  const { error, success } = useToast()
  const [isDemoLoading, setIsDemoLoading] = useState(false)

  const handleDemoLogin = async () => {
    if (!isLoaded) return
    setIsDemoLoading(true)
    try {
      const result = await signIn.create({
        identifier: 'demo@contenthub.ai',
        password: 'DemoPassword123!',
      })
      if (result.status === 'complete') {
        await setActive({ session: result.createdSessionId })
        success('Successfully logged in as Demo User!')
        router.push(ROUTES.DASHBOARD)
      } else {
        console.warn('Authentication status incompleted:', result)
      }
    } catch (err: any) {
      console.error('Demo authentication error:', err)
      error(err.message || 'Demo user authentication failed.')
    } finally {
      setIsDemoLoading(false)
    }
  }

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

        {/* Demo User Login Box */}
        <div className="bg-card border rounded-2xl p-6 shadow-sm text-center space-y-4">
          <div className="space-y-1">
            <h3 className="font-bold text-sm">Want to preview the app?</h3>
            <p className="text-xs text-muted-foreground">Log in with a single click as a developer guest user</p>
          </div>
          <Button
            onClick={handleDemoLogin}
            disabled={isDemoLoading || !isLoaded}
            className="w-full bg-gradient-to-r from-blue-600 to-emerald-600 hover:from-blue-700 hover:to-emerald-700 text-white font-bold py-5 rounded-xl cursor-pointer"
          >
            {isDemoLoading ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Logging in...
              </>
            ) : (
              'Login as Demo User'
            )}
          </Button>
        </div>

        <div className="relative flex py-2 items-center text-muted-foreground text-xs uppercase">
          <div className="flex-grow border-t"></div>
          <span className="flex-shrink mx-4">Or use credentials</span>
          <div className="flex-grow border-t"></div>
        </div>

        {/* Clerk Sign In */}
        <div className="w-full">
          <SignIn
            appearance={{
              elements: {
                formButtonPrimary: 'bg-primary text-primary-foreground hover:bg-primary/90 w-full',
                card: 'bg-background border border-border shadow-none w-full max-w-none m-0',
                headerTitle: 'hidden',
                headerSubtitle: 'hidden',
                footer: 'hidden',
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
            <Button variant="outline" className="w-full py-5 rounded-xl">
              Back to Home
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
