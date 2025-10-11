"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Star, ArrowRight, Globe, Users, FileText, Calendar, Heart, MessageSquare, Share2, MapPin, Mail, Clock } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export default function Home2Page() {
  return (
    <div className="min-h-screen bg-white">
      {/* Ghana flag ribbon */}
      <div className="h-1 bg-gradient-to-r from-red-600 via-yellow-500 to-green-600" />
      
      {/* Navigation Bar */}
      <header className="bg-white/95 backdrop-blur-md py-2 shadow-sm sticky top-0 z-50">
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
              <Link href="/home2" className="text-amber-600 font-medium border-b-2 border-amber-600 pb-1">
                Home
              </Link>
              <Link href="/platform" className="text-gray-700 hover:text-amber-600 font-medium transition-colors">
                Platform
              </Link>
              <Link href="/news" className="text-gray-700 hover:text-amber-600 font-medium transition-colors">
                News
              </Link>
              <Link href="/about" className="text-gray-700 hover:text-amber-600 font-medium transition-colors">
                About
              </Link>
              <Link href="/contact" className="text-gray-700 hover:text-amber-600 font-medium transition-colors">
                Contact
              </Link>
            </nav>

            {/* Right - CTA */}
            <Link href="/contact">
              <Button className="hidden md:inline-flex bg-amber-600 hover:bg-amber-700 text-white px-6 py-2 text-sm font-semibold rounded-lg">
                Get in Touch
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section - Modern Layout */}
      <section className="relative min-h-screen overflow-hidden bg-gradient-to-br from-gray-50 to-white">
        {/* Background Image - Right Side (40%) */}
        <div className="absolute right-0 top-0 w-[45%] h-full hidden lg:block">
          <Image
            src="/images/ablakwa-official.jpeg"
            alt="Hon. Samuel Okudzeto Ablakwa"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-white via-white/90 to-transparent"></div>
        </div>

        {/* Content - Left Side (60%) */}
        <div className="relative container mx-auto px-4 py-20 md:py-28">
          <div className="max-w-3xl">
            {/* Small Label */}
            <div className="flex items-center space-x-3 mb-8 animate-fade-in">
              <div className="h-px w-12 bg-amber-600"></div>
              <span className="text-sm font-semibold text-amber-600 uppercase tracking-wider">
                Dedicated Public Servant
              </span>
            </div>

            {/* Large Headline */}
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 leading-tight mb-8">
              Leading Ghana's
              <br />
              <span className="text-green-800">Diplomacy</span>
            </h1>

            {/* Subheading */}
            <p className="text-xl md:text-2xl text-gray-600 mb-12 max-w-2xl leading-relaxed">
              Advancing Ghana's interests on the global stage with transparency, 
              integrity, and a commitment to strengthening international partnerships 
              for national development.
            </p>

            {/* CTA Button */}
            <div className="flex flex-col sm:flex-row gap-4 mb-16">
              <Link href="/platform">
                <Button 
                  size="lg" 
                  className="bg-amber-600 hover:bg-amber-700 text-white px-8 py-6 text-lg font-semibold rounded-xl group transition-all hover:shadow-lg"
                >
                  View Our Platform
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link href="/about">
                <Button 
                  size="lg" 
                  variant="outline"
                  className="border-2 border-gray-300 hover:border-amber-600 hover:text-amber-600 px-8 py-6 text-lg font-semibold rounded-xl transition-all"
                >
                  Learn More
                </Button>
              </Link>
            </div>

            {/* Rating/Stats Section */}
            <div className="flex flex-wrap items-center gap-6 md:gap-8">
              {/* Star Rating */}
              <div className="flex flex-col">
                <div className="flex items-center space-x-1 mb-2">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-amber-500 text-amber-500" />
                  ))}
                </div>
                <p className="text-sm font-medium text-gray-700">
                  Trusted by Constituents
                </p>
              </div>

              {/* Divider */}
              <div className="h-12 w-px bg-gray-300"></div>

              {/* Achievements */}
              <div className="flex flex-col">
                <p className="text-3xl font-bold text-gray-900">15+</p>
                <p className="text-sm text-gray-600">Years of Service</p>
              </div>

              {/* Divider */}
              <div className="h-12 w-px bg-gray-300"></div>

              {/* Constituency */}
              <div className="flex flex-col">
                <p className="text-3xl font-bold text-gray-900">4-Term</p>
                <p className="text-sm text-gray-600">MP North Tongu</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Right Elements */}
        <div className="absolute bottom-8 right-8 hidden lg:flex flex-col space-y-3">
          <Link href="/">
            <Button 
              variant="outline" 
              className="bg-white/90 backdrop-blur-sm hover:bg-white border-gray-200 rounded-full px-6 py-3 font-medium group shadow-lg"
            >
              View Classic Home
              <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <Badge className="mb-4 bg-amber-100 text-amber-800 px-4 py-2">About Hon. Ablakwa</Badge>
              <h2 className="text-4xl font-bold mb-6 text-gray-900">Leading Ghana's Diplomatic Excellence</h2>
              <p className="text-gray-600 mb-6 leading-relaxed text-lg">
                Hon. Samuel Okudzeto Ablakwa is a distinguished Ghanaian statesman, currently serving as the Minister
                for Foreign Affairs and Member of Parliament for North Tongu in the Volta Region. Born on August 11,
                1980, in Aveyime-Battor, he has built a reputation as a dynamic parliamentarian and leading voice in
                Ghana's international relations.
              </p>
              <p className="text-gray-600 mb-8 leading-relaxed text-lg">
                With extensive educational credentials from the University of Ghana, University of Leicester, University
                of London, Ghana Armed Forces Command and Staff College, and Harvard Kennedy School, Hon. Ablakwa brings
                unparalleled expertise to his role.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                <div className="text-center p-6 bg-amber-50 rounded-xl hover:shadow-md transition-shadow">
                  <Globe className="w-10 h-10 text-amber-600 mx-auto mb-3" />
                  <h3 className="font-semibold text-gray-900 mb-1">International Relations</h3>
                  <p className="text-sm text-gray-600">Expert Diplomat</p>
                </div>
                <div className="text-center p-6 bg-green-50 rounded-xl hover:shadow-md transition-shadow">
                  <Users className="w-10 h-10 text-green-600 mx-auto mb-3" />
                  <p className="font-semibold text-gray-900 mb-1">Parliamentary Service</p>
                  <p className="text-sm text-gray-600">4-term MP</p>
                </div>
                <div className="text-center p-6 bg-amber-50 rounded-xl hover:shadow-md transition-shadow">
                  <FileText className="w-10 h-10 text-amber-600 mx-auto mb-3" />
                  <p className="font-semibold text-gray-900 mb-1">Anti-Corruption</p>
                  <p className="text-sm text-gray-600">ORAL Chairman</p>
                </div>
              </div>
              <Link href="/about">
                <Button className="bg-amber-600 hover:bg-amber-700 px-8 py-3 rounded-xl">Read Full Biography</Button>
              </Link>
            </div>
            <div className="relative">
              <Image
                src="/images/ablakwa-official.jpeg"
                alt="Hon. Samuel Okudzeto Ablakwa"
                width={600}
                height={700}
                className="rounded-2xl shadow-2xl"
              />
              <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-2xl shadow-xl">
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
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-amber-100 text-amber-800 px-4 py-2">Recent Achievements</Badge>
            <h2 className="text-4xl font-bold mb-4 text-gray-900">Transforming Ghana's Foreign Policy</h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg">
              Key diplomatic initiatives and reforms since assuming office as Foreign Minister in February 2025.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="hover:shadow-xl transition-shadow border-0 shadow-md">
              <CardContent className="p-8">
                <div className="w-14 h-14 bg-amber-100 rounded-xl flex items-center justify-center mb-6">
                  <FileText className="w-7 h-7 text-amber-600" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-gray-900">Passport Reforms</h3>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  Introduced courier delivery services and biometric integration across government platforms for
                  seamless national identification systems.
                </p>
                <Link href="/achievements">
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-amber-600 text-amber-600 hover:bg-amber-50 bg-transparent rounded-lg"
                  >
                    Learn More
                  </Button>
                </Link>
              </CardContent>
            </Card>
            <Card className="hover:shadow-xl transition-shadow border-0 shadow-md">
              <CardContent className="p-8">
                <div className="w-14 h-14 bg-green-100 rounded-xl flex items-center justify-center mb-6">
                  <Globe className="w-7 h-7 text-green-600" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-gray-900">Economic Diplomacy</h3>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  Secured $30 million grant from China and strengthened bilateral relations with key international
                  partners for national development.
                </p>
                <Link href="/achievements">
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-amber-600 text-amber-600 hover:bg-amber-50 bg-transparent rounded-lg"
                  >
                    Learn More
                  </Button>
                </Link>
              </CardContent>
            </Card>
            <Card className="hover:shadow-xl transition-shadow border-0 shadow-md">
              <CardContent className="p-8">
                <div className="w-14 h-14 bg-amber-100 rounded-xl flex items-center justify-center mb-6">
                  <Users className="w-7 h-7 text-amber-600" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-gray-900">Migration Coordination</h3>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  Established committees to address irregular migration and enhance diaspora engagement through
                  strategic partnerships.
                </p>
                <Link href="/achievements">
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-amber-600 text-amber-600 hover:bg-amber-50 bg-transparent rounded-lg"
                  >
                    Learn More
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Media Collage Gateway */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-amber-100 text-amber-800 px-4 py-2">Visual Stories</Badge>
            <h2 className="text-4xl font-bold mb-4 text-gray-900">Moments in Service</h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg">
              Capturing key moments from diplomatic engagements, community interactions, and official functions.
            </p>
          </div>

          {/* Image Collage Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
            <div className="space-y-4">
              <div className="relative group cursor-pointer overflow-hidden rounded-2xl shadow-lg">
                <Image
                  src="/images/ablakwa-community.jpeg"
                  alt="Community engagement"
                  width={300}
                  height={400}
                  className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300" />
              </div>
              <div className="relative group cursor-pointer overflow-hidden rounded-2xl shadow-lg">
                <Image
                  src="/images/ab22.jpg"
                  alt="Diplomatic meeting"
                  width={300}
                  height={200}
                  className="w-full h-32 object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300" />
              </div>
            </div>
            <div className="space-y-4">
              <div className="relative group cursor-pointer overflow-hidden rounded-2xl shadow-lg">
                <Image
                  src="/images/ab3.jpg"
                  alt="Official ceremony"
                  width={300}
                  height={150}
                  className="w-full h-24 object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300" />
              </div>
              <div className="relative group cursor-pointer overflow-hidden rounded-2xl shadow-lg">
                <Image
                  src="/images/ablakwa-official.jpeg"
                  alt="Official statement"
                  width={300}
                  height={350}
                  className="w-full h-72 object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300" />
              </div>
            </div>
            <div className="space-y-4">
              <div className="relative group cursor-pointer overflow-hidden rounded-2xl shadow-lg">
                <Image
                  src="/images/ablakwa-diplomacy.jpeg"
                  alt="International relations"
                  width={300}
                  height={300}
                  className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300" />
              </div>
              <div className="relative group cursor-pointer overflow-hidden rounded-2xl shadow-lg">
                <Image
                  src="/images/ab4.jpg"
                  alt="Parliamentary session"
                  width={300}
                  height={250}
                  className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300" />
              </div>
            </div>
            <div className="space-y-4">
              <div className="relative group cursor-pointer overflow-hidden rounded-2xl shadow-lg">
                <Image
                  src="/images/ab33.jpg"
                  alt="Youth engagement"
                  width={300}
                  height={180}
                  className="w-full h-32 object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300" />
              </div>
              <div className="relative group cursor-pointer overflow-hidden rounded-2xl shadow-lg">
                <Image
                  src="/images/ablakwa-meeting.jpeg"
                  alt="Ministerial meeting"
                  width={300}
                  height={320}
                  className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300" />
              </div>
            </div>
          </div>

          <div className="text-center">
            <Link href="/media">
              <Button className="bg-amber-600 hover:bg-amber-700 px-10 py-4 text-lg rounded-xl">View Full Gallery</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Recent News */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center mb-16">
            <div className="text-center md:text-left mb-6 md:mb-0">
              <Badge className="mb-4 bg-amber-100 text-amber-800 px-4 py-2">Latest Updates</Badge>
              <h2 className="text-4xl font-bold text-gray-900">Recent News & Diplomatic Activities</h2>
            </div>
            <Link href="/news">
              <Button variant="outline" className="border-2 border-amber-600 text-amber-600 hover:bg-amber-50 bg-transparent rounded-xl px-6 py-3">
                View All News
              </Button>
            </Link>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="hover:shadow-xl transition-shadow border-0 shadow-md overflow-hidden">
              <Image
                src="/images/ablakwa-diplomacy.jpeg"
                alt="Diplomatic meeting"
                width={400}
                height={250}
                className="w-full h-56 object-cover"
              />
              <CardContent className="p-6">
                <Badge className="mb-3 bg-amber-100 text-amber-800">International Relations</Badge>
                <h3 className="text-lg font-bold mb-2 text-gray-900">Strengthening Ghana-Middle East Relations</h3>
                <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                  High-level diplomatic meetings to enhance bilateral cooperation and economic partnerships.
                </p>
                <div className="flex items-center text-sm text-gray-500">
                  <Calendar className="w-4 h-4 mr-1" />
                  Recent
                </div>
              </CardContent>
            </Card>
            <Card className="hover:shadow-xl transition-shadow border-0 shadow-md overflow-hidden">
              <Image
                src="/images/ablakwa-meeting.jpeg"
                alt="Ministerial meeting"
                width={400}
                height={250}
                className="w-full h-56 object-cover"
              />
              <CardContent className="p-6">
                <Badge className="mb-3 bg-green-100 text-green-800">Policy</Badge>
                <h3 className="text-lg font-bold mb-2 text-gray-900">AU Executive Council Leadership</h3>
                <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                  Led Ghana's delegation at the 46th African Union Executive Council Meeting in Addis Ababa.
                </p>
                <div className="flex items-center text-sm text-gray-500">
                  <Calendar className="w-4 h-4 mr-1" />
                  2025
                </div>
              </CardContent>
            </Card>
            <Card className="hover:shadow-xl transition-shadow border-0 shadow-md overflow-hidden">
              <Image
                src="/images/ablakwa-community.jpeg"
                alt="Community engagement"
                width={400}
                height={250}
                className="w-full h-56 object-cover"
              />
              <CardContent className="p-6">
                <Badge className="mb-3 bg-green-100 text-green-800">Community</Badge>
                <h3 className="text-lg font-bold mb-2 text-gray-900">North Tongu Constituency Engagement</h3>
                <p className="text-gray-600 text-sm mb-4 leading-relaxed">
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
      <section className="py-20 bg-gradient-to-br from-green-900 to-green-800 text-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-amber-600 text-white px-4 py-2">Personal Profile</Badge>
            <h2 className="text-4xl font-bold mb-4">Know Your Representative</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            <div className="text-center p-6 bg-white/10 backdrop-blur-sm rounded-2xl hover:bg-white/20 transition-colors">
              <div className="w-20 h-20 bg-amber-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <Calendar className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-3">Born</h3>
              <p className="text-green-100">August 11, 1980</p>
              <p className="text-green-100">Aveyime-Battor, Volta Region</p>
            </div>
            <div className="text-center p-6 bg-white/10 backdrop-blur-sm rounded-2xl hover:bg-white/20 transition-colors">
              <div className="w-20 h-20 bg-amber-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <Users className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-3">Family</h3>
              <p className="text-green-100">Married to Nuhela Seidu</p>
              <p className="text-green-100">One daughter</p>
            </div>
            <div className="text-center p-6 bg-white/10 backdrop-blur-sm rounded-2xl hover:bg-white/20 transition-colors">
              <div className="w-20 h-20 bg-amber-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <Globe className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-3">Languages</h3>
              <p className="text-green-100">English, Ewe</p>
              <p className="text-green-100">Christianity</p>
            </div>
            <div className="text-center p-6 bg-white/10 backdrop-blur-sm rounded-2xl hover:bg-white/20 transition-colors">
              <div className="w-20 h-20 bg-amber-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <FileText className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-3">Education</h3>
              <p className="text-green-100">Harvard, University of London</p>
              <p className="text-green-100">University of Ghana, Leicester</p>
            </div>
          </div>
        </div>
      </section>

      {/* Social Media / X Posts */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-amber-100 text-amber-800 px-4 py-2">Latest Updates</Badge>
            <h2 className="text-4xl font-bold mb-4 text-gray-900">Recent Posts & Updates</h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg">
              Stay connected with the latest updates, thoughts, and announcements from Hon. Ablakwa.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            <Card className="hover:shadow-xl transition-shadow border-0 shadow-md">
              <CardContent className="p-8">
                <div className="flex items-start space-x-3 mb-6">
                  <div className="w-14 h-14 bg-gradient-to-br from-amber-600 to-amber-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-white font-bold text-lg">SA</span>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <h4 className="font-bold text-gray-900">Samuel Okudzeto Ablakwa</h4>
                      <Badge variant="outline" className="text-xs">
                        @ablakwaa
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-500">2 hours ago</p>
                  </div>
                </div>
                <p className="text-gray-700 mb-6 leading-relaxed">
                  Proud to announce the successful completion of passport delivery reforms. Over 5,000 passports
                  delivered directly to applicants' doorsteps in the first month. This is transformational governance in
                  action! 🇬🇭
                </p>
                <div className="flex items-center space-x-6 text-sm text-gray-500">
                  <span className="flex items-center space-x-1 hover:text-red-600 cursor-pointer transition-colors">
                    <Heart className="w-4 h-4" />
                    <span>234</span>
                  </span>
                  <span className="flex items-center space-x-1 hover:text-green-600 cursor-pointer transition-colors">
                    <MessageSquare className="w-4 h-4" />
                    <span>45</span>
                  </span>
                  <span className="flex items-center space-x-1 hover:text-amber-600 cursor-pointer transition-colors">
                    <Share2 className="w-4 h-4" />
                    <span>12</span>
                  </span>
                </div>
              </CardContent>
            </Card>

            <Card className="hover:shadow-xl transition-shadow border-0 shadow-md">
              <CardContent className="p-8">
                <div className="flex items-start space-x-3 mb-6">
                  <div className="w-14 h-14 bg-gradient-to-br from-amber-600 to-amber-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-white font-bold text-lg">SA</span>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <h4 className="font-bold text-gray-900">Samuel Okudzeto Ablakwa</h4>
                      <Badge variant="outline" className="text-xs">
                        @ablakwaa
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-500">1 day ago</p>
                  </div>
                </div>
                <p className="text-gray-700 mb-6 leading-relaxed">
                  Excellent discussions with the Chinese Foreign Minister Wang Yi on deepening Ghana-China strategic
                  partnership. Secured $30M grant for infrastructure development. Economic diplomacy at work! 🤝
                </p>
                <div className="flex items-center space-x-6 text-sm text-gray-500">
                  <span className="flex items-center space-x-1 hover:text-red-600 cursor-pointer transition-colors">
                    <Heart className="w-4 h-4" />
                    <span>456</span>
                  </span>
                  <span className="flex items-center space-x-1 hover:text-green-600 cursor-pointer transition-colors">
                    <MessageSquare className="w-4 h-4" />
                    <span>78</span>
                  </span>
                  <span className="flex items-center space-x-1 hover:text-amber-600 cursor-pointer transition-colors">
                    <Share2 className="w-4 h-4" />
                    <span>23</span>
                  </span>
                </div>
              </CardContent>
            </Card>

            <Card className="hover:shadow-xl transition-shadow border-0 shadow-md">
              <CardContent className="p-8">
                <div className="flex items-start space-x-3 mb-6">
                  <div className="w-14 h-14 bg-gradient-to-br from-amber-600 to-amber-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-white font-bold text-lg">SA</span>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <h4 className="font-bold text-gray-900">Samuel Okudzeto Ablakwa</h4>
                      <Badge variant="outline" className="text-xs">
                        @ablakwaa
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-500">3 days ago</p>
                  </div>
                </div>
                <p className="text-gray-700 mb-6 leading-relaxed">
                  Heartwarming community engagement in North Tongu today. Listening to constituents' concerns and
                  working together for sustainable development. The people's voice matters! 🗣️ #NorthTongu
                </p>
                <div className="flex items-center space-x-6 text-sm text-gray-500">
                  <span className="flex items-center space-x-1 hover:text-red-600 cursor-pointer transition-colors">
                    <Heart className="w-4 h-4" />
                    <span>189</span>
                  </span>
                  <span className="flex items-center space-x-1 hover:text-green-600 cursor-pointer transition-colors">
                    <MessageSquare className="w-4 h-4" />
                    <span>34</span>
                  </span>
                  <span className="flex items-center space-x-1 hover:text-amber-600 cursor-pointer transition-colors">
                    <Share2 className="w-4 h-4" />
                    <span>8</span>
                  </span>
                </div>
              </CardContent>
            </Card>
          </div>
          <div className="text-center mt-12">
            <Button variant="outline" className="border-2 border-amber-600 text-amber-600 hover:bg-amber-50 bg-transparent rounded-xl px-8 py-3">
              Follow on X (Twitter)
            </Button>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12">
            <div>
              <Badge className="mb-4 bg-amber-100 text-amber-800 px-4 py-2">Get in Touch</Badge>
              <h2 className="text-4xl font-bold mb-6 text-gray-900">Contact Hon. Ablakwa</h2>
              <p className="text-gray-600 mb-10 text-lg leading-relaxed">
                For constituency matters, diplomatic inquiries, or official communications, please reach out through our
                official channels.
              </p>
              <div className="space-y-6">
                <div className="flex items-center space-x-4 p-4 bg-white rounded-xl shadow-sm">
                  <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-6 h-6 text-amber-600" />
                  </div>
                  <div>
                    <p className="font-bold text-gray-900">Ministry of Foreign Affairs</p>
                    <p className="text-gray-600">Accra, Ghana</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4 p-4 bg-white rounded-xl shadow-sm">
                  <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Users className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <p className="font-bold text-gray-900">North Tongu Constituency</p>
                    <p className="text-gray-600">Volta Region, Ghana</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4 p-4 bg-white rounded-xl shadow-sm">
                  <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Mail className="w-6 h-6 text-amber-600" />
                  </div>
                  <div>
                    <p className="font-bold text-gray-900">Official Email</p>
                    <p className="text-gray-600">info@mfa.gov.gh</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4 p-4 bg-white rounded-xl shadow-sm">
                  <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Clock className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <p className="font-bold text-gray-900">Office Hours</p>
                    <p className="text-gray-600">Mon - Fri: 8:00 AM - 5:00 PM</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-white p-10 rounded-2xl shadow-lg">
              <h3 className="text-2xl font-bold mb-8 text-gray-900">Send a Message</h3>
              <form className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">First Name</label>
                    <input
                      type="text"
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Last Name</label>
                    <input
                      type="text"
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Email</label>
                  <input
                    type="email"
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Subject</label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Message</label>
                  <textarea
                    rows={5}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                  ></textarea>
                </div>
                <Button className="w-full bg-amber-600 hover:bg-amber-700 py-4 text-lg rounded-xl">Send Message</Button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-10">
            <div>
              <div className="flex items-center space-x-2 mb-6">
                <div className="w-12 h-12 bg-amber-600 rounded-xl flex items-center justify-center">
                  <Globe className="w-7 h-7 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-lg">Hon. Samuel Okudzeto Ablakwa</h3>
                  <p className="text-sm text-gray-400">Minister for Foreign Affairs</p>
                </div>
              </div>
              <p className="text-gray-400 text-sm leading-relaxed">
                Dedicated public servant advancing Ghana's interests through diplomatic excellence and transparent
                leadership.
              </p>
            </div>
            <div>
              <h4 className="font-bold text-lg mb-6">Quick Links</h4>
              <ul className="space-y-3 text-sm">
                <li>
                  <Link href="/about" className="text-gray-400 hover:text-amber-500 transition-colors">
                    About Hon. Ablakwa
                  </Link>
                </li>
                <li>
                  <Link href="/platform" className="text-gray-400 hover:text-amber-500 transition-colors">
                    Our Platform
                  </Link>
                </li>
                <li>
                  <Link href="/achievements" className="text-gray-400 hover:text-amber-500 transition-colors">
                    Achievements
                  </Link>
                </li>
                <li>
                  <Link href="/news" className="text-gray-400 hover:text-amber-500 transition-colors">
                    News & Updates
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-lg mb-6">Services</h4>
              <ul className="space-y-3 text-sm">
                <li>
                  <Link href="/north-tongu" className="text-gray-400 hover:text-amber-500 transition-colors">
                    North Tongu Portal
                  </Link>
                </li>
                <li>
                  <Link href="/speeches" className="text-gray-400 hover:text-amber-500 transition-colors">
                    Speeches & Reports
                  </Link>
                </li>
                <li>
                  <Link href="/media" className="text-gray-400 hover:text-amber-500 transition-colors">
                    Media Gallery
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="text-gray-400 hover:text-amber-500 transition-colors">
                    Contact Us
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-lg mb-6">Contact Info</h4>
              <ul className="space-y-3 text-sm text-gray-400 leading-relaxed">
                <li>Ministry of Foreign Affairs</li>
                <li>Accra, Ghana</li>
                <li className="pt-2">North Tongu Constituency</li>
                <li>Volta Region, Ghana</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-sm text-gray-400">
            <p>&copy; 2024 Hon. Samuel Okudzeto Ablakwa. All rights reserved.</p>
            <p className="text-xs text-gray-500 mt-2">Official Government Website</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
