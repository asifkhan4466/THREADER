import { useEffect, useRef, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { Check, Heart, ShoppingBag } from 'lucide-react'
import './ProductCard.css'

const formatPrice = (price) => `PKR ${price.toLocaleString('en-PK')}`

function ProductCard({ product, isWishlisted, onToggleWishlist, onAddToCart }) {
  const [isAdded, setIsAdded] = useState(false)
  const timerRef = useRef()
  const reduceMotion = useReducedMotion()
  useEffect(() => () => window.clearTimeout(timerRef.current), [])
  const addToCart = () => {
    onAddToCart(product.id); setIsAdded(true); window.clearTimeout(timerRef.current)
    timerRef.current = window.setTimeout(() => setIsAdded(false), 1400)
  }
  return (
    <motion.article className="product-card" layout={!reduceMotion} aria-labelledby={`product-${product.id}`}>
      <div className={`product-card__media${product.secondaryImage ? ' product-card__media--has-secondary' : ''}`}>
        <img className="product-card__image product-card__image--primary" src={product.primaryImage} alt={`${product.name} from the ${product.collection} sample collection`} loading="lazy" width="900" height="1125" />
        {product.secondaryImage && <img className="product-card__image product-card__image--secondary" src={product.secondaryImage} alt="" loading="lazy" width="900" height="1125" />}
        <div className="product-card__badges" aria-label="Product labels">{product.isNew && <span>New</span>}{product.discount && <span>{product.discount}</span>}</div>
        <button className={`product-card__wishlist${isWishlisted ? ' is-active' : ''}`} type="button" onClick={() => onToggleWishlist(product.id)} aria-pressed={isWishlisted} aria-label={`${isWishlisted ? 'Remove' : 'Add'} ${product.name} ${isWishlisted ? 'from' : 'to'} wishlist`}><Heart aria-hidden="true" fill={isWishlisted ? 'currentColor' : 'none'} /></button>
      </div>
      <div className="product-card__body">
        <p className="product-card__category">{product.category} <span aria-hidden="true">·</span> {product.collection}</p>
        <h3 id={`product-${product.id}`}>{product.name}</h3>
        <div className="product-card__price"><data value={product.price}>{formatPrice(product.price)}</data>{product.oldPrice && <del>{formatPrice(product.oldPrice)}</del>}</div>
        <div className="product-card__colours" aria-label={`Available sample colours for ${product.name}`}>{product.colours.map((colour) => <span key={colour} role="img" aria-label={`Sample colour ${colour}`} style={{ backgroundColor: colour }} />)}<span className="sr-only">{product.colours.length} sample colours shown</span></div>
        <motion.button className={`product-card__cart${isAdded ? ' is-added' : ''}`} type="button" onClick={addToCart} animate={reduceMotion ? undefined : { scale: isAdded ? [1, .98, 1] : 1 }} aria-label={`Add ${product.name} to cart`}>{isAdded ? <Check aria-hidden="true" /> : <ShoppingBag aria-hidden="true" />}{isAdded ? 'Added' : 'Add to Cart'}</motion.button>
      </div>
    </motion.article>
  )
}
export default ProductCard
