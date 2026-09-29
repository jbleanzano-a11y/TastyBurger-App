"use client"

import type React from "react"
import { useState, useEffect, useRef } from "react"
import { motion } from "framer-motion"
import { useRouter } from "@/components/compat/navigation"
import { useCart } from "@/lib/cart-context"
import { formatCurrency } from "@/lib/format-currency"
import { Trash2, Plus, Minus, ArrowLeft } from "lucide-react"
import Link from "@/components/compat/Link"
import Image from "@/components/compat/Image"

export default function CheckoutContent() {
  const router = useRouter()
  const { items, removeItem, updateQuantity, total } = useCart()

  const [customerInfo, setCustomerInfo] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    zipCode: "",
  })

  const refs = {
    name: useRef<HTMLInputElement>(null),
    email: useRef<HTMLInputElement>(null),
    phone: useRef<HTMLInputElement>(null),
    address: useRef<HTMLInputElement>(null),
    city: useRef<HTMLInputElement>(null),
    zipCode: useRef<HTMLInputElement>(null),
  }

  useEffect(() => {
    const savedInfo = localStorage.getItem("deliveryInfo")

    if (savedInfo) {
      setCustomerInfo(JSON.parse(savedInfo))
    }
  }, [])

  useEffect(() => {
    localStorage.setItem(
      "deliveryInfo",
      JSON.stringify(customerInfo)
    )
  }, [customerInfo])

  const deliveryCharge = 50
  const tax = Math.round(total * 0.05)
  const finalTotal = total + deliveryCharge + tax

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target

    setCustomerInfo((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleProceedToPayment = () => {
    const requiredFields = [
      "name",
      "phone",
      "address",
      "city",
      "zipCode",
    ] as const

    for (const field of requiredFields) {
      if (!customerInfo[field].trim()) {
        const el = refs[field].current

        if (el) {
          el.scrollIntoView({
            behavior: "smooth",
            block: "center",
          })

          el.focus()

          el.classList.add(
            "ring-2",
            "ring-destructive"
          )

          setTimeout(() => {
            el.classList.remove(
              "ring-2",
              "ring-destructive"
            )
          }, 1000)
        }

        return
      }
    }

    localStorage.setItem(
      "deliveryInfo",
      JSON.stringify(customerInfo)
    )

    router.push("/payment")
  }

  {/* EMPTY CART */}
  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-background py-20">
        <div className="app-container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-20"
          >
            <h1 className="text-4xl font-bold mb-4 text-gray-900">
              Your Cart is Empty
            </h1>

            <p className="text-base text-gray-700 font-medium mb-8">
              Add some delicious items to get started!
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/menu"
                className="inline-block px-8 py-3 bg-primary text-white rounded-lg font-semibold hover:bg-primary-dark transition-colors"
              >
                Add Items
              </Link>

              <Link
                href="/"
                className="inline-block px-8 py-3 bg-background text-gray-900 border border-border rounded-lg font-semibold hover:bg-surface transition-colors"
              >
                Continue Shopping
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background py-20">
      <div className="app-container">

        {/* HEADER */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <Link
            href="/menu"
            className="inline-flex items-center gap-2 text-primary hover:text-primary-dark mb-6 font-medium"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Menu
          </Link>

          <h1 className="text-4xl font-bold text-gray-900">
            Checkout
          </h1>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* ORDER ITEMS */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-2"
          >
            <div className="bg-surface rounded-lg p-6 mb-8">

              <h2 className="text-2xl font-bold mb-6 text-gray-900">
                Order Summary
              </h2>

              <div className="space-y-4">

                {items.map((item) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex gap-4 pb-4 border-b border-border last:border-b-0"
                  >

                    {/* IMAGE */}
                    <div className="relative w-20 h-20 rounded-lg overflow-hidden flex-shrink-0">
                      <Image
                        src={
                          item.image ||
                          "/placeholder.svg"
                        }
                        alt={item.name}
                        fill
                        className="object-cover"
                      />
                    </div>

                    {/* ITEM INFORMATION */}
                    <div className="flex-grow">

                      <h3 className="font-bold text-gray-900 text-base">
                        {item.name}
                      </h3>

                      {/* PRICE EACH */}
                      <p className="text-base text-gray-800 font-semibold mt-1">
                        {formatCurrency(item.price)}{" "}
                        <span className="text-gray-600 font-medium">
                          each
                        </span>
                      </p>

                      {/* QUANTITY CONTROLS */}
                      <div className="flex items-center gap-2 mt-3">

                        <button
                          onClick={() =>
                            updateQuantity(
                              item.id,
                              item.quantity - 1
                            )
                          }
                          className="p-1 hover:bg-border rounded transition-colors"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="w-4 h-4" />
                        </button>

                        <span className="w-8 text-center font-bold text-gray-900">
                          {item.quantity}
                        </span>

                        <button
                          onClick={() =>
                            updateQuantity(
                              item.id,
                              item.quantity + 1
                            )
                          }
                          className="p-1 hover:bg-border rounded transition-colors"
                          aria-label="Increase quantity"
                        >
                          <Plus className="w-4 h-4" />
                        </button>

                        <button
                          onClick={() =>
                            removeItem(item.id)
                          }
                          className="ml-auto p-1 text-destructive hover:bg-destructive/10 rounded transition-colors"
                          aria-label="Remove item"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>

                      </div>
                    </div>

                    {/* ITEM TOTAL */}
                    <div className="text-right">
                      <p className="font-bold text-gray-900 text-base">
                        {formatCurrency(
                          item.price * item.quantity
                        )}
                      </p>
                    </div>

                  </motion.div>
                ))}

              </div>
            </div>

            {/* DELIVERY INFORMATION */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-surface rounded-lg p-6"
            >

              <h2 className="text-2xl font-bold mb-6 text-gray-900">
                Delivery Information
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

                <input
                  ref={refs.name}
                  type="text"
                  name="name"
                  placeholder="Full Name *"
                  value={customerInfo.name}
                  onChange={handleInputChange}
                  className="sm:col-span-2 w-full px-4 py-2 rounded-lg bg-background border border-border text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary"
                />

                <input
                  ref={refs.email}
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={customerInfo.email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 rounded-lg bg-background border border-border text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary"
                />

                <input
                  ref={refs.phone}
                  type="tel"
                  name="phone"
                  placeholder="Phone Number *"
                  value={customerInfo.phone}
                  onChange={handleInputChange}
                  pattern="[0-9]{10}"
                  maxLength={10}
                  inputMode="numeric"
                  title="Please enter a valid 10-digit phone number"
                  required
                  className="w-full px-4 py-2 rounded-lg bg-background border border-border text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary"
                />

                <input
                  ref={refs.address}
                  type="text"
                  name="address"
                  placeholder="Address *"
                  value={customerInfo.address}
                  onChange={handleInputChange}
                  className="sm:col-span-2 w-full px-4 py-2 rounded-lg bg-background border border-border text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary"
                />

                <input
                  ref={refs.city}
                  type="text"
                  name="city"
                  placeholder="City *"
                  value={customerInfo.city}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 rounded-lg bg-background border border-border text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary"
                />

                <input
                  ref={refs.zipCode}
                  type="text"
                  name="zipCode"
                  placeholder="Zip Code *"
                  value={customerInfo.zipCode}
                  onChange={handleInputChange}
                  pattern="[0-9]{6}"
                  maxLength={6}
                  inputMode="numeric"
                  title="Please enter a valid 6-digit ZIP code"
                  required
                  className="w-full px-4 py-2 rounded-lg bg-background border border-border text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary"
                />

              </div>
            </motion.div>
          </motion.div>

          {/* ORDER TOTAL */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-1"
          >
            <div className="bg-surface rounded-lg p-6 sticky top-20">

              <h2 className="text-2xl font-bold mb-6 text-gray-900">
                Order Total
              </h2>

              <div className="space-y-3 mb-6 pb-6 border-b border-border">

                <div className="flex justify-between text-gray-900 font-medium">
                  <span>Subtotal</span>
                  <span>{formatCurrency(total)}</span>
                </div>

                <div className="flex justify-between text-gray-900 font-medium">
                  <span>Tax (5%)</span>
                  <span>{formatCurrency(tax)}</span>
                </div>

                <div className="flex justify-between text-gray-900 font-medium">
                  <span>Delivery Charge</span>
                  <span>{formatCurrency(deliveryCharge)}</span>
                </div>

              </div>

              <div className="flex justify-between text-xl font-bold mb-6 text-gray-900">
                <span>Total</span>

                <span className="text-primary">
                  {formatCurrency(finalTotal)}
                </span>
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleProceedToPayment}
                className="w-full px-6 py-3 bg-primary text-white rounded-lg font-semibold hover:bg-primary-dark transition-colors"
              >
                Proceed to Payment
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => router.push("/menu")}
                className="w-full mt-3 px-6 py-3 bg-background text-gray-900 border border-border rounded-lg font-semibold hover:bg-surface transition-colors"
              >
                Continue Shopping
              </motion.button>

            </div>
          </motion.div>

        </div>
      </div>
    </div>
  )
}