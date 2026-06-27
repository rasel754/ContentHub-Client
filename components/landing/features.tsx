import { Sparkles, Zap, Search, BookOpen, MessageSquare, ShieldAlert } from 'lucide-react'

const FEATURES_DATA = [
  {
    icon: Sparkles,
    title: 'AI Generation Studio',
    description: 'Transform quick ideas into outlines, paragraphs, or finished articles using state-of-the-art LLMs.',
    colorClass: 'text-blue-500 bg-blue-500/10 dark:text-blue-400 dark:bg-blue-900/20',
  },
  {
    icon: Search,
    title: 'SEO Meta Architect',
    description: 'Structure keyword payloads and descriptions automatically for higher rankings and organic CTR.',
    colorClass: 'text-emerald-500 bg-emerald-500/10 dark:text-emerald-400 dark:bg-emerald-900/20',
  },
  {
    icon: Zap,
    title: 'Instant Production Speed',
    description: 'Generate production-ready markdown copy in seconds. No lag, powered by edge rendering engines.',
    colorClass: 'text-amber-500 bg-amber-500/10 dark:text-amber-400 dark:bg-amber-900/20',
  },
  {
    icon: BookOpen,
    title: 'Curated Copy Templates',
    description: 'Access specific pre-trained outlines tailored for blogs, newsletters, scripts, and tweets.',
    colorClass: 'text-purple-500 bg-purple-500/10 dark:text-purple-400 dark:bg-purple-900/20',
  },
  {
    icon: MessageSquare,
    title: 'Collaborative AI Companion',
    description: 'Refine drafts dynamically. Ask for styling edits, translations, or length adjustments.',
    colorClass: 'text-pink-500 bg-pink-500/10 dark:text-pink-400 dark:bg-pink-900/20',
  },
  {
    icon: ShieldAlert,
    title: 'Secure Account RBAC',
    description: 'Scale content across roles. Advanced Manager/Editor authorization powered by Clerk SSO.',
    colorClass: 'text-indigo-500 bg-indigo-500/10 dark:text-indigo-400 dark:bg-indigo-900/20',
  },
]

export function Features() {
  return (
    <section id="features" className="py-20 sm:py-28 bg-background relative overflow-hidden border-b">
      {/* Background decorations */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-tr from-blue-500/5 to-emerald-500/5 rounded-full blur-3xl pointer-events-none"></div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground font-sans">
            Engineered for Modern Content Teams
          </h2>
          <p className="mt-4 text-base sm:text-lg text-muted-foreground">
            Everything you need to conceptualize, draft, optimize, and organize your company&apos;s digital copy at scale.
          </p>
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {FEATURES_DATA.map((feat, idx) => {
            const Icon = feat.icon
            return (
              <div
                key={idx}
                className="group p-6 rounded-xl border bg-card text-card-foreground shadow-sm hover:shadow-md hover:border-primary/30 transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between"
              >
                <div>
                  {/* Icon Wrapper */}
                  <div className={`inline-flex items-center justify-center p-3 rounded-xl mb-5 ${feat.colorClass} group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className="w-6 h-6 shrink-0" />
                  </div>

                  {/* Title & Desc */}
                  <h3 className="text-lg font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                    {feat.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {feat.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-border/40 text-xs font-semibold text-primary inline-flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span>Learn more</span>
                  <span className="group-hover:translate-x-0.5 transition-transform">→</span>
                </div>
              </div>
            )
          })}
        </div>

      </div>
    </section>
  )
}
