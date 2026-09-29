"use client";

import SectionHeader from "@/components/section-header";
import { motion } from "framer-motion";
import { Truck, RotateCcw, ShoppingBag, Clock } from "lucide-react";
import Image from "@/components/compat/Image";

const services = [
  {
    icon: Truck,
    title: "Free Shipping",
    description: "Complimentary delivery on orders over ₱250",
  },
  {
    icon: RotateCcw,
    title: "Easy Returns",
    description: "Hassle-free returns within 30 minutes",
  },
  {
    icon: ShoppingBag,
    title: "Online Order",
    description: "Quick and convenient online ordering",
  },
  {
    icon: Clock,
    title: "24/7 Support",
    description: "Round-the-clock customer support",
  },
];

export default function ServicesSection() {
  return (
    <section className="py-20 md:py-24 relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute inset-0 overflow-hidden rounded-t-[40px]">
          <Image
            src="/services-section-background.jpg"
            alt="Services Background"
            fill
            className="object-cover"
            style={{ filter: "blur(2px)" }}
          />
          <div className="absolute inset-0 bg-black/40" />
          <div className="absolute top-0 right-1/4 w-96 h-96 bg-gradient-to-br from-primary/5 to-transparent rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-gradient-to-tl from-primary/5 to-transparent rounded-full blur-3xl" />
        </div>
      </div>

      {/* Content */}
      <div className="app-container relative z-10">
        <SectionHeader
          title="Excellent Services"
          description="We provide the best service to ensure your satisfaction"
        />

        {/* Services grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                viewport={{ once: true }}
                whileHover={{ y: -8 }}
                className="text-center p-6 rounded-xl bg-surface hover:shadow-lg transition-all duration-300"
              >
                <motion.div
                  whileHover={{ scale: 1.15, rotate: 5 }}
                  className="w-20 h-20 bg-gradient-to-br from-primary/20 to-primary/5 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg"
                >
                  <Icon className="w-10 h-10 text-primary" />
                </motion.div>
                <h3 className="font-bold text-lg mb-2 text-foreground">{service.title}</h3>
                <p className="text-muted text-sm leading-relaxed">{service.description}</p>
              </motion.div>
            );
          })}
        </div>

        {/* Promotional images */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            whileHover={{ y: -8 }}
            className="relative h-72 rounded-2xl overflow-hidden group cursor-pointer shadow-xl hover:shadow-2xl transition-all duration-300"
          >
            <Image
              src="/services-fast-food.jpg"
              alt="Best Fast Food Collection"
              fill
              className="object-cover group-hover:scale-110 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent flex items-end justify-start p-8 group-hover:from-black/70 transition-colors duration-300">
              <div className="text-white">
                <p className="text-sm font-semibold mb-2 opacity-90 text-background">Best Fast Food</p>
                <h3 className="text-3xl font-bold text-secondary">Collection</h3>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.5 }}
            viewport={{ once: true }}
            whileHover={{ y: -8 }}
            className="relative h-72 rounded-2xl overflow-hidden group cursor-pointer shadow-xl hover:shadow-2xl transition-all duration-300"
          >
            <Image
              src="/services-organic-beef.jpg"
              alt="Organic Beef & Fresh Food"
              fill
              className="object-cover group-hover:scale-110 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent flex items-end justify-start p-8 group-hover:from-black/70 transition-colors duration-300">
              <div className="text-white">
                <p className="text-sm font-semibold mb-2 opacity-90 text-secondary">Organic meat</p>
                <h3 className="text-3xl font-bold text-secondary">Fresh Food</h3>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
