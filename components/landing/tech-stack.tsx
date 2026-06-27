import { Zap, Cpu, Key, Database, Layout } from 'lucide-react'

const TECHS = [
  {
    name: 'Next.js App Router',
    description: 'React Framework',
    detail: 'Optimized server-side rendering (SSR), layouts, and API routes.',
    icon: Zap,
    color: 'text-neutral-900 bg-neutral-100 dark:text-neutral-100 dark:bg-neutral-900 border-neutral-200 dark:border-neutral-800',
  },
  {
    name: 'OpenAI & Gemini',
    description: 'Artificial Intelligence',
    detail: 'Advanced language models fine-tuned for high accuracy copywriting.',
    icon: Cpu,
    color: 'text-violet-600 bg-violet-50 dark:text-violet-400 dark:bg-violet-950/20 border-violet-100 dark:border-violet-900/50',
  },
  {
    name: 'Clerk SSO Auth',
    description: 'Access Control Auth',
    detail: 'Secure authentication matching enterprise roles & permissions.',
    icon: Key,
    color: 'text-blue-600 bg-blue-50 dark:text-blue-400 dark:bg-blue-950/20 border-blue-100 dark:border-blue-900/50',
  },
  {
    name: 'MongoDB Database',
    description: 'Mongoose Storage Layer',
    detail: 'Highly scalable schema for documents, metadata, and analytics.',
    icon: Database,
    color: 'text-emerald-600 bg-emerald-50 dark:text-emerald-400 dark:bg-emerald-950/20 border-emerald-100 dark:border-emerald-900/50',
  },
  {
    name: 'Tailwind CSS & Radix',
    description: 'Styled UI Foundations',
    detail: 'Fluid typography, dark mode scaling, and glassmorphic designs.',
    icon: Layout,
    color: 'text-cyan-600 bg-cyan-50 dark:text-cyan-400 dark:bg-cyan-950/20 border-cyan-100 dark:border-cyan-900/50',
  },
]

export function TechStack() {
  return (
    <section id="tech-stack" className="py-20 sm:py-28 bg-muted/20 border-b relative">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground font-sans">
            Our Core Technology Stack
          </h2>
          <p className="mt-4 text-base sm:text-lg text-muted-foreground">
            A production-ready stack designed for responsive scalability, secure data access, and lightning-fast rendering.
          </p>
        </div>

        {/* Stack Items flex/grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 text-center lg:text-left">
          {TECHS.map((tech, idx) => {
            const Icon = tech.icon
            return (
              <div
                key={idx}
                className="group p-6 rounded-2xl border bg-card text-card-foreground hover:border-primary/20 hover:shadow-md transition-all duration-300 flex flex-col justify-between"
              >
                <div className="space-y-4">
                  {/* Icon */}
                  <div className="flex justify-center lg:justify-start">
                    <div className={`p-3 rounded-xl border ${tech.color} group-hover:scale-110 transition-transform duration-300`}>
                      <Icon className="w-5 h-5 shrink-0" />
                    </div>
                  </div>

                  {/* Text */}
                  <div className="space-y-1">
                    <h3 className="font-bold text-sm sm:text-base text-foreground font-sans tracking-tight leading-snug">
                      {tech.name}
                    </h3>
                    <p className="text-xs font-semibold text-primary/80">
                      {tech.description}
                    </p>
                  </div>

                  <p className="text-xs text-muted-foreground leading-relaxed leading-5">
                    {tech.detail}
                  </p>
                </div>

                <div className="mt-6 pt-3 border-t border-border/40 text-[10px] font-mono text-muted-foreground/60 select-none">
                  Production ready
                </div>
              </div>
            )
          })}
        </div>

      </div>
    </section>
  )
}
