"use client"

import type React from "react"

import Image from "@/components/compat/Image"
import { motion } from "framer-motion"
// Assuming SectionHeader is in a components folder relative to this file
// As this is a single file, we'll define a placeholder component
// import SectionHeader from "@/components/section-header"
import { Award, Users, Heart, Flame } from "lucide-react"
import Link from "@/components/compat/Link"
import { useRouter } from "@/components/compat/navigation"
import { useEffect, useRef, useState, useCallback } from "react"

// Placeholder for SectionHeader as it's not defined in the provided snippet
const SectionHeader = ({ title, description }: { title: string; description: string }) => (
  <div className="text-center mb-12">
    <h2 className="text-4xl font-bold mb-4 text-foreground">{title}</h2>
    <p className="text-lg text-gray-800 max-w-2xl mx-auto">{description}</p>
  </div>
)

const chefs = [
  {
    name: "Chef Chiikawa",
    role: "Head Chef",
    image: "/headchef.jpg",
    bio: "20+ years of culinary excellence",
  },
  {
    name: "Chef Jubelle",
    role: "Pastry Chef",
    image: "/PastryChef.jpg",
    bio: "Award-winning dessert specialist",
  },
  {
    name: "Chef Mike",
    role: "Grill Master",
    image: "/GrillMaster.jpg",
    bio: "Expert in flame-grilled perfection",
  },
]

const values = [
  {
    icon: Heart,
    title: "Quality",
    description: "We use only the finest, freshest ingredients in every dish",
  },
  {
    icon: Users,
    title: "Community",
    description: "We believe in building lasting relationships with our customers",
  },
  {
    icon: Award,
    title: "Excellence",
    description: "We strive for perfection in every aspect of our service",
  },
]

const signatureDishes = [
  {
    name: "The Ultimate Burger",
    description: "Our signature burger with premium beef, aged cheddar, caramelized onions, and special sauce",
    price: "₱599",
    image: "/premium-burger.jpg",
    highlights: ["Prime Beef", "Aged Cheddar", "Special Sauce"],
  },
  {
    name: "Spicy Inferno",
    description: "A fiery creation with ghost pepper mayo, jalapeños, crispy bacon, and pepper jack cheese",
    price: "₱549",
    image: "/spicy-burger.jpg",
    highlights: ["Ghost Pepper", "Crispy Bacon", "Pepper Jack"],
  },
  {
    name: "Truffle Delight",
    description: "Luxurious burger with truffle aioli, mushrooms, Swiss cheese, and caramelized garlic",
    price: "₱649",
    image: "/truffle-burger.jpg",
    highlights: ["Truffle Aioli", "Wild Mushrooms", "Swiss Cheese"],
  },
  {
    name: "Classic Cheeseburger",
    description: "Timeless favorite with melted American cheese, pickles, onions, and our signature sauce",
    price: "₱449",
    image: "/classic-cheeseburger-with-lettuce-tomato.jpg",
    highlights: ["American Cheese", "Pickles", "Signature Sauce"],
  },
  {
    name: "Bacon Bliss",
    description: "Crispy bacon, cheddar cheese, bacon jam, and smoky mayo on a toasted bun",
    price: "₱529",
    image: "/bacon-burger.jpg",
    highlights: ["Crispy Bacon", "Bacon Jam", "Smoky Mayo"],
  },
    {
    name: "Mushroom Magic",
    description: "Sautéed mushrooms, caramelized onions, Swiss cheese, and garlic aioli on a brioche bun",
    price: "₱579",
    image: "/mushroom-burger.jpg",
    highlights: ["Sautéed Mushrooms", "Garlic Aioli", "Swiss Cheese"],
  },
  {
    name: "BBQ Rancher",
    description: "Grilled beef patty, cheddar, onion rings, smoky BBQ sauce, and ranch dressing",
    price: "₱599",
    image: "/bbq-rancher-burger.jpg",
    highlights: ["Onion Rings", "BBQ Sauce", "Ranch Dressing"],
  },
  {
    name: "Veggie Supreme",
    description: "Grilled veggie patty, avocado, lettuce, tomato, and vegan mayo on whole grain bun",
    price: "₱499",
    image: "/veggie-burger.jpg",
    highlights: ["Avocado", "Grilled Veggies", "Vegan Mayo"],
  }
]

// Constants
const FRICTION = 0.95; // Decay factor for momentum
const AUTO_SCROLL_SPEED = 0.3; // Speed for auto-scrolling
const TOUCH_SMOOTHING = 0.1; // Smoothing factor for touch velocity

