"use client"
import { useState, useEffect } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { Plus, Minus, ShoppingBag, Info, X, Check } from "lucide-react"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

// Sample product data
const products = [
  {
    id: 1,
    name: "Extra Virgin Olive Oil",
    category: "Oils & Vinegars",
    price: 24.99,
    image: "/placeholder.svg?height=300&width=300",
    description: "Cold-pressed from Tuscan olives, this premium olive oil offers a robust flavor with peppery notes.",
    unit: "ml",
    minAmount: 100,
    maxAmount: 500,
    stepAmount: 100,
    defaultAmount: 250,
  },
  {
    id: 2,
    name: "Aged Parmigiano Reggiano",
    category: "Cheese",
    price: 19.99,
    image: "/placeholder.svg?height=300&width=300",
    description:
      "Aged for 24 months, this authentic Parmigiano Reggiano has a rich, nutty flavor and crystalline texture.",
    unit: "g",
    minAmount: 100,
    maxAmount: 500,
    stepAmount: 50,
    defaultAmount: 200,
  },
  {
    id: 3,
    name: "Handmade Tagliatelle",
    category: "Pasta",
    price: 8.99,
    image: "/placeholder.svg?height=300&width=300",
    description: "Traditional egg pasta made by hand using ancient techniques, perfect for rich meat sauces.",
    unit: "g",
    minAmount: 200,
    maxAmount: 1000,
    stepAmount: 100,
    defaultAmount: 500,
  },
  {
    id: 4,
    name: "Organic Balsamic Vinegar",
    category: "Oils & Vinegars",
    price: 29.99,
    image: "/placeholder.svg?height=300&width=300",
    description:
      "Aged in wooden barrels for 12 years, this authentic balsamic vinegar from Modena has a perfect sweet-tart balance.",
    unit: "ml",
    minAmount: 50,
    maxAmount: 250,
    stepAmount: 50,
    defaultAmount: 100,
  },
  {
    id: 5,
    name: "Truffle Infused Honey",
    category: "Specialty",
    price: 18.99,
    image: "/placeholder.svg?height=300&width=300",
    description: "Wildflower honey infused with black truffle, creating a unique sweet and earthy flavor combination.",
    unit: "g",
    minAmount: 100,
    maxAmount: 300,
    stepAmount: 50,
    defaultAmount: 150,
  },
  {
    id: 6,
    name: "Sicilian Pistachio Cream",
    category: "Spreads",
    price: 14.99,
    image: "/placeholder.svg?height=300&width=300",
    description: "Smooth, creamy spread made from Sicilian pistachios with no additives or preservatives.",
    unit: "g",
    minAmount: 100,
    maxAmount: 400,
    stepAmount: 100,
    defaultAmount: 200,
  },
  {
    id: 7,
    name: "Artisanal Pecorino Cheese",
    category: "Cheese",
    price: 22.99,
    image: "/placeholder.svg?height=300&width=300",
    description: "Sheep's milk cheese aged in natural caves, developing a complex flavor with hints of herbs and nuts.",
    unit: "g",
    minAmount: 100,
    maxAmount: 500,
    stepAmount: 50,
    defaultAmount: 200,
  },
  {
    id: 8,
    name: "San Marzano Tomatoes",
    category: "Pantry",
    price: 7.99,
    image: "/placeholder.svg?height=300&width=300",
    description: "Authentic San Marzano tomatoes grown in volcanic soil, known for their sweet flavor and low acidity.",
    unit: "g",
    minAmount: 400,
    maxAmount: 1200,
    stepAmount: 400,
    defaultAmount: 400,
  },
  {
    id: 9,
    name: "Artisanal Limoncello",
    category: "Beverages",
    price: 32.99,
    image: "/placeholder.svg?height=300&width=300",
    description:
      "Traditional lemon liqueur made with organic Amalfi coast lemons, following a century-old family recipe.",
    unit: "ml",
    minAmount: 100,
    maxAmount: 750,
    stepAmount: 50,
    defaultAmount: 250,
  },
  {
    id: 10,
    name: "Nocellara Olives",
    category: "Antipasti",
    price: 9.99,
    image: "/placeholder.svg?height=300&width=300",
    description: "Bright green olives from Sicily with a buttery, mild flavor, preserved in brine with herbs.",
    unit: "g",
    minAmount: 100,
    maxAmount: 500,
    stepAmount: 100,
    defaultAmount: 200,
  },
  {
    id: 11,
    name: "Artisanal Amaretti Cookies",
    category: "Sweets",
    price: 12.99,
    image: "/placeholder.svg?height=300&width=300",
    description:
      "Traditional almond cookies with a crisp exterior and chewy center, made with a recipe dating back generations.",
    unit: "g",
    minAmount: 100,
    maxAmount: 500,
    stepAmount: 100,
    defaultAmount: 200,
  },
  {
    id: 12,
    name: "Calabrian Chili Paste",
    category: "Condiments",
    price: 11.99,
    image: "/placeholder.svg?height=300&width=300",
    description:
      "Spicy chili paste made from Calabrian peppers, perfect for adding heat to pasta, pizza, or sandwiches.",
    unit: "g",
    minAmount: 50,
    maxAmount: 200,
    stepAmount: 50,
    defaultAmount: 100,
  },
]

