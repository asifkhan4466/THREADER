import { useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { Sparkles, X } from 'lucide-react'
import './AnnouncementBar.css'

const storageKey = 'threader-announcement-closed'

function announcementIsVisible() {
  try {
    return sessionStorage.getItem(storageKey) !== 'true'
  } catch {
    return true
  }
}

function AnnouncementBar() {
  const [isVisible, setIsVisible] = useState(announcementIsVisible)
  const reduceMotion = useReducedMotion()

  const close = () => {
    try {
      sessionStorage.setItem(storageKey, 'true')
    } catch {
      // Closing still works when browser storage is unavailable.
    }
    setIsVisible(false)
  }

  return (
    <AnimatePresence initial={false}>
      {isVisible && (
        <motion.aside className="announcement" aria-label="Store announcement"
          initial={reduceMotion ? false : { height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }}
          exit={reduceMotion ? { opacity: 0 } : { height: 0, opacity: 0 }} transition={{ duration: reduceMotion ? 0 : 0.3 }}>
          <div className="announcement__inner">
            <p><Sparkles aria-hidden="true" />Wear Your Story with THREADER</p>
            <button type="button" onClick={close} aria-label="Close announcement"><X aria-hidden="true" /></button>
          </div>
        </motion.aside>
      )}
    </AnimatePresence>
  )
}

export default AnnouncementBar