export default function AboutContent() {
  const router = useRouter()
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const innerContainerRef = useRef<HTMLDivElement>(null)

  // State to manage auto-scroll behavior
  const [isAutoScrolling, setIsAutoScrolling] = useState(true);

  // Refs to store animation state without causing re-renders
  const positionRef = useRef(0); // Current scroll position
  const velocityRef = useRef(0); // Current velocity for momentum
  const isDraggingRef = useRef(false); // Whether the user is currently dragging
  const dragStartRef = useRef({ x: 0, pos: 0 }); // Starting position of a drag
  const animationFrameRef = useRef<number | null>(null); // ID of the requestAnimationFrame
  const itemWidthRef = useRef(0); // Width of a single item + gap
  const totalWidthRef = useRef(0); // Total width of all *original* items

  // Calculate widths and set up the animation loop
  useEffect(() => {
    const innerContainer = innerContainerRef.current
    if (!innerContainer || signatureDishes.length === 0) return

    // Calculate dimensions
    // Assuming all items are the same width, based on the first child
    const firstItem = innerContainer.children[0] as HTMLElement;
    if (!firstItem) return;

    const itemStyle = window.getComputedStyle(firstItem);
    const itemMargin = parseFloat(itemStyle.marginRight) || 32; // Fallback to gap-8 (32px)
    const itemWidth = firstItem.offsetWidth + itemMargin;
    
    itemWidthRef.current = itemWidth;
    totalWidthRef.current = itemWidth * signatureDishes.length;

    const loopWidth = totalWidthRef.current;

    // The animation loop
    const animate = () => {
      if (!innerContainer) {
        animationFrameRef.current = requestAnimationFrame(animate);
        return;
      }
        
      if (isDraggingRef.current) {
        // While dragging, velocity is set directly by move events, so we just apply friction
        velocityRef.current *= FRICTION;
      } else if (isAutoScrolling) {
        // Auto-scrolling
        velocityRef.current = AUTO_SCROLL_SPEED;
      } else {
        // Coasing with momentum
        velocityRef.current *= FRICTION;
        // Stop animation if velocity is negligible
        if (Math.abs(velocityRef.current) < 0.01) {
          velocityRef.current = 0;
        }
      }

      // Update position
      positionRef.current += velocityRef.current;

      // Infinite loop logic
      // Wrap around to the beginning if scrolled past the end
      if (positionRef.current >= loopWidth) {
        positionRef.current -= loopWidth;
      }
      // Wrap around to the end if scrolled past the beginning
      if (positionRef.current < 0) {
        positionRef.current += loopWidth;
      }

      // Apply the transform
      innerContainer.style.transform = `translateX(-${positionRef.current}px)`;

      // Continue the loop
      animationFrameRef.current = requestAnimationFrame(animate);
    }

    // Start the animation
    animate();

    // Cleanup function to cancel the animation frame
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    }
  }, [isAutoScrolling]); // Re-run effect if isAutoScrolling changes

  // --- Event Handlers ---

  const handleDragStart = (clientX: number) => {
    isDraggingRef.current = true;
    setIsAutoScrolling(false); // Stop auto-scroll on user interaction
    velocityRef.current = 0; // Stop any existing momentum
    dragStartRef.current = {
      x: clientX,
      pos: positionRef.current,
    };
    // Add cursor grabbing style
    if(scrollContainerRef.current) {
        scrollContainerRef.current.style.cursor = 'grabbing';
    }
  };

  const handleDragMove = (clientX: number) => {
    if (!isDraggingRef.current) return;

    const delta = dragStartRef.current.x - clientX;
    const newPos = dragStartRef.current.pos + delta;

    // Calculate velocity based on this single move event
    // This gives the "throw" effect
    velocityRef.current = newPos - positionRef.current;
    
    // Update position directly
    positionRef.current = newPos;
  };
  
  const handleTouchMove = (clientX: number) => {
    if (!isDraggingRef.current) return;

    const delta = dragStartRef.current.x - clientX;
    const newPos = dragStartRef.current.pos + delta;

    // For touch, we smooth the velocity calculation
    const currentVelocity = newPos - positionRef.current;
    velocityRef.current = (velocityRef.current * (1 - TOUCH_SMOOTHING)) + (currentVelocity * TOUCH_SMOOTHING);

    positionRef.current = newPos;
  };

  const handleDragEnd = () => {
    isDraggingRef.current = false;
    // Remove cursor grabbing style
    if(scrollContainerRef.current) {
        scrollContainerRef.current.style.cursor = 'grab';
    }
    // Auto-resume auto-scrolling after a delay
    setTimeout(() => {
      // Only resume if not dragging again
      if (!isDraggingRef.current) {
        setIsAutoScrolling(true);
      }
    }, 3000); // 3-second delay before resuming auto-scroll
  };

  // Mouse Events
  const onMouseDown = (e: React.MouseEvent) => handleDragStart(e.clientX);
  const onMouseMove = (e: React.MouseEvent) => handleDragMove(e.clientX);
  const onMouseUp = () => handleDragEnd();
  const onMouseLeave = () => {
    // If user was dragging and leaves, end the drag
    if (isDraggingRef.current) {
      handleDragEnd();
    }
    // Always resume auto-scrolling when mouse leaves
    setIsAutoScrolling(true);
  };
  const onMouseEnter = () => {
    // Pause auto-scrolling when mouse enters
    setIsAutoScrolling(false);
  };

  // Touch Events
  const onTouchStart = (e: React.TouchEvent) => handleDragStart(e.touches[0].clientX);
  const onTouchMove = (e: React.TouchEvent) => handleTouchMove(e.touches[0].clientX);
  const onTouchEnd = () => handleDragEnd();


  const handleOrderNow = (dishName: string) => {
    router.push(`/menu?dish=${encodeURIComponent(dishName)}`)
  }

  // Fallback image handler
  const addImageFallback = (event: React.SyntheticEvent<HTMLImageElement, Event>) => {
    event.currentTarget.src = 'https://placehold.co/400x300/f97316/white?text=Burger';
  };

  return (
    <div className="min-h-screen bg-background">
      <section className="py-16 md:py-20 bg-gradient-to-r from-primary/10 to-accent/10 relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            animate={{ y: [0, 20, 0] }}
            transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY }}
            className="absolute top-10 right-20 w-64 h-64 bg-primary/10 rounded-full blur-3xl"
          />
        </div>
        <div className="app-container relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <h1 className="text-6xl font-bold mb-4 text-balance text-primary">About Tasty Burger</h1>
            <p className="text-xl text-gray-800 max-w-2xl">
              Crafting exceptional burgers and unforgettable dining experiences since 2026
            </p>
          </motion.div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20">
        <div className="app-container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="relative h-96"
            >
              <Image
                src="/delicious-flame-grilled-burger-with-fresh-ingredie.jpg"
                alt="Our Story"
                fill
                className="object-cover rounded-xl shadow-lg"
                onError={addImageFallback}
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl font-bold mb-6 text-foreground">Our Story</h2>
              <p className="text-lg text-gray-800 mb-4 leading-relaxed">
                Founded in 2026, Tasty Burger started as a small family-owned restaurant with a passion for creating the
                perfect burger. What began as a dream has grown into a beloved destination for burger enthusiasts across
                the city.
              </p>
              <p className="text-lg text-gray-800 mb-4 leading-relaxed">
                We believe in using only the freshest, highest-quality ingredients. Every burger is crafted with care,
                flame-grilled to perfection, and served with pride. Our commitment to excellence has made us a favorite
                among locals and visitors alike.
              </p>
              <p className="text-lg text-gray-800 leading-relaxed">
                Today, we continue to innovate while staying true to our roots, bringing you the best burgers and dining
                experience possible.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-surface overflow-hidden">
        <div className="app-container">
          <SectionHeader
            title="Our Signature Dishes"
            description="Handcrafted burgers that define our culinary excellence"
          />

          {/* Infinite Scroll Container */}
          <div className="relative">
            <div
              ref={scrollContainerRef}
              className="overflow-hidden cursor-grab"
              onMouseDown={onMouseDown}
              onMouseMove={onMouseMove}
              onMouseUp={onMouseUp}
              onMouseLeave={onMouseLeave}
              onMouseEnter={onMouseEnter}
              onTouchStart={onTouchStart}
              onTouchMove={onTouchMove}
              onTouchEnd={onTouchEnd}
            >
              <div
                ref={innerContainerRef}
                className="flex gap-8 pb-4"
                style={{
                  willChange: "transform", // Hint to browser for transform optimization
                  transform: "translateX(0px)",
                }}
              >
                {/* Original items */}
                {signatureDishes.map((dish, index) => (
                  <motion.div
                    key={`original-${index}`}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.5 }}
                    viewport={{ once: true }}
                    className="flex-shrink-0 w-full sm:w-96 bg-background rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow"
                  >
                    <div className="relative h-64 overflow-hidden">
                      <Image
                        src={dish.image || "/placeholder.svg"}
                        alt={dish.name}
                        fill
                        className="object-cover hover:scale-110 transition-transform duration-300"
                        onError={addImageFallback}
                      />
                      <div className="absolute top-4 right-4 bg-primary text-white px-4 py-2 rounded-full font-bold">
                        {dish.price}
                      </div>
                    </div>

                    <div className="p-6">
                      <div className="flex items-center gap-2 mb-3">
                        <Flame className="w-5 h-5 text-primary" />
                        <h3 className="text-xl font-bold text-foreground">{dish.name}</h3>
                      </div>

                      <div className="flex flex-wrap gap-2 mb-6">
                        {dish.highlights.map((highlight, i) => (
                          <span
                            key={i}
                            className="px-3 py-1 bg-primary/10 text-primary text-xs font-semibold rounded-full"
                          >
                            {highlight}
                          </span>
                        ))}
                      </div>

                      <motion.button
                        onClick={() => handleOrderNow(dish.name)}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="w-full px-4 py-2 bg-primary text-white rounded-lg font-semibold hover:bg-primary-dark transition-colors"
                      >
                        Order Now
                      </motion.button>
                    </div>
                  </motion.div>
                ))}

                {/* Duplicated items for infinite scroll effect */}
                {signatureDishes.map((dish, index) => (
                  <motion.div
                    key={`duplicate-${index}`}
                    className="flex-shrink-0 w-full sm:w-96 bg-background rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow"
                    aria-hidden="true" // Hide duplicates from screen readers
                  >
                    <div className="relative h-64 overflow-hidden">
                      <Image
                        src={dish.image || "/placeholder.svg"}
                        alt={dish.name}
                        fill
                        className="object-cover hover:scale-110 transition-transform duration-300"
                        onError={addImageFallback}
                      />
                      <div className="absolute top-4 right-4 bg-primary text-white px-4 py-2 rounded-full font-bold">
                        {dish.price}
                      </div>
                    </div>

                    <div className="p-6">
                      <div className="flex items-center gap-2 mb-3">
                        <Flame className="w-5 h-5 text-primary" />
                        <h3 className="text-xl font-bold text-foreground">{dish.name}</h3>
                      </div>

                      <div className="flex flex-wrap gap-2 mb-6">
                        {dish.highlights.map((highlight, i) => (
                          <span
                            key={i}
                            className="px-3 py-1 bg-primary/10 text-primary text-xs font-semibold rounded-full"
                          >
                            {highlight}
                          </span>
                        ))}
                      </div>

                      <motion.button
                        onClick={() => handleOrderNow(dish.name)}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="w-full px-4 py-2 bg-primary text-white rounded-lg font-semibold hover:bg-primary-dark transition-colors"
                      >
                        Order Now
                      </motion.button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Gradient overlays for smooth infinite scroll effect */}
            <div className="absolute left-0 top-0 bottom-0 w-12 bg-gradient-to-r from-surface to-transparent pointer-events-none z-10" />
            <div className="absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-surface to-transparent pointer-events-none z-10" />
          </div>

          {/* Mobile scroll indicator */}
          <div className="mt-6 text-center text-sm text-gray-800 sm:hidden">Swipe to see more dishes</div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20">
        <div className="app-container">
          <SectionHeader title="Our Values" description="What drives us every day" />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {values.map((value, index) => {
              const Icon = value.icon
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  viewport={{ once: true }}
                  className="text-center"
                >
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4"
                  >
                    <Icon className="w-8 h-8 text-primary" />
                  </motion.div>
                  <h3 className="font-bold text-lg mb-2">{value.title}</h3>
                  <p className="text-gray-800">{value.description}</p>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Chefs Section */}
      <section className="py-20 bg-surface">
        <div className="app-container">
          <SectionHeader title="Our Team" description="Meet the talented chefs behind our delicious burgers" />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {chefs.map((chef, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="relative h-64 mb-4 rounded-xl overflow-hidden">
                  <Image src={chef.image || "/placeholder.svg"} alt={chef.name} fill className="object-cover" onError={addImageFallback} />
                </div>
                <h3 className="font-bold text-lg">{chef.name}</h3>
                <p className="text-primary font-semibold mb-2">{chef.role}</p>
                <p className="text-gray-800">{chef.bio}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary/10 to-accent/10">
        <div className="app-container text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="text-4xl font-bold mb-6 text-foreground">Ready to Experience Excellence?</h2>
            <p className="text-lg text-gray-800 mb-8 max-w-2xl mx-auto">
              Visit us today and discover why Tasty Burger is the favorite choice for burger lovers everywhere.
            </p>
            <Link
              href="/menu"
              className="inline-block px-8 py-3 bg-primary text-white rounded-lg font-semibold hover:bg-primary-dark transition-colors"
            >
              Order Now
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  )
}