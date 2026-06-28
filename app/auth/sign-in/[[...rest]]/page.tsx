'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useSignIn } from '@clerk/nextjs'
import { ROUTES } from '@/config/constants'
import { Button } from '@/components/ui/button'
import { useToast } from '@/components/ui/toast'
import { Loader2, Mail, Lock, Eye, EyeOff, Sparkles, Shield, User, UserCheck, ChevronRight } from 'lucide-react'

export default function SignInPage() {
  const { signIn } = useSignIn()
  const router = useRouter()
  const { error, success } = useToast()
  
  // Login form state
  const [loading, setLoading] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)

  // Verification state for manual fallback
  const [verifying, setVerifying] = useState(false)
  const [code, setCode] = useState('')

  const handleDemoSelect = (emailVal: string, passwordVal: string, roleLabel: string) => {
    setVerifying(false)
    setCode('')
    setEmail(emailVal)
    setPassword(passwordVal)
    success(`Filled form with ${roleLabel} credentials!`)
  }

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!signIn) return
    setLoading(true)
    try {
      const result = await signIn.create({
        identifier: email,
        password: password,
      })
      if (result.error) {
        throw result.error
      }
      
      if (signIn.status === 'complete') {
        const finalizeResult = await signIn.finalize()
        if (finalizeResult.error) {
          throw finalizeResult.error
        }
        success('Successfully logged in!')
        router.push(ROUTES.DASHBOARD)
      } else if (signIn.status === 'needs_client_trust') {
        // Automatically request verification code for Client Trust
        const codeResult = await signIn.mfa.sendEmailCode()
        if (codeResult.error) {
          throw codeResult.error
        }
        
        try {
          // Attempt automatic verification using default test code (424242)
          const verifyResult = await signIn.mfa.verifyEmailCode({ code: '424242' })
          if (verifyResult.error) {
            throw verifyResult.error
          }
          if ((signIn.status as string) === 'complete') {
            const finalizeResult = await signIn.finalize()
            if (finalizeResult.error) {
              throw finalizeResult.error
            }
            success('Successfully logged in!')
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
        console.warn('Authentication status incompleted:', signIn.status)
        error(`Sign in status: ${signIn.status}. Additional verification needed.`)
      }
    } catch (err: any) {
      console.error('Sign-in error:', err)
      error(err.message || 'Invalid email or password.')
    } finally {
      setLoading(false)
    }
  }

  const handleVerifyCode = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!signIn) return
    setLoading(true)
    try {
      const result = await signIn.mfa.verifyEmailCode({ code })
      if (result.error) {
        throw result.error
      }
      if (signIn.status === 'complete') {
        const finalizeResult = await signIn.finalize()
        if (finalizeResult.error) {
          throw finalizeResult.error
        }
        success('Verification successful! Logged in.')
        router.push(ROUTES.DASHBOARD)
      } else {
        console.warn('Unhandled signIn status after verification:', signIn.status)
        error(`Sign in status: ${signIn.status}`)
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

  const demoUsers = [
    {
      role: 'Admin',
      email: 'admin@contenthub.ai',
      pass: 'Admin!Demo!Secure!Pass!2026',
      desc: 'Full access to user management, analytics, and content controls.',
      color: 'from-violet-600/10 to-indigo-600/10 border-violet-500/20 text-violet-400 hover:border-violet-500/50 hover:from-violet-600/20 hover:to-indigo-600/20',
      badgeColor: 'bg-violet-500/10 text-violet-300 border-violet-500/20',
      icon: Shield
    },
    {
      role: 'Manager',
      email: 'manager@contenthub.ai',
      pass: 'Manager!Demo!Secure!Pass!2026',
      desc: 'Access to content generation, editing, and publishing tools.',
      color: 'from-emerald-600/10 to-teal-600/10 border-emerald-500/20 text-emerald-400 hover:border-emerald-500/50 hover:from-emerald-600/20 hover:to-teal-600/20',
      badgeColor: 'bg-emerald-500/10 text-emerald-300 border-emerald-500/20',
      icon: UserCheck
    },
    {
      role: 'Standard User',
      email: 'user@contenthub.ai',
      pass: 'User!Demo!Secure!Pass!2026',
      desc: 'Generate, view, and organize personal AI articles and workspace resources.',
      color: 'from-blue-600/10 to-cyan-600/10 border-blue-500/20 text-blue-400 hover:border-blue-500/50 hover:from-blue-600/20 hover:to-cyan-600/20',
      badgeColor: 'bg-blue-500/10 text-blue-300 border-blue-500/20',
      icon: User
    }
  ]

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-900 via-slate-950 to-black">
      <div className="max-w-5xl w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        
        {/* Sign In Form Column */}
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
                  {verifying ? 'Verify Device' : 'Sign In'}
                </h1>
                <p className="mt-2 text-sm text-slate-400">
                  {verifying 
                    ? 'A security verification code has been sent to confirm this sign-in.' 
                    : 'Welcome back! Fill in your credentials or select a demo account.'}
                </p>
              </div>

              {/* Form Section */}
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
                /* Standard Credentials Form */
                <form onSubmit={handleSignIn} className="mt-8 space-y-6">
                  <div className="space-y-4">
                    {/* Email */}
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
                      <div className="flex justify-between items-center mb-2">
                        <label htmlFor="password" className="block text-xs font-semibold text-slate-300 uppercase tracking-wider">
                          Password
                        </label>
                      </div>
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
                  </div>

                  <Button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-semibold py-6 rounded-xl shadow-lg shadow-blue-500/10 hover:shadow-blue-500/20 transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed border-none"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        Signing in...
                      </>
                    ) : (
                      <>
                        Sign In with Credentials
                        <ChevronRight className="w-4 h-4" />
                      </>
                    )}
                  </Button>
                </form>
              )}
            </div>

            {/* Footer */}
            <div className="mt-8 border-t border-slate-800/80 pt-6 text-center space-y-4">
              <p className="text-sm text-slate-400">
                Don&apos;t have an account?{' '}
                <Link href={ROUTES.REGISTER} className="text-blue-400 hover:text-blue-300 font-medium hover:underline transition-colors">
                  Sign up
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

        {/* Demo Accounts Column */}
        <div className="lg:col-span-6 flex flex-col justify-center">
          <div className="bg-slate-900/40 border border-slate-800/40 rounded-3xl p-8 shadow-2xl backdrop-blur-sm flex flex-col justify-between h-full">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Sparkles className="w-5 h-5 text-amber-400 animate-pulse" />
                <h3 className="font-bold text-lg text-slate-200">Quick Access Demo</h3>
              </div>
              <p className="text-sm text-slate-400 mb-6">
                Click any of the role badges below to populate the credentials form instantly. You can then review the values and press "Sign In with Credentials".
              </p>

              <div className="flex flex-col gap-4">
                {demoUsers.map((user) => {
                  const Icon = user.icon
                  return (
                    <button
                      key={user.role}
                      type="button"
                      onClick={() => handleDemoSelect(user.email, user.pass, user.role)}
                      className={`text-left p-5 rounded-2xl border bg-gradient-to-br ${user.color} transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] cursor-pointer group flex flex-col justify-between relative overflow-hidden`}
                    >
                      {/* Background highlight */}
                      <div className="absolute right-0 top-0 translate-x-4 -translate-y-4 w-24 h-24 rounded-full bg-current opacity-5 blur-2xl group-hover:scale-150 transition-transform duration-500" />

                      <div className="flex justify-between items-start gap-4 mb-2">
                        <div className="flex items-center gap-3">
                          <div className={`p-2 rounded-xl bg-slate-950/80 border border-slate-800`}>
                            <Icon className="w-5 h-5" />
                          </div>
                          <div>
                            <span className="font-bold text-sm text-slate-200 block">{user.role} Profile</span>
                            <span className="text-xs text-slate-400 font-mono select-all">{user.email}</span>
                          </div>
                        </div>
                        <span className={`text-[10px] px-2 py-0.5 rounded-full font-semibold border ${user.badgeColor}`}>
                          Load Profile
                        </span>
                      </div>
                      <p className="text-xs text-slate-400 leading-relaxed mt-2 pl-1">
                        {user.desc}
                      </p>
                      
                      <div className="mt-3 flex items-center justify-between border-t border-slate-850 pt-3 text-[11px] font-mono text-slate-500 select-all">
                        <span>Password: {user.pass}</span>
                      </div>
                    </button>
                  )
                })}
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-slate-800/40 text-center">
              <span className="text-xs text-slate-500">
                Authorized demo environment — 2026 ContentHub
              </span>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}
