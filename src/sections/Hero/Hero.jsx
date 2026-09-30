import { motion, useReducedMotion } from 'framer-motion'
import { ArrowRight, Heart, Scissors, ShieldCheck, Sparkles } from 'lucide-react'
import './Hero.css'

const values = [
  { icon: Sparkles, title: 'Premium Fabrics' },
  { icon: Scissors, title: 'Thoughtful Design' },
  { icon: Heart, title: 'Made for Every Story' },
]

function Hero() {
  const reduceMotion = useReducedMotion()
  const enter = (delay = 0) => reduceMotion
    ? { initial: false }
    : { initial: { opacity: 0, y: 18 }, animate: { opacity: 1, y: 0 }, transition: { duration: .65, delay, ease: [0.22, 1, 0.36, 1] } }

  const handleFutureLink = (event) => {
    const target = document.querySelector(event.currentTarget.getAttribute('href'))
    if (!target) event.preventDefault()
  }

  return (
    <section id="home" className="hero section" aria-labelledby="hero-title">
      <div className="hero__container container">
        <div className="hero__content">
          <motion.p className="hero__badge" {...enter(0)}><Sparkles aria-hidden="true" />New Season Collection</motion.p>
          <motion.h1 id="hero-title" {...enter(.08)}>Style That<br /><span>Defines You</span></motion.h1>
          <motion.p className="hero__description" {...enter(.16)}>Discover thoughtfully designed clothing that brings together modern style, lasting comfort, and everyday confidence.</motion.p>
          <motion.div className="hero__actions" {...enter(.24)}>
            <a className="hero-button hero-button--primary" href="#collections" onClick={handleFutureLink}>Shop Collection <ArrowRight /></a>
            <a className="hero-button hero-button--secondary" href="#new-arrivals" onClick={handleFutureLink}>Explore New Arrivals <ArrowRight /></a>
          </motion.div>
          <motion.div className="hero__values" initial={reduceMotion ? false : 'hidden'} animate="visible" variants={{ visible: { transition: { staggerChildren: reduceMotion ? 0 : .09, delayChildren: .3 } } }}>
            {values.map(({ icon: Icon, title }) => <motion.div className="hero-value" key={title} variants={reduceMotion ? {} : { hidden: { opacity: 0, y: 12 }, visible: { opacity: 1, y: 0 } }}><Icon aria-hidden="true" /><strong>{title}</strong></motion.div>)}
          </motion.div>
        </div>

        <motion.div className="hero__visual" {...enter(.14)}>
          <div className="hero__line hero__line--one" aria-hidden="true" />
          <div className="hero__line hero__line--two" aria-hidden="true" />
          <div className="hero__image-wrap">
            <img className="hero__main-image" src="/images/hero/threader-seasonal-editorial.webp" alt="Model wearing an elegant THREADER seasonal outfit" width="1024" height="1536" loading="eager" fetchPriority="high" />
          </div>
          <motion.div className="quality-badge" initial={reduceMotion ? false : { opacity: 0, scale: .94 }} animate={{ opacity: 1, scale: 1, y: reduceMotion ? 0 : [0, -5, 0] }} transition={reduceMotion ? {} : { opacity: { delay: .5 }, scale: { delay: .5 }, y: { duration: 4, repeat: Infinity, ease: 'easeInOut' } }}><ShieldCheck aria-hidden="true" /><span>Premium Quality</span></motion.div>
          <motion.figure className="hero__detail" {...enter(.4)}><img src="/images/hero/threader-embroidery-detail.webp" alt="Black fabric with refined muted-gold embroidery detail" width="1254" height="1254" loading="lazy" decoding="async" /></motion.figure>
          <motion.div className="collection-card" {...enter(.48)}><Sparkles aria-hidden="true" /><div><small>Signature Collection</small><strong>Designed for Every Story</strong><p>Modern silhouettes <span aria-hidden="true">•</span> Everyday comfort</p></div></motion.div>
        </motion.div>
      </div>
    </section>
  )
}

export default Hero
