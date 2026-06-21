import { motion, useInView, useMotionValue, useTransform, animate } from 'framer-motion'
import { useRef, useEffect } from 'react'

interface StatProps {
  suffix: string
  label: string
  numericValue: number
  isDecimal?: boolean
  inView: boolean
  delay: number
}

function AnimatedStat({ suffix, label, numericValue, isDecimal, inView, delay }: StatProps) {
  const count = useMotionValue(0)
  const rounded = useTransform(count, (v) => isDecimal ? v.toFixed(1) : Math.round(v).toString())

  useEffect(() => {
    if (!inView) return
    const controls = animate(count, numericValue, { duration: 2, delay })
    return controls.stop
  }, [inView, numericValue, delay, count])

  return (
    <div className="text-center">
      <div className="flex items-baseline justify-center gap-1 mb-2">
        <motion.span className="text-5xl font-extrabold text-primary-fixed font-numbers">
          {rounded}
        </motion.span>
        <span className="text-3xl font-bold text-primary-fixed/70">{suffix}</span>
      </div>
      <p className="text-white/60 text-sm">{label}</p>
    </div>
  )
}

const stats: StatProps[] = [
  { suffix: 'x', label: 'Faster checkout', numericValue: 3, isDecimal: true, inView: false, delay: 0 },
  { suffix: '%', label: 'Digital payments', numericValue: 100, inView: false, delay: 0.2 },
  { suffix: '', label: 'Manual billing errors', numericValue: 0, inView: false, delay: 0.4 },
  { suffix: '/7', label: 'Real-time tracking', numericValue: 24, inView: false, delay: 0.6 },
]

export function WhyQuickBill() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section className="py-24 bg-dark-gradient" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-primary-fixed font-semibold text-sm uppercase tracking-widest font-mono">Impact</span>
          <h2 className="text-3xl lg:text-4xl font-bold text-white mt-2 mb-4">
            Why store owners choose QuickBill
          </h2>
          <p className="text-white/60 text-lg max-w-xl mx-auto">
            Real numbers from stores that have deployed QuickBill. The results speak for themselves.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {stats.map((stat) => (
            <AnimatedStat key={stat.label} {...stat} inView={inView} />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-4"
        >
          {[
            { quote: 'Our evening rush hour queue is completely gone. Customers love it.', author: 'Ravi Kumar', store: 'Daily Fresh, Bengaluru' },
            { quote: 'Inventory management used to take 2 hours daily. Now it\'s automatic.', author: 'Priya Sharma', store: 'Super Mart, Mumbai' },
            { quote: 'Guard verification catches mismatches instantly. Zero shrinkage.', author: 'Suresh Nair', store: 'Family Store, Chennai' },
          ].map((testimonial) => (
            <div key={testimonial.author} className="bg-white/5 border border-white/10 rounded-xl p-5">
              <p className="text-white/80 text-sm leading-relaxed mb-4">"{testimonial.quote}"</p>
              <div>
                <div className="text-white font-semibold text-sm">{testimonial.author}</div>
                <div className="text-white/40 text-xs">{testimonial.store}</div>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
