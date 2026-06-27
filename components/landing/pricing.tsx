import Link from 'next/link'
import { ROUTES } from '@/config/constants'
import { Button } from '@/components/ui/button'
import { Check } from 'lucide-react'

const PLANS = [
  {
    name: 'Starter',
    price: '$0',
    description: 'Perfect for exploring our studio workspace risk-free.',
    features: [
      '100 Free generation credits / mo',
      'Access to core templates',
      'AI Content Generator access',
      'Standard community support',
    ],
    cta: 'Start Writing Free',
    popular: false,
    route: ROUTES.REGISTER,
  },
  {
    name: 'Pro Creator',
    price: '$29',
    description: 'Perfect for professional writers, creators, and growth teams.',
    features: [
      '1,000 Premium generation credits / mo',
      'Full template catalog access',
      'Collaborative AI Chat Assistant',
      'Priority email response (under 12hr)',
      'Early access to new modules',
    ],
    cta: 'Get Started Pro',
    popular: true,
    route: ROUTES.REGISTER,
  },
  {
    name: 'Enterprise',
    price: '$99',
    description: 'Built for agencies and enterprise marketing divisions.',
    features: [
      'Unlimited generation credits / mo',
      'Custom fine-tuned brand models',
      'Advanced multi-role manager RBAC',
      'Dedicated account manager',
      '24/7 priority SLA support',
    ],
    cta: 'Contact Corporate Sales',
    popular: false,
    route: ROUTES.REGISTER, // Or contact form
  },
]

export function Pricing() {
  return (
    <section id="pricing" className="py-20 sm:py-28 bg-muted/10 border-b relative">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground font-sans">
            Transparent Pricing Plans
          </h2>
          <p className="mt-4 text-base sm:text-lg text-muted-foreground">
            Pick a tier that aligns with your monthly article, thread, and newsletter writing pipeline.
          </p>
        </div>

        {/* Matrix */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          {PLANS.map((plan, idx) => (
            <div
              key={idx}
              className={`relative flex flex-col justify-between p-8 rounded-2xl border bg-card text-card-foreground shadow-sm transition-all duration-300 ${
                plan.popular
                  ? 'border-primary ring-2 ring-primary/20 md:-translate-y-4 shadow-lg md:shadow-xl'
                  : 'hover:border-border/80 hover:shadow-md'
              }`}
            >
              {plan.popular && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-blue-600 to-emerald-600 dark:from-blue-500 dark:to-emerald-500 text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow">
                  Most Popular
                </span>
              )}

              <div>
                {/* Title & Price */}
                <div className="space-y-4 mb-6">
                  <h3 className="text-xl font-bold text-foreground font-sans">{plan.name}</h3>
                  <p className="text-xs text-muted-foreground min-h-[2.5rem] leading-relaxed">
                    {plan.description}
                  </p>
                  <div className="flex items-baseline gap-1 pt-2">
                    <span className="text-4xl font-extrabold tracking-tight">{plan.price}</span>
                    <span className="text-sm text-muted-foreground font-semibold">/month</span>
                  </div>
                </div>

                {/* Features List */}
                <ul className="space-y-3.5 border-t border-border/60 pt-6">
                  {plan.features.map((feature, fIdx) => (
                    <li key={fIdx} className="flex items-start gap-2.5 text-sm text-muted-foreground">
                      <Check className="w-4 h-4 text-emerald-500 dark:text-emerald-400 shrink-0 mt-0.5" />
                      <span className="leading-snug">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Action Button */}
              <div className="pt-8 mt-auto">
                <Link href={plan.route} className="block w-full">
                  <Button
                    className="w-full font-semibold rounded-xl py-5 shadow-sm"
                    variant={plan.popular ? 'default' : 'outline'}
                  >
                    {plan.cta}
                  </Button>
                </Link>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
