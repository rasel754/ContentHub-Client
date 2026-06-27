'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { ROUTES } from '@/config/constants'
import { Button } from '@/components/ui/button'
import { Sparkles, ArrowRight, FileText, Code, Terminal, Check, Loader2 } from 'lucide-react'

function TwitterIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
    </svg>
  )
}

interface Template {
  id: string
  name: string
  icon: any
  prompt: string
  response: string
}

const TEMPLATES: Template[] = [
  {
    id: 'blog',
    name: 'Blog Outline',
    icon: FileText,
    prompt: 'Create a blog outline for "Scaling React apps in 2026"',
    response: `# Scaling React Applications (2026)
## Introduction
- The state of client-side performance
- Core Web Vitals targets
## 1. Architectural Foundations
- Next.js App Router & Server Components (RSC)
- Optimized data-fetching boundaries
- Partial Prerendering (PPR)
## 2. Advanced Performance Optimization
- Fine-grained state management (Signals & Jotai)
- Dynamic code-splitting & progressive hydration
- Asset optimizations (avif, next/font)
## Conclusion
- Summary & actionable checklist`,
  },
  {
    id: 'seo',
    name: 'SEO Meta Tags',
    icon: Code,
    prompt: 'Generate high-converting SEO meta tags for a SaaS product',
    response: `<!-- Primary Meta Tags -->
<title>ContentHub - Generate AI Articles Instantly</title>
<meta name="description" content="ContentHub is the ultimate AI-powered content engine. Streamline your blogging, social media outreach, and email copy with SEO-optimized, highly contextual results.">
<meta name="keywords" content="AI generator, SEO writer, copywriter tools, blog builder">`,
  },
  {
    id: 'tweet',
    name: 'Viral Tweet',
    icon: TwitterIcon,
    prompt: 'Draft a viral Twitter thread about AI productivity',
    response: `🧵 AI isn't replacing developers; developers using AI are replacing those who don't.

Here are 3 ways we automated 60% of our daily content pipeline using ContentHub:

1/3 Context-Aware Templates
Standardized inputs yield 3x higher consistency.

2/3 Inline SEO Optimization
Real-time keyword injection makes ranking a breeze.`,
  },
]

