import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Globe, Calendar, Download, Play, FileText, Search, Filter } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export default function SpeechesPage() {
  const speeches = [
    {
      id: 1,
      title: "Ghana's Role in Global Diplomacy - AU Summit Address",
      description: "Minister Ablakwa's keynote address at the 46th African Union Executive Council Meeting in Addis Ababa.",
      date: "2025-01-15",
      venue: "African Union Headquarters, Ethiopia",
      type: "keynote",
      duration: "45 minutes",
      transcript: "/documents/au-summit-address-2025.pdf",
      video: "/videos/au-summit-address.mp4",
      thumbnail: "/images/ablakwa-meeting.jpeg"
    },
    {
      id: 2,
      title: "Digital Transformation in Diplomatic Services",
      description: "Parliamentary address on the modernization of Ghana's diplomatic and consular services.",
      date: "2025-01-08",
      venue: "Parliament House, Accra",
      type: "parliamentary",
      duration: "30 minutes",
      transcript: "/documents/digital-transformation-speech.pdf",
      video: "/videos/parliament-digital-speech.mp4",
      thumbnail: "/images/ablakwa-official.jpeg"
    },
    {
      id: 3,
      title: "Strengthening Ghana-China Strategic Partnership",
      description: "Press conference remarks following successful diplomatic negotiations with Chinese officials.",
      date: "2025-01-05",
      venue: "Ministry of Foreign Affairs, Accra",
      type: "press conference",
      duration: "25 minutes",
      transcript: "/documents/ghana-china-partnership.pdf",
      video: "/videos/china-partnership-presser.mp4",
      thumbnail: "/images/ablakwa-diplomacy.jpeg"
    }
  ]

  const reports = [
    {
      id: 1,
      title: "Annual Foreign Policy Report 2024",
      description: "Comprehensive review of Ghana's foreign policy achievements and diplomatic initiatives.",
      date: "2024-12-31",
      pages: 156,
      category: "Annual Report",
      downloadUrl: "/reports/foreign-policy-report-2024.pdf"
    },
    {
      id: 2,
      title: "Migration and Diaspora Engagement Strategy",
      description: "Strategic framework for managing migration and enhancing diaspora participation in national development.",
      date: "2024-11-20",
      pages: 89,
      category: "Policy Document",
      downloadUrl: "/reports/migration-diaspora-strategy.pdf"
    },
    {
      id: 3,
      title: "Economic Diplomacy Performance Review",
      description: "Assessment of Ghana's economic diplomacy efforts and their impact on national development.",
      date: "2024-10-15",
      pages: 67,
      category: "Performance Review",
      downloadUrl: "/reports/economic-diplomacy-review.pdf"
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
            <Link href="/speeches" className="text-amber-600 font-medium border-b-2 border-amber-600 pb-1">
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
      <section className="py-16 bg-gradient-to-r from-green-900 to-green-800 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="mb-4 bg-amber-600">Official Documents</Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Speeches & Reports</h1>
            <p className="text-xl text-green-100">
              Access official speeches, policy documents, and comprehensive reports on Ghana's foreign policy initiatives.
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
                  placeholder="Search speeches and reports..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>
            </div>
            <div className="flex gap-2">
              <select className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500">
                <option value="">All Types</option>
                <option value="keynote">Keynote Speeches</option>
                <option value="parliamentary">Parliamentary Addresses</option>
                <option value="press">Press Conferences</option>
                <option value="reports">Official Reports</option>
              </select>
              <Button variant="outline" className="border-amber-600 text-amber-600 hover:bg-amber-50">
                <Filter className="w-4 h-4 mr-2" />
                Filter
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Speeches Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="mb-12">
            <h2 className="text-3xl font-bold mb-4 text-gray-900">Recent Speeches</h2>
            <p className="text-gray-600">Key addresses and presentations by Hon. Samuel Okudzeto Ablakwa</p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {speeches.map((speech) => (
              <Card key={speech.id} className="hover:shadow-lg transition-shadow">
                <div className="relative h-48 overflow-hidden rounded-t-lg">
                  <Image
                    src={speech.thumbnail}
                    alt={speech.title}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                    <Button size="lg" className="bg-amber-600 hover:bg-amber-700">
                      <Play className="w-6 h-6 mr-2" />
                      Watch Speech
                    </Button>
                  </div>
                  <div className="absolute top-4 left-4">
                    <Badge className="bg-green-600 capitalize">{speech.type}</Badge>
                  </div>
                </div>
                <CardContent className="p-6">
                  <div className="flex items-center text-sm text-gray-500 mb-3">
                    <Calendar className="w-4 h-4 mr-1" />
                    <span className="mr-4">{speech.date}</span>
                    <span>{speech.duration}</span>
                  </div>
                  <h3 className="text-xl font-semibold mb-3 text-gray-900">{speech.title}</h3>
                  <p className="text-gray-600 mb-3">{speech.description}</p>
                  <p className="text-sm text-gray-500 mb-4">
                    <strong>Venue:</strong> {speech.venue}
                  </p>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="border-amber-600 text-amber-600 hover:bg-amber-50">
                      <Download className="w-4 h-4 mr-2" />
                      Transcript
                    </Button>
                    <Button size="sm" className="bg-amber-600 hover:bg-amber-700">
                      <Play className="w-4 h-4 mr-2" />
                      Watch
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Reports Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="mb-12">
            <h2 className="text-3xl font-bold mb-4 text-gray-900">Official Reports</h2>
            <p className="text-gray-600">Comprehensive reports and policy documents</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {reports.map((report) => (
              <Card key={report.id} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center">
                      <FileText className="w-6 h-6 text-amber-600" />
                    </div>
                    <Badge variant="secondary">{report.category}</Badge>
                  </div>
                  <h3 className="text-lg font-semibold mb-3 text-gray-900">{report.title}</h3>
                  <p className="text-gray-600 text-sm mb-4">{report.description}</p>
                  <div className="flex items-center text-xs text-gray-500 mb-4">
                    <Calendar className="w-3 h-3 mr-1" />
                    <span className="mr-4">{report.date}</span>
                    <span>{report.pages} pages</span>
                  </div>
                  <Button className="w-full bg-amber-600 hover:bg-amber-700">
                    <Download className="w-4 h-4 mr-2" />
                    Download PDF
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Archive Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-4 text-gray-900">Document Archive</h2>
            <p className="text-gray-600 mb-8">
              Access our comprehensive archive of speeches, reports, and policy documents dating back to 2017.
            </p>
            <Button size="lg" variant="outline" className="border-amber-600 text-amber-600 hover:bg-amber-50">
              Browse Full Archive
            </Button>
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