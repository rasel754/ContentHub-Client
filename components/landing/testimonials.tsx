import { Star } from 'lucide-react'

const TESTIMONIALS_DATA = [
  {
    name: 'Sarah Johnson',
    role: 'Growth Marketing Director',
    company: 'SaaSFlow',
    content: 'ContentHub transformed our editorial pipeline. We went from publishing once a week to four times a week, and our organic SEO search traffic is up 120%. The AI template quality is unmatched.',
    rating: 5,
    avatarInitials: 'SJ',
    bg: 'bg-emerald-500',
  },
  {
    name: 'Michael Chen',
    role: 'Fullstack Dev & Creator',
    company: 'DevLog',
    content: 'As a solo developer, writing copy is my bottleneck. ContentHub generates clean README drafts, blog posts, and Twitter threads in seconds. It saves me at least 15 hours every week.',
    rating: 5,
    avatarInitials: 'MC',
    bg: 'bg-blue-500',
  },
  {
    name: 'Emily Roberts',
    role: 'Social Media Lead',
    company: 'Aura Agency',
    content: 'The multi-format generator is a game changer. I can input a single article outline and immediately get optimized LinkedIn posts and Twitter threads. The inline assistant is incredibly helpful.',
    rating: 5,
    avatarInitials: 'ER',
    bg: 'bg-purple-500',
  },
]

export function Testimonials() {
  return (
    <section id="testimonials" className="py-20 sm:py-28 bg-muted/20 border-b relative">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground font-sans">
            Loved by Developers and Creators
          </h2>
          <p className="mt-4 text-base sm:text-lg text-muted-foreground">
            See how teams use ContentHub to automate their digital copy and scale organic outreach.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {TESTIMONIALS_DATA.map((t, idx) => (
            <div
              key={idx}
              className="p-6 sm:p-8 rounded-2xl border bg-card text-card-foreground shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between"
            >
              <div className="space-y-4">
                {/* Rating Stars */}
                <div className="flex gap-0.5">
                  {[...Array(t.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>

                {/* Quote */}
                <p className="text-sm sm:text-base text-muted-foreground italic leading-relaxed">
                  &ldquo;{t.content}&rdquo;
                </p>
              </div>

              {/* User Bio */}
              <div className="flex items-center gap-3.5 mt-8 pt-6 border-t border-border/40">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white text-xs font-bold ${t.bg}`}>
                  {t.avatarInitials}
                </div>
                <div>
                  <h4 className="text-sm font-bold text-foreground font-sans leading-snug">{t.name}</h4>
                  <p className="text-xs text-muted-foreground leading-normal">
                    {t.role} &middot; <span className="font-semibold text-primary/80">{t.company}</span>
                  </p>
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
