"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Globe, Filter, Search, Download, Share2, Eye, Calendar, MapPin } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

const categories = [
  { id: "all", label: "ALL", count: 48 },
  { id: "meetings", label: "MEETINGS", count: 12 },
  { id: "events", label: "EVENTS", count: 15 },
  { id: "conferences", label: "CONFERENCES", count: 8 },
  { id: "visits", label: "VISITS", count: 10 },
  { id: "statements", label: "STATEMENTS", count: 3 },
]

const galleryItems = [
  {
    id: 1,
    src: "/images/ablakwa-community.jpeg",
    alt: "Community engagement in North Tongu",
    category: "events",
    title: "North Tongu Community Engagement",
    date: "2025-01-15",
    location: "Aveyime-Battor, Volta Region",
    brief: "Hon. Ablakwa engaging with traditional leaders and community members in North Tongu constituency.",
    tags: ["community", "north-tongu", "engagement"],
  },
  {
    id: 2,
    src: "/images/ablakwa-official.jpeg",
    alt: "Official government ceremony",
    category: "statements",
    title: "Official Government Statement",
    date: "2025-01-10",
    location: "Ministry of Foreign Affairs, Accra",
    brief: "Minister Ablakwa delivering an official statement on Ghana's foreign policy initiatives.",
    tags: ["official", "statement", "policy"],
  },
  {
    id: 3,
    src: "/images/ablakwa-diplomacy.jpeg",
    alt: "Diplomatic meeting with international partners",
    category: "meetings",
    title: "International Diplomatic Meeting",
    date: "2025-01-08",
    location: "Ministry of Foreign Affairs, Accra",
    brief: "High-level diplomatic discussions with international partners to strengthen bilateral relations.",
    tags: ["diplomacy", "international", "bilateral"],
  },
  {
    id: 4,
    src: "/images/ablakwa-meeting.jpeg",
    alt: "Ministerial conference",
    category: "conferences",
    title: "Ministerial Conference",
    date: "2025-01-05",
    location: "Accra International Conference Centre",
    brief: "Participating in a key ministerial conference on regional cooperation and development.",
    tags: ["conference", "ministerial", "cooperation"],
  },
  // Additional optimized items
  {
    id: 5,
    src: "/placeholder.svg?height=300&width=400",
    alt: "AU Summit participation",
    category: "conferences",
    title: "African Union Executive Council Meeting",
    date: "2024-12-20",
    location: "Addis Ababa, Ethiopia",
    brief: "Leading Ghana's delegation at the 46th AU Executive Council Meeting in Addis Ababa.",
    tags: ["AU", "africa", "summit"],
  },
  {
    id: 6,
    src: "/placeholder.svg?height=250&width=400",
    alt: "China-Ghana bilateral meeting",
    category: "meetings",
    title: "Ghana-China Strategic Partnership",
    date: "2024-12-15",
    location: "Beijing, China",
    brief: "High-level meeting with Chinese Foreign Minister Wang Yi to deepen bilateral cooperation.",
    tags: ["china", "bilateral", "partnership"],
  },
  {
    id: 7,
    src: "/placeholder.svg?height=350&width=400",
    alt: "Passport reform launch",
    category: "events",
    title: "Passport Reform Initiative Launch",
    date: "2024-12-10",
    location: "Ministry of Foreign Affairs, Accra",
    brief: "Launching the new passport delivery system and biometric integration reforms.",
    tags: ["passport", "reform", "innovation"],
  },
  {
    id: 8,
    src: "/placeholder.svg?height=280&width=400",
    alt: "UN Peacekeeping meeting",
    category: "conferences",
    title: "UN Peacekeeping Ministerial",
    date: "2024-12-05",
    location: "New York, USA",
    brief: "Delivering Ghana's statement at the UN Peacekeeping Ministerial Meeting.",
    tags: ["UN", "peacekeeping", "international"],
  },
  {
    id: 9,
    src: "/placeholder.svg?height=320&width=400",
    alt: "Algeria state visit",
    category: "visits",
    title: "Official Visit to Algeria",
    date: "2024-11-28",
    location: "Algiers, Algeria",
    brief: "Strengthening Ghana-Algeria relations through official diplomatic visit.",
    tags: ["algeria", "visit", "diplomacy"],
  },
  {
    id: 10,
    src: "/placeholder.svg?height=290&width=400",
    alt: "GIZ partnership meeting",
    category: "meetings",
    title: "German Development Cooperation",
    date: "2024-11-20",
    location: "Accra, Ghana",
    brief: "Engagement with GIZ on migration management and diaspora affairs.",
    tags: ["germany", "development", "migration"],
  },
  {
    id: 11,
    src: "/placeholder.svg?height=310&width=400",
    alt: "Ministry staff durbar",
    category: "events",
    title: "Ministry Staff Welcome Durbar",
    date: "2024-11-15",
    location: "Ministry of Foreign Affairs, Accra",
    brief: "Welcome ceremony at the Ministry of Foreign Affairs outlining vision for excellence.",
    tags: ["ministry", "staff", "welcome"],
  },
  {
    id: 12,
    src: "/placeholder.svg?height=270&width=400",
    alt: "Economic diplomacy forum",
    category: "conferences",
    title: "Economic Diplomacy Forum",
    date: "2024-11-10",
    location: "Kempinski Hotel, Accra",
    brief: "Promoting Ghana's economic interests through strategic diplomatic engagement.",
    tags: ["economic", "diplomacy", "forum"],
  },
]

