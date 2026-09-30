import { Quote } from 'lucide-react'
import './ReviewCard.css'

function ReviewCard({ review, showSampleLabel }) {
  return (
    <article className="review-card" aria-label={`${showSampleLabel ? 'Sample review' : 'Customer review'} for ${review.category}`}>
      <div className="review-card__topline">
        <span className="review-card__quote" aria-hidden="true"><Quote /></span>
        {showSampleLabel && <span className="review-card__badge">{review.label || 'Sample Review'}</span>}
      </div>
      <blockquote>“{review.quote}”</blockquote>
      <footer>
        <div><strong>{review.reviewer}</strong><span>{review.category}</span></div>
        {showSampleLabel && <span className="review-card__status">Demo · Unverified</span>}
      </footer>
    </article>
  )
}

export default ReviewCard
