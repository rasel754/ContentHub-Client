import Link from 'next/link'
import { ROUTES } from '@/config/constants'
import { Mail, Sparkles } from 'lucide-react'

function GithubIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
  )
}

function LinkedinIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect x="2" y="9" width="4" height="12" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  )
}

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="border-t bg-muted/30">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-8 pb-12 border-b border-border/60">
          
          {/* Brand & Mission Statement */}
          <div className="md:col-span-4 space-y-4">
            <Link href={ROUTES.HOME} className="flex items-center gap-2 font-bold text-lg select-none">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-emerald-600 dark:from-blue-500 dark:to-emerald-500 rounded-lg flex items-center justify-center text-white font-bold text-sm shadow">
                AI
              </div>
              <span className="font-sans text-foreground">ContentHub</span>
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Empower your content creation pipeline with state-of-the-art AI-powered language generators designed for modern, high-growth teams.
            </p>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[10px] font-semibold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
              <Sparkles className="w-3 h-3" />
              <span>All Systems Operational</span>
            </div>
          </div>

          {/* Spacer */}
          <div className="hidden md:block md:col-span-1"></div>

          {/* Product Links */}
          <div className="md:col-span-2 space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-foreground">Product</h3>
            <ul className="flex flex-col gap-2.5 text-sm">
              <li>
                <Link href={ROUTES.EXPLORE} className="text-muted-foreground hover:text-primary transition-colors">
                  Explore Tools
                </Link>
              </li>
              <li>
                <Link href="/#features" className="text-muted-foreground hover:text-primary transition-colors">
                  Platform Features
                </Link>
              </li>
              <li>
                <Link href="/#pricing" className="text-muted-foreground hover:text-primary transition-colors">
                  Subscription Plans
                </Link>
              </li>
              <li>
                <Link href={ROUTES.BLOG} className="text-muted-foreground hover:text-primary transition-colors">
                  Resource Blog
                </Link>
              </li>
            </ul>
          </div>

          {/* Company Links */}
          <div className="md:col-span-2 space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-foreground">Company</h3>
            <ul className="flex flex-col gap-2.5 text-sm">
              <li>
                <Link href={ROUTES.ABOUT} className="text-muted-foreground hover:text-primary transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href={ROUTES.CONTACT} className="text-muted-foreground hover:text-primary transition-colors">
                  Get In Touch
                </Link>
              </li>
              <li>
                <Link href={ROUTES.ABOUT} className="text-muted-foreground hover:text-primary transition-colors">
                  Careers (Hiring)
                </Link>
              </li>
              <li>
                <Link href={ROUTES.ABOUT} className="text-muted-foreground hover:text-primary transition-colors">
                  Media & Press
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal Links */}
          <div className="md:col-span-3 space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-foreground">Legal</h3>
            <ul className="flex flex-col gap-2.5 text-sm">
              <li>
                <Link href={ROUTES.PRIVACY} className="text-muted-foreground hover:text-primary transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href={ROUTES.PRIVACY} className="text-muted-foreground hover:text-primary transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href={ROUTES.PRIVACY} className="text-muted-foreground hover:text-primary transition-colors">
                  Cookie Preferences
                </Link>
              </li>
            </ul>
          </div>

        </div>

        {/* Sub-footer Copyright & Social profiles */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted-foreground text-center sm:text-left">
            &copy; {currentYear} ContentHub AI. Developed with ❤️ for modern technical portfolios. All rights reserved.
          </p>
          
          <div className="flex items-center gap-5">
            <a
              href="mailto:rasel@contenthub.ai"
              className="text-muted-foreground hover:text-primary transition-colors flex items-center gap-1.5 text-xs font-medium"
              aria-label="Email Support"
            >
              <Mail className="w-4 h-4 shrink-0" />
              <span>Contact Support</span>
            </a>
            
            <div className="w-px h-4 bg-border"></div>

            <a
              href="https://github.com/rasel754"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground transition-colors"
              aria-label="GitHub Repository"
            >
              <GithubIcon className="w-4 h-4 shrink-0" />
            </a>

            <a
              href="https://linkedin.com/in/rasel"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground transition-colors"
              aria-label="LinkedIn Profile"
            >
              <LinkedinIcon className="w-4 h-4 shrink-0" />
            </a>
          </div>
        </div>

      </div>
    </footer>
  )
}
