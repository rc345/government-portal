"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Star, ArrowRight, Globe, Users, FileText } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export default function Home2Page() {
  return (
    <div className="min-h-screen bg-white">
      {/* Ghana flag ribbon */}
      <div className="h-1 bg-gradient-to-r from-red-600 via-yellow-500 to-green-600" />
      
      {/* Navigation Bar */}
      <header className="bg-white/80 backdrop-blur-md py-2 shadow-sm sticky top-0 z-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            {/* Left - Logo/Name */}
            <Link href="/" className="flex items-center space-x-4">
              <div className="w-12 h-12 rounded-lg overflow-hidden flex items-center justify-center">
                <Image src="/logo_alakwa.png" alt="Site logo" width={48} height={48} priority />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Hon. Samuel Okudzeto Ablakwa</h1>
                <p className="text-sm text-amber-600 font-medium">Minister for Foreign Affairs</p>
              </div>
            </Link>

            {/* Center - Navigation */}
            <nav className="hidden md:flex space-x-8">
              <Link href="/" className="text-amber-600 font-medium border-b-2 border-amber-600 pb-1">
                Home
              </Link>
              <Link href="/platform" className="text-gray-600 hover:text-amber-600 font-medium transition-colors">
                Platform
              </Link>
              <Link href="/news" className="text-gray-600 hover:text-amber-600 font-medium transition-colors">
                News
              </Link>
              <Link href="/about" className="text-gray-600 hover:text-amber-600 font-medium transition-colors">
                About
              </Link>
              <Link href="/contact" className="text-gray-600 hover:text-amber-600 font-medium transition-colors">
                Contact
              </Link>
            </nav>

            {/* Right - CTA */}
            <Link href="/contact">
              <Button className="hidden md:inline-flex bg-amber-600 hover:bg-amber-700 text-white px-6 py-2 text-sm font-semibold">
                Get in Touch
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section - Modern Layout */}
      <section className="relative min-h-screen overflow-hidden">
        {/* Background Image - Right Side (40%) */}
        <div className="absolute right-0 top-0 w-[40%] h-full">
          <Image
            src="/images/ablakwa-official.jpeg"
            alt="Hon. Samuel Okudzeto Ablakwa"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-white via-white/80 to-transparent"></div>
        </div>

        {/* Content - Left Side (60%) */}
        <div className="relative container mx-auto px-4 py-16 md:py-24">
          <div className="max-w-3xl">
            {/* Small Label */}
            <div className="flex items-center space-x-3 mb-8">
              <div className="h-px w-12 bg-amber-600"></div>
              <span className="text-sm font-medium text-amber-600 uppercase tracking-wider">
                Dedicated Public Servant
              </span>
            </div>

            {/* Large Headline */}
            <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold text-gray-900 leading-tight mb-8">
              Leading Ghana's
              <br />
              Diplomacy
            </h1>

            {/* Subheading */}
            <p className="text-xl md:text-2xl text-gray-600 mb-12 max-w-2xl leading-relaxed">
              Advancing Ghana's interests on the global stage with transparency, 
              integrity, and a commitment to strengthening international partnerships 
              for national development.
            </p>

            {/* CTA Button */}
            <Link href="/platform">
              <Button 
                size="lg" 
                className="bg-amber-600 hover:bg-amber-700 text-white px-8 py-6 text-lg font-semibold rounded-full group transition-all hover:shadow-lg"
              >
                Learn More
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>

            {/* Rating/Stats Section */}
            <div className="mt-16 flex items-center space-x-6">
              {/* Star Rating */}
              <div className="flex flex-col">
                <div className="flex items-center space-x-1 mb-2">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-amber-500 text-amber-500" />
                  ))}
                </div>
                <p className="text-sm font-medium text-gray-700">
                  Trusted by Constituents & Partners
                </p>
              </div>

              {/* Divider */}
              <div className="h-12 w-px bg-gray-300"></div>

              {/* Achievements */}
              <div className="flex flex-col">
                <p className="text-3xl font-bold text-gray-900">15+</p>
                <p className="text-sm text-gray-600">Years of Service</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Right Elements */}
        <div className="absolute bottom-8 right-8 flex flex-col space-y-3">
          <Link href="/">
            <Button 
              variant="outline" 
              className="bg-white/90 backdrop-blur-sm hover:bg-white border-gray-200 rounded-full px-6 py-3 font-medium group"
            >
              View Classic Home
              <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
          
          <div className="flex items-center justify-center space-x-2 bg-white/90 backdrop-blur-sm rounded-full px-4 py-2 text-sm text-gray-700">
            <Globe className="w-4 h-4 text-amber-600" />
            <span>Official Website</span>
          </div>
        </div>
      </section>

      {/* Quick Stats Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Globe className="w-8 h-8 text-amber-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-gray-900">International Relations</h3>
                <p className="text-gray-600">
                  Leading Ghana's diplomatic engagements and strengthening bilateral partnerships worldwide.
                </p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="w-8 h-8 text-amber-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-gray-900">Constituency Service</h3>
                <p className="text-gray-600">
                  Four-term MP for North Tongu, dedicated to community development and constituent welfare.
                </p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FileText className="w-8 h-8 text-amber-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-gray-900">Transparency & Accountability</h3>
                <p className="text-gray-600">
                  Chairman of ORAL, championing anti-corruption initiatives and ethical governance.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-10 h-10 bg-amber-600 rounded-lg flex items-center justify-center">
                  <Globe className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-lg">Hon. Samuel Okudzeto Ablakwa</h3>
                  <p className="text-sm text-gray-400">Minister for Foreign Affairs</p>
                </div>
              </div>
              <p className="text-gray-400 text-sm">
                Dedicated public servant advancing Ghana's interests through diplomatic excellence.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="/about" className="text-gray-400 hover:text-white">
                    About Hon. Ablakwa
                  </Link>
                </li>
                <li>
                  <Link href="/platform" className="text-gray-400 hover:text-white">
                    Our Platform
                  </Link>
                </li>
                <li>
                  <Link href="/news" className="text-gray-400 hover:text-white">
                    News & Updates
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Services</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="/north-tongu" className="text-gray-400 hover:text-white">
                    North Tongu Portal
                  </Link>
                </li>
                <li>
                  <Link href="/speeches" className="text-gray-400 hover:text-white">
                    Speeches & Reports
                  </Link>
                </li>
                <li>
                  <Link href="/media" className="text-gray-400 hover:text-white">
                    Media Gallery
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Contact Info</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>Ministry of Foreign Affairs</li>
                <li>Accra, Ghana</li>
                <li>North Tongu Constituency</li>
                <li>Volta Region, Ghana</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-400">
            <p>&copy; 2024 Hon. Samuel Okudzeto Ablakwa. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

