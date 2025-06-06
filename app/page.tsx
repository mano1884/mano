"use client"

import { useState, useEffect } from "react"
import { Navbar } from "@/components/navbar"
import { Hero } from "@/components/hero"
import { Features } from "@/components/features"
import { Tutors } from "@/components/tutors"
import { Subjects } from "@/components/subjects"
import { Contact } from "@/components/contact"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import Image from "next/image"

export default function Home() {
  const [isLoading, setIsLoading] = useState(true)
  const [isMobile, setIsMobile] = useState(false)
  const [showDesktop, setShowDesktop] = useState(false)

  useEffect(() => {
    // Check if mobile
    const checkMobile = () => {
      const mobile = window.innerWidth <= 768
      setIsMobile(mobile)

      // Check if user previously chose desktop mode
      if (mobile) {
        const desktopMode = localStorage.getItem("unitutors-desktop-mode")
        setShowDesktop(desktopMode === "true")
      } else {
        setShowDesktop(true)
      }
    }

    // Preload ALL critical images including tutor avatars
    const preloadImages = async () => {
      try {
        const imagePromises = [
          // Main logo
          new Promise<void>((resolve, reject) => {
            const img = new Image()
            img.onload = () => resolve()
            img.onerror = () => reject(new Error("Failed to load logo"))
            img.src = "/images/unitutors-logo-new.png"
          }),
          // Emanuel's avatar
          new Promise<void>((resolve, reject) => {
            const img = new Image()
            img.onload = () => resolve()
            img.onerror = () => reject(new Error("Failed to load Emanuel avatar"))
            img.src = "/images/emanuel-avatar.png"
          }),
          // Coming soon avatars
          new Promise<void>((resolve, reject) => {
            const img = new Image()
            img.onload = () => resolve()
            img.onerror = () => reject(new Error("Failed to load coming soon avatar 1"))
            img.src = "/images/coming-soon-avatar-1.png"
          }),
          new Promise<void>((resolve, reject) => {
            const img = new Image()
            img.onload = () => resolve()
            img.onerror = () => reject(new Error("Failed to load coming soon avatar 2"))
            img.src = "/images/coming-soon-avatar-2.png"
          }),
          // Success page image
          new Promise<void>((resolve, reject) => {
            const img = new Image()
            img.onload = () => resolve()
            img.onerror = () => reject(new Error("Failed to load see you soon image"))
            img.src = "/images/see-you-soon-nobg.png"
          }),
        ]

        await Promise.all(imagePromises)
        console.log("All images preloaded successfully!")
      } catch (error) {
        console.log("Some images failed to preload, continuing anyway:", error)
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

  const enableDesktopMode = () => {
    localStorage.setItem("unitutors-desktop-mode", "true")
    setShowDesktop(true)
  }

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

  // Show mobile landing screen
  if (isMobile && !showDesktop) {
    return (
      <div className="mobile-landing">
        <div className="absolute inset-0 gold-pattern"></div>
        <div className="relative z-10 max-w-md">
          <div className="mb-8">
            <Image
              src="/images/unitutors-logo-new.png"
              alt="UniTutors Logo"
              width={200}
              height={200}
              className="w-32 h-auto mx-auto mb-6"
              priority
            />
            <h1 className="text-3xl font-bold mb-4 text-white text-glow-subtle">Welcome to UniTutors</h1>
            <p className="text-gray-300 mb-8 leading-relaxed">
              For the best experience, we recommend viewing our website in desktop mode.
            </p>
          </div>

          <Button
            onClick={enableDesktopMode}
            className="btn-premium text-black font-medium px-8 py-4 text-lg mb-4 w-full"
          >
            View Desktop Version
          </Button>
        </div>
      </div>
    )
  }

  // Show desktop version (or mobile in desktop mode)
  return (
    <div className={`min-h-screen gradient-variation-4 ${isMobile && showDesktop ? "desktop-mode" : ""}`}>
      <main className="min-h-screen">
        <Navbar />
        <Hero />
        <Features />
        <Tutors />
        <Subjects />
        <Contact />
        <Footer />
      </main>
    </div>
  )
}