// Categories for filtering
const categories = [
  "All Categories",
  "Cheese",
  "Pasta",
  "Oils & Vinegars",
  "Specialty",
  "Spreads",
  "Pantry",
  "Beverages",
  "Condiments",
  "Antipasti",
  "Sweets",
]

interface CartItem {
  product: (typeof products)[0]
  quantity: number
  amount: number
}

export default function CustomBoxPage() {
  const [selectedCategory, setSelectedCategory] = useState("All Categories")
  const [filteredProducts, setFilteredProducts] = useState(products)
  const [searchQuery, setSearchQuery] = useState("")
  const [cartItems, setCartItems] = useState<CartItem[]>([])
  const [isSuccessDialogOpen, setIsSuccessDialogOpen] = useState(false)

  // Apply filters
  useEffect(() => {
    let result = [...products]

    // Search filter
    if (searchQuery) {
      result = result.filter(
        (product) =>
          product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.category.toLowerCase().includes(searchQuery.toLowerCase()),
      )
    }

    // Category filter
    if (selectedCategory !== "All Categories") {
      result = result.filter((product) => product.category === selectedCategory)
    }

    setFilteredProducts(result)
  }, [searchQuery, selectedCategory])

  const addToCart = (product: (typeof products)[0], amount: number) => {
    setCartItems((prev) => {
      const existingItem = prev.find((item) => item.product.id === product.id)
      if (existingItem) {
        return prev.map((item) => (item.product.id === product.id ? { ...item, amount: amount, quantity: 1 } : item))
      } else {
        return [...prev, { product, amount, quantity: 1 }]
      }
    })
  }

  const removeFromCart = (productId: number) => {
    setCartItems((prev) => prev.filter((item) => item.product.id !== productId))
  }

  const updateCartItemAmount = (productId: number, amount: number) => {
    setCartItems((prev) => prev.map((item) => (item.product.id === productId ? { ...item, amount } : item)))
  }

  const updateCartItemQuantity = (productId: number, quantity: number) => {
    setCartItems((prev) => prev.map((item) => (item.product.id === productId ? { ...item, quantity } : item)))
  }

  const calculateItemPrice = (item: CartItem) => {
    const unitPrice = item.product.price / item.product.defaultAmount
    return unitPrice * item.amount * item.quantity
  }

  const subtotal = cartItems.reduce((sum, item) => sum + calculateItemPrice(item), 0)
  const shipping = 5.99
  const total = subtotal + shipping

  return (
    <div className="min-h-screen bg-[#FCFAF7]">
      <Header />

      <main className="pt-24 pb-16">
        {/* Hero Banner */}
        <div className="bg-green-600 text-white py-12 mb-8">
          <div className="container mx-auto px-6">
            <div className="max-w-3xl">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">Create Your Custom Box</h1>
              <p className="text-lg md:text-xl opacity-90">
                Select your favorite Italian products and customize quantities to create your perfect gourmet box.
              </p>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-6">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Product Selection */}
            <div className="w-full lg:w-2/3">
              <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
                <h2 className="text-2xl font-bold mb-6">Select Your Products</h2>

                {/* Search and Filter */}
                <div className="flex flex-col md:flex-row gap-4 mb-6">
                  <div className="relative flex-1">
                    <Input
                      type="text"
                      placeholder="Search products..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full"
                    />
                    {searchQuery && (
                      <button
                        onClick={() => setSearchQuery("")}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                      >
                        <X size={16} />
                      </button>
                    )}
                  </div>

                  <Tabs
                    defaultValue="All Categories"
                    value={selectedCategory}
                    onValueChange={setSelectedCategory}
                    className="w-full md:w-auto"
                  >
                    <TabsList className="w-full md:w-auto overflow-x-auto flex whitespace-nowrap">
                      {categories.slice(0, 5).map((category) => (
                        <TabsTrigger key={category} value={category} className="flex-shrink-0">
                          {category}
                        </TabsTrigger>
                      ))}
                      <TabsTrigger value="more" className="flex-shrink-0">
                        More...
                      </TabsTrigger>
                    </TabsList>
                    <TabsContent value="more">
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mt-2">
                        {categories.slice(5).map((category) => (
                          <Button
                            key={category}
                            variant="outline"
                            size="sm"
                            className={selectedCategory === category ? "bg-green-50 border-green-200" : ""}
                            onClick={() => setSelectedCategory(category)}
                          >
                            {category}
                          </Button>
                        ))}
                      </div>
                    </TabsContent>
                  </Tabs>
                </div>

                {/* Products Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {filteredProducts.length === 0 ? (
                    <div className="col-span-2 text-center py-12">
                      <p className="text-gray-500">No products found matching your criteria.</p>
                    </div>
                  ) : (
                    filteredProducts.map((product) => (
                      <motion.div
                        key={product.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4 }}
                        className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all duration-300"
                      >
                        <div className="flex">
                          <div className="w-1/3 relative">
                            <Image
                              src={product.image || "/placeholder.svg"}
                              alt={product.name}
                              width={100}
                              height={100}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="w-2/3 p-4">
                            <div className="flex justify-between">
                              <h3 className="text-lg font-semibold mb-1">{product.name}</h3>
                              <Badge>{product.category}</Badge>
                            </div>
                            <p className="text-sm text-gray-600 mb-2 line-clamp-2">{product.description}</p>
                            <div className="flex justify-between items-center">
                              <span className="font-bold">${product.price.toFixed(2)}</span>
                              <span className="text-sm text-gray-500">
                                per {product.defaultAmount}
                                {product.unit}
                              </span>
                            </div>

                            <div className="mt-3">
                              <div className="flex items-center justify-between">
                                <div className="flex items-center">
                                  <span className="text-sm mr-2">Amount:</span>
                                  <select
                                    className="border border-gray-300 rounded-md text-sm p-1"
                                    onChange={(e) => {
                                      const amount = Number.parseInt(e.target.value)
                                      const existingItem = cartItems.find((item) => item.product.id === product.id)
                                      if (existingItem) {
                                        updateCartItemAmount(product.id, amount)
                                      } else if (amount > 0) {
                                        addToCart(product, amount)
                                      }
                                    }}
                                    value={
                                      cartItems.find((item) => item.product.id === product.id)?.amount ||
                                      product.defaultAmount
                                    }
                                  >
                                    {Array.from(
                                      { length: (product.maxAmount - product.minAmount) / product.stepAmount + 1 },
                                      (_, i) => product.minAmount + i * product.stepAmount,
                                    ).map((amount) => (
                                      <option key={amount} value={amount}>
                                        {amount}
                                        {product.unit}
                                      </option>
                                    ))}
                                  </select>
                                </div>

                                {cartItems.some((item) => item.product.id === product.id) ? (
                                  <Button
                                    variant="destructive"
                                    size="sm"
                                    onClick={() => removeFromCart(product.id)}
                                    className="h-8"
                                  >
                                    Remove
                                  </Button>
                                ) : (
                                  <Button
                                    size="sm"
                                    className="bg-green-500 hover:bg-green-600 h-8"
                                    onClick={() => addToCart(product, product.defaultAmount)}
                                  >
                                    Add
                                  </Button>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))
                  )}
                </div>
              </div>
            </div>

            {/* Cart Summary */}
            <div className="w-full lg:w-1/3">
              <div className="bg-white rounded-xl shadow-sm p-6 sticky top-24">
                <h2 className="text-2xl font-bold mb-6">Your Custom Box</h2>

                {cartItems.length === 0 ? (
                  <div className="text-center py-8">
                    <ShoppingBag className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500 mb-4">Your box is empty</p>
                    <p className="text-sm text-gray-400 mb-6">Add some products to create your custom box</p>
                  </div>
                ) : (
                  <>
                    <div className="space-y-4 mb-6 max-h-[400px] overflow-y-auto pr-2">
                      {cartItems.map((item) => (
                        <div key={item.product.id} className="flex border-b border-gray-100 pb-4">
                          <div className="w-16 h-16 relative flex-shrink-0">
                            <Image
                              src={item.product.image || "/placeholder.svg"}
                              alt={item.product.name}
                              fill
                              className="object-cover rounded-md"
                            />
                          </div>
                          <div className="ml-4 flex-1">
                            <div className="flex justify-between">
                              <h4 className="font-medium">{item.product.name}</h4>
                              <button
                                onClick={() => removeFromCart(item.product.id)}
                                className="text-red-500 hover:text-red-700"
                              >
                                <X size={16} />
                              </button>
                            </div>
                            <div className="flex items-center text-sm text-gray-500 mt-1">
                              <span>
                                {item.amount}
                                {item.product.unit}
                              </span>
                              <span className="mx-2">×</span>
                              <div className="flex items-center border border-gray-200 rounded-md">
                                <button
                                  onClick={() =>
                                    updateCartItemQuantity(item.product.id, Math.max(1, item.quantity - 1))
                                  }
                                  className="px-2 py-0.5 text-gray-500 hover:text-gray-700"
                                >
                                  <Minus size={12} />
                                </button>
                                <span className="px-2 py-0.5">{item.quantity}</span>
                                <button
                                  onClick={() => updateCartItemQuantity(item.product.id, item.quantity + 1)}
                                  className="px-2 py-0.5 text-gray-500 hover:text-gray-700"
                                >
                                  <Plus size={12} />
                                </button>
                              </div>
                            </div>
                            <div className="flex justify-between items-center mt-2">
                              <span className="text-sm">
                                ${((item.product.price / item.product.defaultAmount) * item.amount).toFixed(2)} each
                              </span>
                              <span className="font-medium">${calculateItemPrice(item).toFixed(2)}</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="border-t border-gray-200 pt-4 space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Subtotal</span>
                        <span>${subtotal.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Shipping</span>
                        <span>${shipping.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between font-bold text-lg pt-2">
                        <span>Total</span>
                        <span>${total.toFixed(2)}</span>
                      </div>
                    </div>

                    <Button
                      className="w-full mt-6 bg-green-500 hover:bg-green-600"
                      onClick={() => setIsSuccessDialogOpen(true)}
                    >
                      Add Box to Cart
                    </Button>

                    <div className="mt-4 text-center">
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <div className="flex items-center justify-center text-sm text-gray-500 cursor-help">
                              <Info size={14} className="mr-1" />
                              <span>How custom boxes work</span>
                            </div>
                          </TooltipTrigger>
                          <TooltipContent className="max-w-xs">
                            <p>
                              Custom boxes are carefully packed and shipped together. You can adjust quantities and
                              products to create your perfect Italian food experience.
                            </p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Success Dialog */}
      <Dialog open={isSuccessDialogOpen} onOpenChange={setIsSuccessDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Custom Box Added to Cart!</DialogTitle>
            <DialogDescription>Your custom Italian food box has been added to your shopping cart.</DialogDescription>
          </DialogHeader>
          <div className="flex items-center justify-center py-6">
            <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center">
              <Check className="h-8 w-8 text-green-600" />
            </div>
          </div>
          <DialogFooter className="flex flex-col sm:flex-row gap-2">
            <Button variant="outline" className="flex-1" onClick={() => setIsSuccessDialogOpen(false)}>
              Continue Shopping
            </Button>
            <Button className="flex-1 bg-green-500 hover:bg-green-600">View Cart</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Footer />
    </div>
  )
}
