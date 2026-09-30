import { useRef, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { BadgeCheck, PackageCheck, ShoppingBag, Truck } from 'lucide-react'
import { deliverySteps } from '../../data/deliverySteps'
import './DeliveryProcess.css'

const icons = { BadgeCheck, PackageCheck, ShoppingBag, Truck }

function DeliveryProcess() {
  const [activeIndex, setActiveIndex] = useState(0)
  const tabRefs = useRef([])
  const reduceMotion = useReducedMotion()
  const activeStep = deliverySteps[activeIndex]
  const ActiveIcon = icons[activeStep.icon]
  const progress = activeIndex / (deliverySteps.length - 1)

  const selectAndFocus = (index) => {
    const nextIndex = (index + deliverySteps.length) % deliverySteps.length
    setActiveIndex(nextIndex)
    tabRefs.current[nextIndex]?.focus()
  }

  const handleKeyDown = (event, index) => {
    const actions = {
      ArrowLeft: () => selectAndFocus(index - 1),
      ArrowUp: () => selectAndFocus(index - 1),
      ArrowRight: () => selectAndFocus(index + 1),
      ArrowDown: () => selectAndFocus(index + 1),
      Home: () => selectAndFocus(0),
      End: () => selectAndFocus(deliverySteps.length - 1),
    }
    if (actions[event.key]) {
      event.preventDefault()
      actions[event.key]()
    }
  }

  const reveal = reduceMotion ? { initial: false } : { initial: { opacity: 0, y: 16 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true, amount: .3 }, transition: { duration: .55, ease: [0.22, 1, 0.36, 1] } }

  return (
    <section id="delivery-process" className="delivery-process section" aria-labelledby="delivery-process-heading">
      <div className="container">
        <header className="delivery-process__header">
          <motion.p className="type-label" {...reveal}>How It Works</motion.p>
          <motion.h2 id="delivery-process-heading" className="type-section-heading" {...reveal}>From Cart to Your Door</motion.h2>
          <motion.p className="delivery-process__description type-body" {...reveal}>An illustrative look at the expected journey from order placement to delivery.</motion.p>
        </header>

        <div className="delivery-process__panel">
          <div className="delivery-process__timeline" role="tablist" aria-label="Order and delivery stages">
            <div className="delivery-process__line delivery-process__line--horizontal" aria-hidden="true"><motion.span animate={{ scaleX: progress }} transition={{ duration: reduceMotion ? 0 : .4, ease: 'easeOut' }} /></div>
            <div className="delivery-process__line delivery-process__line--vertical" aria-hidden="true"><motion.span animate={{ scaleY: progress }} transition={{ duration: reduceMotion ? 0 : .4, ease: 'easeOut' }} /></div>
            {deliverySteps.map((item, index) => {
              const Icon = icons[item.icon]
              const selected = index === activeIndex
              return (
                <motion.button
                  ref={(element) => { tabRefs.current[index] = element }}
                  className={`delivery-step${selected ? ' is-active' : ''}${index < activeIndex ? ' is-complete' : ''}`}
                  key={item.id}
                  id={`delivery-tab-${item.id}`}
                  type="button"
                  role="tab"
                  aria-selected={selected}
                  aria-controls="delivery-stage-panel"
                  tabIndex={selected ? 0 : -1}
                  onClick={() => setActiveIndex(index)}
                  onKeyDown={(event) => handleKeyDown(event, index)}
                  initial={reduceMotion ? false : { opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: .5 }}
                  transition={{ duration: reduceMotion ? 0 : .4, delay: reduceMotion ? 0 : index * .07 }}
                >
                  <motion.span className="delivery-step__icon" animate={reduceMotion ? undefined : { scale: selected ? 1.04 : 1 }}><Icon aria-hidden="true" /></motion.span>
                  <span className="delivery-step__copy"><span className="delivery-step__number">Step {item.step}</span><strong>{item.title}</strong><span className="delivery-step__summary">{item.shortDescription}</span></span>
                </motion.button>
              )
            })}
          </div>

          <div id="delivery-stage-panel" className="delivery-process__detail" role="tabpanel" aria-labelledby={`delivery-tab-${activeStep.id}`} tabIndex="0">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div className="delivery-process__detail-inner" key={activeStep.id} initial={reduceMotion ? false : { opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={reduceMotion ? undefined : { opacity: 0, y: -6 }} transition={{ duration: reduceMotion ? 0 : .24 }}>
                <div className="delivery-process__detail-icon"><ActiveIcon aria-hidden="true" /></div>
                <div><h3>Stage {activeStep.step}: {activeStep.title}</h3><p>{activeStep.fullDescription}</p></div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  )
}

export default DeliveryProcess
