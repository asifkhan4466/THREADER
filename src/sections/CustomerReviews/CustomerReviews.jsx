import { motion, useReducedMotion } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { A11y, Keyboard, Navigation, Pagination } from 'swiper/modules'
import ReviewCard from '../../components/ui/ReviewCard'
import { reviews, reviewsConfig } from '../../data/reviews'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import './CustomerReviews.css'

function CustomerReviews() {
  const reduceMotion = useReducedMotion()
  const containsSampleContent = reviews.some((review) => !review.verified || review.label === 'Sample Review')
  const showSampleDisclosure = reviewsConfig.sampleMode || containsSampleContent

  if (!reviewsConfig.enabled) return null

  const reveal = (delay = 0, move = false) => reduceMotion
    ? { initial: false }
    : { initial: { opacity: 0, y: move ? 12 : 0 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true, amount: .25 }, transition: { duration: .5, delay, ease: [0.22, 1, 0.36, 1] } }

  return (
    <section id="reviews" className="customer-reviews section" aria-labelledby="reviews-heading">
      <div className="container">
        <div className="customer-reviews__heading-row">
          <div className="customer-reviews__intro">
            <motion.p className="type-label" {...reveal()}>Customer Stories</motion.p>
            <motion.h2 id="reviews-heading" className="type-section-heading" {...reveal(.05, true)}>Loved in Every Detail</motion.h2>
            <motion.p className="customer-reviews__description type-body" {...reveal(.1)}>This preview shows how verified customer experiences will appear once real reviews are available.</motion.p>
          </div>
          <div className="customer-reviews__controls" aria-label="Customer review controls">
            <button className="customer-reviews__arrow customer-reviews__previous" type="button" aria-label="Previous customer review"><ChevronLeft aria-hidden="true" /></button>
            <button className="customer-reviews__arrow customer-reviews__next" type="button" aria-label="Next customer review"><ChevronRight aria-hidden="true" /></button>
          </div>
        </div>

        {showSampleDisclosure && <motion.p className="customer-reviews__notice" {...reveal(.14)}>Demo content — Replace with verified THREADER customer reviews before launch.</motion.p>}

        <motion.div className="customer-reviews__slider-wrap" {...reveal(.18, true)}>
          <Swiper
            className="customer-reviews__slider"
            modules={[A11y, Keyboard, Navigation, Pagination]}
            slidesPerView={1}
            spaceBetween={16}
            speed={reduceMotion ? 0 : 450}
            keyboard={{ enabled: true, onlyInViewport: true }}
            navigation={{ prevEl: '.customer-reviews__previous', nextEl: '.customer-reviews__next' }}
            pagination={{ el: '.customer-reviews__pagination', clickable: true }}
            breakpoints={{ 700: { slidesPerView: 2, spaceBetween: 18 }, 1050: { slidesPerView: 3, spaceBetween: 22 } }}
            a11y={{ enabled: true, containerMessage: 'Customer review preview', prevSlideMessage: 'Previous customer review', nextSlideMessage: 'Next customer review', paginationBulletMessage: 'Go to customer review {{index}}' }}
          >
            {reviews.map((review, index) => (
              <SwiperSlide key={review.id} aria-label={`${index + 1} of ${reviews.length}`}>
                <ReviewCard review={review} showSampleLabel={showSampleDisclosure} />
              </SwiperSlide>
            ))}
          </Swiper>
          <div className="customer-reviews__pagination" aria-label="Choose a customer review" />
        </motion.div>
      </div>
    </section>
  )
}

export default CustomerReviews
