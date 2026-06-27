import { Star } from 'lucide-react'

export function SocialProof() {
  const brandLogos = [
    { name: 'Vercel', icon: '▲' },
    { name: 'Supabase', icon: '⚡' },
    { name: 'Stripe', icon: '💳' },
    { name: 'Linear', icon: '⧉' },
    { name: 'GitHub', icon: '🐙' },
  ]

  const avatars = [
    { text: 'JD', bg: 'bg-blue-500' },
    { text: 'AM', bg: 'bg-emerald-500' },
    { text: 'SK', bg: 'bg-purple-500' },
    { text: 'TL', bg: 'bg-orange-500' },
    { text: 'RB', bg: 'bg-pink-500' },
  ]

  return (
    <section className="py-12 bg-muted/30 border-b">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
          
          {/* Left: Star Ratings & Overlapping Avatars */}
          <div className="flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left shrink-0">
            {/* Avatar Stack */}
            <div className="flex -space-x-3 overflow-hidden">
              {avatars.map((av, idx) => (
                <div
                  key={idx}
                  className={`inline-flex items-center justify-center w-9 h-9 rounded-full ${av.bg} text-white text-[10px] font-bold ring-2 ring-background`}
                >
                  {av.text}
                </div>
              ))}
              <div className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-muted-foreground/20 text-foreground text-[10px] font-semibold ring-2 ring-background">
                +4k
              </div>
            </div>

            {/* Stars & Text */}
            <div className="space-y-1">
              <div className="flex justify-center sm:justify-start items-center gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                ))}
                <span className="ml-1.5 text-sm font-semibold text-foreground">4.9/5</span>
              </div>
              <p className="text-xs text-muted-foreground">
                Trusted by <span className="font-semibold text-foreground">15,000+ developers</span> & marketing teams worldwide
              </p>
            </div>
          </div>

          {/* Right: Partner/Brand Logos Grid */}
          <div className="w-full lg:w-auto">
            <p className="text-center lg:text-right text-xs uppercase tracking-wider text-muted-foreground/60 font-semibold mb-4 lg:mb-3">
              Powering content workflows at
            </p>
            <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-8 lg:gap-10">
              {brandLogos.map((brand, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-1.5 text-muted-foreground/70 hover:text-foreground/90 transition-colors cursor-default"
                >
                  <span className="text-base font-bold select-none">{brand.icon}</span>
                  <span className="font-semibold text-sm tracking-tight">{brand.name}</span>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
