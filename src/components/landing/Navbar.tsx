import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Zap, Menu, X } from 'lucide-react'
import { useAuth } from '../../context/AuthContext'
import { useNavigate } from 'react-router-dom'

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const { user, signInWithGoogle } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const navLinks = [
    { label: 'Features', href: '#features' },
    { label: 'How It Works', href: '#how-it-works' },
    { label: 'For Owners', href: '#for-owners' },
    { label: 'About', href: '#about' },
  ]

  const scrollTo = (href: string) => {
    setMenuOpen(false)
    const el = document.querySelector(href)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <motion.nav
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled ? 'bg-surface-card/95 backdrop-blur-md shadow-sm border-b border-outline-variant' : 'bg-transparent'
      }`}
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-velocity-gradient rounded-lg flex items-center justify-center">
              <Zap size={16} className="text-white" />
            </div>
            <span className={`font-bold text-lg tracking-tight ${scrolled ? 'text-on-surface' : 'text-white'}`}>
              QuickBill
            </span>
          </div>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <button
                key={link.label}
                onClick={() => scrollTo(link.href)}
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  scrolled ? 'text-on-surface-variant' : 'text-white/80 hover:text-white'
                }`}
              >
                {link.label}
              </button>
            ))}
          </div>

          {/* CTA */}
          <div className="hidden md:flex items-center gap-3">
            {user ? (
              <button onClick={() => navigate('/dashboard')} className="btn-primary text-sm py-2 px-4">
                Go to Dashboard
              </button>
            ) : (
              <button
                onClick={signInWithGoogle}
                className={`text-sm font-semibold px-5 py-2 rounded-card transition-all duration-200 ${
                  scrolled
                    ? 'bg-primary text-white hover:bg-primary-dark'
                    : 'bg-white text-primary hover:bg-white/90'
                }`}
              >
                Store Owner Login
              </button>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className={`md:hidden p-2 rounded-card ${scrolled ? 'text-on-surface' : 'text-white'}`}
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-surface-card border-t border-outline-variant"
          >
            <div className="px-4 py-4 flex flex-col gap-2">
              {navLinks.map((link) => (
                <button
                  key={link.label}
                  onClick={() => scrollTo(link.href)}
                  className="text-left px-3 py-2.5 rounded-card text-on-surface-variant font-medium text-sm hover:bg-surface-low"
                >
                  {link.label}
                </button>
              ))}
              <button
                onClick={() => { setMenuOpen(false); user ? navigate('/dashboard') : signInWithGoogle() }}
                className="btn-primary mt-2 justify-center"
              >
                {user ? 'Go to Dashboard' : 'Store Owner Login'}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}
