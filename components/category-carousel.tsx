"use client"
import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react"
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
    color: "from-green-300 to-green-500",
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

interface CategoryCarouselProps {
  onActiveCategoryChange?: (category: any, bgColor: string) => void
}

export default function CategoryCarousel({ onActiveCategoryChange }: CategoryCarouselProps) {
  const [rotation, setRotation] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)
  const [autoplay, setAutoplay] = useState(true)
  const autoplayRef = useRef<NodeJS.Timeout | null>(null)
  const [activeCategory, setActiveCategory] = useState(categories[0])
  const [carouselSize, setCarouselSize] = useState(500)
  const [elementSize, setElementSize] = useState(160)

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

  // Update active category based on rotation
  useEffect(() => {
    const normalizedRotation = ((rotation % 360) + 360) % 360
    const topCenterIndex = (6 - Math.round(normalizedRotation / 60)) % 6
    const newActiveCategory = categories[topCenterIndex]
    setActiveCategory(newActiveCategory)
    
    // Notify parent component about the change
    if (onActiveCategoryChange) {
      const bgColor = newActiveCategory.color || 'from-gray-100 to-gray-200'
      // Convert Tailwind classes to CSS gradient
      const gradientMap: { [key: string]: string } = {
        'from-yellow-300 to-yellow-500': 'linear-gradient(135deg, #fde047, #eab308)',
        'from-green-300 to-green-500': 'linear-gradient(135deg, #86efac, #22c55e)',
        'from-amber-300 to-amber-500': 'linear-gradient(135deg, #fcd34d, #f59e0b)',
        'from-red-300 to-red-600': 'linear-gradient(135deg, #fca5a5, #dc2626)',
        'from-pink-300 to-pink-500': 'linear-gradient(135deg, #f9a8d4, #ec4899)',
        'from-brown-300 to-brown-600': 'linear-gradient(135deg, #d4a574, #92400e)',
        'from-gray-100 to-gray-200': 'linear-gradient(135deg, #f3f4f6, #e5e7eb)'
      }
      const cssGradient = gradientMap[bgColor] || gradientMap['from-gray-100 to-gray-200']
      onActiveCategoryChange(newActiveCategory, cssGradient)
    }
  }, [rotation, onActiveCategoryChange])

  // Calculate dynamic sizes based on screen width
  useEffect(() => {
    const updateSizes = () => {
      const screenWidth = window.innerWidth
      const screenHeight = window.innerHeight
      
      // Calculate carousel size (80% of viewport width, max 500px)
      const newCarouselSize = Math.min(screenWidth * 0.8, 500)
      setCarouselSize(newCarouselSize)
      
      // Calculate element size (proportional to carousel size)
      const newElementSize = Math.min(newCarouselSize * 0.32, 160) // 32% of carousel size, max 160px
      setElementSize(newElementSize)
    }

    updateSizes()
    window.addEventListener('resize', updateSizes)
    
    return () => window.removeEventListener('resize', updateSizes)
  }, [])

  const pauseAutoplay = () => setAutoplay(false)
  const resumeAutoplay = () => setAutoplay(true)

  return (
    <div className="flex items-center gap-16 h-full w-full">
      {/* Carousel - Left side */}
      <div className="w-1/2 relative overflow-y-hidden pl-12 pr-8" style={{ height: '600px' }}>
        {/* Navigation Buttons */}
        <Button
          variant="outline"
          size="icon"
          onClick={prevRotation}
          className="absolute top-1/2 left-4 z-10 rounded-full bg-white/80 backdrop-blur-sm hover:bg-white"
        >
          <ChevronLeft className="h-5 w-5" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          onClick={nextRotation}
          className="absolute top-1/2 right-4 z-10 rounded-full bg-white/80 backdrop-blur-sm hover:bg-white"
        >
          <ChevronRight className="h-5 w-5" />
        </Button>

        {/* Carousel positioned at bottom */}
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2">
          <div className="relative w-[80vw] h-[80vw] max-w-[500px] max-h-[500px] rounded-full border-4 border-dashed border-gray-300">
            <motion.div
              className="relative w-full h-full"
              animate={{ rotate: rotation }}
              transition={{ type: "spring", stiffness: 100, damping: 20 }}
            >
              {categories.map((category, index) => {
                const angle = ((index * 60) - 90) * (Math.PI / 180)
                const radius = carouselSize * 0.4 // 40% of carousel size
                const x = Math.round(Math.cos(angle) * radius)
                const y = Math.round(Math.sin(angle) * radius)

                const normalizedRotation = ((rotation % 360) + 360) % 360
                const topCenterIndex = (6 - Math.round(normalizedRotation / 60)) % 6
                const isTopCenter = index === topCenterIndex

                                  return (
                    <motion.div
                      key={index}
                      className="absolute"
                      style={{
                        width: `${elementSize}px`,
                        height: `${elementSize}px`,
                        left: `calc(50% + ${x}px - ${elementSize/2}px)`,
                        top: `calc(50% + ${y}px - ${elementSize/2}px)`,
                      }}
                    initial={false}
                    animate={{ 
                      opacity: 1, 
                      scale: isTopCenter ? 1.3 : 1,
                      zIndex: isTopCenter ? 10 : 1
                    }}
                    transition={{ duration: 0.3 }}
                  >
                                          <Link href="/products" className="block">
                        <motion.div 
                          className={`relative rounded-full overflow-hidden group cursor-pointer ${
                            isTopCenter ? 'shadow-2xl' : 'shadow-lg'
                          }`}
                                                    style={{
                            width: `${elementSize}px`,
                            height: `${elementSize}px`,
                            filter: 'drop-shadow(0 8px 16px rgba(0, 0, 0, 0.6))'
                          }}
                        animate={{ rotate: -rotation }}
                        transition={{ type: "spring", stiffness: 100, damping: 20 }}
                      >
                        <Image
                          src={category.image || "/placeholder.svg"}
                          alt={category.name}
                          fill
                          className="object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                        <div
                          className={`absolute inset-0 bg-gradient-to-br ${category.color} opacity-70 mix-blend-multiply`}
                        />
                        <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-2">
                          <h3 className="text-sm font-bold text-white mb-1 leading-tight">{category.name}</h3>
                          <p className="text-xs text-white/90 leading-tight hidden group-hover:block">
                            {category.description}
                          </p>
                        </div>
                        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      </motion.div>
                    </Link>
                  </motion.div>
                )
              })}
            </motion.div>

            {/* Center Element */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
              <Link href="/products" className="block">
                <div className="w-24 h-24 rounded-full bg-green-500/20 backdrop-blur-sm flex items-center justify-center border-2 border-green-300/30 hover:bg-green-500/30 transition-colors cursor-pointer">
                  <div className="text-center">
                    <div className="text-green-600 font-bold text-sm">LocalGoods</div>
                    <div className="text-green-500 text-xs">Explore</div>
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Card - Right side */}
      <div className="w-1/2 h-80 flex items-center justify-end">
        <motion.div
          key={activeCategory.name}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-transparent rounded-2xl p-8 shadow-2xl border-4 border-dashed border-gray-300 w-full h-full flex items-center"
          style={{
            filter: 'drop-shadow(0 10px 20px rgba(0, 0, 0, 0.6))'
          }}
        >
          <div className="flex items-center gap-6">
            <div className="relative w-24 h-24 rounded-full overflow-hidden flex-shrink-0">
              <Image
                src={activeCategory.image || "/placeholder.svg"}
                alt={activeCategory.name}
                fill
                className="object-cover"
              />
              <div className={`absolute inset-0 bg-gradient-to-br ${activeCategory.color} opacity-70 mix-blend-multiply`} />
            </div>
            <div className="flex-1">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">{activeCategory.name}</h3>
              <p className="text-gray-600 leading-relaxed">{activeCategory.description}</p>
              <Button className="mt-4 bg-green-600 hover:bg-green-700 text-white" asChild>
                <Link href="/products">
                  Explore {activeCategory.name}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
