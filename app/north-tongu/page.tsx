"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import {
  MapPin,
  Clock,
  Users,
  FileText,
  AlertTriangle,
  TrendingUp,
  Vote,
  Phone,
  Mail,
  Calendar,
  Camera,
  DollarSign,
  Droplets,
  Zap,
  Home,
  School,
  Building,
  Truck,
  Shield,
  Heart,
  ChevronRight,
  CheckCircle,
  AlertCircle,
  Info,
  Download,
  Upload,
  Search,
  Filter,
  Globe,
  Volume2,
  Accessibility,
  Star,
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export default function NorthTonguPortal() {
  const [selectedLanguage, setSelectedLanguage] = useState("english")
  const [activeService, setActiveService] = useState("overview")
  const [emergencyForm, setEmergencyForm] = useState({
    type: "",
    location: "",
    description: "",
    contact: "",
  })
  const [documentRequest, setDocumentRequest] = useState({
    type: "",
    purpose: "",
    contact: "",
    delivery: "",
  })
  const [pollResponse, setPollResponse] = useState("")

  const currentPrices = [
    { commodity: "Rice (Local)", price: "GH₵ 8.50", unit: "per kg", change: "+2.3%" },
    { commodity: "Maize", price: "GH₵ 3.20", unit: "per kg", change: "-1.1%" },
    { commodity: "Cassava", price: "GH₵ 2.80", unit: "per kg", change: "+0.5%" },
    { commodity: "Fish (Tilapia)", price: "GH₵ 15.00", unit: "per kg", change: "+3.2%" },
    { commodity: "Yam", price: "GH₵ 4.50", unit: "per kg", change: "+1.8%" },
    { commodity: "Plantain", price: "GH₵ 2.40", unit: "per piece", change: "-0.8%" },
  ]

  const ongoingProjects = [
    {
      title: "North Tongu Flood Defense System",
      progress: 65,
      budget: "GH₵ 2.5M",
      status: "In Progress",
      completion: "Dec 2024",
    },
    {
      title: "Community Health Center Expansion",
      progress: 40,
      budget: "GH₵ 1.8M",
      status: "Construction",
      completion: "Mar 2025",
    },
    {
      title: "Rural Road Network Improvement",
      progress: 85,
      budget: "GH₵ 3.2M",
      status: "Near Completion",
      completion: "Nov 2024",
    },
    {
      title: "Digital Literacy Program",
      progress: 30,
      budget: "GH₵ 500K",
      status: "Planning",
      completion: "Jun 2025",
    },
  ]

  const quickStats = {
    population: "142,618",
    communities: "98",
    emergencyReports: "12",
    serviceRequests: "156",
  }

  const emergencyContacts = [
    { service: "Police Emergency", number: "191", available: "24/7" },
    { service: "Fire Service", number: "192", available: "24/7" },
    { service: "Ambulance", number: "193", available: "24/7" },
    { service: "MP Office", number: "+233 24 123 4567", available: "Mon-Fri 8AM-6PM" },
    { service: "Assembly Office", number: "+233 24 765 4321", available: "Mon-Fri 8AM-5PM" },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
                         <Link href="/" className="flex items-center space-x-3">
               <div className="w-12 h-12 bg-gradient-to-br from-red-600 via-yellow-500 to-green-600 rounded-lg flex items-center justify-center p-1">
                 <img 
                   src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Ccircle cx='50' cy='50' r='40' fill='%23FFD700'/%3E%3Cpath d='M50 20 L55 35 L70 35 L58 45 L63 60 L50 50 L37 60 L42 45 L30 35 L45 35 Z' fill='%23000'/%3E%3C/svg%3E"
                   alt="Ghana Coat of Arms" 
                   className="w-8 h-8"
                 />
               </div>
               <div>
                 <h1 className="text-xl font-bold text-gray-900">North Tongu Portal</h1>
                 <p className="text-sm text-gray-600">24/7 Constituency Services</p>
               </div>
             </Link>

            <div className="flex items-center space-x-4">
              <Select value={selectedLanguage} onValueChange={setSelectedLanguage}>
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="english">English</SelectItem>
                  <SelectItem value="ewe">Eʋe</SelectItem>
                </SelectContent>
              </Select>
                             <Button variant="outline" size="sm" className="text-green-600 border-green-600 hover:bg-green-50">
                 <Volume2 className="w-4 h-4 mr-2" />
                 Audio
               </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-900 via-blue-800 to-amber-600 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <Badge className="mb-4 bg-amber-600 text-white">
                {selectedLanguage === "ewe" ? "Ɣletɔƒe Dɔwɔƒe" : "Constituency Portal"}
              </Badge>
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                {selectedLanguage === "ewe" 
                  ? "Dzigbe Fâ Tongu Ƒe Dɔwɔƒe" 
                  : "North Tongu 24/7 Services"}
              </h1>
              <p className="text-xl mb-8 text-blue-100">
                {selectedLanguage === "ewe"
                  ? "Dɔwɔwɔ kple dziƒlaƒla ŋkeke blibo la kple zã blibo la"
                  : "Digital services and community engagement available around the clock"}
              </p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold">{quickStats.population}</div>
                  <div className="text-sm text-green-200">Population</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold">{quickStats.communities}</div>
                  <div className="text-sm text-green-200">Communities</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold">{quickStats.serviceRequests}</div>
                  <div className="text-sm text-green-200">Active Requests</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold">24/7</div>
                  <div className="text-sm text-green-200">Service Hours</div>
                </div>
              </div>
            </div>
            <div className="relative">
              <Image
                src="/images/ablakwa-community.jpeg"
                alt="Hon. Ablakwa with North Tongu community"
                width={600}
                height={400}
                className="rounded-lg shadow-2xl"
              />
              <div className="absolute -bottom-6 -left-6 bg-white text-gray-900 p-4 rounded-lg shadow-lg">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="font-semibold">Services Online</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Action Cards */}
      <section className="py-12 -mt-8 relative z-10">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="hover:shadow-lg transition-shadow cursor-pointer border-l-4 border-l-red-500">
              <CardContent className="p-6">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                    <AlertTriangle className="w-6 h-6 text-red-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Emergency Report</h3>
                    <p className="text-sm text-gray-600">Report incidents instantly</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="hover:shadow-lg transition-shadow cursor-pointer border-l-4 border-l-blue-500">
              <CardContent className="p-6">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <FileText className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Document Request</h3>
                    <p className="text-sm text-gray-600">Birth certificates, letters</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="hover:shadow-lg transition-shadow cursor-pointer border-l-4 border-l-green-500">
              <CardContent className="p-6">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                    <TrendingUp className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Market Prices</h3>
                    <p className="text-sm text-gray-600">Daily commodity prices</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="hover:shadow-lg transition-shadow cursor-pointer border-l-4 border-l-amber-500">
              <CardContent className="p-6">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center">
                    <Vote className="w-6 h-6 text-amber-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Community Voice</h3>
                    <p className="text-sm text-gray-600">Polls & feedback</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Main Services Tabs */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <Tabs value={activeService} onValueChange={setActiveService} className="w-full">
            <TabsList className="grid w-full grid-cols-2 lg:grid-cols-6 mb-8">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="emergency">Emergency</TabsTrigger>
              <TabsTrigger value="documents">Documents</TabsTrigger>
              <TabsTrigger value="markets">Markets</TabsTrigger>
              <TabsTrigger value="projects">Projects</TabsTrigger>
              <TabsTrigger value="community">Community</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-8">
              {/* Live Market Prices */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <TrendingUp className="w-5 h-5 text-green-600" />
                    <span>Today's Market Prices</span>
                    <Badge variant="outline" className="text-xs">Live Updates</Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {currentPrices.map((item, index) => (
                      <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                        <div>
                          <h4 className="font-medium text-gray-900">{item.commodity}</h4>
                          <p className="text-sm text-gray-600">{item.unit}</p>
                        </div>
                        <div className="text-right">
                          <div className="text-lg font-bold text-gray-900">{item.price}</div>
                          <div className={`text-sm ${item.change.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                            {item.change}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-4 text-center">
                    <Button variant="outline" className="text-amber-600 border-amber-600">
                      View Full Price List
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Quick Emergency Contacts */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Phone className="w-5 h-5 text-red-600" />
                    <span>Emergency Contacts</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {emergencyContacts.map((contact, index) => (
                      <div key={index} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                        <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                          <Phone className="w-5 h-5 text-red-600" />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-medium text-gray-900">{contact.service}</h4>
                          <p className="text-sm font-bold text-red-600">{contact.number}</p>
                          <p className="text-xs text-gray-500">{contact.available}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Active Projects Overview */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Building className="w-5 h-5 text-blue-600" />
                    <span>Development Projects</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {ongoingProjects.slice(0, 3).map((project, index) => (
                      <div key={index} className="border rounded-lg p-4">
                        <div className="flex justify-between items-start mb-3">
                          <div>
                            <h4 className="font-semibold text-gray-900">{project.title}</h4>
                            <div className="flex items-center space-x-4 text-sm text-gray-600 mt-1">
                              <span>Budget: {project.budget}</span>
                              <span>Expected: {project.completion}</span>
                            </div>
                          </div>
                          <Badge variant={project.status === "Near Completion" ? "default" : "secondary"}>
                            {project.status}
                          </Badge>
                        </div>
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span>Progress</span>
                            <span>{project.progress}%</span>
                          </div>
                          <Progress value={project.progress} className="h-2" />
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-4 text-center">
                    <Button variant="outline" className="text-amber-600 border-amber-600">
                      View All Projects
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="emergency" className="space-y-6">
              <div className="grid lg:grid-cols-2 gap-8">
                <Card className="border-red-200">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2 text-red-600">
                      <AlertTriangle className="w-5 h-5" />
                      <span>Report Emergency</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select emergency type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="flood">Flooding</SelectItem>
                        <SelectItem value="fire">Fire Incident</SelectItem>
                        <SelectItem value="accident">Road Accident</SelectItem>
                        <SelectItem value="infrastructure">Infrastructure Damage</SelectItem>
                        <SelectItem value="health">Health Emergency</SelectItem>
                        <SelectItem value="security">Security Issue</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                    
                    <Input placeholder="Location (GPS will be captured)" />
                    
                    <Textarea 
                      placeholder="Describe the emergency situation..."
                      rows={4}
                    />
                    
                    <Input placeholder="Your contact number" />
                    
                    <div className="flex items-center space-x-2 p-3 bg-blue-50 rounded-lg">
                      <MapPin className="w-5 h-5 text-blue-600" />
                      <span className="text-sm text-blue-700">GPS location will be automatically captured</span>
                    </div>
                    
                    <Button className="w-full bg-red-600 hover:bg-red-700">
                      <AlertTriangle className="w-4 h-4 mr-2" />
                      Submit Emergency Report
                    </Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Clock className="w-5 h-5 text-blue-600" />
                      <span>Recent Emergency Reports</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-start space-x-3 p-3 bg-yellow-50 rounded-lg">
                        <div className="w-8 h-8 bg-yellow-200 rounded-full flex items-center justify-center">
                          <Droplets className="w-4 h-4 text-yellow-700" />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-medium text-gray-900">Flooding at Aveyime</h4>
                          <p className="text-sm text-gray-600">Heavy rains causing water accumulation</p>
                          <div className="flex items-center space-x-2 mt-1">
                            <Badge variant="outline" className="text-xs">In Progress</Badge>
                            <span className="text-xs text-gray-500">2 hours ago</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-start space-x-3 p-3 bg-green-50 rounded-lg">
                        <div className="w-8 h-8 bg-green-200 rounded-full flex items-center justify-center">
                          <CheckCircle className="w-4 h-4 text-green-700" />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-medium text-gray-900">Road Repair Completed</h4>
                          <p className="text-sm text-gray-600">Battor-Mepe road pothole fixed</p>
                          <div className="flex items-center space-x-2 mt-1">
                            <Badge className="text-xs bg-green-600">Resolved</Badge>
                            <span className="text-xs text-gray-500">1 day ago</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-start space-x-3 p-3 bg-red-50 rounded-lg">
                        <div className="w-8 h-8 bg-red-200 rounded-full flex items-center justify-center">
                          <Zap className="w-4 h-4 text-red-700" />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-medium text-gray-900">Power Outage</h4>
                          <p className="text-sm text-gray-600">Transformer issue at Juapong</p>
                          <div className="flex items-center space-x-2 mt-1">
                            <Badge variant="destructive" className="text-xs">Urgent</Badge>
                            <span className="text-xs text-gray-500">6 hours ago</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="documents" className="space-y-6">
              <div className="grid lg:grid-cols-2 gap-8">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <FileText className="w-5 h-5 text-blue-600" />
                      <span>Request Documents</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select document type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="birth">Birth Certificate</SelectItem>
                        <SelectItem value="recommendation">Letter of Recommendation</SelectItem>
                        <SelectItem value="residency">Residency Verification</SelectItem>
                        <SelectItem value="endorsement">Endorsement Letter</SelectItem>
                        <SelectItem value="introduction">Letter of Introduction</SelectItem>
                        <SelectItem value="scholarship">Scholarship Recommendation</SelectItem>
                      </SelectContent>
                    </Select>
                    
                    <Textarea 
                      placeholder="Purpose of document request..."
                      rows={3}
                    />
                    
                    <Input placeholder="Full name" />
                    <Input placeholder="Contact number" />
                    <Input placeholder="Email address" />
                    
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Delivery method" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="pickup">Office Pickup</SelectItem>
                        <SelectItem value="courier">Courier Delivery (+GH₵20)</SelectItem>
                        <SelectItem value="email">Email (Where applicable)</SelectItem>
                      </SelectContent>
                    </Select>
                    
                    <div className="p-4 bg-blue-50 rounded-lg">
                      <h4 className="font-medium text-blue-900 mb-2">Processing Times</h4>
                      <ul className="text-sm text-blue-700 space-y-1">
                        <li>• Letters: 2-3 business days</li>
                        <li>• Birth certificates: 5-7 business days</li>
                        <li>• Verification letters: 1-2 business days</li>
                      </ul>
                    </div>
                    
                    <Button className="w-full bg-blue-600 hover:bg-blue-700">
                      <FileText className="w-4 h-4 mr-2" />
                      Submit Document Request
                    </Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Search className="w-5 h-5 text-green-600" />
                      <span>Track Your Request</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex space-x-2">
                      <Input placeholder="Enter tracking number" className="flex-1" />
                      <Button variant="outline">Track</Button>
                    </div>
                    
                    <div className="space-y-4">
                      <h4 className="font-medium text-gray-900">Recent Requests</h4>
                      
                      <div className="border rounded-lg p-4">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <h5 className="font-medium text-gray-900">Birth Certificate - John Doe</h5>
                            <p className="text-sm text-gray-600">Ref: DOC-2024-001234</p>
                          </div>
                          <Badge className="bg-green-600">Ready</Badge>
                        </div>
                        <div className="flex items-center space-x-2 text-sm text-gray-500">
                          <Calendar className="w-4 h-4" />
                          <span>Submitted: Oct 25, 2024</span>
                        </div>
                      </div>
                      
                      <div className="border rounded-lg p-4">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <h5 className="font-medium text-gray-900">Recommendation Letter - Jane Smith</h5>
                            <p className="text-sm text-gray-600">Ref: DOC-2024-001235</p>
                          </div>
                          <Badge variant="secondary">Processing</Badge>
                        </div>
                        <div className="flex items-center space-x-2 text-sm text-gray-500">
                          <Calendar className="w-4 h-4" />
                          <span>Submitted: Oct 27, 2024</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="p-4 bg-amber-50 rounded-lg">
                      <h4 className="font-medium text-amber-900 mb-2">Need Help?</h4>
                      <p className="text-sm text-amber-700 mb-2">Contact our support team:</p>
                      <div className="space-y-1 text-sm text-amber-700">
                        <div className="flex items-center space-x-2">
                          <Phone className="w-4 h-4" />
                          <span>+233 24 123 4567</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Mail className="w-4 h-4" />
                          <span>documents@northtongu.gov.gh</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="markets" className="space-y-6">
              <div className="grid lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <TrendingUp className="w-5 h-5 text-green-600" />
                          <span>Live Market Prices</span>
                        </div>
                        <Badge variant="outline" className="text-xs">
                          Updated: {new Date().toLocaleTimeString()}
                        </Badge>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid md:grid-cols-2 gap-4">
                        {currentPrices.map((item, index) => (
                          <div key={index} className="border rounded-lg p-4">
                            <div className="flex justify-between items-start mb-2">
                              <div>
                                <h4 className="font-semibold text-gray-900">{item.commodity}</h4>
                                <p className="text-sm text-gray-600">{item.unit}</p>
                              </div>
                              <div className={`px-2 py-1 rounded text-xs font-medium ${
                                item.change.startsWith('+') 
                                  ? 'bg-green-100 text-green-700' 
                                  : 'bg-red-100 text-red-700'
                              }`}>
                                {item.change}
                              </div>
                            </div>
                            <div className="text-2xl font-bold text-gray-900">{item.price}</div>
                          </div>
                        ))}
                      </div>
                      
                      <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                        <h4 className="font-medium text-blue-900 mb-2">Price Alert Service</h4>
                        <p className="text-sm text-blue-700 mb-3">Get SMS notifications when prices change significantly</p>
                        <div className="flex space-x-2">
                          <Input placeholder="Your phone number" className="flex-1" />
                          <Button size="sm" className="bg-blue-600 hover:bg-blue-700">Subscribe</Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <div className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Market Locations</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                        <MapPin className="w-5 h-5 text-gray-600" />
                        <div>
                          <h5 className="font-medium text-gray-900">Aveyime Market</h5>
                          <p className="text-sm text-gray-600">Mon, Wed, Fri</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                        <MapPin className="w-5 h-5 text-gray-600" />
                        <div>
                          <h5 className="font-medium text-gray-900">Battor Market</h5>
                          <p className="text-sm text-gray-600">Tue, Thu, Sat</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                        <MapPin className="w-5 h-5 text-gray-600" />
                        <div>
                          <h5 className="font-medium text-gray-900">Mepe Market</h5>
                          <p className="text-sm text-gray-600">Daily</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Price Trends</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-600">Rice (This week)</span>
                          <span className="text-sm font-medium text-green-600">↗ +5.2%</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-600">Fish (This month)</span>
                          <span className="text-sm font-medium text-green-600">↗ +12.1%</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-600">Maize (This week)</span>
                          <span className="text-sm font-medium text-red-600">↘ -2.3%</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="projects" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Building className="w-5 h-5 text-blue-600" />
                    <span>Development Projects</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {ongoingProjects.map((project, index) => (
                      <div key={index} className="border rounded-lg p-6">
                        <div className="flex justify-between items-start mb-4">
                          <div className="flex-1">
                            <h3 className="text-lg font-semibold text-gray-900 mb-2">{project.title}</h3>
                            <div className="grid md:grid-cols-3 gap-4 text-sm">
                              <div>
                                <span className="text-gray-600">Budget:</span>
                                <span className="font-medium text-gray-900 ml-2">{project.budget}</span>
                              </div>
                              <div>
                                <span className="text-gray-600">Expected Completion:</span>
                                <span className="font-medium text-gray-900 ml-2">{project.completion}</span>
                              </div>
                              <div>
                                <span className="text-gray-600">Status:</span>
                                <Badge variant="outline" className="ml-2">{project.status}</Badge>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-600">Progress</span>
                            <span className="font-medium">{project.progress}% Complete</span>
                          </div>
                          <Progress value={project.progress} className="h-3" />
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="community" className="space-y-6">
              <div className="grid lg:grid-cols-2 gap-8">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Vote className="w-5 h-5 text-amber-600" />
                      <span>Community Poll</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="p-4 bg-amber-50 rounded-lg">
                      <h4 className="font-medium text-amber-900 mb-2">
                        Current Poll: What should be our next development priority?
                      </h4>
                      <div className="space-y-3">
                        <label className="flex items-center space-x-3 cursor-pointer">
                          <input 
                            type="radio" 
                            name="poll" 
                            value="healthcare" 
                            className="text-amber-600"
                            onChange={(e) => setPollResponse(e.target.value)}
                          />
                          <span>Healthcare Facilities Expansion</span>
                        </label>
                        <label className="flex items-center space-x-3 cursor-pointer">
                          <input 
                            type="radio" 
                            name="poll" 
                            value="education" 
                            className="text-amber-600"
                            onChange={(e) => setPollResponse(e.target.value)}
                          />
                          <span>Education Infrastructure</span>
                        </label>
                        <label className="flex items-center space-x-3 cursor-pointer">
                          <input 
                            type="radio" 
                            name="poll" 
                            value="roads" 
                            className="text-amber-600"
                            onChange={(e) => setPollResponse(e.target.value)}
                          />
                          <span>Road Network Improvement</span>
                        </label>
                        <label className="flex items-center space-x-3 cursor-pointer">
                          <input 
                            type="radio" 
                            name="poll" 
                            value="water" 
                            className="text-amber-600"
                            onChange={(e) => setPollResponse(e.target.value)}
                          />
                          <span>Water and Sanitation</span>
                        </label>
                      </div>
                      <Button className="w-full mt-4 bg-amber-600 hover:bg-amber-700">
                        Submit Vote
                      </Button>
                    </div>
                    
                    <div className="space-y-3">
                      <h4 className="font-medium text-gray-900">Current Results</h4>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Healthcare (45%)</span>
                          <span>234 votes</span>
                        </div>
                        <Progress value={45} className="h-2" />
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Roads (30%)</span>
                          <span>156 votes</span>
                        </div>
                        <Progress value={30} className="h-2" />
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Education (15%)</span>
                          <span>78 votes</span>
                        </div>
                        <Progress value={15} className="h-2" />
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Water (10%)</span>
                          <span>52 votes</span>
                        </div>
                        <Progress value={10} className="h-2" />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Users className="w-5 h-5 text-blue-600" />
                      <span>Community Feedback</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <Textarea 
                      placeholder="Share your thoughts, suggestions, or concerns..."
                      rows={4}
                    />
                    <Input placeholder="Your name (optional)" />
                    <Input placeholder="Your location in North Tongu" />
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="infrastructure">Infrastructure</SelectItem>
                        <SelectItem value="healthcare">Healthcare</SelectItem>
                        <SelectItem value="education">Education</SelectItem>
                        <SelectItem value="agriculture">Agriculture</SelectItem>
                        <SelectItem value="employment">Employment</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                    <Button className="w-full bg-blue-600 hover:bg-blue-700">
                      Submit Feedback
                    </Button>
                    
                    <div className="pt-4 border-t">
                      <h4 className="font-medium text-gray-900 mb-3">Recent Community Updates</h4>
                      <div className="space-y-3">
                        <div className="p-3 bg-green-50 rounded-lg">
                          <h5 className="font-medium text-green-900">Road Repair Update</h5>
                          <p className="text-sm text-green-700">
                            Following community feedback, the Battor-Aveyime road repairs have been scheduled for next month.
                          </p>
                          <span className="text-xs text-green-600">2 days ago</span>
                        </div>
                        <div className="p-3 bg-blue-50 rounded-lg">
                          <h5 className="font-medium text-blue-900">Health Center Hours Extended</h5>
                          <p className="text-sm text-blue-700">
                            Based on your feedback, the Mepe Health Center now operates until 10 PM on weekdays.
                          </p>
                          <span className="text-xs text-blue-600">1 week ago</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-10 h-10 bg-amber-600 rounded-lg flex items-center justify-center">
                  <MapPin className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-lg">North Tongu Portal</h3>
                  <p className="text-sm text-gray-400">24/7 Constituency Services</p>
                </div>
              </div>
              <p className="text-gray-400 text-sm">
                Empowering North Tongu with digital services that work around the clock for your convenience.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Quick Services</h4>
              <ul className="space-y-2 text-sm">
                <li><Link href="#emergency" className="text-gray-400 hover:text-white">Emergency Reporting</Link></li>
                <li><Link href="#documents" className="text-gray-400 hover:text-white">Document Requests</Link></li>
                <li><Link href="#markets" className="text-gray-400 hover:text-white">Market Prices</Link></li>
                <li><Link href="#community" className="text-gray-400 hover:text-white">Community Voice</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Contact Support</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li className="flex items-center space-x-2">
                  <Phone className="w-4 h-4" />
                  <span>+233 24 123 4567</span>
                </li>
                <li className="flex items-center space-x-2">
                  <Mail className="w-4 h-4" />
                  <span>support@northtongu.gov.gh</span>
                </li>
                <li className="flex items-center space-x-2">
                  <Clock className="w-4 h-4" />
                  <span>24/7 Online Support</span>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">About This Portal</h4>
              <p className="text-sm text-gray-400 mb-4">
                Part of Ghana's 24-hour economy initiative, bringing government services closer to the people.
              </p>
              <Link href="/" className="text-amber-600 hover:text-amber-500 text-sm">
                Visit Hon. Ablakwa's Main Website →
              </Link>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-400">
            <p>&copy; 2024 North Tongu Constituency Portal. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
} 