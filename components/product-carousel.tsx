"use client"
import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { ChevronLeft, ChevronRight, ShoppingBag } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

// Sample product data
const products = [
  {
    id: 1,
    name: "Extra Virgin Olive Oil",
    category: "Oils & Vinegars",
    price: 24.99,
    image: "/placeholder.svg?height=300&width=300",
    badge: "Bestseller",
  },
  {
    id: 2,
    name: "Aged Parmigiano Reggiano",
    category: "Cheese",
    price: 19.99,
    image: "/placeholder.svg?height=300&width=300",
    badge: "Artisan",
  },
  {
    id: 3,
    name: "Handmade Tagliatelle",
    category: "Pasta",
    price: 8.99,
    image: "/placeholder.svg?height=300&width=300",
    badge: "Fresh",
  },
  {
    id: 4,
    name: "Organic Balsamic Vinegar",
    category: "Oils & Vinegars",
    price: 29.99,
    image: "/placeholder.svg?height=300&width=300",
    badge: "Organic",
  },
  {
    id: 5,
    name: "Truffle Infused Honey",
    category: "Specialty",
    price: 18.99,
    image: "/placeholder.svg?height=300&width=300",
    badge: "Limited",
  },
  {
    id: 6,
    name: "Sicilian Pistachio Cream",
    category: "Spreads",
    price: 14.99,
    image: "/placeholder.svg?height=300&width=300",
    badge: "New",
  },
]

export default function ProductCarousel() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)
  const carouselRef = useRef<HTMLDivElement>(null)
  const [visibleProducts, setVisibleProducts] = useState(3)

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setVisibleProducts(1)
      } else if (window.innerWidth < 1024) {
        setVisibleProducts(2)
      } else {
        setVisibleProducts(3)
      }
    }

    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  const nextSlide = () => {
    if (isAnimating) return
    setIsAnimating(true)
    setActiveIndex((prev) => (prev + 1) % (products.length - visibleProducts + 1))
    setTimeout(() => setIsAnimating(false), 500)
  }

  const prevSlide = () => {
    if (isAnimating) return
    setIsAnimating(true)
    setActiveIndex((prev) => (prev === 0 ? products.length - visibleProducts : prev - 1))
    setTimeout(() => setIsAnimating(false), 500)
  }

  const getBadgeColor = (badge: string) => {
    switch (badge.toLowerCase()) {
      case "bestseller":
        return "bg-amber-100 text-amber-800"
      case "new":
        return "bg-blue-100 text-blue-800"
      case "limited":
        return "bg-purple-100 text-purple-800"
      case "organic":
        return "bg-green-100 text-green-800"
      case "artisan":
        return "bg-rose-100 text-rose-800"
      case "fresh":
        return "bg-teal-100 text-teal-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="relative">
      <div className="flex justify-between items-center mb-8">
        <div className="flex gap-2">
          {["All", "Cheese", "Pasta", "Oils & Vinegars", "Specialty", "Spreads"].map((category, index) => (
            <Button
              key={index}
              variant={index === 0 ? "default" : "outline"}
              className={index === 0 ? "bg-green-500 hover:bg-green-600" : ""}
              size="sm"
            >
              {category}
            </Button>
          ))}
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="icon"
            onClick={prevSlide}
            disabled={activeIndex === 0}
            className="rounded-full"
          >
            <ChevronLeft className="h-5 w-5" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={nextSlide}
            disabled={activeIndex === products.length - visibleProducts}
            className="rounded-full"
          >
            <ChevronRight className="h-5 w-5" />
          </Button>
        </div>
      </div>

      <div ref={carouselRef} className="overflow-hidden">
        <motion.div
          className="flex gap-6"
          initial={false}
          animate={{ x: `-${activeIndex * (100 / visibleProducts)}%` }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        >
          {products.map((product, index) => (
            <motion.div
              key={product.id}
              className={`flex-shrink-0 w-full md:w-1/2  lg:w-1/3`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
            >
              <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 group">
                <div className="relative h-64 overflow-hidden">
                  <Image
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  {product.badge && (
                    <Badge className={`absolute top-4 left-4 ${getBadgeColor(product.badge)}`}>{product.badge}</Badge>
                  )}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
                  <Button
                    className="absolute bottom-4 right-4 bg-white text-gray-900 hover:bg-gray-100 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    size="icon"
                  >
                    <ShoppingBag className="h-5 w-5" />
                  </Button>
                </div>
                <div className="p-6">
                  <div className="text-sm text-gray-500 mb-2">{product.category}</div>
                  <h3 className="text-xl font-semibold mb-2 group-hover:text-green-600 transition-colors duration-300">
                    {product.name}
                  </h3>
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-bold">${product.price.toFixed(2)}</span>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-green-600 hover:text-green-700 hover:bg-green-50 p-0"
                      asChild
                    >
                      <Link href={`/products/${product.id}`}>View details</Link>
                    </Button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  )
}
