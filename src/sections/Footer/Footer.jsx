import { motion, useReducedMotion } from 'framer-motion'
import { CreditCard, Mail, MapPin, Phone, WalletCards } from 'lucide-react'
import NewsletterForm from '../../components/ui/NewsletterForm'
import { siteConfig } from '../../config/siteConfig'
import { contactLinks } from '../../data/contactLinks'
import { customerServiceLinks, quickLinks } from '../../data/footerLinks'
import './Footer.css'

const contactMeta = {
  location: { Icon: MapPin, missing: 'Address to be added' },
  phone: { Icon: Phone, missing: 'Phone to be added' },
  email: { Icon: Mail, missing: 'Email to be added' },
}

function FooterLinkList({ items }) {
  return (
    <ul>
      {items.map((item) => (
        <li key={item.id}>
          {item.available && item.href
            ? <a href={item.href}>{item.label}</a>
            : <span className="footer__unavailable">{item.label} <small>Coming later</small><span className="sr-only"> — page not available yet</span></span>}
        </li>
      ))}
    </ul>
  )
}

function Footer() {
  const reduceMotion = useReducedMotion()
  const currentYear = new Date().getFullYear()
  const socialContacts = contactLinks.filter((item) => ['instagram', 'facebook', 'tiktok'].includes(item.id))
  const enabledSocials = socialContacts.filter((item) => item.value && item.href)
  const configuredContacts = ['location', 'phone', 'email'].map((id) => {
    const contact = contactLinks.find((item) => item.id === siteConfig.contactSources[id])
    return { id, contact, ...contactMeta[id] }
  })
  const reveal = reduceMotion ? { initial: false } : {
    initial: 'hidden',
    whileInView: 'visible',
    viewport: { once: true, amount: .08 },
    variants: { hidden: { opacity: 0, y: 14 }, visible: { opacity: 1, y: 0, transition: { duration: .5, staggerChildren: .07 } } },
  }
  const columnVariant = reduceMotion ? undefined : { hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0, transition: { duration: .38 } } }

  return (
    <motion.footer className="footer" aria-labelledby="footer-brand" {...reveal}>
      <div className="container">
        <div className="footer__grid">
          <motion.section className="footer__column footer__brand" variants={columnVariant}>
            <div className="footer__logo-wrap"><img src="/images/brand/threader-logo.jpeg" alt="THREADER — Wear Your Story" className="footer__logo" width="1536" height="1024" loading="lazy" /></div>
            <h2 id="footer-brand" className="sr-only">THREADER</h2>
            <p className="footer__tagline">{siteConfig.tagline}</p>
            <p className="footer__description">{siteConfig.description}</p>
            <address className="footer__contact">
              {configuredContacts.map(({ id, contact, Icon, missing }) => {
                const available = Boolean(contact?.value && contact?.href)
                const content = <><Icon aria-hidden="true" /><span>{available ? contact.value : missing}</span></>
                return available
                  ? <a key={id} href={contact.href} target={contact.external ? '_blank' : undefined} rel={contact.external ? 'noopener noreferrer' : undefined}>{content}</a>
                  : <p key={id}>{content}</p>
              })}
            </address>
            <div className="footer__socials" aria-label="THREADER social media">
              {enabledSocials.length ? enabledSocials.map((item) => {
                const Icon = item.icon
                return <a key={item.id} href={item.href} target="_blank" rel="noopener noreferrer" aria-label={`THREADER on ${item.name}`}><Icon aria-hidden="true" /></a>
              }) : <p>Social links to be added</p>}
            </div>
          </motion.section>

          <motion.nav className="footer__column" aria-label="Quick links" variants={columnVariant}>
            <h2>Quick Links</h2>
            <FooterLinkList items={quickLinks} />
          </motion.nav>

          <motion.nav className="footer__column" aria-label="Customer service" variants={columnVariant}>
            <h2>Customer Service</h2>
            <FooterLinkList items={customerServiceLinks} />
          </motion.nav>

          <motion.section className="footer__column footer__newsletter" aria-labelledby="newsletter-heading" variants={columnVariant}>
            <h2 id="newsletter-heading">Join the THREADER Community</h2>
            <p>Receive collection updates, style inspiration, and exclusive offers.</p>
            <NewsletterForm />
          </motion.section>
        </div>

        <div className="footer__bottom">
          <div><p>© {currentYear} {siteConfig.brandName}. All rights reserved.</p><p>{siteConfig.brandName} — {siteConfig.tagline}</p></div>
          <div className="footer__payments" aria-label="Payment information">
            <CreditCard aria-hidden="true" /><WalletCards aria-hidden="true" />
            <span>Payment options shown at checkout</span>
          </div>
        </div>
      </div>
    </motion.footer>
  )
}

export default Footer
