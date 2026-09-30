import { Headphones, RefreshCcw, ShieldCheck, Sparkles, Truck } from 'lucide-react'
import { motion } from 'framer-motion'
import './ServiceBenefitCard.css'

const iconMap = {
  Truck,
  RefreshCcw,
  ShieldCheck,
  Headphones,
}

function ServiceBenefitCard({ benefit, reduceMotion }) {
  const Icon = iconMap[benefit.icon] || Sparkles

  return (
    <motion.article
      className="service-benefit-card"
      variants={reduceMotion ? undefined : {
        hidden: { opacity: 0, y: 12 },
        visible: { opacity: 1, y: 0, transition: { duration: .4, ease: [0.22, 1, 0.36, 1] } },
      }}
    >
      <span className="service-benefit-card__icon" aria-hidden="true">
        <Icon strokeWidth={1.65} />
      </span>
      <div className="service-benefit-card__content">
        <h3>{benefit.title}</h3>
        <p>{benefit.description}</p>
      </div>
    </motion.article>
  )
}

export default ServiceBenefitCard
