import { useEffect, useState } from "react"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import CartSidebar from "@/components/cart-sidebar"
import RouteScrollHandler from "@/components/route-scroll-handler"
import HeroSection from "@/components/sections/hero-section"
import FeaturedSection from "@/components/sections/featured-section"
import SpecialSection from "@/components/sections/special-section"
import ServicesSection from "@/components/sections/services-section"
import GallerySection from "@/components/sections/gallery-section"
import MenuContent from "@/components/pages/menu-content"
import AboutContent from "@/components/pages/about-content"
import ContactContent from "@/components/pages/contact-content"
import CheckoutContent from "@/components/pages/checkout-content"
import PaymentContent from "@/components/pages/payment-content"
import OrderPreparationContent from "@/components/pages/order-preparation-content"
import NotFound from "@/components/not-found"

function Home() {
  return <>
    <HeroSection />
    <FeaturedSection />
    <SpecialSection />
    <ServicesSection />
    <GallerySection />
  </>
}

function PageContent({ path }: { path: string }) {
  if (path === "/") return <Home />
  if (path === "/menu") return <MenuContent />
  if (path === "/about") return <AboutContent />
  if (path === "/contact") return <ContactContent />
  if (path === "/checkout") return <CheckoutContent />
  if (path === "/payment") return <PaymentContent />
  if (path === "/order-preparation") return <OrderPreparationContent />
  return <NotFound />
}

export default function App() {
  const [path, setPath] = useState(() => window.location.pathname)
  useEffect(() => {
    const update = () => setPath(window.location.pathname)
    window.addEventListener("popstate", update)
    return () => window.removeEventListener("popstate", update)
  }, [])
  return (
    <>
      <RouteScrollHandler />
      <Navbar />
      <main className="min-h-screen pt-24 bg-background transition-colors duration-300"><PageContent path={path} /></main>
      <Footer />
      <CartSidebar />
    </>
  )
}
