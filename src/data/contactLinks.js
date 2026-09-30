import { Facebook, Instagram, Mail, MapPin, MessageCircle, Music2, Phone } from 'lucide-react'
import { contactConfig } from '../config/contactConfig.js'

// Change contact details in src/config/contactConfig.js.
const whatsappDigits = contactConfig.whatsappNumber.replace(/\D/g, '')
const phoneDigits = contactConfig.phoneNumber.replace(/\D/g, '')

export const contactLinks = [
  { id: 'instagram', letter: 'C', name: 'Instagram', icon: Instagram, value: contactConfig.instagramUrl, href: contactConfig.instagramUrl, external: true },
  { id: 'facebook', letter: 'O', name: 'Facebook', icon: Facebook, value: contactConfig.facebookUrl, href: contactConfig.facebookUrl, external: true },
  { id: 'tiktok', letter: 'N', name: 'TikTok', icon: Music2, value: contactConfig.tiktokUrl, href: contactConfig.tiktokUrl, external: true },
  { id: 'whatsapp', letter: 'T', name: 'WhatsApp', icon: MessageCircle, value: contactConfig.whatsappNumber, href: /^\d{8,15}$/.test(whatsappDigits) ? `https://wa.me/${whatsappDigits}` : '', external: true },
  { id: 'email', letter: 'A', name: 'Email', icon: Mail, value: contactConfig.email, href: contactConfig.email ? `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(contactConfig.email.trim())}` : '', external: true },
  { id: 'phone', letter: 'C', name: 'Phone', icon: Phone, value: contactConfig.phoneNumber, href: phoneDigits ? `tel:+${phoneDigits}` : '', external: false },
  { id: 'location', letter: 'T', name: 'Location', icon: MapPin, value: contactConfig.address || contactConfig.mapsUrl, href: contactConfig.mapsUrl || (contactConfig.address ? `https://maps.google.com/?q=${encodeURIComponent(contactConfig.address)}` : ''), external: true },
]
