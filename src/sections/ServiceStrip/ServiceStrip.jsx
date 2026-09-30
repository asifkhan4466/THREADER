import { motion, useReducedMotion } from 'framer-motion'
import ServiceBenefitCard from '../../components/ui/ServiceBenefitCard'
import { serviceBenefits } from '../../data/serviceBenefits'
import './ServiceStrip.css'

function ServiceStrip() {
  const reduceMotion = useReducedMotion()
  const entrance = reduceMotion ? { initial: false } : {
    initial: 'hidden',
    whileInView: 'visible',
    viewport: { once: true, amount: .2 },
    variants: {
      hidden: { opacity: 0, y: 12 },
      visible: { opacity: 1, y: 0, transition: { duration: .35, staggerChildren: .07, ease: [0.22, 1, 0.36, 1] } },
    },
  }

  return (
    <section id="services" className="service-strip section" aria-labelledby="services-heading">
      <div className="container">
        <h2 id="services-heading" className="sr-only">THREADER Shopping Services</h2>
        <motion.div className="service-strip__panel" {...entrance}>
          {serviceBenefits.map((benefit) => (
            <ServiceBenefitCard key={benefit.id} benefit={benefit} reduceMotion={reduceMotion} />
          ))}
        </motion.div>
      </div>
    </section>
  )
}

export default ServiceStrip
