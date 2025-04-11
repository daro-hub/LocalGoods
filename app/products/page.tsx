"use client"
import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { ShoppingBag, Search, X, Filter, ChevronDown } from "lucide-react"
import Header from "@/components/improved-header"
import Footer from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"

// Sample product data
const products = [
  {
    id: 1,
    name: "Pomodori San Marzano",
    producer: "Fattoria Rossi",
    price: 3.99,
    image: "https://plus.unsplash.com/premium_photo-1675237625460-49b9caeddfa9?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8UG9tb2RvcmklMjBTYW4lMjBNYXJ6YW5vfGVufDB8MHwwfHx8MA%3D%3D",
    category: "Frutta e Verdura",
    region: "Toscana",
  },
  {
    id: 2,
    name: "Parmigiano Reggiano 24 mesi",
    producer: "Caseificio Bianchi",
    price: 15.99,
    image: "https://images.unsplash.com/photo-1654184750621-1110fe5afcdc?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8UGFybWlnaWFubyUyMFJlZ2dpYW5vfGVufDB8fDB8fHww",
    category: "Formaggi",
    region: "Emilia-Romagna",
  },
  {
    id: 3,
    name: "Prosciutto Crudo di Parma",
    producer: "Salumificio Verdi",
    price: 9.49,
    image: "https://plus.unsplash.com/premium_photo-1726783358476-f7460d4beca6?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8cHJvc2NpdXR0byUyMGNydWRvJTIwZGklMjBwYXJtYXxlbnwwfHwwfHx8MA%3D%3D",
    category: "Salumi",
    region: "Emilia-Romagna",
  },
  {
    id: 4,
    name: "Mozzarella di Bufala Campana",
    producer: "Caseificio La Torre",
    price: 6.5,
    image: "https://images.unsplash.com/photo-1605466237780-80b87584957b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8bW96emFyZWxsYXxlbnwwfHwwfHx8MA%3D%3D",
    category: "Formaggi",
    region: "Campania",
  },
  {
    id: 5,
    name: "Olio Extra Vergine d'Oliva",
    producer: "Frantoio del Sole",
    price: 12.0,
    image: "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8b2xpbyUyMG9saXZhfGVufDB8fDB8fHww",
    category: "Condimenti",
    region: "Puglia",
  },
  {
    id: 6,
    name: "Pane di Altamura",
    producer: "Forno Antico",
    price: 4.25,
    image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cGFuZXxlbnwwfHwwfHx8MA%3D%3D",
    category: "Panetteria",
    region: "Puglia",
  },
  {
    id: 7,
    name: "Vino Chianti Classico",
    producer: "Cantina Rossa",
    price: 18.9,
    image: "https://plus.unsplash.com/premium_photo-1682097091093-dd18b37764a5?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8dmlubyUyMHJvc3NvfGVufDB8fDB8fHww",
    category: "Bevande",
    region: "Toscana",
  },
  {
    id: 8,
    name: "Miele Millefiori",
    producer: "Apicoltura Bianchi",
    price: 7.3,
    image: "https://plus.unsplash.com/premium_photo-1664273586888-859762c34ce4?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8bWllbGV8ZW58MHx8MHx8fDA%3D",
    category: "Dolci e Confetture",
    region: "Piemonte",
  },
  {
    id: 9,
    name: "Lenticchie di Castelluccio",
    producer: "Azienda Agricola Umbra",
    price: 5.99,
    image: "https://plus.unsplash.com/premium_photo-1664007710992-ad36b7943edb?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8bGVudGljY2hpZXxlbnwwfHwwfHx8MA%3D%3D",
    category: "Legumi",
    region: "Umbria",
  },
  {
    id: 10,
    name: "Taralli al Finocchio",
    producer: "Forno di Bari",
    price: 3.75,
    image: "https://images.unsplash.com/photo-1708101719339-2508fff17f55?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Z3Jpc3Npbml8ZW58MHx8MHx8fDA%3D",
    category: "Snack",
    region: "Puglia",
  },
]

// Categories for filtering
const categories = [
  "All Categories",
  "Formaggi",
  "Salumi",
  "Condimenti",
  "Frutta e Verdura",
  "Panetteria",
  "Bevande",
  "Dolci e Confetture",
  "Legumi",
  "Snack",
]

// Regions for filtering
const regions = ["All Regions", "Toscana", "Emilia-Romagna", "Campania", "Puglia", "Piemonte", "Umbria"]

