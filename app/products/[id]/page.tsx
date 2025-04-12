"use client"
import { useState } from "react"
import Image from "next/image"
import { useParams } from "next/navigation"
import { Minus, Plus, ShoppingBag } from "lucide-react"
import Header from "@/components/improved-header"
import Footer from "@/components/footer"
import { Button } from "@/components/ui/button"

// Sample product data - In a real app, this would come from an API
const products = [
  {
    id: "1",
    name: "Pomodori San Marzano",
    producer: "Fattoria Rossi",
    price: 3.99,
    description:
      "Pomodori San Marzano coltivati secondo tradizione, perfetti per salse e conserve. Il loro sapore dolce e la polpa carnosa li rendono unici.",
    region: "Toscana",
    images: ["/placeholder.svg?height=600&width=600", "/placeholder.svg?height=600&width=600"],
    details: {
      origin: "Toscana",
      cultivation: "Biologica",
      harvest: "Agosto 2023",
      weight: "500g",
    },
  },
  {
    id: "2",
    name: "Parmigiano Reggiano 24 mesi",
    producer: "Caseificio Bianchi",
    price: 15.99,
    description:
      "Parmigiano Reggiano stagionato 24 mesi, prodotto secondo la tradizione. Perfetto da gustare a scaglie o grattugiato sui primi piatti.",
    region: "Emilia-Romagna",
    images: ["/placeholder.svg?height=600&width=600", "/placeholder.svg?height=600&width=600"],
    details: {
      origin: "Emilia-Romagna",
      aging: "24 mesi",
      milk: "Vaccino",
      weight: "250g",
    },
  },
]

export default function ProductDetail() {
  const { id } = useParams()
  const [quantity, setQuantity] = useState(1)
  const [selectedImage, setSelectedImage] = useState(0)

  // Find the product by ID
  const product = products.find(p => p.id === id)

  if (!product) {
    return (
      <div className="min-h-screen bg-[#FCFAF7] pt-24">
        <Header />
        <div className="container mx-auto px-4 py-12 text-center">
          <h1 className="text-2xl font-bold mb-4">Prodotto non trovato</h1>
          <p>Il prodotto che stai cercando non esiste o è stato rimosso.</p>
        </div>
        <Footer />
      </div>
    )
  }

  const handleAddToCart = () => {
    if (product) {
      // Show feedback to user
      alert(`Added ${quantity} ${product.name} to your cart!`)
      
      // In a real app, you would update cart state here
      console.log(`Adding ${quantity} of product ${id} to cart`)
    }
  }

  return (
    <div className="min-h-screen bg-[#FCFAF7]">
      <Header />

      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <div className="aspect-w-1 aspect-h-1 w-full">
                <Image
                  src={product.images[selectedImage] || "/placeholder.svg"}
                  alt={product.name}
                  width={600}
                  height={600}
                  className="w-full h-96 object-cover rounded-lg"
                />
              </div>
              <div className="flex gap-4">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`w-24 h-24 rounded-lg overflow-hidden ${
                      selectedImage === index ? 'ring-2 ring-green-500' : ''
                    }`}
                  >
                    <Image 
                      src={image || "/placeholder.svg"} 
                      alt={`${product.name} - view ${index + 1}`} 
                      width={96}
                      height={96}
                      className="w-full h-full object-cover" 
                    />
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
                <p className="text-gray-600">{product.producer}</p>
              </div>

              <p className="text-gray-700">{product.description}</p>

              <div className="border-t border-b py-4">
                <h3 className="font-semibold mb-2">Dettagli del prodotto</h3>
                <dl className="grid grid-cols-2 gap-4">
                  {Object.entries(product.details).map(([key, value]) => (
                    <div key={key}>
                      <dt className="text-gray-600 text-sm">{key}</dt>
                      <dd className="font-medium">{value}</dd>
                    </div>
                  ))}
                </dl>
              </div>

              <div className="space-y-4">
                <p className="text-3xl font-bold">€{product.price.toFixed(2)}</p>

                <div className="flex items-center gap-4">
                  <div className="flex items-center border rounded-lg">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="p-2 hover:bg-gray-100"
                    >
                      <Minus className="h-5 w-5" />
                    </button>
                    <span className="px-4 py-2 font-medium">{quantity}</span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="p-2 hover:bg-gray-100"
                    >
                      <Plus className="h-5 w-5" />
                    </button>
                  </div>

                  <Button
                    onClick={handleAddToCart}
                    className="flex-1 flex items-center justify-center gap-2 bg-green-600 text-white py-3 px-6 rounded-lg hover:bg-green-700 transition-colors"
                  >
                    <ShoppingBag className="h-5 w-5" />
                    <span>Aggiungi al carrello</span>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
