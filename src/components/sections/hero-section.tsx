"use client"

import { motion, AnimatePresence, easeInOut, easeOut } from "framer-motion"
import Link from "@/components/compat/Link"
import Image from "@/components/compat/Image"
import { Flame } from "lucide-react"
import { useState, useEffect } from "react"

export default function HeroSection() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  const images = [
    "/premium-burger-flame-grilled.png",
    "/gourmet-burger-deluxe.png",
    "/classic-burger-premium.png",
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % images.length)
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: {
      opacity: 0,
      y: 20,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: easeOut,
      },
    },
  }

  return (
    <section className="relative flex flex-col md:flex-row items-center justify-center overflow-hidden bg-[#faf8f5] pt-4 pb-10 md:pt-6 md:pb-12 min-h-[520px]>
      <div className="app-container relative z-10 px-6 md:px-10 w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-16 items-center min-h-[480px] lg:min-h-[580px]">

          {/* LEFT CONTENT */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-8 flex flex-col justify-center h-full text-center md:text-left"
          >

            {/* TITLE */}
            <motion.div
              variants={itemVariants}
              className="space-y-2"
            >
              <h1
                className="
                  font-brand
                  text-5xl
                  sm:text-6xl
                  md:text-7xl
                  lg:text-8xl
                  bg-gradient-to-r
                  from-yellow-500
                  via-amber-600
                  to-yellow-300
                  text-transparent
                  bg-clip-text
                  leading-tight
                  break-words
                "
              >
                Tasty
              </h1>

              <div className="flex gap-3 md:gap-4 items-center justify-center md:justify-start flex-wrap">

                {/* LINE */}
                <div
                  className="
                    h-1.5
                    w-12
                    sm:w-16
                    bg-gradient-to-r
                    from-primary
                    to-primary/50
                    rounded-full
                    shadow-lg
                    shadow-primary/30
                  "
                />

                {/* BURGERS TITLE */}
                <h1
                  className="
                    font-heading
                    text-5xl
                    sm:text-6xl
                    md:text-7xl
                    lg:text-8xl
                    font-bold
                    text-primary
                    leading-tight
                    break-words
                  "
                >
                  Burgers
                </h1>

              </div>
            </motion.div>

            {/* DESCRIPTION */}
            <motion.p
              variants={itemVariants}
              className="
                text-base
                sm:text-lg
                text-gray-800
                font-medium
                leading-relaxed
                max-w-lg
                mx-auto
                md:mx-0
              "
            >
              Every bite is a celebration of flavor and sophistication.
            </motion.p>

            {/* DESKTOP BUTTON */}
            <motion.div
              variants={itemVariants}
              className="
                hidden
                md:flex
                flex-row
                justify-start
                gap-4
                pt-2
                flex-nowrap
              "
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  href="/menu"
                  className="
                    gradient-click
                    inline-flex
                    items-center
                    gap-2
                    px-5
                    py-3
                    font-medium
                    rounded-lg
                    whitespace-nowrap
                    text-white
                  "
                >
                  <Flame className="w-5 h-5" />
                  Explore Menu
                </Link>
              </motion.div>
            </motion.div>

          </motion.div>

          {/* RIGHT IMAGE */}
          <motion.div
            initial={{
              opacity: 0,
              x: 50,
              scale: 0.8,
            }}
            animate={{
              opacity: 1,
              x: 0,
              scale: 1,
            }}
            transition={{
              duration: 0.8,
              delay: 0.3,
              ease: easeInOut,
            }}
            className="relative h-full flex justify-center items-center"
          >

            <div
              className="
                relative
                w-full
                max-w-[360px]
                sm:max-w-[420px]
                flex
                items-center
                justify-center
              "
            >

              {/* ROTATING CIRCLE */}
              <motion.div
                animate={{
                  rotate: 360,
                }}
                transition={{
                  duration: 20,
                  repeat: Infinity,
                  ease: "linear",
                }}
                className="
                  absolute
                  w-72
                  sm:w-96
                  h-72
                  sm:h-96
                  border-2
                  border-transparent
                  bg-gradient-to-r
                  from-primary/30
                  via-primary/10
                  to-transparent
                  rounded-full
                "
              />

              {/* GLOW */}
              <div
                className="
                  absolute
                  w-64
                  sm:w-80
                  h-64
                  sm:h-80
                  bg-gradient-to-br
                  from-primary/20
                  to-transparent
                  rounded-full
                  blur-3xl
                "
              />

              {/* BURGER IMAGE SLIDER */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentImageIndex}
                  initial={{
                    opacity: 0,
                    x: 100,
                  }}
                  animate={{
                    opacity: 1,
                    x: 0,
                    y: [0, -15, 0],
                  }}
                  exit={{
                    opacity: 0,
                    x: -100,
                  }}
                  transition={{
                    duration: 0.8,
                    ease: easeInOut,
                    y: {
                      duration: 4,
                      repeat: Infinity,
                      ease: easeInOut,
                    },
                  }}
                  className="relative"
                >
                  <Image
                    src={
                      images[currentImageIndex] ||
                      "/placeholder.svg"
                    }
                    alt={`Premium Burger ${currentImageIndex + 1}`}
                    width={700}
                    height={700}
                    className="
                      object-contain
                      drop-shadow-2xl
                      rounded-3xl
                      relative
                      z-10
                    "
                    priority
                  />
                </motion.div>
              </AnimatePresence>

              {/* IMAGE INDICATORS */}
              <div className="absolute bottom-3 flex gap-2 z-20">
                {images.map((_, index) => (
                  <motion.div
                    key={index}
                    className={`
                      h-2
                      rounded-full
                      transition-all
                      ${
                        index === currentImageIndex
                          ? "bg-primary w-6"
                          : "bg-primary/30 w-2"
                      }
                    `}
                    animate={{
                      scale:
                        index === currentImageIndex
                          ? 1
                          : 0.8,
                    }}
                  />
                ))}
              </div>

            </div>
          </motion.div>

        </div>

        {/* MOBILE BUTTON */}
        <motion.div
          className="
            flex
            md:hidden
            justify-center
            gap-4
            mt-6
          "
        >
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link
              href="/menu"
              className="
                gradient-click
                inline-flex
                items-center
                gap-2
                px-5
                py-3
                font-medium
                rounded-lg
                whitespace-nowrap
                text-white
              "
            >
              <Flame className="w-5 h-5" />
              Explore Menu
            </Link>
          </motion.div>
        </motion.div>

      </div>
    </section>
  )
}