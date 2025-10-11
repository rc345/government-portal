import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Globe, Calendar, User, ArrowRight, Search, Filter } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export default function NewsPage() {
  const newsArticles = [
    {
      id: 1,
      title: "Ghana Secures $30M Grant for Infrastructure Development",
      excerpt: "Minister Ablakwa's diplomatic efforts with China yield significant funding for national infrastructure projects.",
      image: "/images/ablakwa-diplomacy.jpeg",
      author: "Ministry Communications",
      date: "2025-01-10",
      category: "International Relations",
      readTime: "3 min read"
    },
    {
      id: 2,
      title: "Revolutionary Passport Delivery System Launched",
      excerpt: "Over 5,000 passports delivered directly to citizens' homes in the first month of the new courier system.",
      image: "/images/ablakwa-official.jpeg",
      author: "Digital Services Team",
      date: "2025-01-08",
      category: "Digital Innovation",
      readTime: "4 min read"
    },
    {
      id: 3,
      title: "North Tongu Community Development Initiative",
      excerpt: "Minister Ablakwa announces new infrastructure projects for the North Tongu constituency.",
      image: "/images/ablakwa-community.jpeg",
      author: "Constituency Office",
      date: "2025-01-05",
      category: "Community Development",
      readTime: "5 min read"
    }
  ]

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="bg-white py-4">
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
            <Link href="/news" className="text-amber-600 font-medium border-b-2 border-amber-600 pb-1">
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
      <section className="py-16 bg-gradient-to-r from-green-900 to-green-800 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="mb-4 bg-amber-600">Latest News & Updates</Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">News & Events</h1>
            <p className="text-xl text-green-100">
              Stay informed with the latest updates, announcements, and diplomatic activities from Hon. Samuel Okudzeto Ablakwa.
            </p>
          </div>
        </div>
      </section>

      {/* Search and Filter Section */}
      <section className="py-8 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="flex-1 max-w-md">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search news and events..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>
            </div>
            <div className="flex gap-2">
              <select className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500">
                <option value="">All Categories</option>
                <option value="international">International Relations</option>
                <option value="digital">Digital Innovation</option>
                <option value="community">Community Development</option>
                <option value="policy">Policy Updates</option>
              </select>
              <Button variant="outline" className="border-amber-600 text-amber-600 hover:bg-amber-50">
                <Filter className="w-4 h-4 mr-2" />
                Filter
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Featured News */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="mb-12">
            <h2 className="text-3xl font-bold mb-4 text-gray-900">Featured News</h2>
            <p className="text-gray-600">Latest updates and important announcements</p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {newsArticles.map((article) => (
              <Card key={article.id} className="hover:shadow-lg transition-shadow">
                <div className="relative h-48 overflow-hidden rounded-t-lg">
                  <Image
                    src={article.image}
                    alt={article.title}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute top-4 left-4">
                    <Badge className="bg-amber-600">{article.category}</Badge>
                  </div>
                </div>
                <CardContent className="p-6">
                  <div className="flex items-center text-sm text-gray-500 mb-3">
                    <Calendar className="w-4 h-4 mr-1" />
                    <span className="mr-4">{article.date}</span>
                    <User className="w-4 h-4 mr-1" />
                    <span className="mr-4">{article.author}</span>
                    <span>{article.readTime}</span>
                  </div>
                  <h3 className="text-xl font-semibold mb-3 text-gray-900">{article.title}</h3>
                  <p className="text-gray-600 mb-4">{article.excerpt}</p>
                  <Button variant="outline" className="border-amber-600 text-amber-600 hover:bg-amber-50">
                    Read More <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="py-16 bg-amber-50">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4 text-gray-900">Stay Updated</h2>
            <p className="text-gray-600 mb-8">
              Subscribe to our newsletter to receive the latest news and updates directly in your inbox.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email address"
                className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
              <Button className="bg-amber-600 hover:bg-amber-700">Subscribe</Button>
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
                Dedicated public servant advancing Ghana's interests through diplomatic excellence and transparent leadership.
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