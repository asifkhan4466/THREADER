import { AnimatePresence, motion } from 'framer-motion'
import './ContactDockCard.css'

function ContactDockCard({ item, index, active, neighbour, reduceMotion, tabIndex, cardRef, onActivate, onPointerDown, onDeactivate, onKeyDown }) {
  const Icon = item.icon
  const available = Boolean(item.value && item.href)
  const status = available ? item.name : `${item.name} — link not available yet`
  const tooltipId = `contact-tooltip-${item.id}`
  const motionState = reduceMotion ? {} : { y: active ? -14 : 0, scale: active ? 1.12 : neighbour ? 1.045 : 1 }

  const sharedProps = {
    ref: cardRef,
    className: `contact-dock-card${active ? ' is-active' : ''}${neighbour ? ' is-neighbour' : ''}${available ? '' : ' is-unavailable'}`,
    tabIndex,
    'aria-label': status,
    'aria-describedby': active ? tooltipId : undefined,
    onFocus: () => onActivate(index, 'focus'),
    onBlur: onDeactivate,
    onMouseEnter: () => onActivate(index, 'hover'),
    onMouseLeave: onDeactivate,
    onPointerDown: (event) => onPointerDown(event, index),
    onKeyDown: (event) => onKeyDown(event, index),
    onClick: (event) => onActivate(index, 'click', event),
  }

  const content = (
    <>
      <span className="contact-dock-card__face" aria-hidden="true">
        <AnimatePresence initial={false} mode="wait">
          {active ? (
            <motion.span key="icon" className="contact-dock-card__icon" initial={reduceMotion ? false : { opacity: 0, rotate: -12, scale: .8 }} animate={{ opacity: 1, rotate: 0, scale: 1 }} exit={reduceMotion ? { opacity: 0 } : { opacity: 0, rotate: 12, scale: .8 }} transition={{ duration: reduceMotion ? 0 : .16 }}>
              <Icon strokeWidth={1.7} />
            </motion.span>
          ) : (
            <motion.span key="letter" className="contact-dock-card__letter" initial={reduceMotion ? false : { opacity: 0, rotate: 10 }} animate={{ opacity: 1, rotate: 0 }} exit={reduceMotion ? { opacity: 0 } : { opacity: 0, rotate: -10 }} transition={{ duration: reduceMotion ? 0 : .14 }}>{item.letter}</motion.span>
          )}
        </AnimatePresence>
      </span>
      <AnimatePresence>
        {active && (
          <motion.span id={tooltipId} role="tooltip" className="contact-dock-card__tooltip" initial={reduceMotion ? false : { opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: reduceMotion ? 0 : 3 }} transition={{ duration: reduceMotion ? 0 : .16 }}>
            {item.name}
          </motion.span>
        )}
      </AnimatePresence>
    </>
  )

  return (
    <motion.li className="contact-dock-card__item" animate={motionState} transition={{ duration: reduceMotion ? 0 : .22, ease: [0.22, 1, 0.36, 1] }}>
      {available ? (
        <a {...sharedProps} href={item.href} target={item.external ? '_blank' : undefined} rel={item.external ? 'noopener noreferrer' : undefined}>{content}</a>
      ) : (
        <button {...sharedProps} type="button" aria-disabled="true">{content}</button>
      )}
    </motion.li>
  )
}

export default ContactDockCard
