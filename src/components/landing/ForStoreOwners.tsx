import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { CheckCircle, ArrowRight, Upload, Users, BarChart3, Package } from 'lucide-react'
import { useAuth } from '../../context/AuthContext'
import { useNavigate } from 'react-router-dom'

const benefits = [
  'Upload inventory via CSV in seconds',
  'Manage stock levels in real-time',
  'Assign and manage guard roles',
  'Monitor all store transactions',
  'Automated low-stock alerts',
  'Download sales reports anytime',
]

const dashboardFeatures = [
  { icon: Upload, label: 'Bulk CSV Upload', color: 'bg-green-100 text-green-700' },
  { icon: Package, label: 'Stock Management', color: 'bg-blue-100 text-blue-700' },
  { icon: Users, label: 'Guard Management', color: 'bg-purple-100 text-purple-700' },
  { icon: BarChart3, label: 'Analytics', color: 'bg-orange-100 text-orange-700' },
]

export function ForStoreOwners() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })
  const { user, signInWithGoogle } = useAuth()
  const navigate = useNavigate()

  return (
    <section id="for-owners" className="py-24 bg-surface" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left: Benefits */}
          <motion.div
            initial={{ opacity: 0, x: -32 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <span className="text-primary font-semibold text-sm uppercase tracking-widest font-mono">For Store Owners</span>
            <h2 className="text-3xl lg:text-4xl font-bold text-on-surface mt-2 mb-4">
              Your store, fully in control
            </h2>
            <p className="text-on-surface-variant text-base leading-relaxed mb-8">
              QuickBill gives store owners a powerful web dashboard to manage every aspect of their store — inventory, staff, and sales — all from one place.
            </p>

            <div className="grid grid-cols-1 gap-3 mb-8">
              {benefits.map((benefit, i) => (
                <motion.div
                  key={benefit}
                  initial={{ opacity: 0, x: -16 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.4, delay: i * 0.06 }}
                  className="flex items-center gap-3"
                >
                  <CheckCircle size={18} className="text-primary flex-shrink-0" />
                  <span className="text-on-surface-variant text-sm">{benefit}</span>
                </motion.div>
              ))}
            </div>

            <button
              onClick={() => user ? navigate('/dashboard') : signInWithGoogle()}
              className="btn-primary"
            >
              {user ? 'Go to Dashboard' : 'Start for Free'}
              <ArrowRight size={16} />
            </button>
          </motion.div>

          {/* Right: Dashboard preview card */}
          <motion.div
            initial={{ opacity: 0, x: 32 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            {/* Dashboard mockup */}
            <div className="bg-surface-card rounded-2xl border border-outline-variant shadow-lg overflow-hidden">
              {/* Header bar */}
              <div className="bg-primary px-6 py-4 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-lg bg-white/20 flex items-center justify-center">
                    <span className="text-white text-xs font-bold">Q</span>
                  </div>
                  <span className="text-white font-semibold text-sm">QuickBill Dashboard</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-primary-fixed/40" />
                  <div className="h-2 w-16 bg-white/30 rounded-full" />
                </div>
              </div>

              {/* Stats row */}
              <div className="grid grid-cols-3 gap-4 px-6 py-5 border-b border-outline-variant">
                {[
                  { label: 'Products', value: '248', color: 'text-primary' },
                  { label: 'Low Stock', value: '12', color: 'text-amber-600' },
                  { label: 'Guards', value: '3', color: 'text-secondary' },
                ].map((stat) => (
                  <div key={stat.label} className="text-center">
                    <div className={`text-2xl font-bold font-numbers ${stat.color}`}>{stat.value}</div>
                    <div className="text-xs text-on-surface-variant mt-0.5">{stat.label}</div>
                  </div>
                ))}
              </div>

              {/* Feature grid */}
              <div className="grid grid-cols-2 gap-3 p-6">
                {dashboardFeatures.map((feature) => (
                  <div key={feature.label} className="flex items-center gap-3 bg-surface-low rounded-card p-3">
                    <div className={`w-8 h-8 rounded-lg ${feature.color} flex items-center justify-center`}>
                      <feature.icon size={14} />
                    </div>
                    <span className="text-on-surface text-xs font-medium">{feature.label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Decorative blobs */}
            <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-primary/10 rounded-full blur-2xl pointer-events-none" />
            <div className="absolute -top-6 -left-6 w-24 h-24 bg-secondary/10 rounded-full blur-2xl pointer-events-none" />
          </motion.div>
        </div>
      </div>
    </section>
  )
}
