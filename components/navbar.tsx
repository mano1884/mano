"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Menu, X } from "lucide-react"

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full border-b border-amber-500/20 backdrop-blur-md bg-black/10">
      <div className="container flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/images/unitutors-logo-new.png"
            alt="UniTutors Logo"
            width={120}
            height={32}
            className="h-8 w-auto"
            priority
            quality={90}
          />
        </Link>
        <nav className="hidden md:flex gap-6">
          <Link href="#features" className="text-sm font-medium text-gray-200 hover:text-amber-400 transition-colors">
            Why UniTutors
          </Link>
          <Link href="#tutors" className="text-sm font-medium text-gray-200 hover:text-amber-400 transition-colors">
            Our Tutors
          </Link>
          <Link href="#subjects" className="text-sm font-medium text-gray-200 hover:text-amber-400 transition-colors">
            Subjects
          </Link>
          <Link
            href="#testimonials"
            className="text-sm font-medium text-gray-200 hover:text-amber-400 transition-colors"
          >
            Testimonials
          </Link>
        </nav>
        <button className="md:hidden text-white" onClick={() => setIsMenuOpen(!isMenuOpen)} aria-label="Toggle menu">
          {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>
      {isMenuOpen && (
        <div className="md:hidden absolute top-16 left-0 right-0 backdrop-blur-md bg-black/20 border-b border-amber-500/20 p-4 flex flex-col gap-4">
          <Link
            href="#features"
            className="text-sm font-medium p-2 text-gray-200 hover:bg-amber-500/10 rounded-md transition-colors"
            onClick={() => setIsMenuOpen(false)}
          >
            Why UniTutors
          </Link>
          <Link
            href="#tutors"
            className="text-sm font-medium p-2 text-gray-200 hover:bg-amber-500/10 rounded-md transition-colors"
            onClick={() => setIsMenuOpen(false)}
          >
            Our Tutors
          </Link>
          <Link
            href="#subjects"
            className="text-sm font-medium p-2 text-gray-200 hover:bg-amber-500/10 rounded-md transition-colors"
            onClick={() => setIsMenuOpen(false)}
          >
            Subjects
          </Link>
          <Link
            href="#testimonials"
            className="text-sm font-medium p-2 text-gray-200 hover:bg-amber-500/10 rounded-md transition-colors"
            onClick={() => setIsMenuOpen(false)}
          >
            Testimonials
          </Link>
        </div>
      )}
    </header>
  )
}
