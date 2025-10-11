"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Calendar,
  Users,
  FileText,
  Globe,
  Mail,
  MapPin,
  Clock,
  Star,
  ChevronLeft,
  ChevronRight,
  Heart,
  MessageSquare,
  Share2,
  ChevronDown,
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"

const heroImages = [
  {
    src: "/images/ablakwa-community.jpeg",
    alt: "Hon. Ablakwa engaging with community members in traditional attire",
    title: "Community Engagement",
    subtitle: "Connecting with the people of North Tongu",
  },
  {
    src: "/images/ablakwa-official.jpeg",
    alt: "Hon. Ablakwa at official government event",
    title: "Leadership in Action",
    subtitle: "Dedicated public service",
  },
  {
    src: "/images/ablakwa-diplomacy.jpeg",
    alt: "Hon. Ablakwa in diplomatic meeting",
    title: "International Diplomacy",
    subtitle: "Strengthening Ghana's global partnerships",
  },
  {
    src: "/images/ablakwa-meeting.jpeg",
    alt: "Hon. Ablakwa in ministerial meeting",
    title: "Ministerial Leadership",
    subtitle: "Advancing Ghana's foreign policy",
  },
]

export default function HomePage() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % heroImages.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % heroImages.length)
  }

  const prevImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex - 1 + heroImages.length) % heroImages.length)
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Ghana flag ribbon */}
      <div className="h-1 bg-gradient-to-r from-red-600 via-yellow-500 to-green-600" />
      {/* Header */}
      <header className="bg-white py-2 shadow-sm">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            {/* Left - Logo/Name */}
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 rounded-lg overflow-hidden flex items-center justify-center">
                <Image src="/logo_alakwa.png" alt="Site logo" width={48} height={48} priority />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Hon. Samuel Okudzeto Ablakwa</h1>
                <p className="text-sm text-amber-600 font-medium">Minister for Foreign Affairs & MP for North Tongu</p>
              </div>
            </div>

            {/* Right - Contact Info */}
            <div className="flex items-center space-x-6">
              <div className="text-right">
                <p className="text-sm font-medium text-gray-600">Ministry of Foreign Affairs</p>
                <p className="text-xs text-gray-500">P.O. Box M53, Accra | +233 (0) 302 664 951</p>
              </div>
              <Link href="/contact">
                <Button className="bg-amber-600 hover:bg-amber-700 text-white px-6 py-2 text-sm font-semibold">
                  CONTACT US
                </Button>
              </Link>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex justify-center space-x-8 mt-4 border-t pt-4">
            <div className="relative group">
              <Link href="/" className="text-amber-600 font-medium border-b-2 border-amber-600 pb-1">
                Home
              </Link>
              <div className="absolute left-0 mt-2 w-40 bg-white shadow-lg rounded-md opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                <Link href="/" className="block px-4 py-2 text-gray-700 hover:bg-amber-50 hover:text-amber-600 rounded-t-md">
                  Home
                </Link>
                <Link href="/home2" className="block px-4 py-2 text-gray-700 hover:bg-amber-50 hover:text-amber-600 rounded-b-md">
                  Home 2
                </Link>
              </div>
            </div>
            <Link href="/platform" className="text-gray-600 hover:text-amber-600 font-medium transition-colors">
              Our Platform
            </Link>
            <Link href="/north-tongu" className="text-gray-600 hover:text-amber-600 font-medium transition-colors">
              North Tongu Portal
            </Link>
            <Link href="/speeches" className="text-gray-600 hover:text-amber-600 font-medium transition-colors">
              Speeches & Reports
            </Link>
            <Link href="/about" className="text-gray-600 hover:text-amber-600 font-medium transition-colors">
              About
            </Link>
            <Link href="/news" className="text-gray-600 hover:text-amber-600 font-medium transition-colors">
              News & Events
            </Link>
            <Link href="/media" className="text-gray-600 hover:text-amber-600 font-medium transition-colors">
              Media Gallery
            </Link>
            <Link href="/contact" className="text-gray-600 hover:text-amber-600 font-medium transition-colors">
              Contact
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative h-screen overflow-hidden">
        <div className="absolute inset-0 pointer-events-none z-0">
          <Image
            src={heroImages[currentImageIndex].src || "/placeholder.svg"}
            alt={heroImages[currentImageIndex].alt}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/60"></div>
        </div>

        {/* Navigation Arrows */}
        <button
          onClick={prevImage}
          aria-label="Previous image"
          title="Previous image"
          className="absolute left-4 top-1/2 transform -translate-y-1/2 z-20 bg-white/20 hover:bg-white/30 rounded-full p-3 transition-colors"
        >
          <ChevronLeft className="w-6 h-6 text-white" />
        </button>
        <button
          onClick={nextImage}
          aria-label="Next image"
          title="Next image"
          className="absolute right-4 top-1/2 transform -translate-y-1/2 z-20 bg-white/20 hover:bg-white/30 rounded-full p-3 transition-colors"
        >
          <ChevronRight className="w-6 h-6 text-white" />
        </button>

        <div className="relative z-10 flex items-center justify-center h-full px-4">
          <div className="text-center text-white max-w-5xl mx-auto">
            <div className="mx-auto max-w-4xl bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 p-8 md:p-10 shadow-2xl">
              <Badge className="mb-6 bg-amber-600 text-white px-4 py-2 text-sm font-semibold">
                Minister for Foreign Affairs & MP for North Tongu
              </Badge>
              <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
                Dedicated Public
                <br />
                Servant for Ghana
              </h1>
              <div className="flex items-center justify-center space-x-4 mb-8">
                <div className="w-16 h-px bg-white"></div>
                <p className="text-lg font-semibold uppercase tracking-widest">
                  {heroImages[currentImageIndex].subtitle}
                </p>
                <div className="w-16 h-px bg-white"></div>
              </div>
              <p className="text-xl mb-8 text-gray-200 max-w-3xl mx-auto">
                Foreign Minister of Ghana • Member of Parliament, North Tongu • Proud Ghanaian • Pan-Africanist
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/about">
                  <Button className="bg-amber-500 hover:bg-amber-600 text-white px-12 py-4 text-lg font-semibold uppercase tracking-wide">
                    LEARN MORE
                  </Button>
                </Link>
                <Link href="/achievements">
                  <Button
                    variant="outline"
                    className="border-white text-white hover:bg-white hover:text-gray-900 px-12 py-4 text-lg font-semibold uppercase tracking-wide bg-transparent"
                  >
                    VIEW ACHIEVEMENTS
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <button
          type="button"
          onClick={() => {
            const about = document.getElementById("about")
            if (about) about.scrollIntoView({ behavior: "smooth", block: "start" })
          }}
          aria-label="Scroll to About section"
          className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 text-white/80 flex flex-col items-center gap-2 focus:outline-none"
        >
          <span className="text-xs tracking-widest uppercase">Scroll</span>
          <div className="w-8 h-8 rounded-full border border-white/40 flex items-center justify-center">
            <ChevronDown className="w-5 h-5" />
          </div>
        </button>

        {/* Image Indicators */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-3 z-20">
          {heroImages.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentImageIndex(index)}
              className={`w-3 h-3 rounded-full transition-colors ${
                index === currentImageIndex ? "bg-amber-500" : "bg-white/50"
              }`}
            />
          ))}
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <Badge className="mb-4 bg-amber-100 text-amber-800">About Hon. Ablakwa</Badge>
              <h2 className="text-3xl font-bold mb-6 text-gray-900">Leading Ghana's Diplomatic Excellence</h2>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Hon. Samuel Okudzeto Ablakwa is a distinguished Ghanaian statesman, currently serving as the Minister
                for Foreign Affairs and Member of Parliament for North Tongu in the Volta Region. Born on August 11,
                1980, in Aveyime-Battor, he has built a reputation as a dynamic parliamentarian and leading voice in
                Ghana's international relations.
              </p>
              <p className="text-gray-600 mb-6 leading-relaxed">
                With extensive educational credentials from the University of Ghana, University of Leicester, University
                of London, Ghana Armed Forces Command and Staff College, and Harvard Kennedy School, Hon. Ablakwa brings
                unparalleled expertise to his role.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                <div className="text-center p-4 bg-white rounded-lg shadow-sm">
                  <Globe className="w-8 h-8 text-amber-600 mx-auto mb-2" />
                  <h3 className="font-semibold text-gray-900">International Relations</h3>
                  <p className="text-sm text-gray-600">Expert Diplomat</p>
                </div>
                <div className="text-center p-4 bg-white rounded-lg shadow-sm">
                  <Users className="w-8 h-8 text-amber-600 mx-auto mb-2" />
                  <p className="font-semibold text-gray-900">Parliamentary Service</p>
                  <p className="text-sm text-gray-600">4-term MP</p>
                </div>
                <div className="text-center p-4 bg-white rounded-lg shadow-sm">
                  <FileText className="w-8 h-8 text-amber-600 mx-auto mb-2" />
                  <p className="font-semibold text-gray-900">Anti-Corruption</p>
                  <p className="text-sm text-gray-600">ORAL Chairman</p>
                </div>
              </div>
              <Button className="bg-amber-600 hover:bg-amber-700">Read Full Biography</Button>
            </div>
            <div className="relative">
              <Image
                src="/images/ablakwa-official.jpeg"
                alt="Hon. Samuel Okudzeto Ablakwa"
                width={500}
                height={600}
                className="rounded-lg shadow-lg"
              />
              <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-lg shadow-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-amber-600 rounded-full flex items-center justify-center">
                    <Star className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">Youngest Deputy Minister</p>
                    <p className="text-sm text-gray-600">Fourth Republic History</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Key Achievements */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-amber-100 text-amber-800">Recent Achievements</Badge>
            <h2 className="text-3xl font-bold mb-4 text-gray-900">Transforming Ghana's Foreign Policy</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Key diplomatic initiatives and reforms since assuming office as Foreign Minister in February 2025.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center mb-4">
                  <FileText className="w-6 h-6 text-amber-600" />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-gray-900">Passport Reforms</h3>
                <p className="text-gray-600 mb-4">
                  Introduced courier delivery services and biometric integration across government platforms for
                  seamless national identification systems.
                </p>
                <Button
                  variant="outline"
                  size="sm"
                  className="border-amber-600 text-amber-600 hover:bg-amber-50 bg-transparent"
                >
                  Learn More
                </Button>
              </CardContent>
            </Card>
            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center mb-4">
                  <Globe className="w-6 h-6 text-amber-600" />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-gray-900">Economic Diplomacy</h3>
                <p className="text-gray-600 mb-4">
                  Secured $30 million grant from China and strengthened bilateral relations with key international
                  partners for national development.
                </p>
                <Button
                  variant="outline"
                  size="sm"
                  className="border-amber-600 text-amber-600 hover:bg-amber-50 bg-transparent"
                >
                  Learn More
                </Button>
              </CardContent>
            </Card>
            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center mb-4">
                  <Users className="w-6 h-6 text-amber-600" />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-gray-900">Migration Coordination</h3>
                <p className="text-gray-600 mb-4">
                  Established committees to address irregular migration and enhance diaspora engagement through
                  strategic partnerships.
                </p>
                <Button
                  variant="outline"
                  size="sm"
                  className="border-amber-600 text-amber-600 hover:bg-amber-50 bg-transparent"
                >
                  Learn More
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Media Collage Gateway */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-amber-100 text-amber-800">Visual Stories</Badge>
            <h2 className="text-3xl font-bold mb-4 text-gray-900">Moments in Service</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Capturing key moments from diplomatic engagements, community interactions, and official functions.
            </p>
          </div>

          {/* Image Collage Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <div className="space-y-4">
              <div className="relative group cursor-pointer overflow-hidden rounded-lg">
                <Image
                  src="/images/ablakwa-community.jpeg"
                  alt="Community engagement"
                  width={300}
                  height={400}
                  className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
              </div>
              <div className="relative group cursor-pointer overflow-hidden rounded-lg">
                <Image
                  src="/images/ab22.jpg"
                  alt="Diplomatic meeting"
                  width={300}
                  height={200}
                  className="w-full h-32 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
              </div>
            </div>
            <div className="space-y-4">
              <div className="relative group cursor-pointer overflow-hidden rounded-lg">
                <Image
                  src="/images/ab3.jpg"
                  alt="Official ceremony"
                  width={300}
                  height={150}
                  className="w-full h-24 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
              </div>
              <div className="relative group cursor-pointer overflow-hidden rounded-lg">
                <Image
                  src="/images/ablakwa-official.jpeg"
                  alt="Official statement"
                  width={300}
                  height={350}
                  className="w-full h-72 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
              </div>
            </div>
            <div className="space-y-4">
              <div className="relative group cursor-pointer overflow-hidden rounded-lg">
                <Image
                  src="/images/ablakwa-diplomacy.jpeg"
                  alt="International relations"
                  width={300}
                  height={300}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
              </div>
              <div className="relative group cursor-pointer overflow-hidden rounded-lg">
                <Image
                  src="/images/ab4.jpg"
                  alt="Parliamentary session"
                  width={300}
                  height={250}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
              </div>
            </div>
            <div className="space-y-4">
              <div className="relative group cursor-pointer overflow-hidden rounded-lg">
                <Image
                  src="/images/ab33.jpg"
                  alt="Youth engagement"
                  width={300}
                  height={180}
                  className="w-full h-32 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
              </div>
              <div className="relative group cursor-pointer overflow-hidden rounded-lg">
                <Image
                  src="/images/ablakwa-meeting.jpeg"
                  alt="Ministerial meeting"
                  width={300}
                  height={320}
                  className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
              </div>
            </div>
          </div>

          <div className="text-center">
            <Link href="/media">
              <Button className="bg-amber-600 hover:bg-amber-700 px-8 py-3">View Full Gallery</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Recent News */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-12">
            <div>
              <Badge className="mb-4 bg-amber-100 text-amber-800">Latest Updates</Badge>
              <h2 className="text-3xl font-bold text-gray-900">Recent News & Diplomatic Activities</h2>
            </div>
            <Button variant="outline" className="border-amber-600 text-amber-600 hover:bg-amber-50 bg-transparent">
              View All News
            </Button>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="hover:shadow-lg transition-shadow">
              <Image
                src="/images/ablakwa-diplomacy.jpeg"
                alt="Diplomatic meeting"
                width={400}
                height={200}
                className="w-full h-48 object-cover rounded-t-lg"
              />
              <CardContent className="p-6">
                <Badge className="mb-2 bg-blue-100 text-blue-800">International Relations</Badge>
                <h3 className="text-lg font-semibold mb-2 text-gray-900">Strengthening Ghana-Middle East Relations</h3>
                <p className="text-gray-600 text-sm mb-4">
                  High-level diplomatic meetings to enhance bilateral cooperation and economic partnerships.
                </p>
                <div className="flex items-center text-sm text-gray-500">
                  <Calendar className="w-4 h-4 mr-1" />
                  Recent
                </div>
              </CardContent>
            </Card>
            <Card className="hover:shadow-lg transition-shadow">
              <Image
                src="/images/ablakwa-meeting.jpeg"
                alt="Ministerial meeting"
                width={400}
                height={200}
                className="w-full h-48 object-cover rounded-t-lg"
              />
              <CardContent className="p-6">
                <Badge className="mb-2 bg-green-100 text-green-800">Policy</Badge>
                <h3 className="text-lg font-semibold mb-2 text-gray-900">AU Executive Council Leadership</h3>
                <p className="text-gray-600 text-sm mb-4">
                  Led Ghana's delegation at the 46th African Union Executive Council Meeting in Addis Ababa.
                </p>
                <div className="flex items-center text-sm text-gray-500">
                  <Calendar className="w-4 h-4 mr-1" />
                  2025
                </div>
              </CardContent>
            </Card>
            <Card className="hover:shadow-lg transition-shadow">
              <Image
                src="/images/ablakwa-community.jpeg"
                alt="Community engagement"
                width={400}
                height={200}
                className="w-full h-48 object-cover rounded-t-lg"
              />
              <CardContent className="p-6">
                <Badge className="mb-2 bg-purple-100 text-purple-800">Community</Badge>
                <h3 className="text-lg font-semibold mb-2 text-gray-900">North Tongu Constituency Engagement</h3>
                <p className="text-gray-600 text-sm mb-4">
                  Continued commitment to serving the people of North Tongu with regular community interactions.
                </p>
                <div className="flex items-center text-sm text-gray-500">
                  <Calendar className="w-4 h-4 mr-1" />
                  Ongoing
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Personal Information */}
      <section className="py-16 bg-green-900 text-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-amber-600">Personal Profile</Badge>
            <h2 className="text-3xl font-bold mb-4">Know Your Representative</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            <div className="text-center">
              <div className="w-16 h-16 bg-amber-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Calendar className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Born</h3>
              <p className="text-green-200 text-sm">August 11, 1980</p>
              <p className="text-green-200 text-sm">Aveyime-Battor, Volta Region</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-amber-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Family</h3>
              <p className="text-green-200 text-sm">Married to Nuhela Seidu</p>
              <p className="text-green-200 text-sm">One daughter</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-amber-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Globe className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Languages</h3>
              <p className="text-green-200 text-sm">English, Ewe</p>
              <p className="text-green-200 text-sm">Christianity</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-amber-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <FileText className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Education</h3>
              <p className="text-green-200 text-sm">Harvard, University of London</p>
              <p className="text-green-200 text-sm">University of Ghana, Leicester</p>
            </div>
          </div>
        </div>
      </section>

      {/* Social Media / X Posts */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-amber-100 text-amber-800">Latest Updates</Badge>
            <h2 className="text-3xl font-bold mb-4 text-gray-900">Recent Posts & Updates</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Stay connected with the latest updates, thoughts, and announcements from Hon. Ablakwa.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start space-x-3 mb-4">
                  <div className="w-12 h-12 bg-amber-600 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-white font-bold text-lg">SA</span>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <h4 className="font-semibold text-gray-900">Samuel Okudzeto Ablakwa</h4>
                      <Badge variant="outline" className="text-xs">
                        @ablakwaa
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-500">2 hours ago</p>
                  </div>
                </div>
                <p className="text-gray-700 mb-4">
                  Proud to announce the successful completion of passport delivery reforms. Over 5,000 passports
                  delivered directly to applicants' doorsteps in the first month. This is transformational governance in
                  action! 🇬🇭
                </p>
                <div className="flex items-center space-x-4 text-sm text-gray-500">
                  <span className="flex items-center space-x-1">
                    <Heart className="w-4 h-4" />
                    <span>234</span>
                  </span>
                  <span className="flex items-center space-x-1">
                    <MessageSquare className="w-4 h-4" />
                    <span>45</span>
                  </span>
                  <span className="flex items-center space-x-1">
                    <Share2 className="w-4 h-4" />
                    <span>12</span>
                  </span>
                </div>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start space-x-3 mb-4">
                  <div className="w-12 h-12 bg-amber-600 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-white font-bold text-lg">SA</span>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <h4 className="font-semibold text-gray-900">Samuel Okudzeto Ablakwa</h4>
                      <Badge variant="outline" className="text-xs">
                        @ablakwaa
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-500">1 day ago</p>
                  </div>
                </div>
                <p className="text-gray-700 mb-4">
                  Excellent discussions with the Chinese Foreign Minister Wang Yi on deepening Ghana-China strategic
                  partnership. Secured $30M grant for infrastructure development. Economic diplomacy at work! 🤝
                </p>
                <div className="flex items-center space-x-4 text-sm text-gray-500">
                  <span className="flex items-center space-x-1">
                    <Heart className="w-4 h-4" />
                    <span>456</span>
                  </span>
                  <span className="flex items-center space-x-1">
                    <MessageSquare className="w-4 h-4" />
                    <span>78</span>
                  </span>
                  <span className="flex items-center space-x-1">
                    <Share2 className="w-4 h-4" />
                    <span>23</span>
                  </span>
                </div>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start space-x-3 mb-4">
                  <div className="w-12 h-12 bg-amber-600 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-white font-bold text-lg">SA</span>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <h4 className="font-semibold text-gray-900">Samuel Okudzeto Ablakwa</h4>
                      <Badge variant="outline" className="text-xs">
                        @ablakwaa
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-500">3 days ago</p>
                  </div>
                </div>
                <p className="text-gray-700 mb-4">
                  Heartwarming community engagement in North Tongu today. Listening to constituents' concerns and
                  working together for sustainable development. The people's voice matters! 🗣️ #NorthTongu
                </p>
                <div className="flex items-center space-x-4 text-sm text-gray-500">
                  <span className="flex items-center space-x-1">
                    <Heart className="w-4 h-4" />
                    <span>189</span>
                  </span>
                  <span className="flex items-center space-x-1">
                    <MessageSquare className="w-4 h-4" />
                    <span>34</span>
                  </span>
                  <span className="flex items-center space-x-1">
                    <Share2 className="w-4 h-4" />
                    <span>8</span>
                  </span>
                </div>
              </CardContent>
            </Card>
          </div>
          <div className="text-center mt-8">
            <Button variant="outline" className="border-amber-600 text-amber-600 hover:bg-amber-50 bg-transparent">
              Follow on X (Twitter)
            </Button>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12">
            <div>
              <Badge className="mb-4 bg-amber-100 text-amber-800">Get in Touch</Badge>
              <h2 className="text-3xl font-bold mb-6 text-gray-900">Contact Hon. Ablakwa</h2>
              <p className="text-gray-600 mb-8">
                For constituency matters, diplomatic inquiries, or official communications, please reach out through our
                official channels.
              </p>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center">
                    <MapPin className="w-5 h-5 text-amber-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">Ministry of Foreign Affairs</p>
                    <p className="text-gray-600">Accra, Ghana</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center">
                    <Users className="w-5 h-5 text-amber-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">North Tongu Constituency</p>
                    <p className="text-gray-600">Volta Region, Ghana</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center">
                    <Mail className="w-5 h-5 text-amber-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">Official Email</p>
                    <p className="text-gray-600">info@mfa.gov.gh</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center">
                    <Clock className="w-5 h-5 text-amber-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">Office Hours</p>
                    <p className="text-gray-600">Mon - Fri: 8:00 AM - 5:00 PM</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 p-8 rounded-lg">
              <h3 className="text-xl font-semibold mb-6 text-gray-900">Send a Message</h3>
              <form className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                    <input
                      type="text"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                    <input
                      type="text"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <input
                    type="email"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                  <textarea
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
                  ></textarea>
                </div>
                <Button className="w-full bg-amber-600 hover:bg-amber-700">Send Message</Button>
              </form>
            </div>
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
                Dedicated public servant advancing Ghana's interests through diplomatic excellence and transparent
                leadership.
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
                  <Link href="/achievements" className="text-gray-400 hover:text-white">
                    Achievements
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
                  <Link href="/constituency" className="text-gray-400 hover:text-white">
                    North Tongu Services
                  </Link>
                </li>
                <li>
                  <Link href="/diplomatic" className="text-gray-400 hover:text-white">
                    Diplomatic Services
                  </Link>
                </li>
                <li>
                  <Link href="/youth" className="text-gray-400 hover:text-white">
                    Youth Programs
                  </Link>
                </li>
                <li>
                  <Link href="/transparency" className="text-gray-400 hover:text-white">
                    Transparency Initiatives
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
            <p className="text-xs text-gray-500 mt-1">Created by Productivity Group</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
