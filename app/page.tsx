"use client"
import { useEffect, useState, useRef } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { ArrowRight, ShoppingBag, Leaf, Award, Clock, ChevronDown } from "lucide-react"
import Footer from "@/components/footer"
import Header from "@/components/header"
import CategoryCarousel from "@/components/category-carousel"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import test from "node:test"
import { profile } from "console"

export default function Home() {
  const [currentSection, setCurrentSection] = useState(0)
  const [isScrolling, setIsScrolling] = useState(false)
  const sections = ["home", "categories", "why-buy", "testimonials", "about", "footer"]
  const scrolling = useRef(false)
  const timeout = useRef<NodeJS.Timeout | null>(null)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  // Track mouse position for parallax effects
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: e.clientX / window.innerWidth - 0.5,
        y: e.clientY / window.innerHeight - 0.5,
      })
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
    }
  }, [])

  useEffect(() => {
    const handleScroll = (event: WheelEvent) => {
      event.preventDefault()

      if (scrolling.current) return

      scrolling.current = true
      setIsScrolling(true)

      if (event.deltaY > 0) {
        setCurrentSection((prev) => Math.min(prev + 1, sections.length - 1))
      } else {
        setCurrentSection((prev) => Math.max(prev - 1, 0))
      }

      if (timeout.current) {
        clearTimeout(timeout.current)
      }

      timeout.current = setTimeout(() => {
        scrolling.current = false
        setIsScrolling(false)
      }, 1000)
    }

    window.addEventListener("wheel", handleScroll, { passive: false })
    return () => {
      window.removeEventListener("wheel", handleScroll)
      if (timeout.current) {
        clearTimeout(timeout.current)
      }
    }
  }, [sections.length])

  useEffect(() => {
    const section = document.getElementById(sections[currentSection])
    if (section) {
      section.scrollIntoView({ behavior: "smooth" })
    }
  }, [currentSection, sections])

  const navigateToSection = (index: number) => {
    setCurrentSection(index)
  }

  return (
    <div className="snap-y snap-mandatory h-screen overflow-y-auto bg-[#FCFAF7]">
      <Header />

      {/* Navigation Dots */}
      <div className="fixed right-8 top-1/2 transform -translate-y-1/2 z-40 flex flex-col gap-4">
        {sections.map((section, index) => (
          <button
            key={section}
            onClick={() => navigateToSection(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              currentSection === index ? "bg-green-500 scale-150" : "bg-gray-300 hover:bg-gray-400"
            }`}
            aria-label={`Navigate to ${section} section`}
          />
        ))}
      </div>

      {/* Hero Section */}
      <section id="home" className="h-screen snap-start relative flex items-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url(https://images.unsplash.com/photo-1488459716781-31db52582fe9?auto=format&fit=crop&q=80&w=2000)",
            transform: `scale(1.1) translate(${mousePosition.x * -20}px, ${mousePosition.y * -20}px)`,
            transition: "transform 0.2s ease-out",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 to-black/40" />

        {/* Floating elements for visual interest */}
        <motion.div
          className="absolute top-1/4 right-1/4 w-32 h-32 rounded-full bg-green-500/20 blur-3xl"
          animate={{
            x: [0, 30, 0],
            y: [0, -30, 0],
          }}
          transition={{
            duration: 8,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-1/3 left-1/4 w-40 h-40 rounded-full bg-yellow-500/20 blur-3xl"
          animate={{
            x: [0, -40, 0],
            y: [0, 40, 0],
          }}
          transition={{
            duration: 10,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        />

        <div className="relative container mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-12 pt-20">
          <motion.div
            className="text-white max-w-2xl"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Badge className="mb-4 px-4 py-1.5 text-sm bg-green-500 hover:bg-green-600">
              New customers get 15% off
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              Access all the{" "}
              <span className="text-green-400 relative">
                best Italian
                <motion.span
                  className="absolute bottom-1 left-0 w-full h-1 bg-green-400/50"
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{ delay: 0.5, duration: 0.8 }}
                />
              </span>
              <br />
              local products in a Click!
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-gray-200 leading-relaxed">
              Discover our local artisans products and shop
              <span className="relative mx-2 px-2 inline-block">
                fresh
                <motion.span
                  className="absolute inset-0 bg-green-500/20 rounded-lg -z-10"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.8, duration: 0.4 }}
                />
              </span>
              ,
              <span className="relative mx-2 px-2">
                handmade
                <motion.span
                  className="absolute inset-0 bg-green-500/20 rounded-lg -z-10"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 1.0, duration: 0.4 }}
                />
              </span>
              , and
              <span className="relative mx-2 px-2">
                sustainable
                <motion.span
                  className="absolute inset-0 bg-green-500/20 rounded-lg -z-10"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 1.2, duration: 0.4 }}
                />
              </span>{" "}
              today!
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                size="lg"
                className="bg-green-600 hover:bg-green-700 text-white text-lg rounded-lg px-8 py-6"
                asChild
              >
                <Link href="/products">
                  <ShoppingBag className="mr-2 h-5 w-5" />
                  Order now
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-2 border-white bg-white/10 text-white text-lg rounded-lg px-8 py-6 hover:bg-white/20"
                onClick={() => setCurrentSection(1)}
              >
                Explore more
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>
          </motion.div>

          <motion.div
            className="hidden md:block relative"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            <div className="relative w-[400px] h-[400px] rounded-full bg-white/10 backdrop-blur-md p-6 flex items-center justify-center">
              <Image
                src="https://images.unsplash.com/photo-1667406497887-437395f21d82?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fGFncmljb2x0b3JlfGVufDB8MnwwfHx8MA%3D%3D"
                alt="Field"
                width={600}
                height={600}
                className="object-cover rounded-full"
              />

              {/* Floating product badges */}
              <motion.div
                className="absolute -top-4 -right-4 bg-white/10 backdrop-blur-md rounded-full shadow-lg p-3"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 1.0, duration: 0.5 }}
              >
                <Image
                  src="https://images.unsplash.com/photo-1571680322279-a226e6a4cc2a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fHZlcmR1cmF8ZW58MHwyfDB8fHww"
                  alt="Tomato"
                  width={100}
                  height={100}
                  className="rounded-full"
                />
              </motion.div>

              <motion.div
                className="absolute -bottom-8 left-12 bg-white/10 backdrop-blur-md rounded-full shadow-lg p-3"
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 1.2, duration: 0.5 }}
              >
                <Image
                  src="https://images.unsplash.com/photo-1708335008260-501cb0648576?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fGFyYW5jaWF8ZW58MHwyfDB8fHww"
                  alt="Orange"
                  width={90}
                  height={90}
                  className="rounded-full"
                />
              </motion.div>

              <motion.div
                className="absolute top-12 -left-6 bg-white/10 backdrop-blur-md rounded-full shadow-lg p-3"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 1.4, duration: 0.5 }}
              >
                <Image
                  src="https://images.unsplash.com/photo-1576045057995-568f588f82fb?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8dmVyZHVyYXxlbnwwfDJ8MHx8fDA%3D"
                  alt="Coste"
                  width={60}
                  height={60}
                  className="rounded-full"
                />
              </motion.div>
            </div>
          </motion.div>
        </div>

        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, y: [0, 10, 0] }}
          transition={{
            opacity: { delay: 1.5, duration: 0.5 },
            y: { delay: 1.5, duration: 1.5, repeat: Number.POSITIVE_INFINITY },
          }}
        >
          <Button
            variant="ghost"
            size="sm"
            className="text-white flex flex-col items-center gap-2"
            onClick={() => setCurrentSection(1)}
          >
            <span>Scroll down</span>
            <ChevronDown className="h-5 w-5" />
          </Button>
        </motion.div>
      </section>

      {/* Categories Section */}
      <section id="categories" className="h-screen snap-start bg-[#FCFAF7] flex items-center">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <Badge className="mb-4 px-4 py-1.5 text-sm bg-green-100 text-green-800">Our Selection</Badge>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Explore Our Categories</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Discover the finest selection of authentic Italian products, carefully curated from local artisans and
              producers.
            </p>
          </motion.div>

          {/* Replace the grid with the new carousel component */}
          <CategoryCarousel />

          <motion.div
            className="mt-12 text-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            viewport={{ once: true }}
          >
            <Button size="lg" className="bg-green-600 hover:bg-green-700 text-white rounded-lg px-8" asChild>
              <Link href="/products">
                View all products
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Why Buy Section */}
      <section id="why-buy" className="h-screen snap-start bg-[#F5F3EF] flex items-center">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <Badge className="mb-4 px-4 py-1.5 text-sm bg-green-100 text-green-800">Why Choose Us</Badge>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">The LocalGoods Difference</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              We're committed to bringing you the best of Italy's local treasures with quality, authenticity, and
              sustainability.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
            <motion.div
              className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-md transition-shadow duration-300 border border-gray-100"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.5 }}
              viewport={{ once: true }}
            >
              <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mb-6 mx-auto">
                <Leaf className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 text-center mb-4">Fresh</h3>
              <p className="text-gray-600 text-lg leading-relaxed text-center">
                Experience the unbeatable flavor and quality of fresh, locally sourced products. Our ingredients are
                harvested at peak ripeness, ensuring vibrant taste and superior nutrition.
              </p>
              <div className="mt-6 flex justify-center">
                <Badge className="bg-green-50 text-green-700 hover:bg-green-100">Farm to Table</Badge>
              </div>
            </motion.div>

            <motion.div
              className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-md transition-shadow duration-300 border border-gray-100"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              viewport={{ once: true }}
            >
              <div className="w-16 h-16 rounded-full bg-amber-100 flex items-center justify-center mb-6 mx-auto">
                <Award className="h-8 w-8 text-amber-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 text-center mb-4">Handmade</h3>
              <p className="text-gray-600 text-lg leading-relaxed text-center">
                Discover the authenticity of handmade products, created with care by skilled artisans. Each item is a
                labor of love, made using time-honored techniques and the finest natural ingredients.
              </p>
              <div className="mt-6 flex justify-center">
                <Badge className="bg-amber-50 text-amber-700 hover:bg-amber-100">Artisan Crafted</Badge>
              </div>
            </motion.div>

            <motion.div
              className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-md transition-shadow duration-300 border border-gray-100"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              viewport={{ once: true }}
            >
              <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center mb-6 mx-auto">
                <Clock className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 text-center mb-4">Sustainable</h3>
              <p className="text-gray-600 text-lg leading-relaxed text-center">
                Support a greener future with our sustainably produced goods. We prioritize eco-friendly farming,
                ethical sourcing, and minimal waste to protect our planet for generations to come.
              </p>
              <div className="mt-6 flex justify-center">
                <Badge className="bg-blue-50 text-blue-700 hover:bg-blue-100">Eco-Friendly</Badge>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="h-screen snap-start bg-[#FCFAF7] flex items-center">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <Badge className="mb-4 px-4 py-1.5 text-sm bg-green-100 text-green-800">Customer Stories</Badge>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">What Our Customers Say</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Join thousands of satisfied customers who have discovered the authentic taste of Italy.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: "Maria Rossi",
                location: "Milan, Italy",
                quote:
                  "The quality of these products reminds me of my grandmother's cooking. Authentic Italian flavors delivered right to my door!",
                rating: 5,
                profileImage: "https://images.unsplash.com/photo-1485893086445-ed75865251e0?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHdvbWFufGVufDB8MnwwfHx8MA%3D%3D"
              },
              {
                name: "John Smith",
                location: "New York, USA",
                quote:
                  "After visiting Italy last summer, I've been craving authentic Italian food. LocalGoods delivers exactly what I was missing!",
                rating: 5,
                profileImage: "https://images.unsplash.com/photo-1607990281513-2c110a25bd8c?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bWFufGVufDB8MnwwfHx8MA%3D%3D"
              },
              {
                name: "Sophie Laurent",
                location: "Paris, France",
                quote:
                  "The olive oil and aged balsamic vinegar are exceptional. You can truly taste the difference in quality compared to supermarket brands.",
                rating: 5,
                profileImage: "https://images.unsplash.com/photo-1685726343439-c2ade275f58c?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OTZ8fHdvbWFufGVufDB8MnwwfHx8MA%3D%3D"
              },
            ].map((testimonial, index) => (
              <motion.div
                key={index}
                className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-md transition-shadow duration-300 border border-gray-100"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index, duration: 0.5 }}
                viewport={{ once: true }}
              >
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 rounded-full bg-gray-200 mr-4">
                    <Image
                      src={testimonial.profileImage}
                      alt={testimonial.name}
                      width={48}
                      height={48}
                      className="rounded-full"
                    />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900">{testimonial.name}</h4>
                    <p className="text-sm text-gray-500">{testimonial.location}</p>
                  </div>
                </div>
                <div className="flex mb-4">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.95.69z" />
                    </svg>
                  ))}
                </div>
                <p className="text-gray-600 italic">"{testimonial.quote}"</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="h-screen snap-start bg-[#F5F3EF] flex items-center">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <Badge className="mb-4 px-4 py-1.5 text-sm bg-green-100 text-green-800">Our Story</Badge>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">About LocalGoods</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Learn about our mission to connect you with the finest local Italian products and support sustainable
              artisans.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <motion.div
              className="relative"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
              viewport={{ once: true }}
            >
              <Image
                src="https://plus.unsplash.com/premium_photo-1686269460898-740cc9281b0f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8YWdyaWNvbHRvcml8ZW58MHwwfDB8fHww"
                alt="LocalGoods Team"
                width={600}
                height={500}
                className="rounded-2xl shadow-lg"
              />
              <div className="absolute bottom-4 right-4 bg-white/80 backdrop-blur-sm rounded-lg p-4 shadow-md">
                <p className="text-gray-700 text-sm">Supporting Local Artisans</p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
              viewport={{ once: true }}
            >
              <h3 className="text-3xl font-bold text-gray-900 mb-6">Our Mission</h3>
              <p className="text-gray-700 text-lg leading-relaxed mb-6">
                At LocalGoods, we believe in the power of local communities and the importance of preserving traditional
                craftsmanship. Our mission is to provide a platform that connects consumers with authentic Italian
                products while supporting the livelihoods of local artisans and promoting sustainable practices.
              </p>
              <p className="text-gray-700 text-lg leading-relaxed">
                We carefully curate our selection to ensure that every product meets our high standards of quality,
                authenticity, and sustainability. By choosing LocalGoods, you're not just buying a product – you're
                supporting a community and investing in a better future.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
