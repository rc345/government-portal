"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Navigation } from "@/components/navigation"
import {
  Star,
  ArrowRight,
  Users,
  Globe,
  Award,
  TrendingUp,
  ChevronDown,
  Play,
  Heart,
  MessageSquare,
  Share2
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export default function Home2Page() {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />

      {/* Ghana flag ribbon */}
      <div className="h-1 bg-gradient-to-r from-red-600 via-yellow-500 to-green-600" />

      {/* Hero Section - 16:9 aspect ratio */}
      <section className="relative min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-green-900 overflow-hidden">
        {/* Background pattern overlay */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent"></div>
        </div>

        <div className="relative z-10 container mx-auto px-4 py-20">
          <div className="grid lg:grid-cols-5 gap-12 items-center min-h-[calc(100vh-200px)]">
            {/* Left side content - 60% width (3 out of 5 columns) */}
            <div className="lg:col-span-3 space-y-8">
              {/* Small label at top */}
              <div className="flex items-center space-x-2">
                <div className="h-px bg-amber-400 w-8"></div>
                <span className="text-amber-400 text-sm font-medium uppercase tracking-wider">
                  Minister for Foreign Affairs
                </span>
              </div>

              {/* Large headline */}
              <div className="space-y-4">
                <h1 className="text-6xl lg:text-7xl font-bold text-white leading-tight">
                  Leading Ghana's
                  <br />
                  <span className="text-amber-400">Diplomacy</span>
                </h1>

                {/* Subheading */}
                <p className="text-xl text-gray-300 max-w-2xl leading-relaxed">
                  Advance Ghana's interests through strategic diplomacy, building strong international partnerships, and promoting peace, prosperity, and development across Africa and beyond.
                </p>
              </div>

              {/* CTA Button */}
              <div className="flex flex-col sm:flex-row gap-4 items-start">
                <Link href="/contact">
                  <Button className="bg-amber-500 hover:bg-amber-600 text-black px-8 py-4 text-lg font-semibold rounded-full flex items-center space-x-2 group">
                    <span>Connect Now</span>
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
              </div>

              {/* Rating and reviews */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-4">
                <div className="flex items-center space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-amber-400 fill-current" />
                  ))}
                </div>
                <span className="text-gray-300 font-medium">1000+ Constituents Served</span>
              </div>

              {/* Achievement badges */}
              <div className="flex flex-wrap gap-3 pt-4">
                <Badge className="bg-amber-600 hover:bg-amber-700 text-white px-4 py-2 rounded-full">
                  <Award className="w-4 h-4 mr-2" />
                  AU Executive Council
                </Badge>
                <Badge className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-full">
                  <Globe className="w-4 h-4 mr-2" />
                  Diplomatic Excellence
                </Badge>
                <Badge className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-full">
                  <Users className="w-4 h-4 mr-2" />
                  Public Service
                </Badge>
              </div>
            </div>

            {/* Right side - Visual element */}
            <div className="lg:col-span-2 relative">
              <div className="relative bg-white/10 backdrop-blur-sm rounded-3xl p-8 border border-white/20">
                <div className="text-center space-y-6">
                  {/* Profile image placeholder */}
                  <div className="w-32 h-32 bg-gradient-to-br from-amber-400 to-amber-600 rounded-full mx-auto flex items-center justify-center">
                    <Globe className="w-16 h-16 text-white" />
                  </div>

                  <div>
                    <h3 className="text-2xl font-bold text-white mb-2">Hon. Samuel Okudzeto Ablakwa</h3>
                    <p className="text-amber-300 font-medium">Minister for Foreign Affairs</p>
                    <p className="text-gray-300 text-sm mt-2">MP for North Tongu Constituency</p>
                  </div>

                  {/* Stats */}
                  <div className="grid grid-cols-2 gap-4 pt-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-amber-400">4+</div>
                      <div className="text-sm text-gray-300">Years of Service</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-amber-400">30+</div>
                      <div className="text-sm text-gray-300">Diplomatic Missions</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating elements */}
              <div className="absolute -top-4 -right-4 bg-amber-500 text-black px-4 py-2 rounded-full font-semibold shadow-lg">
                <TrendingUp className="w-4 h-4 inline mr-2" />
                Rising Star
              </div>

              <div className="absolute -bottom-4 -left-4 bg-green-600 text-white px-4 py-2 rounded-full font-semibold shadow-lg">
                <Heart className="w-4 h-4 inline mr-2" />
                Trusted Leader
              </div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white/80">
          <div className="flex flex-col items-center space-y-2">
            <span className="text-xs uppercase tracking-widest">Explore More</span>
            <ChevronDown className="w-6 h-6 animate-bounce" />
          </div>
        </div>
      </section>

      {/* Quick Actions Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Take Action</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Connect with your representative and stay informed about diplomatic initiatives.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <Link href="/contact">
              <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-lg transition-shadow text-center group cursor-pointer">
                <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-amber-200 transition-colors">
                  <MessageSquare className="w-8 h-8 text-amber-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Contact Office</h3>
                <p className="text-gray-600">Reach out for constituency matters</p>
              </div>
            </Link>

            <Link href="/news">
              <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-lg transition-shadow text-center group cursor-pointer">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-blue-200 transition-colors">
                  <Globe className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Latest News</h3>
                <p className="text-gray-600">Stay updated on diplomatic developments</p>
              </div>
            </Link>

            <Link href="/about">
              <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-lg transition-shadow text-center group cursor-pointer">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-green-200 transition-colors">
                  <Users className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">About the Minister</h3>
                <p className="text-gray-600">Learn about our commitment to service</p>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <div className="w-8 h-8 rounded-lg overflow-hidden flex items-center justify-center">
                <Image src="/logo_alakwa.png" alt="Site logo" width={32} height={32} />
              </div>
              <span className="font-semibold">Hon. Samuel Okudzeto Ablakwa</span>
            </div>
            <p className="text-gray-400 text-sm">
              Minister for Foreign Affairs & Regional Integration • Republic of Ghana
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
