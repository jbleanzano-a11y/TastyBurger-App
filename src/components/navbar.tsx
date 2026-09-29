"use client"

import { useState } from "react"
import Link from "@/components/compat/Link"
import { usePathname } from "@/components/compat/navigation"
import { Home, ShoppingCart } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

const navLinks = [
  { href: "/", label: "Home", icon: Home },
  { href: "/menu", label: "Menu" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
]

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()

  const openCart = () => {
    window.dispatchEvent(new Event("open-cart"))
  }

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/"
    return pathname.startsWith(href)
  }

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 pt-4 px-4 md:pt-6 md:px-6">
      <div className="app-container transition-all duration-300">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          className="border border-border-light px-6 md:px-8 py-3 md:py-1.5 bg-surface-light rounded-full shadow-lg"
        >
          <div className="flex items-center justify-between">

            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link
                href="/"
                className="flex items-center font-extrabold text-lg md:text-xl md:gap-0.5"
              >
                <motion.img
                  src="/logo.png"
                  alt="Tasty Burger Logo"
                  className="w-8 h-8 md:w-10 md:h-10"
                  whileHover={{ rotate: 10, scale: 1.1 }}
                  transition={{
                    type: "spring",
                    stiffness: 300,
                  }}
                />

                <span className="hidden sm:inline tracking-tight text-amber-600 font-extrabold">
                  TastyBurger
                </span>
              </Link>
            </motion.div>

            <div className="hidden md:flex items-center gap-1 lg:gap-2 font-semibold">

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0 }}
              >
                <Link
                  href="/"
                  className={`p-2 rounded-full transition-all duration-300 flex items-center justify-center ${
                    isActive("/")
                      ? "text-amber-600 bg-surface-light"
                      : "text-black hover:text-amber-600 hover:bg-surface-light"
                  }`}
                  title="Home"
                >
                  <Home className="w-5 h-5" />
                </Link>
              </motion.div>

              {navLinks.slice(1).map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: (i + 1) * 0.1 }}
                >
                  <Link
                    href={link.href}
                    className={`px-4 py-2 text-base lg:text-lg font-semibold transition-colors duration-300 ${
                      isActive(link.href)
                        ? "text-amber-600 border-b-2 border-amber-600"
                        : "text-black hover:text-amber-600"
                    }`}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}

            </div>

            <div className="flex items-center gap-2 md:gap-3">

              <motion.button
                type="button"
                onClick={openCart}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="gradient-click hidden md:inline-flex items-center gap-2 px-6 py-2 font-bold rounded-full text-sm lg:text-base text-white"
              >
                <ShoppingCart className="w-4 h-4" />
                Add to Cart
              </motion.button>

              <motion.button
                onClick={() => setIsOpen(!isOpen)}
                className="md:hidden relative w-10 h-10 flex flex-col items-center justify-center space-y-2"
                aria-label="Toggle menu"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <motion.span
                  className="block w-7 h-[3px] bg-[#d39a6a] rounded-full"
                  animate={
                    isOpen
                      ? { rotate: 45, y: 8 }
                      : { rotate: 0, y: 0 }
                  }
                  transition={{ duration: 0.3 }}
                />

                <motion.span
                  className="block w-6 h-[3px] bg-[#d39a6a] rounded-full"
                  animate={
                    isOpen
                      ? { opacity: 0 }
                      : { opacity: 1 }
                  }
                  transition={{ duration: 0.3 }}
                />

                <motion.span
                  className="block w-5 h-[3px] bg-[#d39a6a] rounded-full"
                  animate={
                    isOpen
                      ? { rotate: -45, y: -8 }
                      : { rotate: 0, y: 0 }
                  }
                  transition={{ duration: 0.3 }}
                />
              </motion.button>

            </div>
          </div>

          <AnimatePresence>
            {isOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="md:hidden border-t border-border-light mt-4 pt-4"
              >
                <div className="flex flex-col gap-2">

                  {navLinks.map((link, i) => (
                    <motion.div
                      key={link.href}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.05 }}
                    >
                      <Link
                        href={link.href}
                        className={`px-4 py-2 transition-all duration-200 block font-semibold text-base rounded-lg ${
                          isActive(link.href)
                            ? "text-amber-600 bg-surface-light"
                            : "text-black hover:text-amber-600 hover:bg-surface-light"
                        }`}
                        onClick={() => setIsOpen(false)}
                      >
                        {link.label}
                      </Link>
                    </motion.div>
                  ))}

                  <button
                    type="button"
                    className="gradient-click px-4 py-2 font-bold rounded-full text-sm text-center mt-2 text-white inline-flex items-center justify-center gap-2"
                    onClick={() => {
                      setIsOpen(false)
                      openCart()
                    }}
                  >
                    <ShoppingCart className="w-4 h-4" />
                    Add to Cart
                  </button>

                </div>
              </motion.div>
            )}
          </AnimatePresence>

        </motion.div>
      </div>
    </nav>
  )
}