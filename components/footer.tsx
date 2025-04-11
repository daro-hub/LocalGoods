import Link from "next/link"
import { Facebook, Instagram, Twitter, Youtube, Mail, MapPin, Phone } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white pt-16 pb-8">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <div>
            <h3 className="text-2xl font-bold mb-6">LocalGoods</h3>
            <p className="text-gray-400 mb-6">
              Bringing the authentic taste of Italy directly to your doorstep. Discover the finest local products from
              Italian artisans.
            </p>
            <div className="flex space-x-4">
              <Button
                variant="ghost"
                size="icon"
                className="text-gray-400 hover:text-white hover:bg-gray-800 rounded-full"
              >
                <Facebook className="h-5 w-5" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="text-gray-400 hover:text-white hover:bg-gray-800 rounded-full"
              >
                <Instagram className="h-5 w-5" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="text-gray-400 hover:text-white hover:bg-gray-800 rounded-full"
              >
                <Twitter className="h-5 w-5" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="text-gray-400 hover:text-white hover:bg-gray-800 rounded-full"
              >
                <Youtube className="h-5 w-5" />
              </Button>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-6">Quick Links</h4>
            <ul className="space-y-3">
              {["Home", "About Us", "Products", "Blog", "Contact"].map((item, index) => (
                <li key={index}>
                  <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-6">Categories</h4>
            <ul className="space-y-3">
              {["Cheese", "Pasta", "Oils & Vinegars", "Specialty", "Spreads", "Wine"].map((item, index) => (
                <li key={index}>
                  <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-6">Contact Us</h4>
            <ul className="space-y-4">
              <li className="flex items-start">
                <MapPin className="h-5 w-5 text-green-500 mr-3 mt-0.5" />
                <span className="text-gray-400">123 Olive Grove Street, Florence, Italy</span>
              </li>
              <li className="flex items-center">
                <Phone className="h-5 w-5 text-green-500 mr-3" />
                <span className="text-gray-400">+39 123 456 7890</span>
              </li>
              <li className="flex items-center">
                <Mail className="h-5 w-5 text-green-500 mr-3" />
                <span className="text-gray-400">info@localgoods.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-500 mb-4 md:mb-0">© {new Date().getFullYear()} LocalGoods. All rights reserved.</p>
            <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-6">
              <div className="flex space-x-6">
                {["Privacy Policy", "Terms of Service", "Shipping Policy", "Refund Policy"].map((item, index) => (
                  <Link key={index} href="#" className="text-gray-500 hover:text-white text-sm transition-colors">
                    {item}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
