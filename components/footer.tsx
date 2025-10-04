import { Globe, Facebook, Twitter, Linkedin, Youtube } from "lucide-react"
import Link from "next/link"

export function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-10 h-10 bg-amber-600 rounded-lg flex items-center justify-center">
                <Globe className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="font-bold text-lg">Ministry of Foreign Affairs</h3>
                <p className="text-sm text-gray-400">Republic of Ghana</p>
              </div>
            </div>
            <p className="text-gray-400 text-sm mb-4">
              Advancing Ghana's interests through diplomatic excellence and international cooperation.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Youtube className="w-5 h-5" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/about" className="text-gray-400 hover:text-white transition-colors">
                  About Minister
                </Link>
              </li>
              <li>
                <Link href="/policies" className="text-gray-400 hover:text-white transition-colors">
                  Policies
                </Link>
              </li>
              <li>
                <Link href="/services" className="text-gray-400 hover:text-white transition-colors">
                  Consular Services
                </Link>
              </li>
              <li>
                <Link href="/news" className="text-gray-400 hover:text-white transition-colors">
                  News & Media
                </Link>
              </li>
              <li>
                <Link href="/transparency" className="text-gray-400 hover:text-white transition-colors">
                  Transparency
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Services</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/visa" className="text-gray-400 hover:text-white transition-colors">
                  Visa Information
                </Link>
              </li>
              <li>
                <Link href="/passport" className="text-gray-400 hover:text-white transition-colors">
                  Passport Services
                </Link>
              </li>
              <li>
                <Link href="/trade" className="text-gray-400 hover:text-white transition-colors">
                  Trade & Investment
                </Link>
              </li>
              <li>
                <Link href="/diaspora" className="text-gray-400 hover:text-white transition-colors">
                  Diaspora Affairs
                </Link>
              </li>
              <li>
                <Link href="/emergency" className="text-gray-400 hover:text-white transition-colors">
                  Emergency Services
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Contact Info</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>Ministry of Foreign Affairs</li>
              <li>P.O. Box M53, Accra</li>
              <li>+233 (0) 302 664 951</li>
              <li>info@mfa.gov.gh</li>
            </ul>
            <div className="mt-4">
              <h5 className="font-semibold text-white mb-2">Office Hours</h5>
              <p className="text-sm text-gray-400">Monday - Friday: 8:00 AM - 5:00 PM</p>
              <p className="text-sm text-gray-400">Saturday: 9:00 AM - 1:00 PM</p>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-center md:text-left mb-4 md:mb-0">
              <p className="text-sm text-gray-400">
                &copy; 2024 Ministry of Foreign Affairs, Republic of Ghana. All rights reserved.
              </p>
              <p className="text-xs text-gray-500 mt-1">
                Created by Productivity Group
              </p>
            </div>
            <div className="flex space-x-6 text-sm">
              <Link href="/privacy" className="text-gray-400 hover:text-white transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-gray-400 hover:text-white transition-colors">
                Terms of Service
              </Link>
              <Link href="/accessibility" className="text-gray-400 hover:text-white transition-colors">
                Accessibility
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
