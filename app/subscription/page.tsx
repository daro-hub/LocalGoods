"use client"
import { useState } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { Check, X } from "lucide-react"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function SubscriptionPage() {
  const [billingCycle, setBillingCycle] = useState("monthly")
  const [currentPlan, setCurrentPlan] = useState("premium")

  const plans = [
    {
      id: "starter",
      name: "Starter",
      description: "Perfect for occasional Italian food lovers",
      monthlyPrice: 29.99,
      yearlyPrice: 299.99,
      features: [
        { name: "Monthly box of 3-5 products", included: true },
        { name: "Standard shipping", included: true },
        { name: "Access to online recipes", included: true },
        { name: "10% discount on additional purchases", included: true },
        { name: "Customization options", included: false },
        { name: "Priority shipping", included: false },
        { name: "Exclusive seasonal products", included: false },
        { name: "Virtual tasting events", included: false },
      ],
      popular: false,
      color: "bg-blue-500",
    },
    {
      id: "premium",
      name: "Premium",
      description: "Our most popular plan for enthusiasts",
      monthlyPrice: 49.99,
      yearlyPrice: 499.99,
      features: [
        { name: "Monthly box of 6-8 products", included: true },
        { name: "Priority shipping", included: true },
        { name: "Access to online recipes", included: true },
        { name: "15% discount on additional purchases", included: true },
        { name: "Basic customization options", included: true },
        { name: "Exclusive seasonal products", included: true },
        { name: "Quarterly virtual tasting events", included: true },
        { name: "Producer meet & greets", included: false },
      ],
      popular: true,
      color: "bg-green-500",
    },
    {
      id: "connoisseur",
      name: "Connoisseur",
      description: "The ultimate Italian food experience",
      monthlyPrice: 79.99,
      yearlyPrice: 799.99,
      features: [
        { name: "Monthly box of 10-12 premium products", included: true },
        { name: "Express priority shipping", included: true },
        { name: "Access to exclusive recipes", included: true },
        { name: "20% discount on additional purchases", included: true },
        { name: "Full customization options", included: true },
        { name: "Exclusive limited-edition products", included: true },
        { name: "Monthly virtual tasting events", included: true },
        { name: "Producer meet & greets", included: true },
      ],
      popular: false,
      color: "bg-purple-500",
    },
  ]

  const subscriptionBenefits = [
    {
      title: "Curated Selection",
      description: "Each box is carefully curated by our Italian food experts to bring you authentic flavors.",
      icon: "/placeholder.svg?height=40&width=40",
    },
    {
      title: "Direct from Producers",
      description: "We work directly with small-scale producers to ensure quality and fair compensation.",
      icon: "/placeholder.svg?height=40&width=40",
    },
    {
      title: "Flexible Options",
      description: "Customize your box, skip a month, or cancel anytime with no penalties.",
      icon: "/placeholder.svg?height=40&width=40",
    },
    {
      title: "Exclusive Products",
      description: "Access limited-edition and seasonal products not available elsewhere.",
      icon: "/placeholder.svg?height=40&width=40",
    },
  ]

  const faqs = [
    {
      question: "How does the subscription work?",
      answer:
        "Each month, we'll send you a box of authentic Italian products based on your selected plan. You'll receive a notification before shipping with details about the upcoming box. You can customize your box, skip a month, or cancel anytime through your account dashboard.",
    },
    {
      question: "Can I customize my box?",
      answer:
        "Yes! Premium and Connoisseur plans offer customization options. You'll receive a notification before each shipment with the option to swap certain items based on your preferences and dietary restrictions.",
    },
    {
      question: "When will I be charged?",
      answer:
        "For monthly subscriptions, you'll be charged on the same day each month. For annual subscriptions, you'll be charged once per year on your subscription anniversary date.",
    },
    {
      question: "How do I cancel my subscription?",
      answer:
        "You can cancel your subscription anytime through your account dashboard. If you cancel, you'll continue to receive boxes until the end of your current billing period.",
    },
    {
      question: "Do you ship internationally?",
      answer:
        "Currently, we ship to the United States, Canada, and select European countries. We're working on expanding our shipping options to more countries soon.",
    },
  ]

  return (
    <div className="min-h-screen bg-[#FCFAF7]">
      <Header />

      <main className="pt-24 pb-16">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-green-600 to-green-700 text-white py-16 mb-12">
          <div className="container mx-auto px-6">
            <div className="max-w-3xl mx-auto text-center">
              <Badge className="mb-4 px-4 py-1.5 text-sm bg-white text-green-700 hover:bg-gray-100">
                Subscribe & Save
              </Badge>
              <h1 className="text-4xl md:text-5xl font-bold mb-4">Experience Italy, Delivered Monthly</h1>
              <p className="text-lg md:text-xl opacity-90 mb-8">
                Join our subscription service and receive a curated box of authentic Italian products delivered to your
                doorstep every month.
              </p>
              <div className="flex justify-center">
                <Button
                  size="lg"
                  className="bg-white text-green-700 hover:bg-gray-100 rounded-full px-8"
                  onClick={() => document.getElementById("pricing")?.scrollIntoView({ behavior: "smooth" })}
                >
                  View Plans
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="mb-16">
          <div className="container mx-auto px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Why Subscribe?</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Our subscription service brings the best of Italy directly to your home, with carefully selected
                products and exclusive benefits.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {subscriptionBenefits.map((benefit, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow duration-300"
                >
                  <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mb-4">
                    <Image src={benefit.icon || "/placeholder.svg"} alt={benefit.title} width={24} height={24} />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{benefit.title}</h3>
                  <p className="text-gray-600">{benefit.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section id="pricing" className="mb-16">
          <div className="container mx-auto px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Choose Your Plan</h2>
              <p className="text-gray-600 max-w-2xl mx-auto mb-8">
                Select the subscription that best fits your Italian culinary journey.
              </p>

              <div className="inline-flex items-center bg-gray-100 rounded-full p-1 mb-8">
                <Button
                  variant={billingCycle === "monthly" ? "default" : "ghost"}
                  className={`rounded-full ${billingCycle === "monthly" ? "bg-green-500" : ""}`}
                  onClick={() => setBillingCycle("monthly")}
                >
                  Monthly
                </Button>
                <Button
                  variant={billingCycle === "yearly" ? "default" : "ghost"}
                  className={`rounded-full ${billingCycle === "yearly" ? "bg-green-500" : ""}`}
                  onClick={() => setBillingCycle("yearly")}
                >
                  Yearly <span className="ml-1 text-xs font-normal">Save 15%</span>
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {plans.map((plan) => (
                <motion.div
                  key={plan.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  viewport={{ once: true }}
                  className={`relative rounded-2xl overflow-hidden border ${
                    plan.popular ? "border-green-500 shadow-lg" : "border-gray-200 shadow-sm"
                  } hover:shadow-md transition-shadow duration-300`}
                >
                  {plan.popular && (
                    <div className="absolute top-0 right-0 bg-green-500 text-white px-4 py-1 text-sm font-medium">
                      Most Popular
                    </div>
                  )}
                  <div className="p-8 bg-white">
                    <div className={`w-12 h-12 rounded-full ${plan.color} mb-6`}></div>
                    <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                    <p className="text-gray-600 mb-6">{plan.description}</p>
                    <div className="mb-6">
                      <span className="text-4xl font-bold">
                        ${billingCycle === "monthly" ? plan.monthlyPrice : plan.yearlyPrice}
                      </span>
                      <span className="text-gray-500">/{billingCycle === "monthly" ? "month" : "year"}</span>
                    </div>
                    <Button
                      className={`w-full ${
                        plan.id === currentPlan
                          ? "bg-gray-200 text-gray-800 hover:bg-gray-300"
                          : plan.popular
                            ? "bg-green-500 hover:bg-green-600 text-white"
                            : "bg-gray-900 hover:bg-gray-800 text-white"
                      }`}
                      onClick={() => setCurrentPlan(plan.id)}
                    >
                      {plan.id === currentPlan ? "Current Plan" : "Select Plan"}
                    </Button>
                  </div>
                  <div className="p-8 bg-gray-50 border-t border-gray-200">
                    <h4 className="font-medium mb-4">What's included:</h4>
                    <ul className="space-y-3">
                      {plan.features.map((feature, index) => (
                        <li key={index} className="flex items-start">
                          {feature.included ? (
                            <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                          ) : (
                            <X className="h-5 w-5 text-gray-400 mr-2 flex-shrink-0" />
                          )}
                          <span className={feature.included ? "text-gray-700" : "text-gray-500"}>{feature.name}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Current Subscription Section (if user has one) */}
        {currentPlan && (
          <section className="mb-16">
            <div className="container mx-auto px-6">
              <Card>
                <CardHeader>
                  <CardTitle>Your Current Subscription</CardTitle>
                  <CardDescription>Manage your subscription details and preferences</CardDescription>
                </CardHeader>
                <CardContent>
                  <Tabs defaultValue="details">
                    <TabsList className="mb-6">
                      <TabsTrigger value="details">Subscription Details</TabsTrigger>
                      <TabsTrigger value="history">Billing History</TabsTrigger>
                      <TabsTrigger value="preferences">Preferences</TabsTrigger>
                    </TabsList>
                    <TabsContent value="details">
                      <div className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                          <div className="bg-gray-50 p-4 rounded-lg">
                            <h4 className="text-sm font-medium text-gray-500 mb-1">Current Plan</h4>
                            <p className="text-lg font-semibold">
                              {plans.find((p) => p.id === currentPlan)?.name} -{" "}
                              {billingCycle === "monthly" ? "Monthly" : "Annual"}
                            </p>
                          </div>
                          <div className="bg-gray-50 p-4 rounded-lg">
                            <h4 className="text-sm font-medium text-gray-500 mb-1">Next Billing Date</h4>
                            <p className="text-lg font-semibold">May 15, 2023</p>
                          </div>
                          <div className="bg-gray-50 p-4 rounded-lg">
                            <h4 className="text-sm font-medium text-gray-500 mb-1">Next Box Shipping</h4>
                            <p className="text-lg font-semibold">May 10, 2023</p>
                          </div>
                        </div>

                        <div className="border-t border-gray-200 pt-6">
                          <h4 className="font-medium mb-4">Upcoming Box Preview</h4>
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            {[1, 2, 3, 4].map((item) => (
                              <div key={item} className="bg-white border border-gray-200 rounded-lg p-3">
                                <div className="aspect-square relative mb-2">
                                  <Image
                                    src={`/placeholder.svg?height=100&width=100`}
                                    alt={`Product ${item}`}
                                    fill
                                    className="object-cover rounded-md"
                                  />
                                </div>
                                <p className="text-sm font-medium">Product {item}</p>
                              </div>
                            ))}
                          </div>
                          <div className="mt-4 flex justify-end">
                            <Button variant="outline" size="sm">
                              Customize Box
                            </Button>
                          </div>
                        </div>
                      </div>
                    </TabsContent>
                    <TabsContent value="history">
                      <div className="space-y-4">
                        {[
                          { date: "April 15, 2023", amount: "$49.99", status: "Paid" },
                          { date: "March 15, 2023", amount: "$49.99", status: "Paid" },
                          { date: "February 15, 2023", amount: "$49.99", status: "Paid" },
                        ].map((invoice, index) => (
                          <div key={index} className="flex justify-between items-center p-4 border-b border-gray-100">
                            <div>
                              <p className="font-medium">{invoice.date}</p>
                              <p className="text-sm text-gray-500">Invoice #{1000 + index}</p>
                            </div>
                            <div className="text-right">
                              <p className="font-medium">{invoice.amount}</p>
                              <Badge variant="outline" className="bg-green-50 text-green-700">
                                {invoice.status}
                              </Badge>
                            </div>
                          </div>
                        ))}
                      </div>
                    </TabsContent>
                    <TabsContent value="preferences">
                      <div className="space-y-6">
                        <div>
                          <h4 className="font-medium mb-4">Dietary Preferences</h4>
                          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                            {["Vegetarian", "Gluten-Free", "Dairy-Free", "Nut-Free", "Vegan", "No Alcohol"].map(
                              (pref, index) => (
                                <div key={index} className="flex items-center">
                                  <input
                                    type="checkbox"
                                    id={`pref-${index}`}
                                    className="h-4 w-4 rounded border-gray-300 text-green-600 focus:ring-green-500"
                                  />
                                  <label htmlFor={`pref-${index}`} className="ml-2 text-sm text-gray-700">
                                    {pref}
                                  </label>
                                </div>
                              ),
                            )}
                          </div>
                        </div>

                        <div>
                          <h4 className="font-medium mb-4">Product Preferences</h4>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {[
                              { name: "Cheese", level: 3 },
                              { name: "Pasta", level: 5 },
                              { name: "Olive Oil", level: 4 },
                              { name: "Wine", level: 2 },
                              { name: "Sweets", level: 3 },
                              { name: "Cured Meats", level: 4 },
                            ].map((category, index) => (
                              <div key={index} className="flex items-center">
                                <span className="w-24 text-sm">{category.name}</span>
                                <div className="flex-1 flex items-center">
                                  {[1, 2, 3, 4, 5].map((level) => (
                                    <button
                                      key={level}
                                      className={`h-4 w-4 rounded-full mx-1 ${
                                        level <= category.level ? "bg-green-500" : "bg-gray-200"
                                      }`}
                                    ></button>
                                  ))}
                                </div>
                                <span className="text-xs text-gray-500 w-16 text-right">
                                  {category.level === 1 ? "Rarely" : category.level === 5 ? "Frequently" : "Sometimes"}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div className="flex justify-end">
                          <Button>Save Preferences</Button>
                        </div>
                      </div>
                    </TabsContent>
                  </Tabs>
                </CardContent>
                <CardFooter className="flex justify-between border-t border-gray-200 pt-6">
                  <Button variant="outline">Skip Next Box</Button>
                  <Button variant="destructive">Cancel Subscription</Button>
                </CardFooter>
              </Card>
            </div>
          </section>
        )}

        {/* FAQ Section */}
        <section className="mb-16">
          <div className="container mx-auto px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Frequently Asked Questions</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Have questions about our subscription service? Find answers to common questions below.
              </p>
            </div>

            <div className="max-w-3xl mx-auto">
              <div className="space-y-6">
                {faqs.map((faq, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="bg-white rounded-lg p-6 shadow-sm"
                  >
                    <h3 className="text-lg font-semibold mb-2">{faq.question}</h3>
                    <p className="text-gray-600">{faq.answer}</p>
                  </motion.div>
                ))}
              </div>

              <div className="mt-12 text-center">
                <p className="text-gray-600 mb-4">Still have questions?</p>
                <Button className="bg-green-500 hover:bg-green-600">Contact Support</Button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
