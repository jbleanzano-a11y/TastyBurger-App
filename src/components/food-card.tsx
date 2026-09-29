"use client"

import Image from "@/components/compat/Image"
import { motion } from "framer-motion"
import { Heart, Star } from "lucide-react"
import { formatCurrency } from "@/lib/format-currency"
import { useState } from "react"

interface FoodCardProps {
  id?: string
  image: string
  title: string
  description?: string
  price: number
  rating?: number
  reviews?: number
  category?: string
}

export default function FoodCard({
  id,
  image,
  title,
  description,
  price,
  rating = 4.5,
  reviews = 0,
  category,
}: FoodCardProps) {
  const [liked, setLiked] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      whileHover={{ y: -8 }}
      className="bg-surface rounded-xl overflow-hidden shadow-md hover:shadow-2xl transition-shadow duration-300 group h-full flex flex-col hover:-translate-y-1
    >
      {/* Food Image */}
      <div className="relative h-48 overflow-hidden bg-background">
        <Image
          src={image || "/placeholder.svg?height=300&width=300"}
          alt={title}
          fill
          className="object-cover group-hover:scale-125 transition-transform duration-500 will-change-transform"
        />

        {/* Favorite Button */}
        <motion.button
          type="button"
          aria-label={liked ? "Remove from favorites" : "Add to favorites"}
          onClick={() => setLiked((value) => !value)}
          whileHover={{ scale: 1.12 }}
          whileTap={{ scale: 0.9 }}
          className="gradient-click absolute top-3 left-3 z-10 w-9 h-9 rounded-full bg-white/90 backdrop-blur-sm shadow-md flex items-center justify-center"
        >
          <Heart
            className={`w-5 h-5 transition-colors ${
              liked
                ? "fill-red-500 text-red-500"
                : "text-gray-700"
            }`}
          />
        </motion.button>

        {/* Category */}
        {category && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="absolute top-3 right-3 bg-primary text-white px-3 py-1 rounded-full text-xs font-semibold"
          >
            {category}
          </motion.div>
        )}
      </div>

      {/* Food Information */}
      <div className="p-4 flex flex-col flex-grow">
        {/* Food Name */}
        <h3 className="font-bold text-lg mb-4 text-gray-900 group-hover:text-primary transition-colors line-clamp-2">
          {title}
        </h3>

        {/* Rating and Price */}
        <div className="flex items-center justify-between mt-auto">
          
          {/* Rating */}
          <div className="flex items-center gap-1">
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={i}
                whileHover={{ scale: 1.2 }}
              >
                <Star
                  className={`w-4 h-4 ${
                    i < Math.floor(rating)
                      ? "fill-yellow-400 text-yellow-400"
                      : "text-gray-300"
                  }`}
                />
              </motion.div>
            ))}

            {/* Rating Number */}
            <span className="text-sm text-gray-900 font-bold ml-1">
              {rating.toFixed(1)}
            </span>

            {/* Review Count */}
            {reviews > 0 && (
              <span className="text-sm text-gray-700 font-semibold ml-1">
                ({reviews})
              </span>
            )}
          </div>

          {/* Price */}
          <span className="font-bold text-primary text-lg">
            {formatCurrency(price)}
          </span>
        </div>
      </div>
    </motion.div>
  )
}