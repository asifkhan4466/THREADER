import { useEffect, useRef, useState } from 'react'
import { ArrowRight, LoaderCircle } from 'lucide-react'
import { siteConfig } from '../../config/siteConfig'
import './NewsletterForm.css'

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function NewsletterForm() {
  const [email, setEmail] = useState('')
  const [state, setState] = useState({ type: 'idle', message: '' })
  const timerRef = useRef(null)
  const requestRef = useRef(null)
  const isLoading = state.type === 'loading'
  const feedbackId = 'newsletter-feedback'

  useEffect(() => () => {
    if (timerRef.current) window.clearTimeout(timerRef.current)
    requestRef.current?.abort()
  }, [])

  const handleChange = (event) => {
    setEmail(event.target.value)
    if (state.type === 'error') setState({ type: 'idle', message: '' })
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    if (isLoading) return
    const normalizedEmail = email.trim()

    if (!normalizedEmail) {
      setState({ type: 'error', message: 'Enter your email address.' })
      return
    }
    if (!emailPattern.test(normalizedEmail)) {
      setState({ type: 'error', message: 'Enter a valid email address.' })
      return
    }

    setEmail(normalizedEmail)
    setState({ type: 'loading', message: 'Checking email…' })

    if (!siteConfig.newsletter.endpoint) {
      await new Promise((resolve) => { timerRef.current = window.setTimeout(resolve, 350) })
      setState({ type: 'configuration', message: 'Email validated. Connect a newsletter service before launch.' })
      return
    }

    try {
      requestRef.current = new AbortController()
      const response = await fetch(siteConfig.newsletter.endpoint, {
        method: siteConfig.newsletter.method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: normalizedEmail }),
        signal: requestRef.current.signal,
      })
      if (!response.ok) throw new Error('Newsletter request was not accepted')
      setEmail('')
      setState({ type: 'success', message: 'Thank you. Your subscription is confirmed.' })
    } catch (error) {
      if (error.name !== 'AbortError') setState({ type: 'error', message: 'Subscription could not be completed. Please try again.' })
    } finally {
      requestRef.current = null
    }
  }

  return (
    <form className="newsletter-form" onSubmit={handleSubmit} noValidate>
      <label htmlFor="newsletter-email">Email address</label>
      <div className="newsletter-form__controls">
        <input id="newsletter-email" name="email" type="email" autoComplete="email" value={email} onChange={handleChange} placeholder="you@example.com" disabled={isLoading} aria-invalid={state.type === 'error'} aria-describedby={state.message ? feedbackId : undefined} />
        <button type="submit" disabled={isLoading} aria-describedby={state.message ? feedbackId : undefined}>
          <span>{isLoading ? 'Validating' : 'Subscribe'}</span>
          {isLoading ? <LoaderCircle className="newsletter-form__spinner" aria-hidden="true" /> : <ArrowRight aria-hidden="true" />}
        </button>
      </div>
      <p id={feedbackId} className={`newsletter-form__feedback is-${state.type}`} aria-live="polite" aria-atomic="true">
        {state.message || 'Demo mode — no newsletter service is connected.'}
      </p>
    </form>
  )
}

export default NewsletterForm
