"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { useRouter } from "@/components/compat/navigation"
import { useCart } from "@/lib/cart-context"
import { formatCurrency } from "@/lib/format-currency"
import {
  CreditCard,
  Lock,
  ArrowLeft,
  CheckCircle,
  Shield,
  Smartphone,
  WalletCards,
  Loader2,
} from "lucide-react"
import Link from "@/components/compat/Link"

export default function PaymentContent() {
  const router = useRouter()
  const { total, clearCart } = useCart()

  const [paymentMethod, setPaymentMethod] = useState("card")
  const [paymentStep, setPaymentStep] = useState<"method" | "details" | "confirmation">("method")
  const [processing, setProcessing] = useState(false)
  const [cardInfo, setCardInfo] = useState({
    cardNumber: "",
    cardHolder: "",
    expiryDate: "",
    cvv: "",
  })

  const deliveryCharge = 50
  const tax = Math.round(total * 0.05)
  const finalTotal = total + deliveryCharge + tax

  // Format inputs dynamically
  const handleCardInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    let formattedValue = value
    if (name === "cardNumber") {
      formattedValue = value.replace(/\D/g, "").replace(/(\d{4})/g, "$1 ").trim()
    } else if (name === "expiryDate") {
      formattedValue = value.replace(/\D/g, "").replace(/(\d{2})(\d{0,2})/, "$1/$2")
    } else if (name === "cvv") {
      formattedValue = value.replace(/\D/g, "").slice(0, 3)
    }
    setCardInfo((prev) => ({ ...prev, [name]: formattedValue }))
  }

  // Handle payment simulation
  const handlePayment = async () => {
    if (paymentMethod === "card") {
      if (!cardInfo.cardNumber || !cardInfo.cardHolder || !cardInfo.expiryDate || !cardInfo.cvv) {
        alert("Please fill in all required card details.")
        return
      }
    }

    setProcessing(true)
    setTimeout(() => {
      setPaymentStep("confirmation")
      setTimeout(() => {
        clearCart()
        router.push("/order-preparation")
      }, 2200)
    }, 1800)
  }

  return (
    <div className="min-h-screen bg-background py-16 md:py-20">
      <div className="app-container">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-10 md:mb-12">
          <Link
            href="/checkout"
            className="inline-flex items-center gap-2 text-primary hover:text-primary-dark mb-6"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Checkout
          </Link>
          <h1 className="text-4xl font-bold text-foreground">Secure Payment</h1>
          <p className="text-muted mt-2">Complete your transaction securely and instantly</p>
        </motion.div>

        {/* Progress Tracker */}
        <div className="mb-12 flex items-center justify-center">
          <div className="flex items-center gap-4">
            {["Method", "Details", "Confirmation"].map((step, index) => {
              const active =
                (paymentStep === "method" && index === 0) ||
                (paymentStep === "details" && index <= 1) ||
                (paymentStep === "confirmation" && index <= 2)
              return (
                <div key={index} className="flex items-center">
                  <motion.div
                    animate={{
                      backgroundColor: active ? "#d4a574" : "#e5e7eb",
                      scale: active ? [1, 1.1, 1] : 1,
                    }}
                    transition={{ duration: 0.8, repeat: active ? Infinity : 0 }}
                    className="w-10 h-10 rounded-full flex items-center justify-center text-white font-semibold shadow-md"
                  >
                    {index + 1}
                  </motion.div>
                  {index < 2 && (
                    <div
                      className={`w-12 h-[2px] ${
                        active ? "bg-primary/60" : "bg-border"
                      } mx-2 transition-all`}
                    />
                  )}
                </div>
              )
            })}
          </div>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left: Payment Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-2"
          >
            <div className="bg-surface rounded-2xl p-8 shadow-sm">
              {/* STEP 1 — METHOD */}
              {paymentStep === "method" && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                  <h2 className="text-2xl font-bold mb-8 flex items-center gap-2 text-foreground">
                    <CreditCard className="w-6 h-6 text-primary" />
                    Select Payment Method
                  </h2>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
                    {[
                      { id: "card", label: "Credit / Debit Card", icon: <CreditCard className="w-6 h-6" /> },
                      { id: "upi", label: "UPI", icon: <Smartphone className="w-6 h-6" /> },
                      { id: "wallet", label: "Digital Wallet", icon: <WalletCards className="w-6 h-6" /> },
                    ].map((method) => (
                      <motion.button
                        key={method.id}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.97 }}
                        onClick={() => setPaymentMethod(method.id)}
                        className={`p-6 rounded-xl border-2 transition-all flex flex-col items-center justify-center text-center gap-3 ${
                          paymentMethod === method.id
                            ? "border-primary bg-primary/10 shadow-lg"
                            : "border-border hover:border-primary"
                        }`}
                      >
                        <div className="text-primary">{method.icon}</div>
                        <p className="font-semibold text-foreground text-sm">{method.label}</p>
                      </motion.button>
                    ))}
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setPaymentStep("details")}
                    className="w-full px-6 py-3 bg-primary text-white rounded-lg font-semibold hover:bg-primary-dark transition-colors"
                  >
                    Continue to Details
                  </motion.button>
                </motion.div>
              )}

              {/* STEP 2 — DETAILS */}
              {paymentStep === "details" && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                  <h2 className="text-2xl font-bold mb-8 flex items-center gap-2 text-foreground">
                    <Lock className="w-6 h-6 text-primary" />
                    Enter Payment Details
                  </h2>

                  {paymentMethod === "card" && (
                    <div className="space-y-5">
                      <div>
                        <label className="block text-sm font-semibold mb-2 text-foreground">
                          Card Number
                        </label>
                        <input
                          type="text"
                          name="cardNumber"
                          placeholder="1234 5678 9012 3456"
                          value={cardInfo.cardNumber}
                          onChange={handleCardInputChange}
                          maxLength={19}
                          className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground focus:ring-2 focus:ring-primary focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold mb-2 text-foreground">
                          Card Holder Name
                        </label>
                        <input
                          type="text"
                          name="cardHolder"
                          placeholder="John Doe"
                          value={cardInfo.cardHolder}
                          onChange={handleCardInputChange}
                          className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground focus:ring-2 focus:ring-primary focus:outline-none"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-semibold mb-2 text-foreground">
                            Expiry Date
                          </label>
                          <input
                            type="text"
                            name="expiryDate"
                            placeholder="MM/YY"
                            value={cardInfo.expiryDate}
                            onChange={handleCardInputChange}
                            maxLength={5}
                            className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground focus:ring-2 focus:ring-primary focus:outline-none"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-semibold mb-2 text-foreground">CVV</label>
                          <input
                            type="text"
                            name="cvv"
                            placeholder="123"
                            value={cardInfo.cvv}
                            onChange={handleCardInputChange}
                            maxLength={3}
                            className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground focus:ring-2 focus:ring-primary focus:outline-none"
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {paymentMethod !== "card" && (
                    <div className="space-y-4">
                      <label className="block text-sm font-semibold mb-2 text-foreground">
                        {paymentMethod === "upi" ? "UPI ID" : "Select Wallet"}
                      </label>
                      {paymentMethod === "upi" ? (
                        <input
                          type="text"
                          placeholder="yourname@upi"
                          className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground focus:ring-2 focus:ring-primary focus:outline-none"
                        />
                      ) : (
                        <div className="grid grid-cols-2 gap-4">
                          {["Google Pay", "PhonePe", "PayTM", "Amazon Pay"].map((wallet) => (
                            <button
                              key={wallet}
                              className="p-4 rounded-lg border border-border hover:border-primary hover:bg-primary/10 transition-all font-semibold text-foreground"
                            >
                              {wallet}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  )}

                  <div className="flex gap-4 mt-10">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setPaymentStep("method")}
                      className="flex-1 px-6 py-3 bg-background text-foreground border border-border rounded-lg font-semibold hover:bg-surface transition-colors"
                    >
                      Back
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={handlePayment}
                      disabled={processing}
                      className="flex-1 px-6 py-3 bg-primary text-white rounded-lg font-semibold hover:bg-primary-dark transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
                    >
                      {processing ? (
                        <>
                          <Loader2 className="w-5 h-5 animate-spin" /> Processing
                        </>
                      ) : (
                        "PayNow"
                      )}
                    </motion.button>
                  </div>
                </motion.div>
              )}

              {/* STEP 3 — CONFIRMATION */}
              {paymentStep === "confirmation" && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-16"
                >
                  <motion.div
                    animate={{ scale: [1, 1.15, 1] }}
                    transition={{ repeat: Infinity, duration: 1.2 }}
                    className="inline-block mb-6"
                  >
                    <CheckCircle className="w-20 h-20 text-green-500" />
                  </motion.div>
                  <h3 className="text-2xl font-bold text-foreground mb-2">
                    Payment Successful!
                  </h3>
                  <p className="text-muted">Redirecting to order preparation...</p>
                </motion.div>
              )}
            </div>
          </motion.div>

          {/* Right: Summary */}
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
            <div className="bg-surface rounded-2xl p-6 sticky top-20 shadow-sm">
              <h2 className="text-2xl font-bold mb-6 text-foreground">Order Summary</h2>

              <div className="space-y-3 mb-6 pb-6 border-b border-border">
                <div className="flex justify-between text-foreground">
                  <span>Subtotal</span>
                  <span>{formatCurrency(total)}</span>
                </div>
                <div className="flex justify-between text-foreground">
                  <span>Tax (5%)</span>
                  <span>{formatCurrency(tax)}</span>
                </div>
                <div className="flex justify-between text-foreground">
                  <span>Delivery</span>
                  <span>{formatCurrency(deliveryCharge)}</span>
                </div>
              </div>

              <div className="flex justify-between text-xl font-bold mb-8 text-foreground">
                <span>Total</span>
                <span className="text-primary">{formatCurrency(finalTotal)}</span>
              </div>

              <div className="bg-primary/10 rounded-lg p-4 flex items-center gap-3">
                <Shield className="w-5 h-5 text-primary flex-shrink-0" />
                <div className="text-sm">
                  <p className="font-semibold text-foreground">Secure Transaction</p>
                  <p className="text-muted text-xs">Protected with 256-bit SSL encryption</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
