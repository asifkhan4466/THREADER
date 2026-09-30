import { motion, useReducedMotion } from 'framer-motion'
import { ArrowUpRight, Baby, CalendarDays, Gem, Heart, Layers, Scissors, Shirt, ShoppingBag, Sparkles, User, UserRound, Watch } from 'lucide-react'
import { collectionMarquee } from '../../data/collectionMarquee'
import './CollectionMarquee.css'

const icons = { Baby, CalendarDays, Gem, Heart, Layers, Scissors, Shirt, ShoppingBag, Sparkles, User, UserRound, Watch }

function CollectionCard({ collection, duplicate = false }) {
  const Icon = icons[collection.icon] ?? Sparkles
  const handleLink = (event) => {
    if (!document.querySelector(event.currentTarget.getAttribute('href'))) event.preventDefault()
  }
  return (
    <a className="marquee-card" href={collection.href} onClick={handleLink} tabIndex={duplicate ? -1 : undefined} aria-label={`Explore ${collection.name} collection`}>
      <span className="marquee-card__icon"><Icon aria-hidden="true" /></span>
      <strong>{collection.name}</strong>
      <ArrowUpRight className="marquee-card__arrow" aria-hidden="true" />
    </a>
  )
}

function MarqueeRow({ collections, direction, label, reduceMotion }) {
  const primaryGroup = <div className="collection-marquee__group">{collections.map((collection) => <CollectionCard collection={collection} key={collection.id} />)}</div>
  const duplicateGroup = <div className="collection-marquee__group" aria-hidden="true">{collections.map((collection) => <CollectionCard collection={collection} duplicate key={`duplicate-${collection.id}`} />)}</div>
  return (
    <motion.div
      className={`collection-marquee__row collection-marquee__row--${direction}`}
      aria-label={label}
      variants={reduceMotion ? undefined : {
        hidden: { opacity: 0, y: 10 },
        visible: { opacity: 1, y: 0, transition: { duration: .45 } },
      }}
    >
      <div className="collection-marquee__track">
        {direction === 'right' ? duplicateGroup : primaryGroup}
        {direction === 'right' ? primaryGroup : duplicateGroup}
      </div>
    </motion.div>
  )
}

function CollectionMarquee() {
  const reduceMotion = useReducedMotion()
  const firstRow = collectionMarquee.slice(0, 6)
  const secondRow = collectionMarquee.slice(6)
  const reveal = reduceMotion ? { initial: false } : { initial: { opacity: 0, y: 14 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true, amount: .3 }, transition: { duration: .5, ease: [0.22, 1, 0.36, 1] } }
  return (
    <section id="collection-marquee" className="collection-marquee section" aria-labelledby="collection-marquee-heading">
      <div className="collection-marquee__header container">
        <motion.p className="type-label" {...reveal}>Explore THREADER</motion.p>
        <motion.h2 id="collection-marquee-heading" className="type-section-heading" {...reveal}>Collections for Every Story</motion.h2>
        <motion.p className="collection-marquee__description type-body" {...reveal}>Discover styles designed for everyday moments, meaningful occasions, and everything between.</motion.p>
      </div>
      <motion.div
        className="collection-marquee__rows"
        initial={reduceMotion ? false : 'hidden'}
        whileInView={reduceMotion ? undefined : 'visible'}
        viewport={{ once: true, amount: .15 }}
        variants={reduceMotion ? undefined : { visible: { transition: { delayChildren: .12, staggerChildren: .1 } } }}
      >
        <MarqueeRow collections={firstRow} direction="left" label="Clothing collections" reduceMotion={reduceMotion} />
        <MarqueeRow collections={secondRow} direction="right" label="Collections by audience and season" reduceMotion={reduceMotion} />
      </motion.div>
    </section>
  )
}

export default CollectionMarquee
