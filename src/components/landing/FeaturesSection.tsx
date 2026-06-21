import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { ScanLine, Package, ShieldCheck, BarChart3 } from 'lucide-react'

const features = [
  {
    icon: ScanLine,
    title: 'Self-Checkout Scanning',
    description: 'Customers scan barcodes with their phone as they shop — no cashier required. Instant product recognition.',
    color: 'bg-green-50 text-green-700',
  },
  {
    icon: Package,
    title: 'Smart Inventory',
    description: 'Real-time stock tracking with low-stock alerts, CSV bulk uploads, and automatic inventory updates on every sale.',
    color: 'bg-blue-50 text-blue-700',
  },
  {
    icon: ShieldCheck,
    title: 'Guard Verification',
    description: 'Guards scan exit QR codes to verify purchases in seconds. Fraud flags and shift tracking built in.',
    color: 'bg-purple-50 text-purple-700',
  },
  {
    icon: BarChart3,
    title: 'Sales Analytics',
    description: 'Monitor daily revenue, top products, guard performance, and inventory health from one dashboard.',
    color: 'bg-orange-50 text-orange-700',
  },
]

export function FeaturesSection() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="features" className="py-24 bg-surface" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-primary font-semibold text-sm uppercase tracking-widest font-mono">Features</span>
          <h2 className="text-3xl lg:text-4xl font-bold text-on-surface mt-2 mb-4">
            Everything your store needs
          </h2>
          <p className="text-on-surface-variant text-lg max-w-xl mx-auto">
            From scanning to settlement — QuickBill handles the full retail loop so you can focus on growing your business.
          </p>
        </motion.div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              whileHover={{ scale: 1.02, boxShadow: '0 8px 24px rgba(0,0,0,0.10)' }}
              className="card p-6 cursor-default"
            >
              <div className={`w-12 h-12 rounded-xl ${feature.color} flex items-center justify-center mb-5`}>
                <feature.icon size={22} />
              </div>
              <h3 className="font-semibold text-on-surface text-base mb-2">{feature.title}</h3>
              <p className="text-on-surface-variant text-sm leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
