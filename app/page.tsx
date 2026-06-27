'use client'

import Link from 'next/link'
import { useUser } from '@clerk/nextjs'
import { Navbar } from '@/components/common/navbar'
import { Footer } from '@/components/common/footer'
import { Button } from '@/components/ui/button'
import { Zap, Sparkles, TrendingUp, Users, MessageSquare, Lightbulb } from 'lucide-react'
import { ROUTES } from '@/config/constants'

const features = [
  {
    icon: Sparkles,
    title: 'AI-Powered Generation',
    description: 'Create compelling content in seconds with our advanced AI algorithms.',
  },
  {
    icon: Zap,
    title: 'Lightning Fast',
    description: 'Get results instantly without compromising on quality.',
  },
  {
    icon: TrendingUp,
    title: 'SEO Optimized',
    description: 'Content designed to rank higher and drive more traffic.',
  },
  {
    icon: Users,
    title: 'Multi-Format',
    description: 'Generate articles, social posts, emails, and scripts.',
  },
  {
    icon: MessageSquare,
    title: 'AI Chat Assistant',
    description: 'Get real-time help and suggestions for your content.',
  },
  {
    icon: Lightbulb,
    title: 'Creative Ideas',
    description: 'Never run out of ideas with our unlimited inspiration engine.',
  },
]

const stats = [
  { value: '50K+', label: 'Active Users' },
  { value: '1M+', label: 'Content Generated' },
  { value: '99%', label: 'Satisfaction Rate' },
  { value: '24/7', label: 'Support Available' },
]

const testimonials = [
  {
    name: 'Sarah Johnson',
    role: 'Marketing Manager',
    content: 'ContentHub has completely transformed how our team creates content. What used to take hours now takes minutes.',
    avatar: '👩‍💼',
  },
  {
    name: 'Mike Chen',
    role: 'Entrepreneur',
    content: 'The AI quality is impressive. I&apos;m getting professional-grade content without needing to hire a copywriter.',
    avatar: '👨‍💻',
  },
  {
    name: 'Emily Roberts',
    role: 'Content Creator',
    content: 'The variety of content types available is amazing. I can create everything I need in one place.',
    avatar: '👩‍🎨',
  },
]

const faqs = [
  {
    question: 'How does the AI work?',
    answer: 'Our AI uses advanced language models trained on millions of high-quality content examples to generate original, contextual, and engaging content tailored to your needs.',
  },
  {
    question: 'Can I edit the generated content?',
    answer: 'Absolutely! All generated content is fully editable. You can refine, customize, and adjust any content to match your exact requirements.',
  },
  {
    question: 'What content types can I generate?',
    answer: 'You can generate blog posts, social media content, email copy, product descriptions, scripts, and much more.',
  },
  {
    question: 'Is there a free trial?',
    answer: 'Yes! Sign up today to get 100 free credits to try all our features risk-free.',
  },
]

