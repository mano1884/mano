import Link from "next/link"
import Image from "next/image"
import { Facebook, Twitter, Instagram, Linkedin, Youtube } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2">
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/UniTutors%20Logo%20Black%20and%20Gold-xiGXrMV7DPLraLy53XhrS8LAMnaL66.png"
                alt="UniTutors Logo"
                width={150}
                height={40}
                className="h-10 w-auto"
              />
            </Link>
            <p className="text-gray-400">
              Expert university tutoring services to help students excel in their academic journey.
            </p>
            <div className="flex space-x-4">
              <Link href="#" className="text-gray-400 hover:text-amber-500">
                <Facebook className="h-5 w-5" />
                <span className="sr-only">Facebook</span>
              </Link>
              <Link href="#" className="text-gray-400 hover:text-amber-500">
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </Link>
              <Link href="#" className="text-gray-400 hover:text-amber-500">
                <Instagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </Link>
              <Link href="#" className="text-gray-400 hover:text-amber-500">
                <Linkedin className="h-5 w-5" />
                <span className="sr-only">LinkedIn</span>
              </Link>
              <Link href="#" className="text-gray-400 hover:text-amber-500">
                <Youtube className="h-5 w-5" />
                <span className="sr-only">YouTube</span>
              </Link>
            </div>
          </div>
          <div className="text-center">
            <h3 className="font-bold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="#features" className="text-gray-400 hover:text-amber-500">
                  Why UniTutors
                </Link>
              </li>
              <li>
                <Link href="#tutors" className="text-gray-400 hover:text-amber-500">
                  Our Tutors
                </Link>
              </li>
              <li>
                <Link href="#subjects" className="text-gray-400 hover:text-amber-500">
                  Subjects
                </Link>
              </li>
              <li>
                <Link href="#testimonials" className="text-gray-400 hover:text-amber-500">
                  Testimonials
                </Link>
              </li>
              <li>
                <Link href="#contact" className="text-gray-400 hover:text-amber-500">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          <div className="text-center">
            <h3 className="font-bold text-lg mb-4">Resources</h3>
            <ul className="space-y-2">
              <li>
                <Link href="#" className="text-gray-400 hover:text-amber-500">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-400 hover:text-amber-500">
                  Study Tips
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-400 hover:text-amber-500">
                  Free Resources
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-400 hover:text-amber-500">
                  Become a Tutor
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-400 hover:text-amber-500">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>
          <div className="text-center">
            <h3 className="font-bold text-lg mb-4">Legal</h3>
            <ul className="space-y-2">
              <li>
                <Link href="#" className="text-gray-400 hover:text-amber-500">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-400 hover:text-amber-500">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-400 hover:text-amber-500">
                  Cookie Policy
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-400 hover:text-amber-500">
                  Refund Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} UniTutors. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
