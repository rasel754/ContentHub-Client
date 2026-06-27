import Link from 'next/link'
import { ROUTES } from '@/config/constants'

export function Footer() {
  return (
    <footer className="border-t bg-muted/50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 font-bold text-lg">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-emerald-500 rounded-lg flex items-center justify-center text-white font-bold">
                AI
              </div>
              <span>ContentHub</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Empower your content creation with AI-powered tools designed for modern businesses.
            </p>
          </div>

          {/* Product */}
          <div className="space-y-4">
            <h3 className="font-semibold">Product</h3>
            <div className="flex flex-col gap-2 text-sm">
              <Link href={ROUTES.EXPLORE} className="text-muted-foreground hover:text-foreground transition-colors">
                Explore
              </Link>
              <Link href={ROUTES.BLOG} className="text-muted-foreground hover:text-foreground transition-colors">
                Blog
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                Pricing
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                Features
              </Link>
            </div>
          </div>

          {/* Company */}
          <div className="space-y-4">
            <h3 className="font-semibold">Company</h3>
            <div className="flex flex-col gap-2 text-sm">
              <Link href={ROUTES.ABOUT} className="text-muted-foreground hover:text-foreground transition-colors">
                About
              </Link>
              <Link href={ROUTES.CONTACT} className="text-muted-foreground hover:text-foreground transition-colors">
                Contact
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                Careers
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                Press
              </Link>
            </div>
          </div>

          {/* Legal */}
          <div className="space-y-4">
            <h3 className="font-semibold">Legal</h3>
            <div className="flex flex-col gap-2 text-sm">
              <Link href={ROUTES.PRIVACY} className="text-muted-foreground hover:text-foreground transition-colors">
                Privacy Policy
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                Terms of Service
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>

        <div className="border-t pt-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-sm text-muted-foreground">
              © 2024 ContentHub. All rights reserved.
            </p>
            <div className="flex gap-4">
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors" aria-label="Twitter">
                𝕏
              </a>
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors" aria-label="GitHub">
                GitHub
              </a>
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors" aria-label="LinkedIn">
                LinkedIn
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
