"use client"

import { motion, AnimatePresence } from "framer-motion"
import {
  ShoppingCart,
  X,
  Plus,
  Minus,
  Trash2,
  ArrowRight,
} from "lucide-react"
import { useCart } from "@/lib/cart-context"
import { formatCurrency } from "@/lib/format-currency"
import Link from "@/components/compat/Link"
import Image from "@/components/compat/Image"
import { useEffect, useState } from "react"

export default function CartSidebar() {
  const { items, removeItem, updateQuantity, total } = useCart()
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    const open = () => setIsOpen(true)

    window.addEventListener("open-cart", open)

    return () => window.removeEventListener("open-cart", open)
  }, [])

  return (
    <>
      {/* Floating Cart Button */}
      <motion.button
        whileHover={{ scale: 1.08, rotate: 2 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(true)}
        className="fixed bottom-8 right-8 z-50 p-4 rounded-full shadow-2xl bg-sidebar-primary text-background hover:bg-primary-dark transition-all duration-200 flex items-center justify-center group"
      >
        <ShoppingCart className="h-6 w-6 group-hover:rotate-6 transition-transform" />

        {items.length > 0 && (
          <motion.span
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="absolute -top-2 -right-2 bg-accent text-white text-[11px] font-bold w-5 h-5 rounded-full flex items-center justify-center shadow-md"
          >
            {items.length}
          </motion.span>
        )}
      </motion.button>

      {/* Sidebar */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/50 backdrop-blur-[2px] z-40 transition-all"
            />

            {/* Sidebar Content */}
            <motion.div
              initial={{ x: 400, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: 400, opacity: 0 }}
              transition={{
                type: "spring",
                stiffness: 250,
                damping: 30,
              }}
              className="fixed right-0 top-0 h-full w-full max-w-md z-50 flex flex-col shadow-[0_0_40px_rgba(0,0,0,0.35)] rounded-l-[2rem] overflow-hidden border-l border-border"
              style={{ backgroundColor: "#FFFEF6" }}
            >

              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-border/70 bg-background/60 backdrop-blur-md sticky top-0 z-10">
                <h2 className="text-2xl font-extrabold text-foreground tracking-tight">
                  Your Cart
                </h2>

                <motion.button
                  whileHover={{ rotate: 90 }}
                  transition={{
                    type: "spring",
                    stiffness: 300,
                  }}
                  onClick={() => setIsOpen(false)}
                  className="p-2 hover:bg-border/60 rounded-full transition-colors"
                  aria-label="Close cart"
                >
                  <X className="w-6 h-6" />
                </motion.button>
              </div>

              {/* Items */}
              <div className="flex-1 overflow-y-auto px-6 py-5 space-y-5 scrollbar-thin scrollbar-thumb-border/50 scrollbar-thumb-rounded-xl">

                {/* EMPTY CART */}
                {items.length === 0 ? (
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex flex-col items-center justify-center h-full py-14 text-center"
                  >
                    {/* Cart Icon */}
                    <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mb-6 shadow-inner">
                      <ShoppingCart className="w-9 h-9 text-primary" />
                    </div>

                    {/* Title */}
                    <h3 className="text-xl font-bold text-gray-900 mb-3">
                      Your cart is empty
                    </h3>

                    {/* Description */}
                    <p className="text-base text-gray-700 font-medium leading-relaxed mb-7 max-w-[260px]">
                      Add some delicious items from our menu to get started.
                    </p>

                    {/* Browse Menu Button */}
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setIsOpen(false)}
                      className="px-6 py-3 bg-primary text-white rounded-lg font-semibold hover:bg-primary-dark transition-all duration-300 shadow-md flex items-center gap-2"
                    >
                      <Link
                        href="/menu"
                        className="flex items-center gap-2"
                      >
                        Browse Menu
                        <ArrowRight className="w-4 h-4" />
                      </Link>
                    </motion.button>
                  </motion.div>
                ) : (

                  /* CART ITEMS */
                  items.map((item) => (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, x: 25 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 25 }}
                      className="flex gap-4 pb-5 border-b border-border/70 last:border-b-0 bg-background/40 rounded-xl p-3 hover:shadow-sm transition-shadow duration-200"
                    >
                      {/* Product Image */}
                      <div className="relative w-16 h-16 rounded-lg overflow-hidden flex-shrink-0 shadow-sm ring-1 ring-border/60">
                        <Image
                          src={item.image || "/placeholder.svg"}
                          alt={item.name}
                          fill
                          className="object-cover transition-transform duration-300 hover:scale-105"
                        />
                      </div>

                      {/* Product Information */}
                      <div className="flex flex-col flex-grow justify-between">
                        <div>
                          <h3 className="font-semibold text-gray-900 text-sm leading-tight">
                            {item.name}
                          </h3>

                          <p className="text-sm text-gray-700 font-medium mt-1">
                            {formatCurrency(item.price)}
                          </p>
                        </div>

                        {/* Quantity Controls */}
                        <div className="flex items-center gap-2 mt-3">

                          <button
                            onClick={() =>
                              updateQuantity(
                                item.id,
                                item.quantity - 1
                              )
                            }
                            className="p-1.5 hover:bg-border rounded transition-all"
                            aria-label="Decrease quantity"
                          >
                            <Minus className="w-3 h-3" />
                          </button>

                          <span className="w-6 text-center text-sm font-semibold text-gray-900">
                            {item.quantity}
                          </span>

                          <button
                            onClick={() =>
                              updateQuantity(
                                item.id,
                                item.quantity + 1
                              )
                            }
                            className="p-1.5 hover:bg-border rounded transition-all"
                            aria-label="Increase quantity"
                          >
                            <Plus className="w-3 h-3" />
                          </button>

                          <button
                            onClick={() => removeItem(item.id)}
                            className="ml-auto p-1.5 text-destructive hover:bg-destructive/10 rounded transition-all"
                            aria-label="Remove item"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>

                      {/* Item Total */}
                      <div className="text-right flex flex-col justify-between">
                        <p className="font-bold text-gray-900 text-sm">
                          {formatCurrency(
                            item.price * item.quantity
                          )}
                        </p>
                      </div>
                    </motion.div>
                  ))
                )}
              </div>

              {/* Footer */}
              {items.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="border-t border-border/70 p-6 bg-background/80 backdrop-blur-md shadow-inner space-y-4 sticky bottom-0"
                >
                  <div className="flex justify-between items-center text-lg font-bold">
                    <span className="text-gray-900">
                      Total:
                    </span>

                    <span className="text-primary">
                      {formatCurrency(total)}
                    </span>
                  </div>

                  <Link
                    href="/checkout"
                    onClick={() => setIsOpen(false)}
                    className="block w-full px-6 py-3 text-white rounded-lg font-semibold hover:bg-primary-dark transition-all duration-300 text-center bg-amber-700 shadow-lg"
                  >
                    Proceed to Checkout
                  </Link>
                </motion.div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}