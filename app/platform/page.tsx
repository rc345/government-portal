import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Globe, Users, Briefcase, Heart, Shield, Lightbulb, Target, CheckCircle } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export default function PlatformPage() {
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
            <Link href="/platform" className="text-amber-600 font-medium border-b-2 border-amber-600 pb-1">
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
            <Badge className="mb-4 bg-amber-600">Our Platform</Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Vision for Ghana's Future</h1>
            <p className="text-xl text-green-100">
              A comprehensive agenda for diplomatic excellence, economic development, and transparent governance.
            </p>
          </div>
        </div>
      </section>

      {/* Core Pillars */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-amber-100 text-amber-800">Core Pillars</Badge>
            <h2 className="text-3xl font-bold mb-4 text-gray-900">Our Strategic Focus Areas</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Built on the foundation of ethical leadership, transparency, and transformational governance.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Globe className="w-8 h-8 text-amber-600" />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-gray-900">Diplomatic Excellence</h3>
                <p className="text-gray-600">
                  Strengthening Ghana's position on the global stage through strategic partnerships and multilateral
                  engagement.
                </p>
              </CardContent>
            </Card>
            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Briefcase className="w-8 h-8 text-amber-600" />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-gray-900">Economic Diplomacy</h3>
                <p className="text-gray-600">
                  Leveraging diplomatic relations to attract foreign investment and promote trade opportunities for
                  Ghana's development.
                </p>
              </CardContent>
            </Card>
            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Shield className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-gray-900">Transparent Governance</h3>
                <p className="text-gray-600">
                  Promoting accountability, ethical leadership, and transparent decision-making in all government
                  operations.
                </p>
              </CardContent>
            </Card>
            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-gray-900">Youth Empowerment</h3>
                <p className="text-gray-600">
                  Creating opportunities for young Ghanaians through education, skills development, and leadership
                  programs.
                </p>
              </CardContent>
            </Card>
            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Heart className="w-8 h-8 text-red-600" />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-gray-900">Community Development</h3>
                <p className="text-gray-600">
                  Improving infrastructure, healthcare, and education in North Tongu and across Ghana.
                </p>
              </CardContent>
            </Card>
            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Lightbulb className="w-8 h-8 text-orange-600" />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-gray-900">Innovation & Reform</h3>
                <p className="text-gray-600">
                  Implementing modern solutions and reforms to improve government efficiency and service delivery.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Foreign Policy Agenda */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-amber-100 text-amber-800">Foreign Policy</Badge>
            <h2 className="text-3xl font-bold mb-4 text-gray-900">Ghana's International Agenda</h2>
          </div>
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-2xl font-bold mb-6 text-gray-900">Key Foreign Policy Initiatives</h3>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-amber-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <CheckCircle className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">AfCFTA Implementation</h4>
                    <p className="text-gray-600">
                      Leading Ghana's active participation in the African Continental Free Trade Area to boost
                      intra-African trade and economic integration.
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-amber-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <CheckCircle className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Diaspora Engagement</h4>
                    <p className="text-gray-600">
                      Strengthening ties with Ghanaian communities abroad and facilitating their contribution to
                      national development through strategic partnerships.
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-amber-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <CheckCircle className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Climate Diplomacy</h4>
                    <p className="text-gray-600">
                      Advocating for climate action and sustainable development through multilateral partnerships and
                      green initiatives on the global stage.
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-amber-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <CheckCircle className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">South-South Cooperation</h4>
                    <p className="text-gray-600">
                      Promoting cooperation among developing nations to share knowledge, resources, and best practices
                      for mutual development.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <Image
                src="/images/ablakwa-diplomacy.jpeg"
                alt="Diplomatic engagement"
                width={500}
                height={400}
                className="rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Domestic Agenda */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-amber-100 text-amber-800">Domestic Agenda</Badge>
            <h2 className="text-3xl font-bold mb-4 text-gray-900">Serving North Tongu & Ghana</h2>
          </div>
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <Image
                src="/images/ablakwa-community.jpeg"
                alt="Community engagement"
                width={500}
                height={400}
                className="rounded-lg shadow-lg"
              />
            </div>
            <div>
              <h3 className="text-2xl font-bold mb-6 text-gray-900">Constituency Development Priorities</h3>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-amber-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <Target className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Infrastructure Development</h4>
                    <p className="text-gray-600">
                      Improving roads, bridges, healthcare facilities, and educational infrastructure in North Tongu
                      constituency.
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-amber-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <Target className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Agricultural Support</h4>
                    <p className="text-gray-600">
                      Supporting local farmers with modern farming techniques, equipment, and market access to boost
                      agricultural productivity.
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-amber-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <Target className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Education & Skills Development</h4>
                    <p className="text-gray-600">
                      Enhancing educational opportunities and vocational training programs to empower youth and build
                      local capacity.
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-amber-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <Target className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Healthcare Access</h4>
                    <p className="text-gray-600">
                      Improving healthcare delivery and access to quality medical services for all residents of North
                      Tongu constituency.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Anti-Corruption Initiatives */}
      <section className="py-16 bg-green-900 text-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-amber-600">Transparency & Accountability</Badge>
            <h2 className="text-3xl font-bold mb-4">Anti-Corruption Agenda</h2>
            <p className="text-green-100 max-w-2xl mx-auto">
              Leading the fight against corruption through transparent governance and accountability measures.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="bg-white/10 border-white/20">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-amber-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Shield className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-lg font-semibold mb-3">Operation Recover All Loot (ORAL)</h3>
                <p className="text-green-200 text-sm">
                  Chairman of President Mahama's flagship anti-corruption initiative to recover misappropriated state
                  resources.
                </p>
              </CardContent>
            </Card>
            <Card className="bg-white/10 border-white/20">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-amber-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Target className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-lg font-semibold mb-3">Transparency Initiatives</h3>
                <p className="text-green-200 text-sm">
                  Implementing clear KPIs for diplomatic missions and ensuring accountability in government operations.
                </p>
              </CardContent>
            </Card>
            <Card className="bg-white/10 border-white/20">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-amber-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Lightbulb className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-lg font-semibold mb-3">Ethical Leadership</h3>
                <p className="text-green-200 text-sm">
                  Promoting ethical standards and integrity in public service at all levels of government.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <Badge className="mb-4 bg-amber-100 text-amber-800">Join Our Movement</Badge>
            <h2 className="text-3xl font-bold mb-6 text-gray-900">Together We Can Build a Better Ghana</h2>
            <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
              Your support enables us to continue working towards a more prosperous, transparent, and internationally
              respected Ghana.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="bg-amber-600 hover:bg-amber-700 px-8 py-3">Support Our Platform</Button>
              <Button
                variant="outline"
                className="border-amber-600 text-amber-600 hover:bg-amber-50 px-8 py-3 bg-transparent"
              >
                Learn More
              </Button>
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