export default function Home() {
  const { isLoaded, user } = useUser()

  return (
    <>
      <Navbar />
      <main className="flex flex-col">
        {/* Hero Section */}
        <section className="relative min-h-[70vh] flex items-center bg-gradient-to-b from-blue-50 to-background dark:from-slate-900 dark:to-background">
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 dark:opacity-10"></div>
            <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-green-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 dark:opacity-10"></div>
          </div>

          <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              {/* Left Column: Text & CTAs */}
              <div className="text-center lg:text-left space-y-8 max-w-2xl mx-auto lg:mx-0">
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-balance leading-[1.1]">
                  Create Amazing <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-emerald-600">Content Instantly</span>
                </h1>
                <p className="text-lg sm:text-xl text-muted-foreground text-balance">
                  Leverage AI-powered tools to generate high-quality content, from blog posts to social media—all in seconds.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-4">
                  {!isLoaded || !user ? (
                    <>
                      <Link href={ROUTES.REGISTER}>
                        <Button size="lg" className="w-full sm:w-auto">
                          Get Started Free
                        </Button>
                      </Link>
                      <Link href={ROUTES.EXPLORE}>
                        <Button size="lg" variant="outline" className="w-full sm:w-auto">
                          Explore Features
                        </Button>
                      </Link>
                    </>
                  ) : (
                    <>
                      <Link href={ROUTES.DASHBOARD}>
                        <Button size="lg" className="w-full sm:w-auto">
                          Go to Dashboard
                        </Button>
                      </Link>
                      <Link href={ROUTES.EXPLORE}>
                        <Button size="lg" variant="outline" className="w-full sm:w-auto">
                          Explore More
                        </Button>
                      </Link>
                    </>
                  )}
                </div>
              </div>

              {/* Right Column: Premium Mock Browser & Image */}
              <div className="relative w-full max-w-xl mx-auto lg:max-w-none animate-in fade-in slide-in-from-bottom-8 duration-1000">
                {/* Glowing background blob behind image */}
                <div className="absolute -inset-4 bg-gradient-to-tr from-blue-500 to-emerald-500 rounded-3xl blur-2xl opacity-15 dark:opacity-20"></div>
                
                {/* Browser Mockup */}
                <div className="relative rounded-2xl border bg-card shadow-2xl overflow-hidden">
                  {/* Browser Header */}
                  <div className="flex items-center gap-2 px-4 py-3 bg-muted/50 border-b">
                    <div className="flex gap-1.5">
                      <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                      <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                      <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                    </div>
                    <div className="flex-1 mx-4">
                      <div className="bg-background/80 border rounded text-[10px] text-muted-foreground text-center py-1 truncate max-w-xs mx-auto">
                        contenthub.ai/dashboard
                      </div>
                    </div>
                  </div>
                  {/* Browser Viewport */}
                  <div className="bg-card p-1">
                    <img
                      src="/dashboard_preview.png"
                      alt="AI ContentHub Dashboard Preview"
                      className="w-full h-auto rounded-lg shadow-sm object-cover"
                      loading="eager"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 bg-muted/50">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold mb-4">Powerful Features</h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                Everything you need to create professional content at scale
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {features.map((feature, idx) => {
                const Icon = feature.icon
                return (
                  <div key={idx} className="p-6 rounded-lg bg-background border hover:border-primary transition-all hover:shadow-lg">
                    <Icon className="w-8 h-8 text-primary mb-4" />
                    <h3 className="font-semibold text-lg mb-2">{feature.title}</h3>
                    <p className="text-muted-foreground text-sm">{feature.description}</p>
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-20 bg-gradient-to-r from-blue-600 to-emerald-600 text-white">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {stats.map((stat, idx) => (
                <div key={idx} className="text-center">
                  <p className="text-4xl sm:text-5xl font-bold mb-2">{stat.value}</p>
                  <p className="text-blue-100">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="py-20 bg-muted/50">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold mb-4">Loved by Users</h2>
              <p className="text-muted-foreground text-lg">
                See what our customers have to say
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {testimonials.map((testimonial, idx) => (
                <div key={idx} className="p-6 rounded-lg bg-background border">
                  <div className="flex items-center gap-4 mb-4">
                    <span className="text-3xl">{testimonial.avatar}</span>
                    <div>
                      <p className="font-semibold">{testimonial.name}</p>
                      <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                    </div>
                  </div>
                  <p className="text-muted-foreground italic">{`"${testimonial.content}"`}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Pricing Plans Section (New Section 7) */}
        <section className="py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold mb-4">Flexible Pricing Plans</h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                Choose the plan that fits your content generation needs
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  name: 'Starter',
                  price: '$0',
                  desc: 'Perfect for testing out our platform features',
                  features: ['100 Free Credits/mo', 'AI Content Generator access', 'Basic templates', 'Community support'],
                  cta: 'Start for Free',
                  popular: false,
                },
                {
                  name: 'Pro Creator',
                  price: '$29',
                  desc: 'Ideal for professional writers and creators',
                  features: ['1,000 Premium Credits/mo', 'Full AI Generator access', 'Contextual AI Chat Assistant', 'Priority email support'],
                  cta: 'Get Started Pro',
                  popular: true,
                },
                {
                  name: 'Enterprise',
                  price: '$99',
                  desc: 'Built for corporate teams and agencies',
                  features: ['Unlimited Credits', 'Bespoke fine-tuned models', 'Team collaboration workspace', '24/7 dedicated support'],
                  cta: 'Contact Sales',
                  popular: false,
                },
              ].map((plan, idx) => (
                <div
                  key={idx}
                  className={`p-8 rounded-2xl border flex flex-col justify-between relative bg-card ${
                    plan.popular ? 'border-primary shadow-lg scale-105' : 'bg-background hover:shadow-md'
                  }`}
                >
                  {plan.popular && (
                    <span className="absolute top-0 right-1/2 translate-x-1/2 -translate-y-1/2 bg-primary text-primary-foreground text-[10px] font-bold px-3 py-1 rounded-full uppercase">
                      Most Popular
                    </span>
                  )}
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-xl font-bold text-foreground">{plan.name}</h3>
                      <p className="text-xs text-muted-foreground mt-1 min-h-[2rem]">{plan.desc}</p>
                    </div>
                    <div className="flex items-baseline">
                      <span className="text-4xl font-extrabold">{plan.price}</span>
                      <span className="text-muted-foreground text-sm ml-1">/month</span>
                    </div>
                    <ul className="space-y-3 text-sm text-muted-foreground border-t pt-6">
                      {plan.features.map((feature, fIdx) => (
                        <li key={fIdx} className="flex items-center gap-2">
                          <span className="text-primary font-bold">✓</span> {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="pt-8">
                    <Link href={ROUTES.REGISTER} className="block">
                      <Button className="w-full font-bold py-5 rounded-xl cursor-pointer" variant={plan.popular ? 'default' : 'outline'}>
                        {plan.cta}
                      </Button>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-20 bg-muted/30">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold mb-4">Frequently Asked Questions</h2>
            </div>

            <div className="space-y-6">
              {faqs.map((faq, idx) => (
                <details key={idx} className="group border rounded-lg p-6 cursor-pointer hover:bg-muted/50 transition-colors bg-card">
                  <summary className="flex items-center justify-between font-semibold">
                    {faq.question}
                    <span className="transition-transform group-open:rotate-180">▼</span>
                  </summary>
                  <p className="mt-4 text-muted-foreground">{faq.answer}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* Core Technology Stack Section (New Section 8) */}
        <section className="py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold mb-4 font-sans tracking-tight">Our Core Technology Stack</h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                Built with industry-leading, highly scalable cloud architectures
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
              {[
                { name: 'Next.js App Router', desc: 'React Framework', icon: '⚡' },
                { name: 'OpenAI GPT Models', desc: 'Artificial Intelligence', icon: '🤖' },
                { name: 'Clerk SSO SDK', desc: 'Access Control Auth', icon: '🔐' },
                { name: 'MongoDB Database', desc: 'Mongoose Storage Layer', icon: '🍃' },
              ].map((tech, idx) => (
                <div key={idx} className="p-6 rounded-2xl border bg-card hover:border-primary/40 transition-colors shadow-sm space-y-3">
                  <div className="text-4xl">{tech.icon}</div>
                  <h3 className="font-bold text-sm sm:text-base text-foreground leading-none">{tech.name}</h3>
                  <p className="text-xs text-muted-foreground">{tech.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-r from-blue-600 to-emerald-600 text-white">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">Ready to Transform Your Content?</h2>
            <p className="text-lg mb-8 text-blue-100 max-w-2xl mx-auto">
              Join thousands of creators and businesses using ContentHub to generate amazing content instantly.
            </p>
            {!isLoaded || !user ? (
              <Link href={ROUTES.REGISTER}>
                <Button size="lg" className="bg-white text-blue-600 hover:bg-blue-50">
                  Get Started Free Today
                </Button>
              </Link>
            ) : (
              <Link href={ROUTES.DASHBOARD}>
                <Button size="lg" className="bg-white text-blue-600 hover:bg-blue-50">
                  Go to Dashboard
                </Button>
              </Link>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
