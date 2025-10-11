import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Globe, ArrowLeft, Calendar, MapPin, Tag, Share2, Download, Eye } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"

// This would typically come from a database or API
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
    description:
      "A comprehensive community engagement session where Hon. Samuel Okudzeto Ablakwa met with traditional leaders, youth groups, and community members in his North Tongu constituency. The meeting focused on discussing local development projects, addressing community concerns, and outlining plans for infrastructure improvements. The Minister emphasized the importance of grassroots participation in national development and assured constituents of his continued commitment to their welfare.",
    tags: ["community", "north-tongu", "engagement", "traditional-leaders", "development"],
    relatedImages: [
      "/images/ablakwa-official.jpeg",
      "/images/ablakwa-meeting.jpeg",
      "/placeholder.svg?height=300&width=400",
    ],
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
    description:
      "Hon. Ablakwa delivered a comprehensive statement outlining Ghana's foreign policy priorities for 2025. The statement covered key areas including economic diplomacy, regional integration, diaspora engagement, and Ghana's commitment to multilateral cooperation. The Minister emphasized Ghana's role as a beacon of democracy in Africa and outlined strategic initiatives to strengthen bilateral relations with key international partners.",
    tags: ["official", "statement", "policy", "foreign-affairs", "diplomacy"],
    relatedImages: [
      "/images/ablakwa-diplomacy.jpeg",
      "/images/ablakwa-community.jpeg",
      "/placeholder.svg?height=250&width=400",
    ],
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
    description:
      "A high-level diplomatic meeting with representatives from multiple countries to discuss strengthening bilateral relations and exploring new areas of cooperation. The discussions covered trade partnerships, cultural exchanges, educational collaborations, and joint initiatives in sustainable development. Hon. Ablakwa emphasized Ghana's commitment to fostering mutually beneficial relationships with international partners.",
    tags: ["diplomacy", "international", "bilateral", "cooperation", "partnerships"],
    relatedImages: [
      "/images/ablakwa-meeting.jpeg",
      "/images/ablakwa-official.jpeg",
      "/placeholder.svg?height=320&width=400",
    ],
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
    description:
      "Hon. Ablakwa participated in a crucial ministerial conference focused on regional cooperation and sustainable development in West Africa. The conference brought together ministers from ECOWAS member states to discuss common challenges and collaborative solutions. Key topics included trade facilitation, security cooperation, and joint infrastructure projects to boost regional integration.",
    tags: ["conference", "ministerial", "cooperation", "ecowas", "regional"],
    relatedImages: [
      "/images/ablakwa-diplomacy.jpeg",
      "/images/ablakwa-community.jpeg",
      "/placeholder.svg?height=280&width=400",
    ],
  },
]

interface PageProps {
  params: {
    id: string
  }
}

export default function MediaDetailPage({ params }: PageProps) {
  const item = galleryItems.find((item) => item.id === Number.parseInt(params.id))

  if (!item) {
    notFound()
  }

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

      {/* Back Navigation */}
      <section className="py-6 bg-white border-b">
        <div className="container mx-auto px-4">
          <Link href="/media" className="inline-flex items-center text-amber-600 hover:text-amber-700 font-medium">
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Gallery
          </Link>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Main Image and Details */}
            <div className="lg:col-span-2">
              <Card className="overflow-hidden shadow-lg">
                <div className="relative aspect-[4/3]">
                  <Image src={item.src || "/placeholder.svg"} alt={item.alt} fill className="object-cover" priority />
                  <div className="absolute top-4 left-4">
                    <Badge
                      className={`${
                        item.category === "meetings"
                          ? "bg-green-100 text-green-700"
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
                  <div className="absolute top-4 right-4">
                    <div className="flex space-x-2">
                      <Button size="sm" variant="secondary" className="bg-white/90 hover:bg-white">
                        <Eye className="w-4 h-4 mr-2" />
                        View
                      </Button>
                      <Button size="sm" variant="secondary" className="bg-white/90 hover:bg-white">
                        <Share2 className="w-4 h-4 mr-2" />
                        Share
                      </Button>
                      <Button size="sm" variant="secondary" className="bg-white/90 hover:bg-white">
                        <Download className="w-4 h-4 mr-2" />
                        Download
                      </Button>
                    </div>
                  </div>
                </div>
                <CardContent className="p-8">
                  <h1 className="text-3xl font-bold text-gray-900 mb-4">{item.title}</h1>
                  <div className="flex flex-wrap items-center gap-4 mb-6 text-sm text-gray-600">
                    <div className="flex items-center">
                      <Calendar className="w-4 h-4 mr-2" />
                      {new Date(item.date).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </div>
                    <div className="flex items-center">
                      <MapPin className="w-4 h-4 mr-2" />
                      {item.location}
                    </div>
                  </div>
                  <p className="text-gray-700 leading-relaxed mb-6">{item.description}</p>
                  <div className="flex items-center space-x-2">
                    <Tag className="w-4 h-4 text-gray-500" />
                    <div className="flex flex-wrap gap-2">
                      {item.tags.map((tag) => (
                        <Badge key={tag} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-8">
              {/* Image Details */}
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-semibold text-gray-900 mb-4">Image Details</h3>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Category:</span>
                      <span className="font-medium capitalize">{item.category}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Date:</span>
                      <span className="font-medium">{new Date(item.date).toLocaleDateString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Location:</span>
                      <span className="font-medium">{item.location}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Tags:</span>
                      <span className="font-medium">{item.tags.length}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Related Images */}
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-semibold text-gray-900 mb-4">Related Images</h3>
                  <div className="grid grid-cols-2 gap-3">
                    {item.relatedImages.map((src, index) => (
                      <div
                        key={index}
                        className="relative aspect-square rounded-lg overflow-hidden group cursor-pointer"
                      >
                        <Image
                          src={src || "/placeholder.svg"}
                          alt={`Related image ${index + 1}`}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-200"
                        />
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-200" />
                      </div>
                    ))}
                  </div>
                  <Button
                    variant="outline"
                    className="w-full mt-4 border-amber-600 text-amber-600 hover:bg-amber-50 bg-transparent"
                  >
                    View All Related
                  </Button>
                </CardContent>
              </Card>

              {/* Actions */}
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-semibold text-gray-900 mb-4">Actions</h3>
                  <div className="space-y-3">
                    <Button className="w-full bg-amber-600 hover:bg-amber-700">
                      <Download className="w-4 h-4 mr-2" />
                      Download High Resolution
                    </Button>
                    <Button
                      variant="outline"
                      className="w-full border-amber-600 text-amber-600 hover:bg-amber-50 bg-transparent"
                    >
                      <Share2 className="w-4 h-4 mr-2" />
                      Share Image
                    </Button>
                    <Button variant="outline" className="w-full bg-transparent">
                      <Eye className="w-4 h-4 mr-2" />
                      View in Lightbox
                    </Button>
                  </div>
                </CardContent>
              </Card>
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
          </div>
        </div>
      </footer>
    </div>
  )
}
