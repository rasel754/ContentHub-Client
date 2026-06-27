import { Megaphone, GraduationCap, Share2 } from 'lucide-react'

const USE_CASES = [
  {
    icon: Megaphone,
    role: 'Content Marketers',
    headline: 'Scale your marketing campaign pipeline 4x.',
    description: 'Quickly outline new blog posts, generate drafts matching your search keywords, and draft newsletters tailored to your specific audience segments without starting from scratch.',
    badge: 'Marketing',
    metrics: '4.5x faster drafts',
  },
  {
    icon: GraduationCap,
    role: 'Technical Authors',
    headline: 'Translate complex specs into readable guides.',
    description: 'Transform API payloads and code files into documentation outlines, formatted tutorials, and structured Markdown guides that make complex topics accessible.',
    badge: 'Technical Writing',
    metrics: '99% syntax accuracy',
  },
  {
    icon: Share2,
    role: 'Social Media Managers',
    headline: 'Repurpose articles into engaging threads.',
    description: 'Break down long articles or announcement briefs into high-converting Twitter/X threads, LinkedIn posts, or quick email newsletters tailored to boost engagement.',
    badge: 'Social Media',
    metrics: '+80% CTR boost',
  },
]

export function UseCases() {
  return (
    <section id="use-cases" className="py-20 sm:py-28 bg-background border-b relative">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground font-sans">
            Built for Your Entire Workflow
          </h2>
          <p className="mt-4 text-base sm:text-lg text-muted-foreground">
            Whether you are marketing a SaaS startup, publishing technical documentation, or growing a personal brand.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {USE_CASES.map((useCase, idx) => {
            const Icon = useCase.icon
            return (
              <div
                key={idx}
                className="group p-8 rounded-2xl border bg-card text-card-foreground hover:border-primary/20 hover:shadow-md transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  {/* Badge & Metric */}
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-muted text-muted-foreground">
                      {useCase.badge}
                    </span>
                    <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400">
                      {useCase.metrics}
                    </span>
                  </div>

                  {/* Header Row */}
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 rounded-lg bg-primary/5 text-primary">
                      <Icon className="w-5 h-5" />
                    </div>
                    <h3 className="font-bold text-lg text-foreground font-sans">
                      {useCase.role}
                    </h3>
                  </div>

                  {/* Headline & Body */}
                  <h4 className="text-sm font-semibold text-foreground mb-3 leading-snug">
                    {useCase.headline}
                  </h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {useCase.description}
                  </p>
                </div>

                <div className="mt-8 pt-4 border-t border-border/40 text-xs font-medium text-muted-foreground group-hover:text-primary transition-colors flex items-center gap-1.5">
                  <span>See templates for {useCase.role}</span>
                  <span>→</span>
                </div>
              </div>
            )
          })}
        </div>

      </div>
    </section>
  )
}
