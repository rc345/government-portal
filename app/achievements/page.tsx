import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Globe, Calendar, Award, Users, Briefcase, Target, ArrowRight } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export default function AchievementsPage() {
  const achievements = [
    {
      id: 1,
      title: "Passport Delivery Revolution",
      description: "Launched Ghana's first-ever home delivery service for passports, delivering over 5,000 passports directly to citizens' doorsteps in the first month.",
      category: "Digital Innovation",
      date: "2025-01-01",
      impact: "Improved service delivery for 50,000+ citizens",
      status: "Ongoing",
      image: "/images/ablakwa-official.jpeg"
    },
    {
      id: 2,
      title: "$30M Infrastructure Grant from China",
      description: "Successfully negotiated a significant grant package for national infrastructure development through strategic diplomatic engagement.",
      category: "Economic Diplomacy",
      date: "2024-12-15",
      impact: "Major boost to national infrastructure",
      status: "Completed",
      image: "/images/ablakwa-diplomacy.jpeg"
    },
    {
      id: 3,
      title: "AU Executive Council Leadership",
      description: "Led Ghana's delegation at the 46th African Union Executive Council Meeting, strengthening continental partnerships.",
      category: "International Relations",
      date: "2024-11-20",
      impact: "Enhanced Ghana's continental leadership",
      status: "Completed",
      image: "/images/ablakwa-meeting.jpeg"
    },
    {
      id: 4,
      title: "Migration Coordination Framework",
      description: "Established comprehensive committees to address irregular migration and enhance diaspora engagement.",
      category: "Migration & Diaspora",
      date: "2024-10-10",
      impact: "Improved migration management",
      status: "Ongoing",
      image: "/images/ablakwa-community.jpeg"
    }
  ]

  const stats = [
    { label: "Diplomatic Agreements", value: "25", icon: Briefcase },
    { label: "Citizens Served", value: "50K+", icon: Users },
    { label: "Infrastructure Funding", value: "$30M", icon: Target },
    { label: "Policy Reforms", value: "12", icon: Award }
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
            <Badge className="mb-4 bg-amber-600">Track Record</Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Key Achievements</h1>
            <p className="text-xl text-green-100">
              Demonstrating tangible results in diplomatic excellence, service delivery, and national development.
            </p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardContent className="p-8">
                  <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <stat.icon className="w-8 h-8 text-amber-600" />
                  </div>
                  <h3 className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</h3>
                  <p className="text-gray-600">{stat.label}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Major Achievements */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="mb-12">
            <h2 className="text-3xl font-bold mb-4 text-gray-900">Major Accomplishments</h2>
            <p className="text-gray-600">Transformative initiatives that have made a real difference</p>
          </div>

          <div className="space-y-8">
            {achievements.map((achievement, index) => (
              <Card key={achievement.id} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-0">
                  <div className={`grid lg:grid-cols-2 gap-0 ${index % 2 === 1 ? 'lg:grid-flow-col-dense' : ''}`}>
                    <div className={`relative h-64 lg:h-auto ${index % 2 === 1 ? 'lg:col-start-2' : ''}`}>
                      <Image
                        src={achievement.image}
                        alt={achievement.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className={`p-8 flex flex-col justify-center ${index % 2 === 1 ? 'lg:col-start-1' : ''}`}>
                      <div className="flex items-center gap-3 mb-4">
                        <Badge 
                          className={`${
                            achievement.category === 'Digital Innovation' ? 'bg-green-100 text-green-800' :
                            achievement.category === 'Economic Diplomacy' ? 'bg-green-100 text-green-800' :
                            achievement.category === 'International Relations' ? 'bg-green-100 text-green-800' :
                            'bg-amber-100 text-amber-800'
                          }`}
                        >
                          {achievement.category}
                        </Badge>
                        <Badge 
                          variant="outline" 
                          className={achievement.status === 'Completed' ? 'border-green-500 text-green-700' : 'border-amber-500 text-amber-700'}
                        >
                          {achievement.status}
                        </Badge>
                      </div>
                      <h3 className="text-2xl font-bold mb-3 text-gray-900">{achievement.title}</h3>
                      <p className="text-gray-600 mb-4">{achievement.description}</p>
                      <div className="flex items-center text-sm text-gray-500 mb-4">
                        <Calendar className="w-4 h-4 mr-2" />
                        <span className="mr-4">{achievement.date}</span>
                        <Award className="w-4 h-4 mr-2" />
                        <span>{achievement.impact}</span>
                      </div>
                      <Button variant="outline" className="border-amber-600 text-amber-600 hover:bg-amber-50 w-fit">
                        Learn More <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-bold mb-4 text-gray-900">Achievement Timeline</h2>
            <p className="text-gray-600">A chronological view of key milestones</p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-amber-300"></div>
              
              <div className="space-y-8">
                {achievements.map((achievement, index) => (
                  <div key={achievement.id} className="relative flex items-start">
                    <div className="absolute left-6 w-4 h-4 bg-amber-600 rounded-full border-4 border-white shadow"></div>
                    <div className="ml-16">
                      <Card className="hover:shadow-md transition-shadow">
                        <CardContent className="p-6">
                          <div className="flex items-center gap-2 mb-2">
                            <Badge variant="outline">{achievement.date}</Badge>
                            <Badge className="bg-amber-100 text-amber-800">{achievement.category}</Badge>
                          </div>
                          <h4 className="text-lg font-semibold mb-2 text-gray-900">{achievement.title}</h4>
                          <p className="text-gray-600 text-sm">{achievement.description}</p>
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-amber-50">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4 text-gray-900">Building on Success</h2>
            <p className="text-gray-600 mb-8">
              These achievements represent just the beginning. Join us as we continue working towards a more prosperous and well-connected Ghana.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="bg-amber-600 hover:bg-amber-700">
                View Our Platform
              </Button>
              <Button variant="outline" className="border-amber-600 text-amber-600 hover:bg-amber-50">
                Get Involved
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