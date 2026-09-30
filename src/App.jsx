import { useEffect, useState } from 'react'
import AnnouncementBar from './components/layout/AnnouncementBar'
import Navbar from './components/layout/Navbar'
import Hero from './sections/Hero/Hero'
import Categories from './sections/Categories/Categories'
import NewArrivals from './sections/NewArrivals/NewArrivals'
import PromotionalBanner from './sections/PromotionalBanner/PromotionalBanner'
import DeliveryProcess from './sections/DeliveryProcess/DeliveryProcess'
import About from './sections/About/About'
import CollectionMarquee from './sections/CollectionMarquee/CollectionMarquee'
import CustomerReviews from './sections/CustomerReviews/CustomerReviews'
import ContactDock from './sections/ContactDock/ContactDock'
import ServiceStrip from './sections/ServiceStrip/ServiceStrip'
import Footer from './sections/Footer/Footer'
import BackToTop from './components/ui/BackToTop'
import FloatingWhatsApp, { getVerifiedWhatsApp } from './components/ui/FloatingWhatsApp'

const readWishlist = () => { try { const value = JSON.parse(sessionStorage.getItem('threader-wishlist') || '[]'); return Array.isArray(value) ? [...new Set(value.filter((id) => typeof id === 'string'))] : [] } catch { return [] } }
const readCart = () => { try { const value = JSON.parse(sessionStorage.getItem('threader-cart') || '{}'); return value && !Array.isArray(value) && typeof value === 'object' ? Object.fromEntries(Object.entries(value).filter(([id, quantity]) => typeof id === 'string' && Number.isInteger(quantity) && quantity > 0)) : {} } catch { return {} } }

function App() {
  const [wishlistIds, setWishlistIds] = useState(readWishlist)
  const [cart, setCart] = useState(readCart)
  
  const cartCount = Object.values(cart).reduce((total, quantity) => total + quantity, 0)
  useEffect(() => { try { sessionStorage.setItem('threader-wishlist', JSON.stringify(wishlistIds)) } catch {} }, [wishlistIds])
  useEffect(() => { try { sessionStorage.setItem('threader-cart', JSON.stringify(cart)) } catch {} }, [cart])
  const toggleWishlist = (productId) => setWishlistIds((current) => current.includes(productId) ? current.filter((id) => id !== productId) : [...current, productId])
  const addToCart = (productId) => setCart((current) => ({ ...current, [productId]: (current[productId] || 0) + 1 }))
  return (
    <>
      <AnnouncementBar />
      <Navbar cartCount={cartCount} wishlistCount={wishlistIds.length} />
      <main>
        <Hero />
        <Categories />
        <NewArrivals wishlistIds={wishlistIds} onToggleWishlist={toggleWishlist} onAddToCart={addToCart} />
        <PromotionalBanner />
        <DeliveryProcess />
        <About />
        <CollectionMarquee />
        <CustomerReviews />
        <ContactDock />
        <ServiceStrip />
      </main>
      <Footer />
      <BackToTop offsetForWhatsApp={Boolean(getVerifiedWhatsApp())} />
      <FloatingWhatsApp />
    </>
  )
}

export default App
