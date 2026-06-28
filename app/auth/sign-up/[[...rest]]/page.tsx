'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useSignUp } from '@clerk/nextjs/legacy'
import { ROUTES } from '@/config/constants'
import { Button } from '@/components/ui/button'
import { useToast } from '@/components/ui/toast'
import { Loader2, Mail, Lock, Eye, EyeOff, Sparkles, User, ChevronRight, CheckCircle2 } from 'lucide-react'

export default function SignUpPage() {
  const { isLoaded, signUp, setActive } = useSignUp()
  const router = useRouter()
  const { error, success } = useToast()

  const [loading, setLoading] = useState(false)
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)

  // Verification state for manual fallback
  const [verifying, setVerifying] = useState(false)
  const [code, setCode] = useState('')

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!isLoaded || !signUp) return
    setLoading(true)
    try {
      // 1. Create a sign-up attempt
      await signUp.create({
        emailAddress: email,
        password: password,
        firstName: firstName || undefined,
        lastName: lastName || undefined,
      })

      // Check current sign up attempt status
      if (signUp.status === 'complete') {
        await setActive({ session: signUp.createdSessionId })
        success('Account created successfully!')
        router.push(ROUTES.DASHBOARD)
      } else if (signUp.status === 'missing_requirements') {
        // Clerk requires verification (usually email address OTP)
        // 2. Prepare the email verification
        await signUp.prepareEmailAddressVerification({ strategy: 'email_code' })

        try {
          // 3. Automatically complete sign-up with test code '424242'
          const completeSignUp = await signUp.attemptEmailAddressVerification({
            code: '424242',
          })

          if (completeSignUp.status === 'complete') {
            await setActive({ session: completeSignUp.createdSessionId })
            success('Account created and verified successfully!')
            router.push(ROUTES.DASHBOARD)
          } else {
            setVerifying(true)
          }
        } catch (autoVerifyErr) {
          console.warn('Auto-verification with test code failed, falling back to manual entry:', autoVerifyErr)
          // Fall back to showing manual verification form
          setVerifying(true)
          success('A verification code has been sent to your email. Please enter it below.')
        }
      } else {
        console.warn('Unhandled initial sign up status:', signUp.status)
        error(`Sign up status: ${signUp.status}`)
      }
    } catch (err: any) {
      console.error('Sign-up error:', err)
      error(err.message || 'Something went wrong during sign up.')
    } finally {
      setLoading(false)
    }
  }

  const handleVerifyCode = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!signUp) return
    setLoading(true)
    try {
      const completeSignUp = await signUp.attemptEmailAddressVerification({
        code,
      })
      if (completeSignUp.status === 'complete') {
        await setActive({ session: completeSignUp.createdSessionId })
        success('Account verified successfully! Logged in.')
        router.push(ROUTES.DASHBOARD)
      } else {
        console.warn('Unhandled signUp status after verification:', completeSignUp.status)
        error(`Sign up status: ${completeSignUp.status}`)
      }
    } catch (err: any) {
      console.error('Verification error:', err)
      error(err.message || 'Incorrect verification code.')
    } finally {
      setLoading(false)
    }
  }

  const handleCancelVerification = () => {
    setVerifying(false)
    setCode('')
  }

  const features = [
    {
      title: 'AI Content Generator',
      desc: 'Create SEO-optimized blogs, engaging social media posts, newsletters, and email templates in seconds.',
      icon: Sparkles,
      color: 'text-violet-400 bg-violet-500/10 border-violet-500/20'
    },
    {
      title: 'Advanced Analytics',
      desc: 'Analyze content engagement and track audience behavior using beautiful platform metrics dashboards.',
      icon: CheckCircle2,
      color: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20'
    },
    {
      title: 'Role-Based Collaboration',
      desc: 'Collaborate seamlessly with managers and admins using our advanced permissions structure.',
      icon: User,
      color: 'text-blue-400 bg-blue-500/10 border-blue-500/20'
    }
  ]

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-900 via-slate-950 to-black">
      <div className="max-w-5xl w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        
        {/* Sign Up Form Column */}
        <div className="lg:col-span-6 flex flex-col justify-center">
          <div className="bg-slate-900/60 border border-slate-800/80 rounded-3xl p-8 shadow-2xl backdrop-blur-md flex flex-col justify-between h-full">
            <div>
              {/* Header */}
              <div className="text-center lg:text-left">
                <Link href={ROUTES.HOME} className="inline-flex items-center gap-2 font-bold text-xl mb-6">
                  <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-emerald-500 rounded-lg flex items-center justify-center text-white font-bold">
                    AI
                  </div>
                  <span className="bg-gradient-to-r from-slate-100 to-slate-300 bg-clip-text text-transparent">ContentHub</span>
                </Link>
                
                <h1 className="text-3xl font-extrabold tracking-tight bg-gradient-to-r from-white via-slate-100 to-slate-400 bg-clip-text text-transparent">
                  {verifying ? 'Verify Email' : 'Create Account'}
                </h1>
                <p className="mt-2 text-sm text-slate-400">
                  {verifying 
                    ? 'A verification code has been sent to your email to confirm registration.' 
                    : 'Join thousands of creators using ContentHub to generate amazing content.'}
                </p>
              </div>

              {/* Form */}
              {verifying ? (
                /* Verification Code Input Form */
                <form onSubmit={handleVerifyCode} className="mt-8 space-y-6">
                  <div>
                    <label htmlFor="code" className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                      Verification Code
                    </label>
                    <div className="relative rounded-xl shadow-sm">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <Sparkles className="h-5 w-5 text-slate-500" />
                      </div>
                      <input
                        type="text"
                        name="code"
                        id="code"
                        required
                        value={code}
                        onChange={(e) => setCode(e.target.value)}
                        placeholder="Enter 6-digit verification code"
                        className="block w-full pl-11 pr-4 py-3 bg-slate-950/65 border border-slate-800/80 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 text-slate-100 placeholder-slate-600 transition-all duration-200 text-sm font-mono"
                      />
                    </div>
                  </div>

                  <div className="flex flex-col gap-3">
                    <Button
                      type="submit"
                      disabled={loading}
                      className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-semibold py-6 rounded-xl shadow-lg transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer border-none"
                    >
                      {loading ? (
                        <>
                          <Loader2 className="w-5 h-5 animate-spin" />
                          Verifying...
                        </>
                      ) : (
                        <>
                          Confirm Verification Code
                          <ChevronRight className="w-4 h-4" />
                        </>
                      )}
                    </Button>
                    
                    <Button
                      type="button"
                      variant="outline"
                      onClick={handleCancelVerification}
                      className="w-full py-6 rounded-xl border border-slate-800 hover:bg-slate-850/50 hover:text-white"
                    >
                      Cancel & Go Back
                    </Button>
                  </div>
                </form>
              ) : (
                <form onSubmit={handleSignUp} className="mt-8 space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    {/* First Name */}
                    <div>
                      <label htmlFor="firstName" className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                        First Name
                      </label>
                      <input
                        type="text"
                        name="firstName"
                        id="firstName"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        placeholder="John"
                        className="block w-full px-4 py-3 bg-slate-950/65 border border-slate-800/80 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 text-slate-100 placeholder-slate-600 transition-all duration-200 text-sm"
                      />
                    </div>
                    {/* Last Name */}
                    <div>
                      <label htmlFor="lastName" className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                        Last Name
                      </label>
                      <input
                        type="text"
                        name="lastName"
                        id="lastName"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        placeholder="Doe"
                        className="block w-full px-4 py-3 bg-slate-950/65 border border-slate-800/80 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 text-slate-100 placeholder-slate-600 transition-all duration-200 text-sm"
                      />
                    </div>
                  </div>

                  {/* Email Address */}
                  <div>
                    <label htmlFor="email" className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                      Email Address
                    </label>
                    <div className="relative rounded-xl shadow-sm">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <Mail className="h-5 w-5 text-slate-500" />
                      </div>
                      <input
                        type="email"
                        name="email"
                        id="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="you@example.com"
                        className="block w-full pl-11 pr-4 py-3 bg-slate-950/65 border border-slate-800/80 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 text-slate-100 placeholder-slate-600 transition-all duration-200 text-sm"
                      />
                    </div>
                  </div>

                  {/* Password */}
                  <div>
                    <label htmlFor="password" className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                      Password
                    </label>
                    <div className="relative rounded-xl shadow-sm">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <Lock className="h-5 w-5 text-slate-500" />
                      </div>
                      <input
                        type={showPassword ? "text" : "password"}
                        name="password"
                        id="password"
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="••••••••"
                        className="block w-full pl-11 pr-12 py-3 bg-slate-950/65 border border-slate-800/80 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 text-slate-100 placeholder-slate-600 transition-all duration-200 text-sm"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-500 hover:text-slate-300 transition-colors"
                      >
                        {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                      </button>
                    </div>
                  </div>

                  <div className="pt-2">
                    <Button
                      type="submit"
                      disabled={loading}
                      className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-semibold py-6 rounded-xl shadow-lg shadow-blue-500/10 hover:shadow-blue-500/20 transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed border-none"
                    >
                      {loading ? (
                        <>
                          <Loader2 className="w-5 h-5 animate-spin" />
                          Creating account...
                        </>
                      ) : (
                        <>
                          Sign Up with Credentials
                          <ChevronRight className="w-4 h-4" />
                        </>
                      )}
                    </Button>
                  </div>
                </form>
              )}
            </div>

            {/* Footer */}
            <div className="mt-8 border-t border-slate-800/80 pt-6 text-center space-y-4">
              <p className="text-sm text-slate-400">
                Already have an account?{' '}
                <Link href={ROUTES.LOGIN} className="text-blue-400 hover:text-blue-300 font-medium hover:underline transition-colors">
                  Sign in
                </Link>
              </p>
              <div className="flex justify-center">
                <Link href={ROUTES.HOME}>
                  <Button variant="ghost" className="text-xs text-slate-500 hover:text-slate-300 hover:bg-slate-800/50">
                    Back to Home
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Feature List Column */}
        <div className="lg:col-span-6 flex flex-col justify-center">
          <div className="bg-slate-900/40 border border-slate-800/40 rounded-3xl p-8 shadow-2xl backdrop-blur-sm flex flex-col justify-between h-full">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Sparkles className="w-5 h-5 text-amber-400 animate-pulse" />
                <h3 className="font-bold text-lg text-slate-200">Start Generating Content</h3>
              </div>
              <p className="text-sm text-slate-400 mb-6">
                Create a free account to unlock our complete suite of AI-powered content creation features.
              </p>

              <div className="flex flex-col gap-4">
                {features.map((feature) => {
                  const Icon = feature.icon
                  return (
                    <div
                      key={feature.title}
                      className="p-5 rounded-2xl border border-slate-800/40 bg-gradient-to-br from-slate-900/20 to-slate-900/10 flex flex-col justify-between relative overflow-hidden"
                    >
                      <div className="flex items-start gap-4">
                        <div className={`p-2 rounded-xl border ${feature.color}`}>
                          <Icon className="w-5 h-5" />
                        </div>
                        <div>
                          <span className="font-bold text-sm text-slate-200 block">{feature.title}</span>
                          <p className="text-xs text-slate-400 leading-relaxed mt-1">
                            {feature.desc}
                          </p>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-slate-800/40 text-center">
              <span className="text-xs text-slate-500">
                Authorized registration environment — 2026 ContentHub
              </span>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}
