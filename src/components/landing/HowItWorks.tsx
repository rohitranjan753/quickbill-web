import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { ScanLine, CreditCard, QrCode, ArrowRight } from 'lucide-react'

const steps = [
  {
    icon: ScanLine,
    number: '01',
    title: 'Scan Products',
    description: 'Customers use their phone camera to scan barcodes as they add items to cart.',
    color: 'from-green-500 to-emerald-600',
  },
  {
    icon: CreditCard,
    number: '02',
    title: 'Pay Digitally',
    description: 'Checkout via UPI, cards, or wallets. Payment is verified and order is confirmed instantly.',
    color: 'from-blue-500 to-indigo-600',
  },
  {
    icon: QrCode,
    number: '03',
    title: 'Exit with QR',
    description: 'Guard scans the QR receipt at the exit. Verification takes under 2 seconds.',
    color: 'from-purple-500 to-violet-600',
  },
]

export function HowItWorks() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="how-it-works" className="py-24 bg-surface-low" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-primary font-semibold text-sm uppercase tracking-widest font-mono">Process</span>
          <h2 className="text-3xl lg:text-4xl font-bold text-on-surface mt-2 mb-4">
            How QuickBill works
          </h2>
          <p className="text-on-surface-variant text-lg max-w-xl mx-auto">
            Three steps from entry to exit. No queues, no waiting, no manual billing.
          </p>
        </motion.div>

        <div className="relative">
          {/* Connector line (desktop) */}
          <div className="hidden lg:block absolute top-16 left-[22%] right-[22%] h-px">
            <motion.div
              initial={{ scaleX: 0 }}
              animate={inView ? { scaleX: 1 } : {}}
              transition={{ duration: 1, delay: 0.4 }}
              style={{ transformOrigin: 'left' }}
              className="h-full bg-gradient-to-r from-green-400 via-blue-400 to-purple-400 opacity-40"
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12 relative">
            {steps.map((step, i) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 40 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: i * 0.2 }}
                className="flex flex-col items-center text-center"
              >
                {/* Icon circle */}
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${step.color} flex items-center justify-center shadow-md mb-5`}>
                  <step.icon size={26} className="text-white" />
                </div>

                <div className="text-xs font-mono font-bold text-outline mb-2 tracking-widest">{step.number}</div>
                <h3 className="font-bold text-on-surface text-lg mb-3">{step.title}</h3>
                <p className="text-on-surface-variant text-sm leading-relaxed max-w-xs">{step.description}</p>

                {/* Mobile arrow */}
                {i < steps.length - 1 && (
                  <div className="lg:hidden mt-6">
                    <ArrowRight size={20} className="text-outline rotate-90" />
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
