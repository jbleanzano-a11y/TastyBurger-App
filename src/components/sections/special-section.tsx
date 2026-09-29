"use client"

import Image from "@/components/compat/Image"
import Link from "@/components/compat/Link"
import { motion } from "framer-motion"

export default function SpecialSection() {
  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background */}
      {/*
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url(/about.jpg)",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/92 to-background/90" />
        <div className="absolute top-1/2 right-0 w-96 h-96 bg-gradient-to-l from-primary/5 to-transparent rounded-full blur-3xl" />
      </div>
      */}

      <div className="app-container relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Image */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative h-[500px] lg:h-[600px] w-full"
          >
            <div className="relative w-full h-full rounded-3xl overflow-hidden shadow-2xl group transition-shadow duration-300">
              <Image
                src="/special-grilled-chicken.jpg"
                alt="Special Burger"
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />

              <div className="absolute top-4 right-4 bg-primary text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg">
                Chef's Special
              </div>
            </div>
          </motion.div>

          {/* Right Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="flex flex-col justify-center h-full"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="h-1 w-8 bg-gradient-to-r from-primary to-primary/50 rounded-full" />

              <p className="font-bold text-primary uppercase tracking-widest text-2xl">
                About Us
              </p>
            </div>

            <h2 className="text-4xl lg:text-5xl font-bold mb-6 text-foreground leading-tight">
              Welcome to Tasty Burger
            </h2>

            <p className="text-lg text-gray-800 mb-6 leading-relaxed">
              Since 2020, we've been serving the finest burgers in the city. Our commitment to quality, fresh
              ingredients, and exceptional service has made us a favorite among food enthusiasts and connoisseurs.
            </p>

            <p className="text-lg text-gray-800 mb-8 leading-relaxed">
              Every burger is cooked with passion, flame-grilled to perfection, and served with pride. We believe in
              creating memorable dining experiences that celebrate the art of fine burger cuisine.
            </p>

            <Link
              href="/about"
              className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-white rounded-lg font-semibold hover:bg-primary/90 transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-primary/20"
            >
              Learn More

              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 7l5 5m0 0l-5 5m5-5H6"
                />
              </svg>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  )
}