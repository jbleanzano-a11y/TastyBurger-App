import Link from "@/components/compat/Link"
import Image from "@/components/compat/Image"
import {
  Facebook,
  Instagram,
  Music2,
  MapPin,
  Phone,
  Mail,
  Clock,
} from "lucide-react"
import { motion } from "framer-motion"

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-surface border-t border-border">
      <div className="app-container py-14 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 lg:gap-12 mb-12">

          {/* BRAND */}
          <div>
            <div className="flex items-center mb-6 gap-2">
              <Image
                src="/logo.png"
                alt="Tasty Burger Logo"
                width={40}
                height={40}
                className="w-10 h-10 object-contain"
              />

              <span className="font-brand text-xl font-bold text-amber-600">
                TastyBurger
              </span>
            </div>

            <p className="text-base text-gray-700 leading-relaxed font-body font-medium">
              Fresh burgers, tasty starters, and refreshing drinks made for
              every craving.
            </p>
          </div>

          {/* QUICK LINKS */}
          <div>
            <h3 className="font-heading text-lg font-bold mb-6 text-gray-900">
              Quick Links
            </h3>

            <ul className="space-y-3 text-base font-body">
              <li>
                <Link
                  href="/"
                  className="text-gray-700 font-medium hover:text-primary transition-colors duration-200"
                >
                  Home
                </Link>
              </li>

              <li>
                <Link
                  href="/menu"
                  className="text-gray-700 font-medium hover:text-primary transition-colors duration-200"
                >
                  Menu
                </Link>
              </li>

              <li>
                <Link
                  href="/about"
                  className="text-gray-700 font-medium hover:text-primary transition-colors duration-200"
                >
                  About
                </Link>
              </li>

              <li>
                <Link
                  href="/contact"
                  className="text-gray-700 font-medium hover:text-primary transition-colors duration-200"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* CONTACT */}
          <div>
            <h3 className="font-heading text-lg font-bold mb-6 text-gray-900">
              Contact
            </h3>

            <ul className="space-y-4 text-base text-gray-700 font-body font-medium">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <span>Sorsogon City, Philippines</span>
              </li>

              <li className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <span>+63 917 123 4567</span>
              </li>

              <li className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <span>hello@tastyburger.com</span>
              </li>

              <li className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <span>Mon-Sun: 10AM - 10PM</span>
              </li>
            </ul>
          </div>

          {/* FOLLOW US */}
          <div>
            <h3 className="font-heading text-lg font-bold mb-6 text-gray-900">
              Follow Us
            </h3>

            <div className="flex gap-3">
              {[Facebook, Instagram, Music2].map((Icon, index) => (
                <motion.a
                  key={index}
                  href="#"
                  whileHover={{ y: -3, scale: 1.08 }}
                  whileTap={{ scale: 0.9 }}
                  className="gradient-click p-2.5 rounded-lg bg-primary text-white transition-all duration-200"
                  aria-label={
                    index === 0
                      ? "Facebook"
                      : index === 1
                        ? "Instagram"
                        : "TikTok"
                  }
                >
                  <Icon className="w-5 h-5" />
                </motion.a>
              ))}
            </div>
          </div>
        </div>

        {/* BOTTOM */}
        <div className="border-t border-border pt-8 flex flex-col sm:flex-row justify-between items-center text-sm text-gray-700">
          <div className="flex flex-col items-center sm:items-start">
            <p className="font-body font-medium">
              &copy; {currentYear} TastyBurger. All rights reserved.
            </p>

            <p className="mt-1 text-[#ca8a09] text-center w-full text-sm font-accent font-semibold">
              Designed &amp; Developed by Jubelle Anzano
            </p>
          </div>

          <div className="flex gap-6 mt-4 sm:mt-0 font-body font-medium">
            <Link
              href="#"
              className="text-gray-700 hover:text-primary transition-colors duration-200"
            >
              Privacy Policy
            </Link>

            <Link
              href="#"
              className="text-gray-700 hover:text-primary transition-colors duration-200"
            >
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
