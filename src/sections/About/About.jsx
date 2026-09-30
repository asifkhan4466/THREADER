import { useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { ChevronDown, Heart, Layers, PencilRuler, Sparkles } from 'lucide-react'
import './About.css'

const values = [
  { icon: Layers, title: 'Quality Fabrics', description: 'Materials selected for comfort, feel, and everyday wear.' },
  { icon: PencilRuler, title: 'Modern Design', description: 'Contemporary silhouettes shaped by timeless style.' },
  { icon: Heart, title: 'Everyday Comfort', description: 'Thoughtful fits designed to move naturally with you.' },
]

function About() {
  const [isExpanded, setIsExpanded] = useState(false)
  const reduceMotion = useReducedMotion()
  const reveal = (delay = 0) => reduceMotion
    ? { initial: false }
    : { initial: { opacity: 0, y: 16 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true, amount: .25 }, transition: { duration: .55, delay, ease: [0.22, 1, 0.36, 1] } }

  return (
    <section id="about" className="about section" aria-labelledby="about-heading">
      <div className="about__decoration" aria-hidden="true"><span /></div>
      <div className="about__layout container">
        <motion.div className="about__visual" {...reveal()}>
          <div className="about__image-wrap">
            <img src="/images/about/threader-craftsmanship-story.webp" alt="Fabric and embroidery details representing THREADER craftsmanship" width="960" height="1200" loading="lazy" />
          </div>
          <motion.aside className="about__caption" aria-label="Thoughtful details" {...reveal(.18)}>
            <Sparkles aria-hidden="true" />
            <div><strong>Thoughtful Details</strong><p>Designed with comfort, character, and versatility in mind.</p></div>
          </motion.aside>
        </motion.div>

        <div className="about__content">
          <motion.p className="type-label" {...reveal()}>Our Story</motion.p>
          <motion.h2 id="about-heading" className="type-section-heading" {...reveal(.05)}>Clothing Made for Your Story</motion.h2>
          <motion.p className="about__intro" {...reveal(.1)}>THREADER celebrates personal style through thoughtful design, comfortable fabrics, and versatile clothing for men, women, and kids.</motion.p>
          <motion.p className="about__story" {...reveal(.14)}>Every collection is created to bring confidence, comfort, and individuality into the moments that become part of your story. From everyday essentials to refined occasion wear, THREADER is designed for real lives and personal expression.</motion.p>

          <div id="about-more" className="about__more-region">
            <AnimatePresence initial={false}>
              {isExpanded && (
                <motion.div className="about__more" initial={reduceMotion ? false : { height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={reduceMotion ? undefined : { height: 0, opacity: 0 }} transition={{ duration: reduceMotion ? 0 : .32, ease: [0.22, 1, 0.36, 1] }}>
                  <p>We believe clothing should feel as considered as it looks. Our design direction balances contemporary silhouettes with timeless influences, creating pieces that can move naturally between daily routines, celebrations, and meaningful occasions.</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <motion.button className="about__toggle" type="button" aria-expanded={isExpanded} aria-controls="about-more" onClick={() => setIsExpanded((current) => !current)} {...reveal(.18)}>
            {isExpanded ? 'Show Less' : 'Discover Our Story'}<ChevronDown className={isExpanded ? 'is-rotated' : ''} aria-hidden="true" />
          </motion.button>

          <motion.div className="about__values" initial={reduceMotion ? false : 'hidden'} whileInView="visible" viewport={{ once: true, amount: .2 }} variants={{ visible: { transition: { staggerChildren: reduceMotion ? 0 : .07 } } }}>
            {values.map(({ icon: Icon, title, description }) => (
              <motion.article className="about-value" key={title} variants={reduceMotion ? {} : { hidden: { opacity: 0, y: 12 }, visible: { opacity: 1, y: 0, transition: { duration: .42 } } }}>
                <Icon aria-hidden="true" /><h3>{title}</h3><p>{description}</p>
              </motion.article>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default About