export function Hero({ isLoaded, user }: { isLoaded: boolean; user: any }) {
  const [activeTab, setActiveTab] = useState<string>('blog')
  const [editorText, setEditorText] = useState<string>('')
  const [isGenerating, setIsGenerating] = useState<boolean>(false)
  const typingTimerRef = useRef<NodeJS.Timeout | null>(null)

  const activeTemplate = TEMPLATES.find((t) => t.id === activeTab) || TEMPLATES[0]

  useEffect(() => {
    // Clear any active typing effects
    if (typingTimerRef.current) {
      clearInterval(typingTimerRef.current)
    }

    setEditorText('')
    setIsGenerating(true)

    // Simulate small API delay (UX Polish: Consistent Loading States)
    const delayTimer = setTimeout(() => {
      setIsGenerating(false)
      let index = 0
      const fullResponse = activeTemplate.response

      typingTimerRef.current = setInterval(() => {
        if (index < fullResponse.length) {
          setEditorText((prev) => prev + fullResponse.charAt(index))
          index++
        } else {
          if (typingTimerRef.current) {
            clearInterval(typingTimerRef.current)
          }
        }
      }, 15) // Speed up typing for engaging demo
    }, 800)

    return () => {
      clearTimeout(delayTimer)
      if (typingTimerRef.current) {
        clearInterval(typingTimerRef.current)
      }
    }
  }, [activeTab])

  return (
    <section className="relative min-h-[70vh] lg:h-[75vh] flex items-center bg-gradient-to-b from-blue-50/50 via-background to-background dark:from-slate-950/40 dark:via-background dark:to-background border-b overflow-hidden">
      {/* Decorative Blur Blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -right-20 w-72 h-72 bg-blue-400/20 rounded-full mix-blend-multiply filter blur-3xl opacity-50 dark:opacity-20 animate-pulse duration-[6000ms]"></div>
        <div className="absolute bottom-10 -left-20 w-72 h-72 bg-emerald-400/20 rounded-full mix-blend-multiply filter blur-3xl opacity-50 dark:opacity-20 animate-pulse duration-[8000ms]"></div>
      </div>

      <div className="relative w-full mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Value Prop */}
          <div className="lg:col-span-5 text-center lg:text-left space-y-6 max-w-xl mx-auto lg:mx-0">
            {/* Tagline Badge */}
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300">
              <Sparkles className="w-3.5 h-3.5" />
              <span>SaaS Platform of the Year</span>
            </div>

            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-foreground leading-[1.1] font-sans">
              Create Amazing <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-emerald-600 dark:from-blue-400 dark:to-emerald-400">
                Content Instantly
              </span>
            </h1>

            <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
              Leverage state-of-the-art AI language architectures to construct highly optimized blog articles, social media drafts, and marketing descriptions in seconds.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start pt-2">
              {!isLoaded || !user ? (
                <>
                  <Link href={ROUTES.REGISTER}>
                    <Button size="lg" className="w-full sm:w-auto font-medium shadow-md shadow-blue-500/10 hover:shadow-lg hover:shadow-blue-500/20 transition-all group">
                      Get Started Free
                      <ArrowRight className="w-4 h-4 ml-1.5 transition-transform group-hover:translate-x-0.5" />
                    </Button>
                  </Link>
                  <Link href={ROUTES.EXPLORE}>
                    <Button size="lg" variant="outline" className="w-full sm:w-auto hover:bg-muted/50 transition-all">
                      Explore Features
                    </Button>
                  </Link>
                </>
              ) : (
                <>
                  <Link href={ROUTES.DASHBOARD}>
                    <Button size="lg" className="w-full sm:w-auto font-medium shadow-md shadow-blue-500/10 hover:shadow-lg hover:shadow-blue-500/20 transition-all">
                      Go to Dashboard
                    </Button>
                  </Link>
                  <Link href={ROUTES.EXPLORE}>
                    <Button size="lg" variant="outline" className="w-full sm:w-auto hover:bg-muted/50 transition-all">
                      Browse Tools
                    </Button>
                  </Link>
                </>
              )}
            </div>

            {/* Social Proof Stats Quick Signal */}
            <div className="pt-4 flex items-center justify-center lg:justify-start gap-6 border-t border-border/60">
              <div>
                <p className="text-xl font-bold text-foreground">99.8%</p>
                <p className="text-xs text-muted-foreground">Accuracy Rating</p>
              </div>
              <div className="w-px h-8 bg-border"></div>
              <div>
                <p className="text-xl font-bold text-foreground">15k+</p>
                <p className="text-xs text-muted-foreground">Active Creators</p>
              </div>
              <div className="w-px h-8 bg-border"></div>
              <div>
                <p className="text-xl font-bold text-foreground">1M+</p>
                <p className="text-xs text-muted-foreground">Pages Written</p>
              </div>
            </div>
          </div>

          {/* Right Column: Premium Mock Workspace */}
          <div className="lg:col-span-7 relative w-full max-w-2xl mx-auto lg:max-w-none">
            {/* Decorative background glow shadow */}
            <div className="absolute -inset-2 bg-gradient-to-tr from-blue-500 to-emerald-500 rounded-2xl blur-xl opacity-15 dark:opacity-20"></div>

            {/* Interactive Browser Mock */}
            <div className="relative rounded-xl border bg-card text-card-foreground shadow-2xl overflow-hidden">
              
              {/* Browser bar */}
              <div className="flex items-center justify-between px-4 py-3 bg-muted/40 border-b border-border/80">
                <div className="flex gap-1.5">
                  <span className="w-3 h-3 bg-red-400/90 rounded-full inline-block"></span>
                  <span className="w-3 h-3 bg-yellow-400/90 rounded-full inline-block"></span>
                  <span className="w-3 h-3 bg-green-400/90 rounded-full inline-block"></span>
                </div>
                <div className="bg-background/80 border text-[10px] text-muted-foreground/80 px-4 py-0.5 rounded-md flex items-center gap-1.5">
                  <Terminal className="w-2.5 h-2.5 text-blue-500" />
                  <span>contenthub.ai/studio</span>
                </div>
                <div className="w-10"></div>
              </div>

              {/* Workspace workspace content */}
              <div className="grid grid-cols-1 md:grid-cols-4 min-h-[300px] text-sm">
                
                {/* Sidebar */}
                <div className="p-3 border-r bg-muted/20 space-y-2 md:col-span-1 flex flex-row md:flex-col overflow-x-auto md:overflow-x-visible gap-2 md:gap-0">
                  <div className="hidden md:block text-[10px] font-semibold text-muted-foreground/60 uppercase tracking-wider px-2 mb-2">
                    Templates
                  </div>
                  {TEMPLATES.map((item) => {
                    const Icon = item.icon
                    const isSelected = activeTab === item.id
                    return (
                      <button
                        key={item.id}
                        onClick={() => setActiveTab(item.id)}
                        className={`flex items-center gap-2 w-full px-2.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
                          isSelected
                            ? 'bg-primary text-primary-foreground shadow-sm'
                            : 'hover:bg-muted text-muted-foreground hover:text-foreground'
                        }`}
                      >
                        <Icon className="w-3.5 h-3.5 shrink-0" />
                        <span>{item.name}</span>
                      </button>
                    )
                  })}
                </div>

                {/* Main Sandbox */}
                <div className="p-4 md:col-span-3 flex flex-col justify-between bg-background/50">
                  {/* Editor Input Prompt Representation */}
                  <div className="space-y-3 pb-3 border-b border-border/40">
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <span>Prompt Input</span>
                      <span className="flex items-center gap-1">
                        <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-ping"></span>
                        Active
                      </span>
                    </div>
                    <div className="p-2.5 bg-muted/40 rounded-lg text-xs font-mono text-foreground border">
                      &gt; {activeTemplate.prompt}
                    </div>
                  </div>

                  {/* Editor Output Simulator */}
                  <div className="flex-1 py-4 font-mono text-xs overflow-y-auto max-h-[180px] leading-relaxed whitespace-pre-wrap text-foreground">
                    {isGenerating ? (
                      <div className="flex items-center justify-center h-full py-8 text-muted-foreground gap-2">
                        <Loader2 className="w-4 h-4 animate-spin text-primary" />
                        <span>AI is writing...</span>
                      </div>
                    ) : (
                      <>
                        {editorText}
                        <span className="w-1 h-3.5 bg-primary/80 inline-block animate-pulse ml-0.5 align-middle"></span>
                      </>
                    )}
                  </div>

                  {/* Status footer */}
                  <div className="flex items-center justify-between pt-3 border-t border-border/40 text-[10px] text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Check className="w-3 h-3 text-emerald-500" />
                      <span>Ready to export</span>
                    </div>
                    <span>Word Count: {editorText ? editorText.split(/\s+/).filter(Boolean).length : 0} words</span>
                  </div>

                </div>

              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
