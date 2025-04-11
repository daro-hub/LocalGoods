"use client"
import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"

// Category data with images
const categories = [
  {
    name: "Cheese",
    description: "Authentic Italian cheeses from artisanal producers",
    image: "https://images.unsplash.com/photo-1486297678162-eb2a19b0a32d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y2hlZXNlfGVufDB8MHwwfHx8MA%3D%3D",
    color: "from-yellow-300 to-yellow-500",
    icon: "",
  },
  {
    name: "Oils & Vinegars",
    description: "Premium olive oils and aged balsamic vinegars",
    image: "https://images.unsplash.com/photo-1652282565092-874e3a9c67b1?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8ODZ8fG9saXZlJTIwb2lsfGVufDB8MHwwfHx8MA%3D%3D",
    color: "",
    icon: "",
  },
  {
    name: "Pasta",
    description: "Handcrafted pasta in traditional and unique shapes",
    image: "https://images.unsplash.com/photo-1612966874574-e0a92ad2bc43?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NTh8fHBhc3RhfGVufDB8fDB8fHww",
    color: "from-amber-300 to-amber-500",
    icon: "",
  },
  {
    name: "Wine",
    description: "Fine wines from Italy's renowned wine regions",
    image: "https://plus.unsplash.com/premium_photo-1682097091093-dd18b37764a5?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8d2luZXxlbnwwfDB8MHx8fDA%3D",
    color: "from-red-300 to-red-600",
    icon: "",
  },
  {
    name: "Sweets",
    description: "Traditional Italian desserts and confections",
    image: "https://images.unsplash.com/photo-1486428128344-5413e434ad35?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8Y2FrZXxlbnwwfDB8MHx8fDA%3D",
    color: "from-pink-300 to-pink-500",
    icon: "",
  },
  {
    name: "Specialty",
    description: "Unique and rare Italian delicacies",
    image: "https://images.unsplash.com/photo-1509785307050-d4066910ec1e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8Y29mZmV8ZW58MHwwfDB8fHww",
    color: "from-brown-300 to-brown-600",
    icon: "",
  },
]

export default function CategoryCarousel() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)
  const carouselRef = useRef<HTMLDivElement>(null)
  const [visibleItems, setVisibleItems] = useState(3)
  const [autoplay, setAutoplay] = useState(true)
  const autoplayRef = useRef<NodeJS.Timeout | null>(null)

  // Handle responsive display
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setVisibleItems(1)
      } else if (window.innerWidth < 1024) {
        setVisibleItems(2)
      } else {
        setVisibleItems(3)
      }
    }

    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  // Autoplay functionality
  useEffect(() => {
    if (autoplay) {
      autoplayRef.current = setInterval(() => {
        nextSlide()
      }, 3000)
    }

    return () => {
      if (autoplayRef.current) {
        clearInterval(autoplayRef.current)
      }
    }
  }, [autoplay])

  const nextSlide = () => {
    if (isAnimating) return
    setIsAnimating(true)
    setActiveIndex((prev) => (prev + 1) % (categories.length - visibleItems + 1))
    setTimeout(() => setIsAnimating(false), 500)
  }

  const prevSlide = () => {
    if (isAnimating) return
    setIsAnimating(true)
    setActiveIndex((prev) => (prev === 0 ? 0 : prev - 1))
    setTimeout(() => setIsAnimating(false), 500)
  }

  const pauseAutoplay = () => setAutoplay(false)
  const resumeAutoplay = () => setAutoplay(true)

  return (
    <div className="relative py-8" onMouseEnter={pauseAutoplay} onMouseLeave={resumeAutoplay}>
      {/* Navigation Buttons */}
      <div className="absolute top-1/2 left-4 z-10 transform -translate-y-1/2">
        <Button
          variant="outline"
          size="icon"
          onClick={prevSlide}
          disabled={activeIndex === 0}
          className="rounded-full bg-white/80 backdrop-blur-sm hover:bg-white"
        >
          <ChevronLeft className="h-5 w-5" />
        </Button>
      </div>
      <div className="absolute top-1/2 right-4 z-10 transform -translate-y-1/2">
        <Button
          variant="outline"
          size="icon"
          onClick={nextSlide}
          disabled={activeIndex === categories.length - visibleItems}
          className="rounded-full bg-white/80 backdrop-blur-sm hover:bg-white"
        >
          <ChevronRight className="h-5 w-5" />
        </Button>
      </div>

      {/* Carousel Track */}
      <div ref={carouselRef} className="overflow-hidden">
        <motion.div
          className="flex gap-6"
          initial={false}
          animate={{ x: `-${activeIndex * (100 / visibleItems)}%` }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        >
          {categories.map((category, index) => (
            <motion.div
              key={index}
              className={`flex-shrink-0 w-full sm:w-1/2 lg:w-1/3`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
            >
              <Link href="/products" className="block">
                <div className="relative h-80 rounded-2xl overflow-hidden group">
                  {/* Background Image with Overlay */}
                  <Image
                    src={category.image || "/placeholder.svg"}
                    alt={category.name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${category.color} opacity-70 mix-blend-multiply`}
                  />

                  {/* Content */}
                  <div className="absolute inset-0 p-8 flex flex-col justify-between">
                    <div className="text-6xl">{category.icon}</div>
                    <div>
                      <h3 className="text-3xl font-bold text-white mb-2">{category.name}</h3>
                      <p className="text-white/90">{category.description}</p>

                      {/* Animated Arrow */}
                      <motion.div
                        className="mt-4 inline-block"
                        initial={{ x: 0 }}
                        whileHover={{ x: 10 }}
                        transition={{ type: "spring", stiffness: 400, damping: 10 }}
                      >
                        <span className="text-white font-medium flex items-center">
                          Explore
                          <svg
                            className="w-5 h-5 ml-2"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M14 5l7 7m0 0l-7 7m7-7H3"
                            />
                          </svg>
                        </span>
                      </motion.div>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Pagination Dots */}
      <div className="flex justify-center mt-6 space-x-2">
        {Array.from({ length: categories.length - visibleItems + 1 }).map((_, index) => (
          <button
            key={index}
            onClick={() => setActiveIndex(index)}
            className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
              activeIndex === index ? "bg-green-500 w-8" : "bg-gray-300 hover:bg-gray-400"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  )
}