export default function MediaPage() {
  const [activeCategory, setActiveCategory] = useState("all")
  const [searchTerm, setSearchTerm] = useState("")
  const [visibleItems, setVisibleItems] = useState(12)
  const [isLoading, setIsLoading] = useState(false)

  const filteredItems = galleryItems.filter((item) => {
    const matchesCategory = activeCategory === "all" || item.category === activeCategory
    const matchesSearch =
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.brief.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()))
    return matchesCategory && matchesSearch
  })

  const displayedItems = filteredItems.slice(0, visibleItems)

  const loadMore = () => {
    setIsLoading(true)
    setTimeout(() => {
      setVisibleItems((prev) => prev + 12)
      setIsLoading(false)
    }, 500)
  }

  useEffect(() => {
    setVisibleItems(12)
  }, [activeCategory, searchTerm])

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white py-4 shadow-sm sticky top-0 z-40">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            {/* Left - Contact Info */}
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-amber-500 rounded-lg flex items-center justify-center">
                <Globe className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600 uppercase tracking-wide">VISIT US</p>
                <p className="text-sm text-gray-800">Ministry of Foreign Affairs</p>
                <p className="text-sm text-gray-800">Accra, Ghana</p>
              </div>
            </div>

            {/* Center - Logo/Name */}
            <div className="text-center">
              <div className="flex items-center justify-center space-x-2 mb-2">
                <div className="w-8 h-8 bg-amber-500 rounded-full flex items-center justify-center">
                  <Globe className="w-5 h-5 text-white" />
                </div>
                <h1 className="text-2xl font-bold text-gray-900">Samuel Okudzeto</h1>
                <div className="w-8 h-8 bg-amber-500 rounded-full flex items-center justify-center">
                  <Globe className="w-5 h-5 text-white" />
                </div>
              </div>
              <p className="text-lg font-semibold text-amber-600 uppercase tracking-wider">ABLAKWA</p>
              <p className="text-sm text-gray-600 uppercase tracking-wide">FOR FOREIGN AFFAIRS</p>
            </div>

            {/* Right - Support Button */}
            <div>
              <Button className="bg-amber-500 hover:bg-amber-600 text-white px-8 py-3 font-semibold uppercase tracking-wide">
                SUPPORT NOW
              </Button>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex justify-center space-x-12 mt-8 border-t pt-6">
            <Link href="/" className="text-gray-600 hover:text-amber-600 font-medium transition-colors">
              Home
            </Link>
            <Link href="/platform" className="text-gray-600 hover:text-amber-600 font-medium transition-colors">
              Our Platform
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
            <Link href="/media" className="text-amber-600 font-medium border-b-2 border-amber-600 pb-1">
              Media Gallery
            </Link>
            <Link href="/contact" className="text-gray-600 hover:text-amber-600 font-medium transition-colors">
              Contact
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-12 bg-gradient-to-r from-blue-900 to-blue-800 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="mb-4 bg-amber-600">Media Gallery</Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Visual Documentation</h1>
            <p className="text-xl text-blue-100">
              Explore moments from diplomatic engagements, community interactions, and official functions.
            </p>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          {/* Search and Filter Bar */}
          <div className="mb-8">
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search gallery..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                />
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <Filter className="w-5 h-5" />
                <span>
                  Showing {displayedItems.length} of {filteredItems.length} images
                </span>
              </div>
            </div>
          </div>

          {/* Category Tabs */}
          <div className="mb-8">
            <div className="flex flex-wrap gap-2 justify-center">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  className={`px-6 py-3 rounded-full font-medium transition-all duration-200 ${
                    activeCategory === category.id
                      ? "bg-amber-600 text-white shadow-lg"
                      : "bg-white text-gray-600 hover:bg-amber-50 hover:text-amber-600 shadow-sm"
                  }`}
                >
                  {category.label}
                  <span className="ml-2 text-sm opacity-75">
                    ({activeCategory === category.id ? filteredItems.length : category.count})
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Optimized Gallery Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {displayedItems.map((item) => (
              <Link key={item.id} href={`/media/${item.id}`}>
                <div className="group relative bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer">
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <Image
                      src={item.src || "/placeholder.svg"}
                      alt={item.alt}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                      loading="lazy"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                    {/* Hover Brief Overlay */}
                    <div className="absolute inset-0 p-4 flex flex-col justify-end opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="text-white">
                        <h3 className="font-semibold text-sm mb-1 line-clamp-2">{item.title}</h3>
                        <div className="flex items-center text-xs text-gray-200 mb-2">
                          <Calendar className="w-3 h-3 mr-1" />
                          <span>{new Date(item.date).toLocaleDateString()}</span>
                          <MapPin className="w-3 h-3 ml-2 mr-1" />
                          <span className="truncate">{item.location}</span>
                        </div>
                        <p className="text-xs text-gray-300 line-clamp-2">{item.brief}</p>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="flex space-x-2">
                        <button
                          className="p-2 bg-white/90 rounded-full hover:bg-white transition-colors"
                          onClick={(e) => {
                            e.preventDefault()
                            e.stopPropagation()
                            // Handle view action
                          }}
                        >
                          <Eye className="w-4 h-4 text-gray-700" />
                        </button>
                        <button
                          className="p-2 bg-white/90 rounded-full hover:bg-white transition-colors"
                          onClick={(e) => {
                            e.preventDefault()
                            e.stopPropagation()
                            // Handle share action
                          }}
                        >
                          <Share2 className="w-4 h-4 text-gray-700" />
                        </button>
                        <button
                          className="p-2 bg-white/90 rounded-full hover:bg-white transition-colors"
                          onClick={(e) => {
                            e.preventDefault()
                            e.stopPropagation()
                            // Handle download action
                          }}
                        >
                          <Download className="w-4 h-4 text-gray-700" />
                        </button>
                      </div>
                    </div>

                    {/* Category Badge */}
                    <div className="absolute top-2 left-2">
                      <Badge
                        variant="secondary"
                        className={`text-xs font-medium ${
                          item.category === "meetings"
                            ? "bg-blue-100 text-blue-700"
                            : item.category === "events"
                              ? "bg-green-100 text-green-700"
                              : item.category === "conferences"
                                ? "bg-purple-100 text-purple-700"
                                : item.category === "visits"
                                  ? "bg-orange-100 text-orange-700"
                                  : "bg-gray-100 text-gray-700"
                        }`}
                      >
                        {item.category.toUpperCase()}
                      </Badge>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* Load More Button */}
          {filteredItems.length > visibleItems && (
            <div className="text-center mt-12">
              <Button
                onClick={loadMore}
                disabled={isLoading}
                variant="outline"
                className="border-amber-600 text-amber-600 hover:bg-amber-50 px-8 py-3 bg-transparent"
              >
                {isLoading ? "Loading..." : `Load More Images (${filteredItems.length - visibleItems} remaining)`}
              </Button>
            </div>
          )}

          {/* No Results */}
          {filteredItems.length === 0 && (
            <div className="text-center py-12">
              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="w-12 h-12 text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No images found</h3>
              <p className="text-gray-600">Try adjusting your search terms or category filter.</p>
            </div>
          )}
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
          </div>
        </div>
      </footer>
    </div>
  )
}
