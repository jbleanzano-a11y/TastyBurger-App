"use client";

import { useState, useEffect } from "react";
import Image from "@/components/compat/Image";
import { motion } from "framer-motion";
import { Eye } from "lucide-react";
import GalleryDetailsModal from "@/components/gallery-details-modal";

interface GalleryItem {
  id: string;
  title: string;
  image: string;
  description: string;
  category: string;
  price: number;
}

export default function GallerySection() {
  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>([]);
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadGalleryData = async () => {
      try {
        const response = await fetch("/data/gallery.json");
        const data = await response.json();
        setGalleryItems(data.items);
        setLoading(false);
      } catch (error) {
        console.error("Failed to load gallery data:", error);
        setLoading(false);
      }
    };
    loadGalleryData();
  }, []);

  const handleImageClick = (item: GalleryItem) => {
    setSelectedItem(item);
    setIsModalOpen(true);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.06,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.4 },
    },
  };

  if (loading) {
    return (
      <section className="py-24 relative overflow-hidden scroll-mt-24">
        <div className="absolute inset-0">
          <div className="absolute inset-0 overflow-hidden rounded-b-[80px]">
            <Image
              src="/gallery-background.jpg"
              alt="Gallery Background"
              fill
              className="object-cover"
              style={{ filter: "blur(2px)" }} // subtle blur
            />
            <div className="absolute inset-0 bg-black/40" /> {/* lighter overlay */}
          </div>
        </div>
        <div className="app-container relative z-10">
          <h2 className="section-title mb-12 text-white">Our Burger Gallery</h2>
          <div className="text-center text-gray-200">Loading gallery...</div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background with curve and subtle blur */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 overflow-hidden rounded-b-[40px]">
          <Image
            src="/gallery-background.jpg"
            alt="Gallery Background"
            fill
            className="object-cover"
            style={{ filter: "blur(2px)" }} // subtle blur
          />
          <div className="absolute inset-0 bg-black/40" /> {/* lighter overlay */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-primary/5 to-transparent rounded-full blur-3xl" />
        </div>
      </div>

      <div className="app-container relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="section-title text-white">Our Burger Gallery</h2>
          <p className="section-subtitle text-gray-200">
            Explore our culinary masterpieces in stunning detail
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4"
        >
          {galleryItems.map((item) => (
            <motion.div
              key={item.id}
              variants={itemVariants}
              className="relative h-48 rounded-xl overflow-hidden group cursor-pointer shadow-lg hover:shadow-2xl transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              onClick={() => handleImageClick(item)}
            >
              <Image
                src={item.image || "/placeholder.svg"}
                alt={item.title}
                fill
                className="object-cover group-hover:scale-125 transition-transform duration-500"
              />
              <motion.div
                initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
                whileHover={{ opacity: 1, backdropFilter: "blur(4px)" }}
                className="absolute inset-0 bg-black/40 flex items-center justify-center transition-all duration-300"
              >
                <motion.div
                  whileHover={{ scale: 1.2 }}
                  className="flex flex-col items-center gap-2"
                >
                  <Eye className="w-8 h-8 text-white" />
                  <span className="text-xs text-white font-semibold">{item.title}</span>
                </motion.div>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      <GalleryDetailsModal
        item={selectedItem}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </section>
  );
}
