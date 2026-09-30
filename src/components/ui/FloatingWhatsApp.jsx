import { MessageCircle } from 'lucide-react'
import { contactLinks } from '../../data/contactLinks'
import './FloatingWhatsApp.css'

export const getVerifiedWhatsApp = () => {
  const contact = contactLinks.find((item) => item.id === 'whatsapp')
  if (!contact?.value || !contact.href) return null
  const digits = String(contact.value).replace(/\D/g, '')
  if (!/^\d{8,15}$/.test(digits)) return null
  try {
    const url = new URL(contact.href)
    if (url.protocol !== 'https:' || url.hostname !== 'wa.me' || url.pathname !== `/${digits}`) return null
  } catch {
    return null
  }
  return { ...contact, digits }
}

function FloatingWhatsApp() {
  const contact = getVerifiedWhatsApp()
  if (!contact) return null
  const message = encodeURIComponent('Hello THREADER, I would like some assistance.')

  return (
    <a className="floating-whatsapp" href={`https://wa.me/${contact.digits}?text=${message}`} target="_blank" rel="noopener noreferrer" aria-label="Contact THREADER on WhatsApp">
      <MessageCircle aria-hidden="true" />
    </a>
  )
}

export default FloatingWhatsApp
