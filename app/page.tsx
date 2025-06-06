"use client"

import { useState, useEffect } from "react"
import { Navbar } from "@/components/navbar"
import { Hero } from "@/components/hero"
import { Features } from "@/components/features"
import { Tutors } from "@/components/tutors"
import { Subjects } from "@/components/subjects"
import { Testimonials } from "@/components/testimonials"
import { Contact } from "@/components/contact"
import { Footer } from "@/components/footer"

export default function Home() {
  const [isLoading, setIsLoading] = useState(true)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    // Check if mobile
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1200)
    }

    // Preload critical images
    const preloadImages = async () => {
      try {
        const imagePromises = [
          new Promise<void>((resolve, reject) => {
            const img = new Image()
            img.onload = () => resolve()
            img.onerror = () => reject(new Error("Failed to load logo"))
            img.src = "/images/unitutors-logo-new.png"
          }),
        ]

        await Promise.all(imagePromises)
      } catch (error) {
        console.log("Image preloading failed, continuing anyway:", error)
      }

      // Add a small delay to ensure smooth transition
      setTimeout(() => {
        setIsLoading(false)
      }, 800)
    }

    checkMobile()
    window.addEventListener("resize", checkMobile)
    preloadImages()

    return () => {
      window.removeEventListener("resize", checkMobile)
    }
  }, [])

  if (isLoading) {
    return (
      <div className="loading-screen">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-amber-500 border-t-transparent rounded-full animate-spin mb-4"></div>
          <p className="text-amber-400 text-lg">Loading UniTutors...</p>
        </div>
      </div>
    )
  }

  return (
    <div className={`fixed inset-0 gradient-variation-4 overflow-auto ${isMobile ? "mobile-scale" : ""}`}>
      <main className="min-h-screen">
        <Navbar />
        <Hero />
        <Features />
        <Tutors />
        <Subjects />
        <Testimonials />
        <Contact />
        <Footer />
      </main>
    </div>
  )
}
