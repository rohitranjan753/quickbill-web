import { motion } from 'framer-motion'
import { Zap, ArrowRight, ShieldCheck, ChevronRight } from 'lucide-react'
import { useAuth } from '../../context/AuthContext'
import { useNavigate } from 'react-router-dom'

export function HeroSection() {
  const { user, signInWithGoogle } = useAuth()
  const navigate = useNavigate()

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-velocity-gradient">
      {/* Radial glow */}
      <div className="absolute inset-0 bg-hero-radial pointer-events-none" />

      {/* Animated speed lines */}
      <div className="absolute bottom-0 left-0 right-0 flex items-end gap-1 px-8 opacity-10 pointer-events-none">
        {Array.from({ length: 40 }).map((_, i) => (
          <div
            key={i}
            className="bg-white rounded-full"
            style={{ width: '2px', height: `${Math.random() * 40 + 10}px` }}
          />
        ))}
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16 w-full">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left: Content */}
          <div className="text-white">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-sm border border-white/20 rounded-pill px-4 py-2 mb-6"
            >
              <Zap size={14} className="text-primary-fixed" />
              <span className="text-sm font-medium text-white/90">India's Smartest Self-Checkout Platform</span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 32 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-5xl lg:text-6xl font-extrabold leading-tight tracking-tight mb-4"
            >
              Skip the <br />
              <span className="text-primary-fixed">Queue.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-white/75 text-lg leading-relaxed mb-8 max-w-md"
            >
              QuickBill transforms Indian grocery stores into intelligent self-checkout powerhouses — customers scan, pay, and exit without waiting.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-wrap gap-3 mb-10"
            >
              <button
                onClick={() => user ? navigate('/dashboard') : signInWithGoogle()}
                className="flex items-center gap-2 bg-white text-primary font-semibold px-6 py-3 rounded-card hover:bg-white/90 transition-all duration-200 shadow-md active:scale-95"
              >
                {user ? 'Go to Dashboard' : 'Get Started Free'}
                <ArrowRight size={16} />
              </button>
              <button
                onClick={() => document.querySelector('#how-it-works')?.scrollIntoView({ behavior: 'smooth' })}
                className="flex items-center gap-2 border border-white/40 text-white font-semibold px-6 py-3 rounded-card hover:bg-white/10 transition-all duration-200"
              >
                See How It Works
                <ChevronRight size={16} />
              </button>
            </motion.div>

            {/* Trust indicators */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="flex items-center gap-6"
            >
              <div className="flex items-center gap-2 text-white/70 text-sm">
                <ShieldCheck size={16} className="text-primary-fixed" />
                <span>Secure & Verified</span>
              </div>
              <div className="w-px h-4 bg-white/20" />
              <div className="text-white/70 text-sm">No setup fees</div>
              <div className="w-px h-4 bg-white/20" />
              <div className="text-white/70 text-sm">5-min onboarding</div>
            </motion.div>
          </div>

          {/* Right: Phone mockup */}
          <div className="hidden lg:flex items-center justify-center">
            <motion.div
              animate={{ y: [0, -12, 0] }}
              transition={{ duration: 3, ease: 'easeInOut', repeat: Infinity }}
              className="relative"
            >
              {/* Phone frame */}
              <div className="relative w-[280px] h-[560px] bg-white/10 backdrop-blur-md rounded-[44px] border-2 border-white/30 shadow-2xl overflow-hidden">
                {/* Notch */}
                <div className="absolute top-4 left-1/2 -translate-x-1/2 w-24 h-6 bg-black/40 rounded-full" />

                {/* Screen content */}
                <div className="absolute inset-0 pt-14 px-4 pb-6 flex flex-col gap-3">
                  {/* Header */}
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="h-2.5 w-20 bg-white/60 rounded-full mb-1.5" />
                      <div className="h-2 w-12 bg-white/30 rounded-full" />
                    </div>
                    <div className="w-9 h-9 rounded-full bg-white/20" />
                  </div>

                  {/* Scan area */}
                  <div className="flex-1 bg-white/10 rounded-2xl flex flex-col items-center justify-center border-2 border-dashed border-white/30">
                    <div className="w-16 h-16 rounded-2xl bg-primary-fixed/30 flex items-center justify-center mb-3">
                      <Zap size={28} className="text-primary-fixed" />
                    </div>
                    <div className="h-2 w-24 bg-white/50 rounded-full mb-2" />
                    <div className="h-2 w-16 bg-white/30 rounded-full" />
                  </div>

                  {/* Cart items */}
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="flex items-center gap-3 bg-white/10 rounded-xl p-3">
                      <div className="w-10 h-10 rounded-lg bg-white/20 flex-shrink-0" />
                      <div className="flex-1">
                        <div className="h-2 w-20 bg-white/60 rounded-full mb-1.5" />
                        <div className="h-2 w-12 bg-white/30 rounded-full" />
                      </div>
                      <div className="h-3 w-10 bg-primary-fixed/60 rounded-full" />
                    </div>
                  ))}

                  {/* Pay button */}
                  <div className="bg-primary-fixed rounded-xl py-3 flex items-center justify-center">
                    <div className="h-2.5 w-16 bg-primary/60 rounded-full" />
                  </div>
                </div>
              </div>

              {/* Floating stat bubbles */}
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 2.5, ease: 'easeInOut', repeat: Infinity, delay: 0.5 }}
                className="absolute -left-12 top-16 bg-white rounded-xl shadow-lg px-4 py-2.5 border border-outline-variant"
              >
                <div className="text-xs text-on-surface-variant font-mono">Checkout time</div>
                <div className="text-lg font-bold text-primary font-numbers">45 sec</div>
              </motion.div>

              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 2.8, ease: 'easeInOut', repeat: Infinity, delay: 1 }}
                className="absolute -right-8 bottom-20 bg-white rounded-xl shadow-lg px-4 py-2.5 border border-outline-variant"
              >
                <div className="text-xs text-on-surface-variant font-mono">Queue wait</div>
                <div className="text-lg font-bold text-primary font-numbers">Zero</div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Wave divider */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0 60L1440 60L1440 30C1200 60 720 0 0 30L0 60Z" fill="#F5FBF4" />
        </svg>
      </div>
    </section>
  )
}
