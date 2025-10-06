"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Globe, Menu, X } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <header className="bg-white shadow-sm border-b sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-10 h-10 rounded-lg overflow-hidden flex items-center justify-center">
              <Image src="/ablakwa_logo.png" alt="Site logo" width={40} height={40} priority />
            </div>
            <div>
              <h1 className="font-bold text-lg text-gray-900">Hon. Minister</h1>
              <p className="text-xs text-gray-600">Foreign Affairs</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            <Link href="/" className="text-gray-700 hover:text-amber-600 font-medium transition-colors">
              Home
            </Link>
            <Link href="/about" className="text-gray-700 hover:text-amber-600 font-medium transition-colors">
              About
            </Link>
            <Link href="/policies" className="text-gray-700 hover:text-amber-600 font-medium transition-colors">
              Policies
            </Link>
            <Link href="/news" className="text-gray-700 hover:text-amber-600 font-medium transition-colors">
              News
            </Link>
            <Link href="/services" className="text-gray-700 hover:text-amber-600 font-medium transition-colors">
              Services
            </Link>
            <Link href="/contact" className="text-gray-700 hover:text-amber-600 font-medium transition-colors">
              Contact
            </Link>
          </nav>

          <div className="flex items-center space-x-4">
            <Button className="hidden md:inline-flex bg-amber-600 hover:bg-amber-700">Book Appointment</Button>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2 rounded-md text-gray-700 hover:text-amber-600 hover:bg-gray-100"
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden py-4 border-t">
            <nav className="flex flex-col space-y-4">
              <Link
                href="/"
                className="text-gray-700 hover:text-amber-600 font-medium py-2"
                onClick={() => setIsOpen(false)}
              >
                Home
              </Link>
              <Link
                href="/about"
                className="text-gray-700 hover:text-amber-600 font-medium py-2"
                onClick={() => setIsOpen(false)}
              >
                About
              </Link>
              <Link
                href="/policies"
                className="text-gray-700 hover:text-amber-600 font-medium py-2"
                onClick={() => setIsOpen(false)}
              >
                Policies
              </Link>
              <Link
                href="/news"
                className="text-gray-700 hover:text-amber-600 font-medium py-2"
                onClick={() => setIsOpen(false)}
              >
                News
              </Link>
              <Link
                href="/services"
                className="text-gray-700 hover:text-amber-600 font-medium py-2"
                onClick={() => setIsOpen(false)}
              >
                Services
              </Link>
              <Link
                href="/contact"
                className="text-gray-700 hover:text-amber-600 font-medium py-2"
                onClick={() => setIsOpen(false)}
              >
                Contact
              </Link>
              <Button className="bg-amber-600 hover:bg-amber-700 mt-4">Book Appointment</Button>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}
