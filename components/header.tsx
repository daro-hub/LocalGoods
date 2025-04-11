"use client"
import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { ShoppingBag, User, Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import CartSidebar from "@/components/cart-sidebar"
import UserSidebar from "@/components/user-sidebar"

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [isUserOpen, setIsUserOpen] = useState(false)
  const pathname = usePathname()

  // Track scroll position to change header background
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false)
  }, [pathname])

  // Add scroll to top when pathname changes
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  const navItems = [
    { name: "Home", href: "/" },
    { name: "Products", href: "/products" },
    { name: "Boxes", href: "/custom-box" },
    { name: "About Us", href: "/about" },
    { name: "Subscription", href: "/subscription" },
  ]

  // Determine header background
  const getHeaderBackground = () => {
    if (isScrolled) {
      return "bg-white shadow-md"
    } else {
      // When not scrolled, use a gradient overlay for better text readability
      return "bg-gradient-to-b from-black/50 to-transparent"
    }
  }

  return (
    <>
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${getHeaderBackground()} py-4`}>
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className="text-2xl font-bold">
              <span className={isScrolled ? "text-green-600" : "text-white"}>LocalGoods</span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`${isScrolled ? "text-gray-800" : "text-white"} hover:text-green-500 transition-colors relative ${
                    pathname === item.href ? "font-medium" : ""
                  }`}
                >
                  {item.name}
                  {pathname === item.href && (
                    <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-green-500"></span>
                  )}
                </Link>
              ))}
            </nav>

            {/* Right side icons */}
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                size="icon"
                className={`rounded-full ${isScrolled ? "text-gray-800" : "text-white"} hover:bg-white/20`}
                onClick={() => setIsUserOpen(true)}
              >
                <User className="h-5 w-5" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className={`rounded-full ${isScrolled ? "text-gray-800" : "text-white"} hover:bg-white/20`}
                onClick={() => setIsCartOpen(true)}
              >
                <div className="relative">
                  <ShoppingBag className="h-5 w-5" />
                  <span className="absolute -top-2 -right-2 bg-green-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    3
                  </span>
                </div>
              </Button>

              {/* Mobile menu button */}
              <Button
                variant="ghost"
                size="icon"
                className={`md:hidden rounded-full ${isScrolled ? "text-gray-800" : "text-white"} hover:bg-white/20`}
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Navigation Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 bg-white pt-20"
          >
            <div className="container mx-auto px-6 py-8">
              <nav className="flex flex-col space-y-6">
                {navItems.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`text-lg ${pathname === item.href ? "text-green-600 font-medium" : "text-gray-900"}`}
                  >
                    {item.name}
                  </Link>
                ))}
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Cart Sidebar */}
      <CartSidebar isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />

      {/* User Sidebar */}
      <UserSidebar isOpen={isUserOpen} onClose={() => setIsUserOpen(false)} />
    </>
  )
}
