import { HelpCircle } from 'lucide-react'

const FAQS_DATA = [
  {
    question: 'How does ContentHub generate my copy?',
    answer: 'ContentHub integrates directly with state-of-the-art OpenAI and Gemini models. By injecting custom instruction outlines and structured parameters (e.g. key phrases, length constraints), our platform ensures coherent, high-quality Markdown output.',
  },
  {
    question: 'Are the outputs optimized for SEO?',
    answer: 'Yes. In addition to general copy, you can generate structured SEO meta titles, descriptions, and tag payloads designed to match search spiders criteria and maximize CTR rankings.',
  },
  {
    question: 'Can I invite other managers and editors?',
    answer: 'Absolutely. Utilizing our Clerk SSO login configurations, you can delegate Roles (such as Admin, Manager, and Editor) to collaborate on workspace projects and organize content folders together.',
  },
  {
    question: 'What is the credit system structure?',
    answer: 'Each content generation, blog outline, or interactive chat prompt consumes credits. Starter plan users receive 100 free credits per month. Pro Creators receive 1,000 monthly credits. Enterprise accounts enjoy unlimited generations.',
  },
  {
    question: 'Can I edit the generated markdown drafts?',
    answer: 'Yes! All generated outputs are formatted in valid Markdown. You can easily copy the output directly, edit it within our rich-text fields, or push it straight to your blogging CMS.',
  },
]

export function FAQ() {
  return (
    <section id="faq" className="py-20 sm:py-28 bg-background border-b relative">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground font-sans">
            Frequently Asked Questions
          </h2>
          <p className="mt-4 text-base sm:text-lg text-muted-foreground">
            Clear responses to common questions regarding our AI generators, credit guidelines, and roles.
          </p>
        </div>

        {/* Accordions */}
        <div className="space-y-4">
          {FAQS_DATA.map((faq, idx) => (
            <details
              key={idx}
              className="group border border-border/80 rounded-xl p-5 bg-card text-card-foreground hover:bg-muted/10 transition-colors cursor-pointer select-none"
            >
              <summary className="flex items-center justify-between font-semibold text-sm sm:text-base font-sans list-none">
                <div className="flex items-center gap-2.5">
                  <HelpCircle className="w-4 h-4 text-primary shrink-0" />
                  <span>{faq.question}</span>
                </div>
                {/* Custom Chevron animation */}
                <span className="text-xs transition-transform duration-300 group-open:rotate-180 text-muted-foreground/60 group-hover:text-foreground">
                  ▼
                </span>
              </summary>
              <p className="mt-4 text-sm text-muted-foreground leading-relaxed pl-7 border-t pt-3 border-border/40 cursor-text select-text">
                {faq.answer}
              </p>
            </details>
          ))}
        </div>

      </div>
    </section>
  )
}
