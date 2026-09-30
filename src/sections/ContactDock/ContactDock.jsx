import { useCallback, useEffect, useRef, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import ContactDockCard from '../../components/ui/ContactDockCard'
import { contactLinks } from '../../data/contactLinks'
import './ContactDock.css'

function ContactDock() {
  const reduceMotion = useReducedMotion()
  const dockRef = useRef(null)
  const cardRefs = useRef([])
  const closeTimerRef = useRef(null)
  const firstTouchRef = useRef(false)
  const touchPointerRef = useRef(false)
  const [activeIndex, setActiveIndex] = useState(null)
  const [tabIndex, setTabIndex] = useState(0)

  const clearCloseTimer = useCallback(() => {
    if (closeTimerRef.current) window.clearTimeout(closeTimerRef.current)
    closeTimerRef.current = null
  }, [])

  const closeActive = useCallback(() => {
    clearCloseTimer()
    setActiveIndex(null)
  }, [clearCloseTimer])

  const activate = useCallback((index, source, event) => {
    clearCloseTimer()
    if (source === 'click') {
      const isTouchLike = touchPointerRef.current && event?.detail !== 0
      if (isTouchLike && event?.detail !== 0 && firstTouchRef.current) event?.preventDefault()
      if (activeIndex === index && !firstTouchRef.current && event?.currentTarget?.getAttribute('aria-disabled') === 'true') {
        event.preventDefault()
        closeActive()
        return
      }
      if (isTouchLike) closeTimerRef.current = window.setTimeout(closeActive, 5000)
      firstTouchRef.current = false
      touchPointerRef.current = false
    }
    setActiveIndex(index)
    setTabIndex(index)
  }, [activeIndex, clearCloseTimer, closeActive])

  const handlePointerDown = useCallback((event, index) => {
    touchPointerRef.current = event.pointerType === 'touch' || event.pointerType === 'pen'
    firstTouchRef.current = touchPointerRef.current && activeIndex !== index
  }, [activeIndex])

  const deactivate = useCallback((event) => {
    if (event.type === 'blur' && event.currentTarget.contains(event.relatedTarget)) return
    if (event.type === 'mouseleave' && event.currentTarget.matches(':focus-visible')) return
    setActiveIndex(null)
  }, [])

  const focusCard = useCallback((index) => {
    const next = (index + contactLinks.length) % contactLinks.length
    setTabIndex(next)
    cardRefs.current[next]?.focus()
  }, [])

  const handleKeyDown = useCallback((event, index) => {
    if (event.key === 'Escape') { event.preventDefault(); closeActive(); return }
    if (event.key === 'ArrowRight') { event.preventDefault(); focusCard(index + 1); return }
    if (event.key === 'ArrowLeft') { event.preventDefault(); focusCard(index - 1); return }
    if (event.key === 'Home') { event.preventDefault(); focusCard(0); return }
    if (event.key === 'End') { event.preventDefault(); focusCard(contactLinks.length - 1); return }
    if (event.key === ' ' && contactLinks[index].href) {
      event.preventDefault()
      event.currentTarget.click()
      return
    }
    if ((event.key === 'Enter' || event.key === ' ') && !contactLinks[index].href) {
      event.preventDefault()
      setActiveIndex((current) => current === index ? null : index)
    }
  }, [closeActive, focusCard])

  useEffect(() => {
    const handlePointerDown = (event) => {
      if (!dockRef.current?.contains(event.target)) closeActive()
    }
    const handleEscape = (event) => { if (event.key === 'Escape') closeActive() }
    document.addEventListener('pointerdown', handlePointerDown)
    document.addEventListener('keydown', handleEscape)
    return () => {
      document.removeEventListener('pointerdown', handlePointerDown)
      document.removeEventListener('keydown', handleEscape)
      clearCloseTimer()
    }
  }, [clearCloseTimer, closeActive])

  const reveal = reduceMotion ? { initial: false } : { initial: { opacity: 0, y: 14 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true, amount: .25 }, transition: { duration: .5, ease: [0.22, 1, 0.36, 1] } }

  const hasUnavailable = contactLinks.some((item) => !item.value || !item.href)

  return (
    <section id="contact" className="contact-dock section" aria-labelledby="contact-heading">
      <div className="container">
        <motion.div className="contact-dock__intro" {...reveal}>
          <p className="type-label">Stay Connected</p>
          <h2 id="contact-heading" className="type-section-heading">Let’s Keep in Touch</h2>
          <p className="contact-dock__description type-body">Connect with THREADER for collection updates, style inspiration, order support, and brand enquiries.</p>
        </motion.div>
        <motion.div className="contact-dock__panel" {...reveal} transition={reduceMotion ? { duration: 0 } : { duration: .5, delay: .12 }}>
          <span className="contact-dock__line contact-dock__line--top" aria-hidden="true" />
          <p className="contact-dock__instruction" id="contact-dock-instruction">
            {hasUnavailable
              ? 'Explore a contact method. Unavailable methods are clearly identified.'
              : 'Select any contact channel to connect with THREADER directly.'}
          </p>
          <ul ref={dockRef} className="contact-dock__list" aria-label="THREADER contact methods" aria-describedby="contact-dock-instruction">
            {contactLinks.map((item, index) => (
              <ContactDockCard key={item.id} item={item} index={index} active={activeIndex === index} neighbour={activeIndex !== null && Math.abs(activeIndex - index) === 1} reduceMotion={reduceMotion} tabIndex={tabIndex === index ? 0 : -1} cardRef={(node) => { cardRefs.current[index] = node }} onActivate={activate} onPointerDown={handlePointerDown} onDeactivate={deactivate} onKeyDown={handleKeyDown} />
            ))}
          </ul>
          <span className="contact-dock__line contact-dock__line--bottom" aria-hidden="true" />
        </motion.div>
      </div>
    </section>
  )
}

export default ContactDock