export default function ProductsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All Categories")
  const [selectedRegion, setSelectedRegion] = useState("All Regions")
  const [sortOption, setSortOption] = useState("recommended")
  const [filteredProducts, setFilteredProducts] = useState(products)
  const [isFilterOpen, setIsFilterOpen] = useState(false)

  // Apply filters
  useEffect(() => {
    let result = [...products]

    // Search filter
    if (searchQuery) {
      result = result.filter(
        (product) =>
          product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.producer.toLowerCase().includes(searchQuery.toLowerCase()),
      )
    }

    // Category filter
    if (selectedCategory !== "All Categories") {
      result = result.filter((product) => product.category === selectedCategory)
    }

    // Region filter
    if (selectedRegion !== "All Regions") {
      result = result.filter((product) => product.region === selectedRegion)
    }

    // Sort products
    switch (sortOption) {
      case "price-asc":
        result.sort((a, b) => a.price - b.price)
        break
      case "price-desc":
        result.sort((a, b) => b.price - a.price)
        break
      default:
        // No specific sort for "recommended"
        break
    }

    setFilteredProducts(result)
  }, [searchQuery, selectedCategory, selectedRegion, sortOption])

  const clearFilters = () => {
    setSearchQuery("")
    setSelectedCategory("All Categories")
    setSelectedRegion("All Regions")
    setSortOption("recommended")
  }

  const handleAddToCart = (productId: number) => {
    // Find the product
    const product = products.find((p) => p.id === productId)
    if (product) {
      // Show feedback to user
      alert(`Added ${product.name} to your cart!`)

      // In a real app, you would update cart state here
      console.log(`Adding product ${productId} to cart`)
    }
  }

  return (
    <div className="min-h-screen bg-[#FCFAF7]">
      <Header />

      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-4">I Nostri Prodotti</h1>

            {/* Search and Filter Bar */}
            <div className="flex flex-col md:flex-row gap-4 mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                <Input
                  type="text"
                  placeholder="Cerca prodotti..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 bg-white border-gray-200"
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

              {/* Mobile Filter Button */}
              <Sheet open={isFilterOpen} onOpenChange={setIsFilterOpen}>
                <SheetTrigger asChild>
                  <Button variant="outline" className="md:hidden flex items-center gap-2">
                    <Filter size={16} />
                    Filtri
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-[300px] sm:w-[400px]">
                  <SheetHeader>
                    <SheetTitle>Filtri</SheetTitle>
                    <SheetDescription>Refina la tua ricerca</SheetDescription>
                  </SheetHeader>
                  <div className="py-6 space-y-6">
                    <div>
                      <h3 className="text-sm font-medium mb-3">Categorie</h3>
                      <div className="space-y-2">
                        {categories.map((category) => (
                          <div key={category} className="flex items-center">
                            <Checkbox
                              id={`mobile-category-${category}`}
                              checked={selectedCategory === category}
                              onCheckedChange={() => setSelectedCategory(category)}
                            />
                            <label
                              htmlFor={`mobile-category-${category}`}
                              className="ml-2 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            >
                              {category}
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h3 className="text-sm font-medium mb-3">Regioni</h3>
                      <div className="space-y-2">
                        {regions.map((region) => (
                          <div key={region} className="flex items-center">
                            <Checkbox
                              id={`mobile-region-${region}`}
                              checked={selectedRegion === region}
                              onCheckedChange={() => setSelectedRegion(region)}
                            />
                            <label
                              htmlFor={`mobile-region-${region}`}
                              className="ml-2 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            >
                              {region}
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="flex justify-between pt-4">
                      <Button variant="outline" onClick={clearFilters}>
                        Cancella Filtri
                      </Button>
                      <Button onClick={() => setIsFilterOpen(false)}>Applica Filtri</Button>
                    </div>
                  </div>
                </SheetContent>
              </Sheet>

              {/* Desktop Filter Dropdowns */}
              <div className="hidden md:flex gap-2">
                <div className="relative">
                  <Button
                    variant="outline"
                    className="flex items-center gap-2"
                    onClick={() => document.getElementById("categoryDropdown")?.classList.toggle("hidden")}
                  >
                    Categoria
                    <ChevronDown size={16} />
                  </Button>
                  <div id="categoryDropdown" className="absolute z-10 mt-1 w-56 bg-white rounded-md shadow-lg hidden">
                    <div className="p-2 max-h-60 overflow-auto">
                      {categories.map((category) => (
                        <div
                          key={category}
                          className={`px-4 py-2 text-sm cursor-pointer hover:bg-gray-100 ${
                            selectedCategory === category ? "bg-green-50 text-green-600" : ""
                          }`}
                          onClick={() => {
                            setSelectedCategory(category)
                            document.getElementById("categoryDropdown")?.classList.add("hidden")
                          }}
                        >
                          {category}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="relative">
                  <Button
                    variant="outline"
                    className="flex items-center gap-2"
                    onClick={() => document.getElementById("regionDropdown")?.classList.toggle("hidden")}
                  >
                    Regione
                    <ChevronDown size={16} />
                  </Button>
                  <div id="regionDropdown" className="absolute z-10 mt-1 w-56 bg-white rounded-md shadow-lg hidden">
                    <div className="p-2 max-h-60 overflow-auto">
                      {regions.map((region) => (
                        <div
                          key={region}
                          className={`px-4 py-2 text-sm cursor-pointer hover:bg-gray-100 ${
                            selectedRegion === region ? "bg-green-50 text-green-600" : ""
                          }`}
                          onClick={() => {
                            setSelectedRegion(region)
                            document.getElementById("regionDropdown")?.classList.add("hidden")
                          }}
                        >
                          {region}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="relative">
                  <Button
                    variant="outline"
                    className="flex items-center gap-2"
                    onClick={() => document.getElementById("sortDropdown")?.classList.toggle("hidden")}
                  >
                    Ordina per
                    <ChevronDown size={16} />
                  </Button>
                  <div
                    id="sortDropdown"
                    className="absolute right-0 z-10 mt-1 w-56 bg-white rounded-md shadow-lg hidden"
                  >
                    <div className="p-2">
                      {[
                        { value: "recommended", label: "Consigliati" },
                        { value: "price-asc", label: "Prezzo: crescente" },
                        { value: "price-desc", label: "Prezzo: decrescente" },
                      ].map((option) => (
                        <div
                          key={option.value}
                          className={`px-4 py-2 text-sm cursor-pointer hover:bg-gray-100 ${
                            sortOption === option.value ? "bg-green-50 text-green-600" : ""
                          }`}
                          onClick={() => {
                            setSortOption(option.value)
                            document.getElementById("sortDropdown")?.classList.add("hidden")
                          }}
                        >
                          {option.label}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Active Filters */}
            {(searchQuery || selectedCategory !== "All Categories" || selectedRegion !== "All Regions") && (
              <div className="flex flex-wrap items-center gap-2 mb-6">
                <span className="text-sm text-gray-500">Filtri attivi:</span>
                {searchQuery && (
                  <Badge variant="secondary" className="flex items-center gap-1">
                    Ricerca: {searchQuery}
                    <button onClick={() => setSearchQuery("")}>
                      <X size={14} />
                    </button>
                  </Badge>
                )}
                {selectedCategory !== "All Categories" && (
                  <Badge variant="secondary" className="flex items-center gap-1">
                    Categoria: {selectedCategory}
                    <button onClick={() => setSelectedCategory("All Categories")}>
                      <X size={14} />
                    </button>
                  </Badge>
                )}
                {selectedRegion !== "All Regions" && (
                  <Badge variant="secondary" className="flex items-center gap-1">
                    Regione: {selectedRegion}
                    <button onClick={() => setSelectedRegion("All Regions")}>
                      <X size={14} />
                    </button>
                  </Badge>
                )}
                <Button variant="ghost" size="sm" onClick={clearFilters} className="text-sm">
                  Cancella tutti
                </Button>
              </div>
            )}
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.length === 0 ? (
              <div className="col-span-full text-center py-12">
                <p className="text-gray-500 mb-4">Nessun prodotto trovato con i criteri selezionati.</p>
                <Button onClick={clearFilters}>Cancella filtri</Button>
              </div>
            ) : (
              filteredProducts.map((product) => (
                <div
                  key={product.id}
                  className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all duration-300"
                >
                  <Link href={`/products/${product.id}`} className="block relative h-48 overflow-hidden">
                    <Image
                      src={product.image || "/placeholder.svg"}
                      alt={product.name}
                      fill
                      className="object-cover transition-transform duration-500 hover:scale-105"
                    />
                  </Link>
                  <div className="p-4">
                    <div className="text-sm text-gray-500 mb-1">{product.producer}</div>
                    <Link href={`/products/${product.id}`}>
                      <h3 className="text-lg font-semibold mb-2 hover:text-green-600 transition-colors">
                        {product.name}
                      </h3>
                    </Link>
                    <div className="flex justify-between items-center">
                      <span className="text-lg font-bold">€{product.price.toFixed(2)}</span>
                      <Button
                        size="sm"
                        className="bg-green-500 hover:bg-green-600 rounded-full"
                        onClick={() => handleAddToCart(product.id)}
                      >
                        <ShoppingBag className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
