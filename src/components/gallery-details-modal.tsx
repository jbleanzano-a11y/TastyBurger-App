"use client"

import { motion, AnimatePresence } from "framer-motion"
import { X, Star, ShoppingCart } from "lucide-react"
import Image from "@/components/compat/Image"
import { useCart } from "@/lib/cart-context"
import { formatCurrency } from "@/lib/format-currency"

interface GalleryItem {
  id: string
  title: string
  image: string
  description: string
  category: string
  price: number
}

interface GalleryDetailsModalProps {
  item: GalleryItem | null
  isOpen: boolean
  onClose: () => void
}

export default function GalleryDetailsModal({ item, isOpen, onClose }: GalleryDetailsModalProps) {
  const { addItem } = useCart()

  if (!item) return null

  const handleAddToCart = () => {
    addItem({
      id: item.id,
      name: item.title,
      price: item.price,
      image: item.image,
    })
    onClose()
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 z-40"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
          >
            <div className="bg-surface rounded-2xl overflow-hidden max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              {/* Close Button */}
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={onClose}
                className="absolute top-4 right-4 z-10 p-2 bg-background/80 hover:bg-background rounded-full transition-colors"
              >
                <X className="w-6 h-6 text-foreground" />
              </motion.button>

              {/* Image */}
              <div className="relative h-80 bg-background overflow-hidden">
                <Image src={item.image || "/placeholder.svg"} alt={item.title} fill className="object-cover" />
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="absolute top-4 left-4 bg-primary text-white px-4 py-2 rounded-full text-sm font-semibold"
                >
                  {item.category}
                </motion.div>
              </div>

              {/* Content */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="p-8"
              >
                <h2 className="text-3xl font-bold mb-4 text-foreground">{item.title}</h2>

                <div className="flex items-center gap-4 mb-6">
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <span className="text-lg font-semibold text-primary">{formatCurrency(item.price)}</span>
                </div>

                <p className="text-lg text-muted mb-8 leading-relaxed">{item.description}</p>

                {/* Details */}
                <div className="grid grid-cols-2 gap-4 mb-8 pb-8 border-b border-border">
                  <div>
                    <p className="text-sm text-muted mb-1">Category</p>
                    <p className="font-semibold text-foreground capitalize">{item.category}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted mb-1">Price</p>
                    <p className="font-semibold text-primary">{formatCurrency(item.price)}</p>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-4">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleAddToCart}
                    className="flex-1 px-6 py-3 bg-primary text-white rounded-lg font-semibold hover:bg-primary-dark transition-colors flex items-center justify-center gap-2"
                  >
                    <ShoppingCart className="w-5 h-5" />
                    Add to Cart
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={onClose}
                    className="flex-1 px-6 py-3 bg-background text-foreground border border-border rounded-lg font-semibold hover:bg-surface transition-colors"
                  >
                    Close
                  </motion.button>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
