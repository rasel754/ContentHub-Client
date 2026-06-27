import { LayoutGrid, Sliders, CheckCircle2 } from 'lucide-react'

const STEPS = [
  {
    step: '01',
    icon: LayoutGrid,
    title: 'Choose a Template',
    description: 'Select from our catalog of pre-tuned frameworks for blog articles, SEO metadata, email copy, or viral socials.',
  },
  {
    step: '02',
    icon: Sliders,
    title: 'Configure Your Context',
    description: 'Input your topic brief, targeted SEO keywords, language preferences, and fine-tune the desired tone of voice.',
  },
  {
    step: '03',
    icon: CheckCircle2,
    title: 'Refine & Export',
    description: 'Review the generated output, prompt our inline AI companion for adjustments, and copy clean formatted Markdown.',
  },
]

export function HowItWorks() {
  return (
    <section id="how-it-works" className="py-20 sm:py-28 bg-muted/20 border-b relative">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground font-sans">
            How ContentHub Works
          </h2>
          <p className="mt-4 text-base sm:text-lg text-muted-foreground">
            Go from a blank page to a search-optimized draft in under sixty seconds.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
          {/* Connector Line for Desktop */}
          <div className="hidden md:block absolute top-1/2 left-[10%] right-[10%] h-0.5 bg-border -translate-y-12 -z-10"></div>

          {STEPS.map((step, idx) => {
            const Icon = step.icon
            return (
              <div key={idx} className="relative flex flex-col items-center text-center group">
                {/* Step Circle */}
                <div className="relative mb-6">
                  <div className="w-16 h-16 rounded-full bg-background border flex items-center justify-center shadow-md group-hover:border-primary/50 transition-colors duration-300">
                    <Icon className="w-6 h-6 text-primary group-hover:scale-110 transition-transform duration-300" />
                  </div>
                  {/* Step Number Badge */}
                  <span className="absolute -top-1 -right-1 bg-gradient-to-tr from-blue-600 to-emerald-600 dark:from-blue-500 dark:to-emerald-500 text-white text-[10px] font-bold w-6 h-6 rounded-full flex items-center justify-center shadow">
                    {step.step}
                  </span>
                </div>

                {/* Text Content */}
                <h3 className="text-lg font-bold text-foreground mb-2 font-sans group-hover:text-primary transition-colors">
                  {step.title}
                </h3>
                <p className="text-sm text-muted-foreground max-w-sm leading-relaxed">
                  {step.description}
                </p>
              </div>
            )
          })}
        </div>

      </div>
    </section>
  )
}
