"use client"
import { useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion, useInView } from "framer-motion"
import { ArrowRight, MapPin, Users, Award, Leaf, Heart } from "lucide-react"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

export default function AboutPage() {
  const ref1 = useRef(null)
  const ref2 = useRef(null)
  const ref3 = useRef(null)
  const isInView1 = useInView(ref1, { once: true })
  const isInView2 = useInView(ref2, { once: true })
  const isInView3 = useInView(ref3, { once: true })

  // Add scroll functionality to the "Our Mission" button
  const missionRef = useRef<HTMLElement>(null)

  const teamMembers = [
    {
      name: "Marco Bianchi",
      role: "Founder & CEO",
      bio: "Marco's passion for authentic Italian cuisine led him to create LocalGoods after returning to his hometown in Tuscany and rediscovering traditional flavors.",
      image: "/placeholder.svg?height=300&width=300",
    },
    {
      name: "Sofia Ricci",
      role: "Head of Product Curation",
      bio: "With over 15 years of experience in Italian gastronomy, Sofia personally selects each product in our collection, ensuring exceptional quality and authenticity.",
      image: "/placeholder.svg?height=300&width=300",
    },
    {
      name: "Luca Romano",
      role: "Producer Relations",
      bio: "Luca works directly with our network of artisanal producers across Italy, building relationships that bring the finest local products to your table.",
      image: "/placeholder.svg?height=300&width=300",
    },
    {
      name: "Giulia Marino",
      role: "Culinary Director",
      bio: "A trained chef with a background in traditional Italian cooking, Giulia develops recipes and content to help customers make the most of their products.",
      image: "/placeholder.svg?height=300&width=300",
    },
  ]

  const values = [
    {
      icon: <Leaf className="h-8 w-8 text-green-600" />,
      title: "Sustainability",
      description:
        "We prioritize eco-friendly practices throughout our supply chain, from sustainable farming to minimal packaging.",
    },
    {
      icon: <Users className="h-8 w-8 text-blue-600" />,
      title: "Community",
      description:
        "We believe in supporting local communities by partnering with small-scale producers and paying fair prices.",
    },
    {
      icon: <Award className="h-8 w-8 text-amber-600" />,
      title: "Quality",
      description:
        "We never compromise on quality, selecting only the finest products that meet our strict standards for taste and authenticity.",
    },
    {
      icon: <Heart className="h-8 w-8 text-red-600" />,
      title: "Passion",
      description:
        "Our love for Italian food culture drives everything we do, from product selection to customer education.",
    },
  ]

  const timeline = [
    {
      year: "2018",
      title: "The Beginning",
      description:
        "Marco Bianchi returns to Tuscany and is inspired to share authentic Italian products with the world.",
    },
    {
      year: "2019",
      title: "First Partnerships",
      description:
        "LocalGoods establishes relationships with its first 10 artisanal producers across Tuscany and Emilia-Romagna.",
    },
    {
      year: "2020",
      title: "Online Launch",
      description:
        "Our e-commerce platform launches, making authentic Italian products available to customers worldwide.",
    },
    {
      year: "2021",
      title: "Subscription Service",
      description:
        "We introduce our popular subscription boxes, bringing curated Italian experiences to doorsteps monthly.",
    },
    {
      year: "2022",
      title: "Expansion",
      description:
        "Our producer network grows to over 50 partners across all regions of Italy, from Sicily to the Alps.",
    },
    {
      year: "2023",
      title: "Today",
      description:
        "LocalGoods continues to grow, connecting food lovers with authentic Italian flavors while supporting traditional producers.",
    },
  ]

  return (
    <div className="min-h-screen bg-[#FCFAF7]">
      <Header />

      <main className="pt-24 pb-16">
        {/* Hero Section */}
        <section className="relative h-[60vh] min-h-[500px] flex items-center">
          <div className="absolute inset-0 z-0">
            <Image
              src="https://images.unsplash.com/photo-1444214058525-761aeb793113?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OTl8fGl0YWxpYXxlbnwwfDB8MHx8fDA%3D"
              alt="Italian countryside"
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-black/50" />
          </div>

          <div className="container mx-auto px-6 relative z-10">
            <div className="max-w-3xl text-white">
              <Badge className="mb-4 px-4 py-1.5 text-sm bg-green-500 hover:bg-green-600">Our Story</Badge>
              <h1 className="text-4xl md:text-6xl font-bold mb-6">Bringing Italy's Finest to Your Table</h1>
              <p className="text-xl opacity-90 mb-8">
                LocalGoods was born from a passion for authentic Italian cuisine and a desire to connect artisanal
                producers with food lovers around the world.
              </p>
              {/* Update the Button component in the Hero Section */}
              <Button
                className="bg-white text-green-700 hover:bg-gray-100 rounded-full px-8"
                size="lg"
                onClick={() => {
                  missionRef.current?.scrollIntoView({ behavior: "smooth" })
                }}
              >
                Our Mission
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </div>
        </section>

        {/* Our Story Section */}
        <section className="py-20">
          <div className="container mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <motion.div
                ref={ref1}
                initial={{ opacity: 0, x: -50 }}
                animate={isInView1 ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
                transition={{ duration: 0.7 }}
              >
                <Badge className="mb-4 px-4 py-1.5 text-sm bg-green-100 text-green-800">Our Story</Badge>
                <h2 className="text-3xl md:text-4xl font-bold mb-6">From Tuscany to Your Doorstep</h2>
                <div className="space-y-4 text-gray-600">
                  <p>
                    LocalGoods began in 2018 when our founder, Marco Bianchi, returned to his hometown in Tuscany after
                    years of living abroad. Rediscovering the incredible flavors of locally produced olive oils,
                    cheeses, and wines, he was struck by how these authentic tastes simply couldn't be found in
                    supermarkets outside of Italy.
                  </p>
                  <p>
                    Inspired by the passion of local producers and their dedication to traditional methods, Marco set
                    out to create a bridge between these artisans and food lovers worldwide. He began by partnering with
                    a handful of producers in Tuscany, carefully selecting products that represented the true essence of
                    Italian culinary tradition.
                  </p>
                  <p>
                    What started as a small passion project has grown into a thriving community that connects over 50
                    small-scale producers across Italy with customers who appreciate quality, authenticity, and
                    sustainability. Each product in our collection tells a story of tradition, passion, and the unique
                    terroir of its origin.
                  </p>
                </div>
              </motion.div>

              <motion.div
                ref={ref2}
                initial={{ opacity: 0, x: 50 }}
                animate={isInView1 ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
                transition={{ duration: 0.7, delay: 0.2 }}
                className="relative"
              >
                <div className="relative h-[500px] w-full rounded-2xl overflow-hidden">
                  <Image
                    src="https://plus.unsplash.com/premium_photo-1661420226112-311050ce30da?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8YWdyaWNvbHRvcmV8ZW58MHwwfDB8fHww"
                    alt="Italian countryside"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-xl shadow-lg max-w-xs">
                  <p className="text-gray-800 font-medium mb-2">
                    "We believe in preserving traditions while embracing innovation."
                  </p>
                  <p className="text-gray-500 text-sm">— Marco Bianchi, Founder</p>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Our Mission Section */}
        {/* Add ref to the Our Mission section */}
        <section className="py-20 bg-green-50" ref={missionRef}>
          <div className="container mx-auto px-6">
            <div className="max-w-3xl mx-auto text-center mb-16">
              <Badge className="mb-4 px-4 py-1.5 text-sm bg-green-100 text-green-800">Our Mission</Badge>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Preserving Tradition, Supporting Artisans</h2>
              <p className="text-lg text-gray-600">
                Our mission is simple: to preserve traditional Italian food culture by supporting local artisans and
                sharing their exceptional creations with the world.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {values.map((value, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow duration-300"
                >
                  <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mb-6">
                    {value.icon}
                  </div>
                  <h3 className="text-xl font-semibold mb-3">{value.title}</h3>
                  <p className="text-gray-600">{value.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Our Journey Timeline */}
        <section className="py-20">
          <div className="container mx-auto px-6">
            <div className="max-w-3xl mx-auto text-center mb-16">
              <Badge className="mb-4 px-4 py-1.5 text-sm bg-green-100 text-green-800">Our Journey</Badge>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">The LocalGoods Story</h2>
              <p className="text-lg text-gray-600">
                From a small idea to a thriving community of food lovers and artisanal producers.
              </p>
            </div>

            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-green-200 z-0"></div>

              <div className="relative z-10">
                {timeline.map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    viewport={{ once: true }}
                    className={`flex items-center mb-12 ${index % 2 === 0 ? "flex-row" : "flex-row-reverse"}`}
                  >
                    <div className={`w-1/2 ${index % 2 === 0 ? "pr-12 text-right" : "pl-12"}`}>
                      <div
                        className={`bg-white rounded-xl p-6 shadow-sm ${
                          index % 2 === 0 ? "ml-auto" : "mr-auto"
                        } max-w-md`}
                      >
                        <span className="text-green-600 font-bold text-lg">{item.year}</span>
                        <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                        <p className="text-gray-600">{item.description}</p>
                      </div>
                    </div>
                    <div className="w-10 h-10 rounded-full bg-green-500 border-4 border-white flex items-center justify-center">
                      <span className="text-white font-bold">{index + 1}</span>
                    </div>
                    <div className="w-1/2"></div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Meet the Team */}
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-6">
            <div className="max-w-3xl mx-auto text-center mb-16">
              <Badge className="mb-4 px-4 py-1.5 text-sm bg-green-100 text-green-800">Our Team</Badge>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Meet the Passionate People Behind LocalGoods</h2>
              <p className="text-lg text-gray-600">
                Our team brings together expertise in Italian cuisine, sustainable sourcing, and a shared passion for
                authentic food experiences.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {teamMembers.map((member, index) => (
                <motion.div
                  key={index}
                  ref={ref3}
                  initial={{ opacity: 0, y: 30 }}
                  animate={isInView3 ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300"
                >
                  <div className="relative h-64 w-full">
                    <Image src={member.image || "/placeholder.svg"} alt={member.name} fill className="object-cover" />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-semibold mb-1">{member.name}</h3>
                    <p className="text-green-600 mb-4">{member.role}</p>
                    <p className="text-gray-600 text-sm">{member.bio}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Our Producers Map */}
        <section className="py-20">
          <div className="container mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <Badge className="mb-4 px-4 py-1.5 text-sm bg-green-100 text-green-800">Our Producers</Badge>
                <h2 className="text-3xl md:text-4xl font-bold mb-6">From All Regions of Italy</h2>
                <p className="text-lg text-gray-600 mb-6">
                  We work with over 50 small-scale producers across Italy, from the Alpine north to sun-drenched Sicily.
                  Each region offers unique specialties shaped by local traditions, climate, and terroir.
                </p>

                <div className="space-y-4">
                  {[
                    { region: "Tuscany", products: "Olive Oil, Wine, Pecorino Cheese" },
                    { region: "Sicily", products: "Pistachios, Citrus, Sea Salt" },
                    { region: "Emilia-Romagna", products: "Balsamic Vinegar, Parmigiano Reggiano" },
                    { region: "Piedmont", products: "Truffles, Hazelnuts, Wine" },
                  ].map((region, index) => (
                    <div key={index} className="flex items-start">
                      <MapPin className="h-5 w-5 text-green-500 mr-2 mt-1 flex-shrink-0" />
                      <div>
                        <h4 className="font-semibold">{region.region}</h4>
                        <p className="text-gray-600 text-sm">{region.products}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <Button className="mt-8 bg-green-500 hover:bg-green-600 rounded-full px-8" asChild>
                  <Link href="/products">
                    Explore Products by Region
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
              </div>

              <div className="relative h-[500px] w-full rounded-2xl overflow-hidden shadow-lg">
                <Image
                  src="/placeholder.svg?height=500&width=600"
                  alt="Map of Italy with producer locations"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-green-600 text-white">
          <div className="container mx-auto px-6 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Join Our Italian Food Journey</h2>
            <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
              Experience the authentic flavors of Italy delivered directly to your door. Subscribe today and begin your
              culinary adventure.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-white text-green-700 hover:bg-gray-100 rounded-full px-8" asChild>
                <Link href="/subscription">
                  Subscribe Now
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white/10 rounded-full px-8"
                asChild
              >
                <Link href="/products">Browse Products</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
