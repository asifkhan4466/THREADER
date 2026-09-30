import { useMemo, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import ProductCard from '../../components/ui/ProductCard'
import { products } from '../../data/products'
import './NewArrivals.css'

const filters = ['All', 'Women', 'Men', 'Kids']
function NewArrivals({ wishlistIds, onToggleWishlist, onAddToCart }) {
  const [filter, setFilter] = useState('All')
  const reduceMotion = useReducedMotion()
  const visibleProducts = useMemo(() => filter === 'All' ? products : products.filter((product) => product.category === filter), [filter])
  const reveal = reduceMotion ? { initial: false } : { initial: { opacity: 0, y: 16 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true, amount: .3 }, transition: { duration: .55 } }
  return (
    <section id="new-arrivals" className="new-arrivals section" aria-labelledby="new-arrivals-heading">
      <div className="container">
        <header className="new-arrivals__header">
          <div><motion.p className="type-label" {...reveal}>Just Dropped</motion.p><motion.h2 id="new-arrivals-heading" className="type-section-heading" {...reveal}>New Arrivals</motion.h2><motion.p className="new-arrivals__description type-body" {...reveal}>Fresh silhouettes, thoughtful details, and versatile pieces for every story.</motion.p></div>
          <a className="new-arrivals__view-all" href="#new-arrivals-grid">View All Products <ArrowRight aria-hidden="true" /></a>
        </header>
        <motion.div className="new-arrivals__filters" aria-label="Filter new arrivals by category" {...reveal}>{filters.map((item) => <button key={item} type="button" className={filter === item ? 'is-active' : ''} aria-pressed={filter === item} onClick={() => setFilter(item)}>{item}{filter === item && <span className="sr-only"> selected</span>}</button>)}</motion.div>
        <p className="new-arrivals__notice">Demonstration catalogue — products, prices, and availability are sample content.</p>
        <p className="sr-only" role="status" aria-live="polite">Showing {visibleProducts.length} {filter === 'All' ? '' : `${filter} `}new arrival products</p>
        <motion.div id="new-arrivals-grid" className="new-arrivals__grid" layout={!reduceMotion}><AnimatePresence mode="popLayout" initial={false}>{visibleProducts.map((product, index) => <motion.div className="new-arrivals__item" key={product.id} layout={!reduceMotion} initial={reduceMotion ? false : { opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={reduceMotion ? undefined : { opacity: 0 }} transition={{ duration: reduceMotion ? 0 : .28, delay: reduceMotion ? 0 : Math.min(index * .035, .2) }}><ProductCard product={product} isWishlisted={wishlistIds.includes(product.id)} onToggleWishlist={onToggleWishlist} onAddToCart={onAddToCart} /></motion.div>)}</AnimatePresence></motion.div>
      </div>
    </section>
  )
}
export default NewArrivals
