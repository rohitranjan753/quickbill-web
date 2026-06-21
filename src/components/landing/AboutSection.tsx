import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { Heart, MapPin } from 'lucide-react'

export function AboutSection() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="about" className="py-24 bg-surface-low" ref={ref}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="text-primary font-semibold text-sm uppercase tracking-widest font-mono">About Us</span>
          <h2 className="text-3xl lg:text-4xl font-bold text-on-surface mt-2 mb-6">
            Built for India's retail future
          </h2>

          <p className="text-on-surface-variant text-lg leading-relaxed mb-6">
            QuickBill was built to solve a problem every Indian shopper knows — the checkout queue. We believe technology should eliminate friction, not create it. Our platform is designed for the real-world constraints of Indian grocery retail: affordable smartphones, UPI payments, and bustling neighborhood stores.
          </p>

          <p className="text-on-surface-variant text-base leading-relaxed mb-10">
            We're a small team of engineers and retail enthusiasts who want to help store owners modernize without complexity. No expensive hardware, no lengthy setup — just scan, pay, and exit.
          </p>

          <div className="flex items-center justify-center gap-6 flex-wrap">
            <div className="flex items-center gap-2 text-on-surface-variant text-sm">
              <Heart size={16} className="text-tertiary" />
              <span>Made with passion</span>
            </div>
            <div className="w-px h-4 bg-outline-variant hidden sm:block" />
            <div className="flex items-center gap-2 text-on-surface-variant text-sm">
              <MapPin size={16} className="text-primary" />
              <span>Proudly built in India</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
