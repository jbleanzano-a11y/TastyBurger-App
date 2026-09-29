"use client"

import React from "react"

import { useState, useMemo } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Search, Plus, Minus, ShoppingCart } from "lucide-react"
import FoodCard from "@/components/food-card"
import { useCart } from "@/lib/cart-context"

interface MenuItem {
  id: string
  name: string
  category: string
  price: number
  image: string
  description: string
  rating: number
  reviews: number
}

export default function MenuContent() {
  const [activeCategory, setActiveCategory] = useState<string>("burgers")
  const [searchQuery, setSearchQuery] = useState("")
  const { addItem, removeItem } = useCart()
  const [menuData, setMenuData] = useState<MenuItem[]>([])
  const [categories, setCategories] = useState<Array<{ id: string; name: string }>>([])
  const [loading, setLoading] = useState(true)
  const [itemQuantities, setItemQuantities] = useState<Record<string, number>>({})

  React.useEffect(() => {
    const loadMenuData = async () => {
      try {
        const response = await fetch("/data/menu.json")
        const data = await response.json()

        setMenuData(data.items)
        setCategories(data.categories)
        setLoading(false)
      } catch (error) {
        console.error("Failed to load menu data:", error)
        setLoading(false)
      }
    }

    loadMenuData()
  }, [])

  const filteredItems = useMemo(() => {
    return menuData.filter((item) => {
      const matchesCategory = item.category === activeCategory
      const matchesSearch = item.name
        .toLowerCase()
        .includes(searchQuery.toLowerCase())

      return matchesCategory && matchesSearch
    })
  }, [menuData, activeCategory, searchQuery])

  const handleAddToCart = (item: MenuItem) => {
    addItem({
      id: item.id,
      name: item.name,
      price: item.price,
      image: item.image,
    })

    setItemQuantities((prev) => ({
      ...prev,
      [item.id]: (prev[item.id] || 0) + 1,
    }))
  }

  const handleIncreaseQuantity = (item: MenuItem) => {
    handleAddToCart(item)
  }

  const handleDecreaseQuantity = (item: MenuItem) => {
    const currentQuantity = itemQuantities[item.id] || 0

    if (currentQuantity > 1) {
      removeItem(item.id)

      setItemQuantities((prev) => ({
        ...prev,
        [item.id]: prev[item.id] - 1,
      }))
    } else if (currentQuantity === 1) {
      removeItem(item.id)

      setItemQuantities((prev) => ({
        ...prev,
        [item.id]: 0,
      }))
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>

          <p className="text-base font-medium text-gray-800">
            Loading menu...
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">

      {/* HERO SECTION */}
      <section className="py-16 sm:py-20 md:py-24 bg-gradient-to-r from-primary/10 to-accent/10">
        <div className="app-container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl"
          >
            {/* TITLE */}
            <h1 className="text-5xl sm:text-6xl font-bold mb-5 text-primary leading-tight">
              Our Menu
            </h1>

            {/* DESCRIPTION */}
            <p className="text-lg sm:text-xl text-gray-800 font-medium leading-relaxed max-w-2xl">
              Explore our delicious selection of burgers, starters, and drinks.
              All made with premium ingredients.
            </p>
          </motion.div>
        </div>
      </section>

      {/* MENU SECTION */}
      <section className="py-20">
        <div className="app-container">

          {/* SEARCH BAR */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-12"
          >
            <div className="relative max-w-2xl mx-auto">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-600 w-5 h-5" />

              <input
                type="text"
                placeholder="Search menu items..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 rounded-lg bg-surface border border-border text-foreground placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
          </motion.div>

          {/* CATEGORY FILTER */}
          <div className="flex flex-wrap gap-3 justify-center mb-16">
            {categories.map((category) => (
              <motion.button
                key={category.id}
                onClick={() => {
                  setActiveCategory(category.id)
                  setSearchQuery("")
                }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`gradient-click px-6 py-2.5 rounded-lg font-semibold transition-all ${
                  activeCategory === category.id
                    ? "text-white shadow-lg"
                    : "bg-surface text-gray-800 border border-border hover:border-primary"
                }`}
              >
                {category.name}
              </motion.button>
            ))}
          </div>

          {/* RESULTS COUNT */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center text-gray-700 font-medium mb-8"
          >
            Showing {filteredItems.length} item
            {filteredItems.length !== 1 ? "s" : ""}
            {searchQuery && ` matching "${searchQuery}"`}
          </motion.p>

          {/* MENU ITEMS GRID */}
          <AnimatePresence mode="wait">
            {filteredItems.length > 0 ? (
              <motion.div
                key={`${activeCategory}-${searchQuery}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
              >
                {filteredItems.map((item, index) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      delay: index * 0.05,
                      duration: 0.3,
                    }}
                    className="flex flex-col"
                  >
                    <FoodCard
                      image={item.image}
                      title={item.name}
                      price={item.price}
                      rating={item.rating}
                      reviews={item.reviews}
                    />

                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        delay: index * 0.05 + 0.1,
                        duration: 0.3,
                      }}
                      className="mt-3 bg-surface border border-border rounded-lg p-3 flex items-center justify-between"
                    >
                      {itemQuantities[item.id] ? (
                        <div className="flex items-center gap-2 w-full">

                          {/* MINUS */}
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => handleDecreaseQuantity(item)}
                            className="flex-1 bg-primary/10 hover:bg-primary/20 text-primary rounded-md p-2 transition-colors flex items-center justify-center"
                          >
                            <Minus className="w-4 h-4" />
                          </motion.button>

                          {/* QUANTITY */}
                          <span className="flex-1 text-center font-semibold text-foreground">
                            {itemQuantities[item.id]}
                          </span>

                          {/* PLUS */}
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => handleIncreaseQuantity(item)}
                            className="flex-1 bg-primary hover:bg-primary/90 text-white rounded-md p-2 transition-colors flex items-center justify-center"
                          >
                            <Plus className="w-4 h-4" />
                          </motion.button>
                        </div>
                      ) : (
                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => handleAddToCart(item)}
                          className="gradient-click w-full text-white font-semibold py-2 rounded-md flex items-center justify-center gap-2"
                        >
                          <ShoppingCart className="w-4 h-4" />
                          Add to Cart
                        </motion.button>
                      )}
                    </motion.div>
                  </motion.div>
                ))}
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-12"
              >
                <Search className="w-16 h-16 text-gray-500 mx-auto mb-4 opacity-50" />

                <p className="text-lg text-gray-700 font-medium">
                  No items found matching your search.
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>
    </div>
  )
}