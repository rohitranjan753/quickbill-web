import { Zap } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

export function Footer() {
  const navigate = useNavigate()
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
            <div className="flex flex-col gap-2 text-white/50 text-sm mb-5">
              <span>rohit.techhive@gmail.com</span>
              <span>New Delhi, India</span>
            </div>
            <h4 className="font-semibold text-sm mb-3 text-white/70">Download the App</h4>
            <a
              href="https://play.google.com/store/apps/details?id=com.techhive.quickbill.customer"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2.5 bg-white/8 hover:bg-white/15 border border-white/15 hover:border-white/30 text-white px-4 py-2.5 rounded-lg transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5"
            >
              <svg className="w-5 h-5 flex-shrink-0" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M3.18 23.5c.3.17.64.22.97.15L14.72 12 3.18.35A1.5 1.5 0 003 1.5v21c0 .37.07.72.18 1z" fill="#EA4335"/>
                <path d="M18.82 9.17L15.43 12l3.39 2.83 3.87-2.25a1.5 1.5 0 000-2.58l-3.87-2.83z" fill="#FBBC04"/>
                <path d="M3.18 23.5L14.72 12 3.18.35C2.76.47 2.5.89 2.5 1.5v21c0 .61.26 1.03.68 1z" fill="#EA4335"/>
                <path d="M14.72 12L3.18 23.5c.33.06.67.01.97-.16l14.67-8.51L14.72 12z" fill="#34A853"/>
                <path d="M3.18.35L14.72 12l4.1-4.83L3.97.19A1.5 1.5 0 003.18.35z" fill="#4285F4"/>
              </svg>
              <div>
                <div className="text-[9px] text-white/50 leading-none">GET IT ON</div>
                <div className="text-xs font-semibold leading-none mt-0.5">Google Play</div>
              </div>
            </a>
          </div>
        </div>

        <div className="border-t border-white/10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-white/40 text-xs">
            © {new Date().getFullYear()} QuickBill. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate('/privacy-policy')}
              className="text-white/40 text-xs hover:text-white/70 transition-colors"
            >
              Privacy Policy
            </button>
            <p className="text-white/40 text-xs">
              Built with{' '}
              <span className="text-tertiary">♥</span>{' '}
              in India
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
