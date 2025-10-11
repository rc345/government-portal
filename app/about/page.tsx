import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Award, Globe, Users, BookOpen, Briefcase, GraduationCap } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export default function AboutPage() {
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
            <Link href="/about" className="text-amber-600 font-medium border-b-2 border-amber-600 pb-1">
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
      <section className="py-16 bg-gradient-to-r from-blue-900 to-blue-800 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="mb-4 bg-amber-600">About Hon. Ablakwa</Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Dedicated to Diplomatic Excellence</h1>
            <p className="text-xl text-blue-100">
              Leading Ghana's foreign policy with integrity, vision, and commitment to international cooperation.
            </p>
          </div>
        </div>
      </section>

      {/* Biography Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2">
              <h2 className="text-3xl font-bold mb-6 text-gray-900">Biography</h2>
              <div className="prose prose-lg max-w-none text-gray-600">
                <p className="mb-6">
                  The Honorable Samuel Okudzeto Ablakwa is a distinguished Ghanaian statesman, currently serving as the
                  Minister for Foreign Affairs and Regional Integration and Member of Parliament for North Tongu in the
                  Volta Region. Born on August 11, 1980, in Aveyime-Battor, Volta Region, Hon. Ablakwa has built a
                  reputation as a dynamic parliamentarian and a leading voice in Ghana's international relations and
                  domestic policy.
                </p>
                <p className="mb-6">
                  With over two decades of experience in public service, Hon. Ablakwa brings a wealth of knowledge and
                  expertise to Ghana's foreign policy agenda. His journey in public service began with a strong academic
                  foundation, having pursued studies at some of the world's most prestigious institutions, including the
                  University of Ghana, University of Leicester, University of London, Ghana Armed Forces Command and
                  Staff College, and Harvard Kennedy School of Governance.
                </p>
                <p className="mb-6">
                  Throughout his career, Hon. Ablakwa has been committed to ethical leadership, transparency, and
                  transformational governance. He made history as the youngest Deputy Minister in Ghana's Fourth
                  Republic when appointed in 2009, serving first as Deputy Minister for Information and later as Deputy
                  Minister for Education (Tertiary).
                </p>
                <p className="mb-6">
                  As a four-term Member of Parliament for North Tongu, he has been a vocal advocate for his constituents
                  and has served in various parliamentary committees, including as the former Ranking Member of the
                  Select Committee on Foreign Affairs. His leadership in anti-corruption efforts is exemplified by his
                  role as Chairman of President Mahama's flagship anti-corruption drive, Operation Recover All Loot
                  (ORAL).
                </p>
                <p>
                  Since assuming office as Minister for Foreign Affairs in February 2025, Hon. Ablakwa has focused on
                  strategic reforms to enhance efficiency and service delivery, including passport regime reforms,
                  economic diplomacy initiatives, and strengthening Ghana's international partnerships.
                </p>
              </div>
            </div>
            <div>
              <Card className="sticky top-8">
                <CardContent className="p-6">
                  <Image
                    src="/images/ablakwa-official.jpeg"
                    alt="Hon. Samuel Okudzeto Ablakwa"
                    width={250}
                    height={300}
                    className="w-full rounded-lg mb-6"
                  />
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-2">Full Name</h3>
                      <p className="text-gray-600">Samuel Okudzeto Ablakwa</p>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-2">Date of Birth</h3>
                      <p className="text-gray-600">August 11, 1980</p>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-2">Place of Birth</h3>
                      <p className="text-gray-600">Aveyime-Battor, Volta Region</p>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-2">Current Position</h3>
                      <p className="text-gray-600">Minister for Foreign Affairs & MP for North Tongu</p>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-2">Political Party</h3>
                      <p className="text-gray-600">National Democratic Congress (NDC)</p>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-2">Languages</h3>
                      <p className="text-gray-600">English, Ewe</p>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-2">Religion</h3>
                      <p className="text-gray-600">Christianity</p>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-2">Family</h3>
                      <p className="text-gray-600">Married to Nuhela Seidu, one daughter</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Education Timeline */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-amber-100 text-amber-800">Educational Journey</Badge>
            <h2 className="text-3xl font-bold text-gray-900">Academic Excellence</h2>
          </div>
          <div className="max-w-4xl mx-auto">
            <div className="space-y-8">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-amber-600 rounded-full flex items-center justify-center flex-shrink-0">
                  <GraduationCap className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    <h3 className="text-xl font-semibold text-gray-900">Harvard Kennedy School of Governance</h3>
                    <Badge>Executive Certificate</Badge>
                  </div>
                  <p className="text-gray-600">Executive Certificate in Leadership</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                  <BookOpen className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    <h3 className="text-xl font-semibold text-gray-900">
                      Ghana Armed Forces Command and Staff College
                    </h3>
                    <Badge variant="outline">M.Sc.</Badge>
                  </div>
                  <p className="text-gray-600">Master of Science in Defence and International Politics</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center flex-shrink-0">
                  <Users className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    <h3 className="text-xl font-semibold text-gray-900">University of London</h3>
                    <Badge variant="outline">LLB</Badge>
                  </div>
                  <p className="text-gray-600">Bachelor of Laws (Law)</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center flex-shrink-0">
                  <Globe className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    <h3 className="text-xl font-semibold text-gray-900">University of Leicester, UK</h3>
                    <Badge variant="outline">M.A.</Badge>
                  </div>
                  <p className="text-gray-600">Master of Arts in Communications, Media, and Public Relations</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center flex-shrink-0">
                  <Briefcase className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    <h3 className="text-xl font-semibold text-gray-900">University of Ghana</h3>
                    <Badge variant="outline">B.A.</Badge>
                  </div>
                  <p className="text-gray-600">Bachelor of Arts in Political Science and Philosophy</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-orange-600 rounded-full flex items-center justify-center flex-shrink-0">
                  <BookOpen className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    <h3 className="text-xl font-semibold text-gray-900">Presbyterian Boys' Secondary School</h3>
                    <Badge variant="outline">Secondary</Badge>
                  </div>
                  <p className="text-gray-600">Presec-Legon</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Career Timeline */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-amber-100 text-amber-800">Career Journey</Badge>
            <h2 className="text-3xl font-bold text-gray-900">Professional Timeline</h2>
          </div>
          <div className="max-w-4xl mx-auto">
            <div className="space-y-8">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-amber-600 rounded-full flex items-center justify-center flex-shrink-0">
                  <Briefcase className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    <h3 className="text-xl font-semibold text-gray-900">Minister for Foreign Affairs</h3>
                    <Badge>2025 - Present</Badge>
                  </div>
                  <p className="text-gray-600">
                    Leading Ghana's foreign policy agenda, strengthening diplomatic relations, and advancing national
                    interests through multilateral engagement.
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                  <Users className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    <h3 className="text-xl font-semibold text-gray-900">Member of Parliament, North Tongu</h3>
                    <Badge variant="outline">2013 - Present</Badge>
                  </div>
                  <p className="text-gray-600">
                    Four-term MP representing the people of North Tongu constituency in the Volta Region.
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center flex-shrink-0">
                  <BookOpen className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    <h3 className="text-xl font-semibold text-gray-900">Deputy Minister for Education (Tertiary)</h3>
                    <Badge variant="outline">2013 - 2017</Badge>
                  </div>
                  <p className="text-gray-600">Focused on tertiary education policy development and implementation.</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center flex-shrink-0">
                  <Globe className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    <h3 className="text-xl font-semibold text-gray-900">Deputy Minister for Information</h3>
                    <Badge variant="outline">2009 - 2013</Badge>
                  </div>
                  <p className="text-gray-600">Youngest Deputy Minister in Ghana's Fourth Republic history.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Awards and Recognition */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-amber-100 text-amber-800">Recognition</Badge>
            <h2 className="text-3xl font-bold text-gray-900">Awards & Honors</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Award className="w-8 h-8 text-amber-600" />
                </div>
                <h3 className="text-lg font-semibold mb-2 text-gray-900">Youngest Deputy Minister</h3>
                <p className="text-gray-600 text-sm mb-2">Ghana's Fourth Republic</p>
                <p className="text-gray-500 text-xs">2009</p>
              </CardContent>
            </Card>
            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-lg font-semibold mb-2 text-gray-900">NUGS President</h3>
                <p className="text-gray-600 text-sm mb-2">University of Ghana</p>
                <p className="text-gray-500 text-xs">2005-2006</p>
              </CardContent>
            </Card>
            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Briefcase className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-lg font-semibold mb-2 text-gray-900">ORAL Chairman</h3>
                <p className="text-gray-600 text-sm mb-2">Anti-Corruption Initiative</p>
                <p className="text-gray-500 text-xs">Mahama Administration</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Vision Statement */}
      <section className="py-16 bg-green-900 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="mb-6 bg-amber-600">Vision Statement</Badge>
            <h2 className="text-3xl font-bold mb-8">Our Diplomatic Vision</h2>
            <blockquote className="text-xl italic mb-8 text-green-100">
              "To position Ghana as a leading voice in international affairs, championing peace, democracy, and
              sustainable development while strengthening partnerships that benefit our people and contribute to global
              prosperity."
            </blockquote>
            <div className="grid md:grid-cols-3 gap-8 mt-12">
              <div className="text-center">
                <div className="w-16 h-16 bg-amber-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Globe className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Global Leadership</h3>
                <p className="text-blue-200 text-sm">Advancing Ghana's influence in international forums</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-amber-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Ethical Leadership</h3>
                <p className="text-blue-200 text-sm">Transparency and accountability in public service</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-amber-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Briefcase className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Economic Diplomacy</h3>
                <p className="text-blue-200 text-sm">Promoting trade and investment opportunities</p>
              </div>
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
