'use client'

import { useUser } from '@clerk/nextjs'
import { Navbar } from '@/components/common/navbar'
import { Footer } from '@/components/common/footer'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { ROUTES } from '@/config/constants'

// Modular landing components
import { Hero } from '@/components/landing/hero'
import { SocialProof } from '@/components/landing/social-proof'
import { Features } from '@/components/landing/features'
import { HowItWorks } from '@/components/landing/how-it-works'
import { UseCases } from '@/components/landing/use-cases'
import { Pricing } from '@/components/landing/pricing'
import { Testimonials } from '@/components/landing/testimonials'
import { FAQ } from '@/components/landing/faq'
import { TechStack } from '@/components/landing/tech-stack'

export default function Home() {
  const { isLoaded, user } = useUser()

  return (
    <>
      <Navbar />
      <main className="flex flex-col min-h-screen">
        {/* Section 1: Hero */}
        <Hero isLoaded={isLoaded} user={user} />

        {/* Section 2: Social Proof / Trust Banner */}
        <SocialProof />

        {/* Section 3: Features Grid */}
        <Features />

        {/* Section 4: How It Works timeline */}
        <HowItWorks />

        {/* Section 5: Use Cases role specifications */}
        <UseCases />

        {/* Section 6: Subscription Tiers Matrix */}
        <Pricing />

        {/* Section 7: Social Testimonials */}
        <Testimonials />

        {/* Section 8: FAQ details accordion */}
        <FAQ />

        {/* Section 9: Cloud Technology badges */}
        <TechStack />

        {/* Section 10: Final CTA Banner */}
        <section className="py-24 sm:py-32 bg-gradient-to-br from-blue-600 to-emerald-600 dark:from-blue-750 dark:to-emerald-750 text-white text-center relative overflow-hidden border-b">
          {/* Background decorators */}
          <div className="absolute inset-0 bg-black/10"></div>
          <div className="absolute -top-32 -left-32 w-80 h-80 bg-white/10 rounded-full filter blur-3xl opacity-60"></div>
          <div className="absolute -bottom-32 -right-32 w-80 h-80 bg-white/10 rounded-full filter blur-3xl opacity-60"></div>

          <div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 space-y-6">
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight font-sans">
              Ready to Accelerate Your Content Workflow?
            </h2>
            <p className="text-base sm:text-lg text-blue-50 max-w-2xl mx-auto leading-relaxed">
              Join thousands of founders, technical copywriters, and content teams using ContentHub to generate SEO-optimized articles, outlines, and social threads in seconds.
            </p>
            <div className="pt-4 flex flex-col sm:flex-row gap-4 justify-center">
              {!isLoaded || !user ? (
                <Link href={ROUTES.REGISTER}>
                  <Button size="lg" className="w-full sm:w-auto bg-white text-blue-600 hover:bg-blue-50 font-semibold shadow-md rounded-xl px-8 py-6 select-none border border-transparent">
                    Get Started Free Today
                  </Button>
                </Link>
              ) : (
                <Link href={ROUTES.DASHBOARD}>
                  <Button size="lg" className="w-full sm:w-auto bg-white text-blue-600 hover:bg-blue-50 font-semibold shadow-md rounded-xl px-8 py-6 select-none border border-transparent">
                    Go to Application Studio
                  </Button>
                </Link>
              )}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
