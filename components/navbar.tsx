"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"

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
        <nav className="flex gap-6 items-center">
          <Link href="#features" className="text-sm font-medium text-gray-200 hover:text-amber-400 transition-colors">
            Why UniTutors
          </Link>
          <Link href="#tutors" className="text-sm font-medium text-gray-200 hover:text-amber-400 transition-colors">
            Our Tutors
          </Link>
          <Link href="#subjects" className="text-sm font-medium text-gray-200 hover:text-amber-400 transition-colors">
            Subjects
          </Link>
          <button
            onClick={() => {
              document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })
            }}
            className="text-sm font-medium text-gray-200 hover:text-amber-400 transition-colors"
          >
            Become a Tutor
          </button>
        </nav>
      </div>
    </header>
  )
}
