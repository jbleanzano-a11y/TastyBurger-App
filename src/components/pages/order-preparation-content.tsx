"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { useRouter } from "@/components/compat/navigation"
import { CheckCircle, Clock, Truck, Phone, MapPin, MessageCircle, Copy } from "lucide-react"
import Link from "@/components/compat/Link"

export default function OrderPreparationContent() {
  const router = useRouter()
  const [prepTime, setPrepTime] = useState(25)
  const [stage, setStage] = useState(0)
  const [copied, setCopied] = useState(false)
  const [deliveryInfo, setDeliveryInfo] = useState<{
    name: string
    email: string
    phone: string
    address: string
    city: string
    zipCode: string
  } | null>(null)

  useEffect(() => {
    // Push a new history state
    window.history.pushState(null, "", window.location.href)
    const handlePopState = () => {
      router.replace("/") 
    }
    window.addEventListener("popstate", handlePopState)
    return () => window.removeEventListener("popstate", handlePopState)
  }, [router])

  useEffect(() => {
    const savedInfo = localStorage.getItem("deliveryInfo")
    if (savedInfo) {
      setDeliveryInfo(JSON.parse(savedInfo))
    }
  }, [])

  //  Preparation timer
  useEffect(() => {
    const timer = setInterval(() => {
      setPrepTime((prev) => {
        if (prev <= 1) {
          setStage((s) => Math.min(s + 1, 3))
          return 25
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  const stages = [
    { icon: Clock, label: "Preparing", color: "text-yellow-500", description: "Your order is being prepared" },
    { icon: CheckCircle, label: "Ready", color: "text-green-500", description: "Your order is ready" },
    { icon: Truck, label: "Out for Delivery", color: "text-blue-500", description: "Your order is on the way" },
    { icon: CheckCircle, label: "Delivered", color: "text-green-600", description: "Order delivered" },
  ]

  const orderNumber = "ORD-2024-001234"

  const handleCopyOrderNumber = () => {
    navigator.clipboard.writeText(orderNumber)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="min-h-screen bg-background py-16 md:py-20">
      <div className="app-container">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-4xl mx-auto">
          {/* Success Message */}
          <div className="text-center mb-10 md:mb-12">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 100 }}
              className="inline-block mb-6"
            >
              <CheckCircle className="w-24 h-24 text-green-500" />
            </motion.div>
            <h1 className="text-5xl font-bold mb-4 text-foreground">Order Confirmed!</h1>
            <div className="flex items-center justify-center gap-2 mb-4">
              <p className="text-2xl font-semibold text-primary">{orderNumber}</p>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleCopyOrderNumber}
                className="p-2 hover:bg-primary/10 rounded-lg transition-colors"
              >
                <Copy className="w-5 h-5 text-primary" />
              </motion.button>
            </div>
            {copied && <p className="text-green-500 text-sm font-semibold">Order number copied!</p>}
            <p className="text-lg text-muted">Thank you for your order. Your food is being prepared with care.</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Order Status Timeline */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="lg:col-span-2 bg-surface rounded-lg p-8"
            >
              <h2 className="text-2xl font-bold mb-8 text-foreground">Order Status</h2>

              <div className="space-y-6">
                {stages.map((stageItem, index) => {
                  const Icon = stageItem.icon
                  const isActive = index <= stage
                  const isCurrent = index === stage

                  return (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-start gap-4"
                    >
                      <motion.div
                        animate={isCurrent ? { scale: [1, 1.2, 1] } : {}}
                        transition={{ repeat: isCurrent ? Number.POSITIVE_INFINITY : 0, duration: 1 }}
                        className={`flex-shrink-0 w-14 h-14 rounded-full flex items-center justify-center ${
                          isActive ? "bg-primary/20" : "bg-border"
                        }`}
                      >
                        <Icon className={`w-7 h-7 ${isActive ? stageItem.color : "text-muted"}`} />
                      </motion.div>

                      <div className="flex-grow pt-1">
                        <p className={`font-bold text-lg ${isActive ? "text-foreground" : "text-muted"}`}>
                          {stageItem.label}
                        </p>
                        <p className={`text-sm ${isActive ? "text-muted" : "text-muted/50"}`}>
                          {stageItem.description}
                        </p>
                        {isCurrent && stage < 3 && (
                          <p className="text-sm text-primary font-semibold mt-2">
                            {stage === 0 && `Estimated time: ${prepTime} minutes`}
                            {stage === 1 && "Ready for pickup/delivery"}
                            {stage === 2 && "Arriving soon"}
                          </p>
                        )}
                        {index < stage && <p className="text-sm text-green-500 font-semibold mt-2">Completed</p>}
                      </div>

                      {index < stages.length - 1 && (
                        <div className={`w-1 h-16 ml-7 ${isActive ? "bg-primary" : "bg-border"}`} />
                      )}
                    </motion.div>
                  )
                })}
              </div>
            </motion.div>

            {/* Preparation Timer & Info */}
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
              {stage === 0 && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-primary/10 rounded-lg p-8 text-center"
                >
                  <p className="text-muted mb-4 font-semibold">Your order will be ready in</p>
                  <motion.div
                    animate={{ scale: [1, 1.05, 1] }}
                    transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1 }}
                    className="text-7xl font-bold text-primary mb-2"
                  >
                    {prepTime}
                  </motion.div>
                  <p className="text-muted font-semibold">minutes</p>
                </motion.div>
              )}

              {/* Contact Information */}
              <div className="bg-surface rounded-lg p-6">
                <h3 className="text-lg font-bold mb-4 text-foreground flex items-center gap-2">
                  <Phone className="w-5 h-5 text-primary" />
                  Need Help?
                </h3>
                <div className="space-y-3">
                  <div>
                    <p className="text-sm text-muted">Call us</p>
                    <p className="font-semibold text-foreground">+63 917 123 4567</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted">Email</p>
                    <p className="font-semibold text-foreground">support@tastyburger.com</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted">Hours</p>
                    <p className="font-semibold text-foreground">10:00 AM - 11:00 PM</p>
                  </div>
                </div>
              </div>

              {/* Delivery Address */}
              <div className="bg-surface rounded-lg p-6">
                <h3 className="text-lg font-bold mb-4 text-foreground flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-primary" />
                  Delivery Information
                </h3>

                {deliveryInfo ? (
                  <div className="text-sm leading-relaxed">
                    <p className="text-foreground font-semibold">{deliveryInfo.name}</p>
                    <p className="text-muted">{deliveryInfo.phone}</p>
                    {deliveryInfo.email && <p className="text-muted">{deliveryInfo.email}</p>}
                    <p className="mt-2 text-foreground">{deliveryInfo.address}</p>
                    <p className="text-muted">
                      {deliveryInfo.city}, {deliveryInfo.zipCode}
                    </p>
                  </div>
                ) : (
                  <p className="text-muted text-sm">No delivery information available.</p>
                )}
              </div>
            </motion.div>
          </div>

          {/* Live Chat Support */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mt-8 bg-surface rounded-lg p-6"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <MessageCircle className="w-6 h-6 text-primary" />
                <div>
                  <p className="font-bold text-foreground">Live Chat Support</p>
                  <p className="text-sm text-muted">We are here to help you</p>
                </div>
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-2 bg-primary text-white rounded-lg font-semibold hover:bg-primary-dark transition-colors"
              >
                Chat 
              </motion.button>
            </div>
          </motion.div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-12">
            <Link
              href="/menu"
              className="px-8 py-3 bg-primary text-white rounded-lg font-semibold hover:bg-primary-dark transition-colors text-center"
            >
              Order More
            </Link>
            <Link
              href="/"
              className="px-8 py-3 bg-background text-foreground border border-border rounded-lg font-semibold hover:bg-surface transition-colors text-center"
            >
              Back to Home
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
