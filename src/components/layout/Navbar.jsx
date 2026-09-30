import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { Heart, Menu, Search, ShoppingBag, User, X } from 'lucide-react'
import { navigationItems } from '../../data/navigation'
import './Navbar.css'

function Navbar({ cartCount = 0, wishlistCount = 0 }) {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const menuRef = useRef(null)
  const closeRef = useRef(null)
  const returnFocusTimerRef = useRef(null)
  const reduceMotion = useReducedMotion()

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 12)
    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    if (!isOpen) return undefined
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const timer = window.setTimeout(() => closeRef.current?.focus(), 0)
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') closeDrawer()
      if (event.key === 'Tab') {
        const focusable = [...document.querySelectorAll('#mobile-navigation a, #mobile-navigation button:not([disabled])')]
        if (!focusable.length) return
        const first = focusable[0]
        const last = focusable[focusable.length - 1]
        if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus() }
        else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus() }
      }
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => {
      window.clearTimeout(timer)
      document.body.style.overflow = previousOverflow
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [isOpen])

  useEffect(() => () => window.clearTimeout(returnFocusTimerRef.current), [])

  const closeDrawer = () => {
    setIsOpen(false)
    window.clearTimeout(returnFocusTimerRef.current)
    returnFocusTimerRef.current = window.setTimeout(() => menuRef.current?.focus(), 0)
  }

  return (
    <header className={`navbar${isScrolled ? ' navbar--scrolled' : ''}`}>
      <div className="navbar__inner container">
        <a className="navbar__brand" href="#home" aria-label="THREADER home">
          <img src="/images/brand/threader-logo.jpeg" alt="THREADER clothing brand" width="1536" height="1024" />
        </a>

        <nav className="navbar__links" aria-label="Primary navigation">
          {navigationItems.map((item, index) => (
            <a key={item.label} href={item.href} className={`${index === 0 ? 'is-active ' : ''}${item.accent ? 'is-accent' : ''}`}>{item.label}</a>
          ))}
        </nav>

        <div className="navbar__actions">
          <button className="nav-icon nav-search" type="button" aria-label="Search"><Search /></button>
          <button className="nav-icon nav-wishlist" type="button" aria-label={`Wishlist, ${wishlistCount} items`}><Heart />{wishlistCount > 0 && <span>{wishlistCount}</span>}</button>
          <button className="nav-icon nav-cart" type="button" aria-label={`Shopping bag, ${cartCount} items`}><ShoppingBag /><span>{cartCount}</span></button>
          <button className="nav-sign-in" type="button"><User />Sign In</button>
          <button ref={menuRef} className="nav-icon nav-menu" type="button" aria-label="Open navigation menu" aria-expanded={isOpen} aria-controls="mobile-navigation" onClick={() => setIsOpen(true)}><Menu /></button>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <div className="mobile-nav">
            <motion.button className="mobile-nav__overlay" type="button" aria-label="Close navigation menu" onClick={closeDrawer} initial={reduceMotion ? false : { opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: reduceMotion ? 0 : .2 }} />
            <motion.div id="mobile-navigation" className="mobile-nav__drawer" role="dialog" aria-modal="true" aria-label="Mobile navigation" initial={reduceMotion ? false : { x: '100%' }} animate={{ x: 0 }} exit={reduceMotion ? { opacity: 0 } : { x: '100%' }} transition={{ duration: reduceMotion ? 0 : .32, ease: [0.22, 1, 0.36, 1] }}>
              <div className="mobile-nav__header">
                <img src="/images/brand/threader-logo.jpeg" alt="THREADER clothing brand" width="1536" height="1024" />
                <button ref={closeRef} className="nav-icon" type="button" aria-label="Close navigation menu" onClick={closeDrawer}><X /></button>
              </div>
              <nav className="mobile-nav__links" aria-label="Mobile primary navigation">
                {navigationItems.map((item, index) => (
                  <a key={item.label} href={item.href} className={`${index === 0 ? 'is-active ' : ''}${item.accent ? 'is-accent' : ''}`} onClick={closeDrawer}>{item.label}</a>
                ))}
              </nav>
              <div className="mobile-nav__footer">
                <button type="button"><Heart />Wishlist{wishlistCount > 0 && <span className="mobile-nav__count">{wishlistCount}</span>}</button>
                <button className="mobile-nav__sign-in" type="button"><User />Sign In</button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </header>
  )
}

export default Navbar
