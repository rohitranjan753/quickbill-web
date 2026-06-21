import { Zap } from 'lucide-react'

export function Footer() {
  const scrollTo = (href: string) => {
    const el = document.querySelector(href)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <footer className="bg-on-surface text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 bg-velocity-gradient rounded-lg flex items-center justify-center">
                <Zap size={16} className="text-white" />
              </div>
              <span className="font-bold text-lg">QuickBill</span>
            </div>
            <p className="text-white/50 text-sm leading-relaxed max-w-xs">
              Skip the Queue. India's smartest self-checkout platform for grocery stores.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-semibold text-sm mb-4 text-white/70">Quick Links</h4>
            <div className="flex flex-col gap-2">
              {[
                { label: 'Features', href: '#features' },
                { label: 'How It Works', href: '#how-it-works' },
                { label: 'For Store Owners', href: '#for-owners' },
                { label: 'About', href: '#about' },
              ].map((link) => (
                <button
                  key={link.label}
                  onClick={() => scrollTo(link.href)}
                  className="text-left text-white/50 text-sm hover:text-white/80 transition-colors"
                >
                  {link.label}
                </button>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold text-sm mb-4 text-white/70">Contact</h4>
            <div className="flex flex-col gap-2 text-white/50 text-sm">
              <span>hello@quickbill.in</span>
              <span>+91 98765 43210</span>
              <span>Bengaluru, Karnataka</span>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-white/40 text-xs">
            © {new Date().getFullYear()} QuickBill. All rights reserved.
          </p>
          <p className="text-white/40 text-xs">
            Built with{' '}
            <span className="text-tertiary">♥</span>{' '}
            in India
          </p>
        </div>
      </div>
    </footer>
  )
}
