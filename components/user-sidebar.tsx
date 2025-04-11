"use client"
import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { X, User, Package, CreditCard, Heart, LogOut, Settings } from "lucide-react"
import { Button } from "@/components/ui/button"

interface UserSidebarProps {
  isOpen: boolean
  onClose: () => void
}

export default function UserSidebar({ isOpen, onClose }: UserSidebarProps) {
  // Sample user data - in a real app, this would come from your auth system
  const [user] = useState({
    name: "John Doe",
    email: "john.doe@example.com",
    avatar: "/placeholder.svg?height=100&width=100",
    isLoggedIn: true,
  })

  const menuItems = [
    { icon: <User className="h-5 w-5" />, label: "Profile", href: "/profile" },
    { icon: <Package className="h-5 w-5" />, label: "Orders", href: "/orders" },
    { icon: <CreditCard className="h-5 w-5" />, label: "Subscription", href: "/subscription" },
    { icon: <Heart className="h-5 w-5" />, label: "Wishlist", href: "/wishlist" },
    { icon: <Settings className="h-5 w-5" />, label: "Settings", href: "/settings" },
  ]

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/50 z-50"
            onClick={onClose}
          />

          {/* Sidebar */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed top-0 right-0 h-full w-full sm:w-80 bg-white z-50 overflow-y-auto"
          >
            <div className="p-6 h-full flex flex-col">
              <div className="flex justify-end mb-6">
                <Button variant="ghost" size="icon" onClick={onClose} className="rounded-full">
                  <X className="h-5 w-5" />
                </Button>
              </div>

              {user.isLoggedIn ? (
                <>
                  <div className="flex flex-col items-center mb-8">
                    <div className="relative w-24 h-24 mb-4">
                      <Image
                        src={user.avatar || "/placeholder.svg"}
                        alt={user.name}
                        fill
                        className="rounded-full object-cover border-4 border-green-100"
                      />
                    </div>
                    <h2 className="text-xl font-bold text-gray-900">{user.name}</h2>
                    <p className="text-gray-500">{user.email}</p>
                  </div>

                  <nav className="flex-1">
                    <ul className="space-y-2">
                      {menuItems.map((item, index) => (
                        <li key={index}>
                          <Link
                            href={item.href}
                            className="flex items-center p-3 rounded-lg text-gray-700 hover:bg-green-50 hover:text-green-600 transition-colors"
                            onClick={onClose}
                          >
                            <span className="mr-3 text-gray-500">{item.icon}</span>
                            {item.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </nav>

                  <div className="mt-auto pt-6 border-t border-gray-100">
                    <Button
                      variant="outline"
                      className="w-full justify-start text-red-600 border-red-200 hover:bg-red-50 hover:text-red-700"
                    >
                      <LogOut className="mr-2 h-5 w-5" />
                      Sign Out
                    </Button>
                  </div>
                </>
              ) : (
                <div className="flex-1 flex flex-col justify-center items-center">
                  <User className="h-16 w-16 text-gray-300 mb-4" />
                  <h2 className="text-xl font-bold text-gray-900 mb-2">Sign In to Your Account</h2>
                  <p className="text-gray-500 mb-8 text-center">
                    Sign in to access your orders, wishlist, and personalized recommendations.
                  </p>
                  <div className="space-y-3 w-full">
                    <Button className="w-full bg-green-500 hover:bg-green-600">Sign In</Button>
                    <Button variant="outline" className="w-full">
                      Create Account
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
