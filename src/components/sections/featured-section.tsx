"use client";

import SectionHeader from "@/components/section-header";
import FoodCard from "@/components/food-card";
import { motion } from "framer-motion";
import { useRouter } from "@/components/compat/navigation";

const featuredItems = [
  {
    id: "1",
    image: "/featured-classic-burger.jpg",
    title: "Classic Cheeseburger",
    description:
      "Juicy beef patty with melted cheddar, fresh lettuce, and tomato",
    price: 249,
    rating: 4.8,
    category: "Burger",
  },
  {
    id: "2",
    image: "/featured-spicy-bacon.jpg",
    title: "Spicy Bacon Burger",
    description:
      "Crispy bacon, jalapeños, and spicy mayo on flame-grilled beef",
    price: 299,
    rating: 4.7,
    category: "Burger",
  },
  {
    id: "3",
    image: "/featured-mushroom-swiss.jpg",
    title: "Mushroom Swiss",
    description:
      "Sautéed mushrooms and Swiss cheese with garlic aioli",
    price: 329,
    rating: 4.9,
    category: "Burger",
  },
  {
    id: "4",
    price: 349,
    image: "/truffle-burger.jpg",
    title: "Truffle Delight",
    description: "Luxurious burger with truffle aioli, mushrooms, Swiss cheese, and caramelized garlic",
    rating: 4.9,
    category: "Burger"

  },
];

export default function FeaturedSection() {
  const router = useRouter();

  return (
    <section className="py-24 relative overflow-hidden scroll-mt-24">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 overflow-hidden rounded-[40px]">
          <img
            src="/featured-section-background.jpg"
            alt="Featured Section Background"
            className="w-full h-full object-cover"
            style={{ filter: "blur(2px)" }}
          />
          <div className="absolute inset-0 bg-black/40" />
          <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-primary/5 to-transparent rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-tl from-primary/5 to-transparent rounded-full blur-3xl" />
        </div>
      </div>

      <div className="app-container relative z-10">
        <SectionHeader
          subtitle="Our Selection"
          title="Featured Dishes"
          description="Handpicked favorites crafted with premium ingredients and culinary expertise"
        />

        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-12">
          {featuredItems.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              viewport={{ once: true }}
              onClick={() => router.push("/menu")}
              className="cursor-pointer"
            >
              <FoodCard {...item} />
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <p className="text-gray-200 mb-4">
            Discover more culinary masterpieces
          </p>
          <a
            href="/menu"
            className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-white rounded-lg font-semibold hover:bg-primary/90 transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-primary/20"
          >
            View Full Menu
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
          </a>
        </motion.div>
      </div>
    </section>
  );
}
