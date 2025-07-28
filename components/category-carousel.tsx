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
    image: "https://images.unsplash.com/photo-1486428128344-5413e434ad35?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8Y2FrZXxlbnwwfDB8MHx8fDA%3D%3D",
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
  const [rotation, setRotation] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)
  const [autoplay, setAutoplay] = useState(true)
  const autoplayRef = useRef<NodeJS.Timeout | null>(null)

  // Autoplay functionality
  useEffect(() => {
    if (autoplay) {
      autoplayRef.current = setInterval(() => {
        nextRotation()
      }, 3000)
    }

    return () => {
      if (autoplayRef.current) {
        clearInterval(autoplayRef.current)
      }
    }
  }, [autoplay])

  const nextRotation = () => {
    if (isAnimating) return
    setIsAnimating(true)
    setRotation((prev) => {
      const newRotation = Math.round(prev + 60)
      return newRotation
    })
    setTimeout(() => setIsAnimating(false), 500)
  }

  const prevRotation = () => {
    if (isAnimating) return
    setIsAnimating(true)
    setRotation((prev) => {
      const newRotation = Math.round(prev - 60)
      return newRotation
    })
    setTimeout(() => setIsAnimating(false), 500)
  }

  const pauseAutoplay = () => setAutoplay(false)
  const resumeAutoplay = () => setAutoplay(true)

  return (
    <div className="relative py-4" onMouseEnter={pauseAutoplay} onMouseLeave={resumeAutoplay}>
      {/* Navigation Buttons */}
      <div className="absolute top-1/2 left-4 z-10 transform -translate-y-1/2">
        <Button
          variant="outline"
          size="icon"
          onClick={prevRotation}
          className="rounded-full bg-white/80 backdrop-blur-sm hover:bg-white"
        >
          <ChevronLeft className="h-5 w-5" />
        </Button>
      </div>
      <div className="absolute top-1/2 right-4 z-10 transform -translate-y-1/2">
        <Button
          variant="outline"
          size="icon"
          onClick={nextRotation}
          className="rounded-full bg-white/80 backdrop-blur-sm hover:bg-white"
        >
          <ChevronRight className="h-5 w-5" />
        </Button>
      </div>

      {/* Circular Carousel Container */}
      <div className="relative w-full h-[400px] flex items-end justify-center">
        <motion.div
          className="relative w-[600px] h-[600px] -mb-[400px]"
          animate={{ rotate: rotation }}
          transition={{ type: "spring", stiffness: 100, damping: 20 }}
        >
          {categories.map((category, index) => {
            // Start from -90 degrees (top) and space evenly
            const angle = ((index * 60) - 90) * (Math.PI / 180) // Convert to radians, start from top
            const radius = 280 // Distance from center
            const x = Math.round(Math.cos(angle) * radius)
            const y = Math.round(Math.sin(angle) * radius)
            
            // Calculate which card should be larger based on current rotation
            // The card at the top center position should be larger
            const cardAngle = ((index * 60) - 90 + rotation) % 360
            const isTopCenter = Math.abs(cardAngle) < 30 || Math.abs(cardAngle - 360) < 30
            const cardSize = isTopCenter ? 64 : 48 // 256px vs 192px
            const cardOffset = isTopCenter ? 128 : 96 // Half of card size

            return (
              <motion.div
                key={index}
                className={`absolute ${isTopCenter ? 'w-64 h-64' : 'w-48 h-48'}`}
                style={{
                  left: `calc(50% + ${x}px - ${cardOffset}px)`,
                  top: `calc(50% + ${y}px - ${cardOffset}px)`,
                }}
                initial={false}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
              >
                <Link href="/products" className="block">
                  <motion.div 
                    className={`relative rounded-full overflow-hidden group cursor-pointer ${isTopCenter ? 'h-64 w-64' : 'h-48 w-48'}`}
                    animate={{ rotate: -rotation }}
                    transition={{ type: "spring", stiffness: 100, damping: 20 }}
                  >
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
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-8">
                      <h3 className={`font-bold text-white mb-4 leading-tight ${isTopCenter ? 'text-2xl' : 'text-lg'}`}>{category.name}</h3>
                      <p className={`text-white/90 leading-tight hidden group-hover:block ${isTopCenter ? 'text-lg' : 'text-sm'}`}>
                        {category.description}
                      </p>
                    </div>

                    {/* Hover Effect */}
                    <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </motion.div>
                </Link>
              </motion.div>
            )
          })}
        </motion.div>

        {/* Center Element */}
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 z-10 -mb-[100px]">
          <div className="w-32 h-32 rounded-full bg-green-500/20 backdrop-blur-sm flex items-center justify-center border-2 border-green-300/30">
            <div className="text-center">
              <div className="text-green-600 font-bold text-base">LocalGoods</div>
              <div className="text-green-500 text-sm">Explore</div>
            </div>
          </div>
        </div>
      </div>

    </div>
  )
}
