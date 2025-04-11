"use client"
import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { X, Minus, Plus, ShoppingBag, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

// Sample cart items
const initialCartItems = [
  {
    id: 1,
    name: "Extra Virgin Olive Oil",
    price: 24.99,
    quantity: 1,
    image: "/placeholder.svg?height=80&width=80",
  },
  {
    id: 2,
    name: "Aged Parmigiano Reggiano",
    price: 19.99,
    quantity: 2,
    image: "/placeholder.svg?height=80&width=80",
  },
  {
    id: 3,
    name: "Truffle Infused Honey",
    price: 18.99,
    quantity: 1,
    image: "/placeholder.svg?height=80&width=80",
  },
]

interface CartSidebarProps {
  isOpen: boolean
  onClose: () => void
}

export default function CartSidebar({ isOpen, onClose }: CartSidebarProps) {
  const [cartItems, setCartItems] = useState(initialCartItems)

  const updateQuantity = (id: number, change: number) => {
    setCartItems((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          const newQuantity = Math.max(1, item.quantity + change)
          return { ...item, quantity: newQuantity }
        }
        return item
      }),
    )
  }

  const removeItem = (id: number) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id))
  }

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const shipping = 5.99
  const total = subtotal + shipping

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
            className="fixed top-0 right-0 h-full w-full sm:w-96 bg-white z-50 overflow-y-auto"
          >
            <div className="p-6 h-full flex flex-col">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center">
                  <ShoppingBag className="h-5 w-5 text-green-600 mr-2" />
                  <h2 className="text-xl font-bold">Your Cart ({cartItems.length})</h2>
                </div>
                <Button variant="ghost" size="icon" onClick={onClose} className="rounded-full">
                  <X className="h-5 w-5" />
                </Button>
              </div>

              {cartItems.length === 0 ? (
                <div className="flex-1 flex flex-col items-center justify-center">
                  <ShoppingBag className="h-16 w-16 text-gray-300 mb-4" />
                  <p className="text-gray-500 mb-6">Your cart is empty</p>
                  <Button onClick={onClose} className="bg-green-500 hover:bg-green-600">
                    Continue Shopping
                  </Button>
                </div>
              ) : (
                <>
                  <div className="flex-1 overflow-y-auto">
                    <div className="space-y-6">
                      {cartItems.map((item) => (
                        <div key={item.id} className="flex items-center border-b border-gray-100 pb-4">
                          <div className="h-20 w-20 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                            <Image
                              src={item.image || "/placeholder.svg"}
                              alt={item.name}
                              width={80}
                              height={80}
                              className="h-full w-full object-cover object-center"
                            />
                          </div>

                          <div className="ml-4 flex flex-1 flex-col">
                            <div>
                              <div className="flex justify-between text-base font-medium text-gray-900">
                                <h3>{item.name}</h3>
                                <p className="ml-4">${(item.price * item.quantity).toFixed(2)}</p>
                              </div>
                              <p className="mt-1 text-sm text-gray-500">${item.price.toFixed(2)} each</p>
                            </div>
                            <div className="flex flex-1 items-center justify-between text-sm mt-2">
                              <div className="flex items-center border border-gray-200 rounded-md">
                                <button
                                  onClick={() => updateQuantity(item.id, -1)}
                                  className="p-1 text-gray-500 hover:text-gray-700"
                                >
                                  <Minus className="h-4 w-4" />
                                </button>
                                <span className="px-2 py-1 text-gray-700">{item.quantity}</span>
                                <button
                                  onClick={() => updateQuantity(item.id, 1)}
                                  className="p-1 text-gray-500 hover:text-gray-700"
                                >
                                  <Plus className="h-4 w-4" />
                                </button>
                              </div>

                              <button
                                type="button"
                                onClick={() => removeItem(item.id)}
                                className="font-medium text-red-600 hover:text-red-500"
                              >
                                Remove
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="border-t border-gray-200 pt-6 mt-6">
                    <div className="flex justify-between text-base font-medium text-gray-900 mb-2">
                      <p>Subtotal</p>
                      <p>${subtotal.toFixed(2)}</p>
                    </div>
                    <div className="flex justify-between text-sm text-gray-500 mb-2">
                      <p>Shipping</p>
                      <p>${shipping.toFixed(2)}</p>
                    </div>
                    <div className="flex justify-between text-lg font-bold text-gray-900 mb-6">
                      <p>Total</p>
                      <p>${total.toFixed(2)}</p>
                    </div>

                    <div className="space-y-3">
                      <Button className="w-full bg-green-500 hover:bg-green-600 text-white py-3 rounded-md" asChild>
                        <Link href="/checkout">
                          Checkout
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                      </Button>
                      <Button
                        variant="outline"
                        className="w-full border-gray-300 text-gray-700 py-3 rounded-md"
                        onClick={onClose}
                      >
                        Continue Shopping
                      </Button>
                    </div>
                  </div>
                </>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
