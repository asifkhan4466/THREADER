import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { ArrowUp } from 'lucide-react'
import './BackToTop.css'

function BackToTop({ offsetForWhatsApp = false }) {
  const [visible, setVisible] = useState(false)
  const reduceMotion = useReducedMotion()
  const frameRef = useRef(null)

  useEffect(() => {
    const update = () => {
      frameRef.current = null
      setVisible((current) => {
        const next = window.scrollY > 600
        return current === next ? current : next
      })
    }
    const handleScroll = () => {
      if (frameRef.current === null) frameRef.current = window.requestAnimationFrame(update)
    }
    update()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', handleScroll)
      if (frameRef.current !== null) window.cancelAnimationFrame(frameRef.current)
    }
  }, [])

  return (
    <AnimatePresence>
      {visible && (
        <motion.button type="button" className={`back-to-top${offsetForWhatsApp ? ' back-to-top--stacked' : ''}`} aria-label="Back to top" onClick={() => window.scrollTo({ top: 0, behavior: reduceMotion ? 'auto' : 'smooth' })} initial={reduceMotion ? false : { opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: reduceMotion ? 0 : 6 }} transition={{ duration: reduceMotion ? 0 : .2 }}>
          <ArrowUp aria-hidden="true" />
        </motion.button>
      )}
    </AnimatePresence>
  )
}

export default BackToTop
