import { motion, useReducedMotion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { categories } from '../../data/categories'
import './Categories.css'

function Categories() {
  const reduceMotion = useReducedMotion()
  const reveal = reduceMotion
    ? { initial: false }
    : { initial: { opacity: 0, y: 18 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true, amount: .35 }, transition: { duration: .6, ease: [0.22, 1, 0.36, 1] } }

  const handleFutureLink = (event) => {
    if (!document.querySelector(event.currentTarget.getAttribute('href'))) {
      event.preventDefault()
    }
  }

  return (
    <section id="collections" className="categories section" aria-labelledby="categories-heading">
      <div className="container">
        <header className="categories__header">
          <motion.p className="type-label" {...reveal}>Collections</motion.p>
          <motion.h2 id="categories-heading" className="type-section-heading" {...reveal}>Shop by Category</motion.h2>
          <motion.p className="categories__description type-body" {...reveal}>Find pieces designed for every style, moment, and story.</motion.p>
        </header>

        <motion.div className="categories__grid" initial={reduceMotion ? false : 'hidden'} whileInView="visible" viewport={{ once: true, amount: .08 }} variants={{ visible: { transition: { staggerChildren: reduceMotion ? 0 : .07 } } }}>
          {categories.map((category) => (
            <motion.article id={category.anchorId} className="category-card" key={category.id} variants={reduceMotion ? {} : { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: .5, ease: [0.22, 1, 0.36, 1] } } }}>
              <img src={category.image} alt={category.alt} loading="lazy" width="1122" height="1402" style={{ objectPosition: category.imagePosition }} />
              <div className="category-card__shade" aria-hidden="true" />
              <div className="category-card__content">
                <h3>{category.name}</h3>
                <span>Explore <ArrowUpRight aria-hidden="true" /></span>
              </div>
              <a className="category-card__link" href={category.href} onClick={handleFutureLink} aria-label={`Explore ${category.name}`} />
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

export default Categories
