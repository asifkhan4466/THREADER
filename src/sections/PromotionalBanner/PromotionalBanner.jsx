import { useRef, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { A11y, Autoplay, EffectFade, Keyboard, Navigation, Pagination } from 'swiper/modules'
import { promotions } from '../../data/promotions'
import 'swiper/css'
import 'swiper/css/effect-fade'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import './PromotionalBanner.css'

const altText = {
  'seasonal-edit': 'Model wearing THREADER seasonal fashion',
  'festive-collection': 'Model wearing an elegant THREADER festive outfit',
  'everyday-essentials': 'Model wearing comfortable THREADER everyday clothing',
}

function PromotionalBanner() {
  const reduceMotion = useReducedMotion()
  const swiperRef = useRef(null)
  const [activeSlide, setActiveSlide] = useState(0)

  const pause = () => swiperRef.current?.autoplay?.pause()
  const resume = () => {
    const autoplay = swiperRef.current?.autoplay
    if (autoplay?.running) autoplay.resume()
  }
  const handleBlur = (event) => {
    if (!event.currentTarget.contains(event.relatedTarget)) resume()
  }
  const handleFutureLink = (event) => {
    if (!document.querySelector(event.currentTarget.getAttribute('href'))) event.preventDefault()
  }
  const contentAnimation = (index, delay = 0) => reduceMotion || index !== activeSlide
    ? { initial: false }
    : { initial: { opacity: 0, y: 12 }, animate: { opacity: 1, y: 0 }, transition: { duration: .5, delay, ease: [0.22, 1, 0.36, 1] } }

  return (
    <section id="sale" className="promotional section" aria-label="THREADER seasonal collections">
      <div className="promotional__container container" onMouseEnter={pause} onMouseLeave={resume} onFocusCapture={pause} onBlurCapture={handleBlur}>
        <Swiper
          className="promotional__slider"
          modules={[A11y, Autoplay, EffectFade, Keyboard, Navigation, Pagination]}
          slidesPerView={1}
          loop
          effect="fade"
          speed={reduceMotion ? 0 : 700}
          autoplay={reduceMotion ? false : { delay: 6000, disableOnInteraction: true, pauseOnMouseEnter: true }}
          keyboard={{ enabled: true, onlyInViewport: true }}
          navigation={{ prevEl: '.promotional__previous', nextEl: '.promotional__next' }}
          pagination={{ clickable: true, dynamicBullets: false }}
          a11y={{ enabled: true, prevSlideMessage: 'Previous promotion', nextSlideMessage: 'Next promotion', paginationBulletMessage: 'Go to promotion {{index}}' }}
          onSwiper={(swiper) => { swiperRef.current = swiper }}
          onRealIndexChange={(swiper) => setActiveSlide(swiper.realIndex)}
        >
          {promotions.map((promotion, index) => (
            <SwiperSlide key={promotion.id}>
              <article className={`promotion-slide ${promotion.theme}`} aria-label={`${index + 1} of ${promotions.length}: ${promotion.title}`}>
                <img src={promotion.image} alt={altText[promotion.id]} width="1600" height="900" loading={index === 0 ? 'eager' : 'lazy'} style={{ objectPosition: promotion.imagePosition }} />
                <div className="promotion-slide__shade" aria-hidden="true" />
                <div className="promotion-slide__content">
                  <motion.p className="promotion-slide__eyebrow" {...contentAnimation(index)}>{promotion.eyebrow}</motion.p>
                  <motion.h2 {...contentAnimation(index, .06)}>{promotion.title}</motion.h2>
                  <motion.p className="promotion-slide__description" {...contentAnimation(index, .12)}>{promotion.description}</motion.p>
                  <motion.a className="promotion-slide__cta" href={promotion.href} onClick={handleFutureLink} aria-label={`${promotion.buttonText}: ${promotion.title}`} {...contentAnimation(index, .18)}>{promotion.buttonText}<ArrowRight aria-hidden="true" /></motion.a>
                </div>
              </article>
            </SwiperSlide>
          ))}
          <button className="promotional__arrow promotional__previous" type="button" aria-label="Previous promotion"><ChevronLeft aria-hidden="true" /></button>
          <button className="promotional__arrow promotional__next" type="button" aria-label="Next promotion"><ChevronRight aria-hidden="true" /></button>
        </Swiper>
        <p className="sr-only" aria-live="polite" aria-atomic="true">Promotion {activeSlide + 1} of {promotions.length}: {promotions[activeSlide].title}</p>
      </div>
    </section>
  )
}

export default PromotionalBanner
