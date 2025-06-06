"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { CheckCircle, ArrowLeft, Mail, Clock } from "lucide-react"

export default function BookingSuccessPage() {
  const [isVisible, setIsVisible] = useState(false)
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

    // Animate in the content
    setTimeout(() => setIsVisible(true), 300)

    checkMobile()
    window.addEventListener("resize", checkMobile)

    return () => {
      window.removeEventListener("resize", checkMobile)
    }
  }, [])

  const enableDesktopMode = () => {
    localStorage.setItem("unitutors-desktop-mode", "true")
    setShowDesktop(true)
  }

  // Show mobile landing screen
  if (isMobile && !showDesktop) {
    return (
      <div className="mobile-landing">
        <div className="absolute inset-0 gold-pattern"></div>
        <div className="relative z-10 max-w-md">
          <div className="mb-8">
            <CheckCircle className="h-16 w-16 text-green-400 mx-auto mb-4" />
            <h1 className="text-3xl font-bold mb-4 text-white text-glow-subtle">Booking Confirmed! 🎉</h1>
            <p className="text-gray-300 mb-8 leading-relaxed">
              Your session has been booked! Please view in desktop mode for details.
            </p>
          </div>

          <Button
            onClick={enableDesktopMode}
            className="btn-premium text-black font-medium px-8 py-4 text-lg mb-4 w-full"
          >
            View Desktop Version
          </Button>

          <div className="mt-6">
            <Link href="/" className="text-amber-400 hover:text-amber-300 text-sm">
              ← Back to Home
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div
      className={`min-h-screen animated-gradient text-white relative ${isMobile && showDesktop ? "desktop-mode" : ""}`}
    >
      <div className="absolute inset-0 gold-pattern"></div>
      <div className="container success-container mx-auto py-8 relative z-10">
        {/* Back Button */}
        <div className="mb-8">
          <Link href="/" className="inline-flex items-center gap-2 text-amber-400 hover:text-amber-300">
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </Link>
        </div>

        {/* Main Success Content - New Layout */}
        <div
          className={`max-w-6xl mx-auto transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        >
          <div className="grid grid-cols-2 gap-12 items-center">
            {/* Left Side - Character Image */}
            <div className="flex justify-center">
              <div className="relative">
                <div className="absolute inset-0 bg-amber-500/20 rounded-full blur-3xl scale-150"></div>
                <Image
                  src="/images/see-you-soon-nobg.png"
                  alt="See you soon!"
                  width={400}
                  height={400}
                  className="relative z-10 w-full max-w-[400px] h-auto"
                  priority
                />
              </div>
            </div>

            {/* Right Side - All Text Content */}
            <div className="space-y-6">
              {/* Success Header */}
              <div className="text-center">
                <CheckCircle className="h-12 w-12 text-green-400 mx-auto mb-3" />
                <h1 className="text-3xl font-bold mb-3 text-white text-glow-subtle">Booking Confirmed! 🎉</h1>
                <p className="text-lg text-gray-300 mb-6">Your tutoring session has been successfully scheduled</p>
              </div>

              {/* Information Cards */}
              <div className="grid gap-4">
                <Card className="premium-card">
                  <CardContent className="p-4 text-center">
                    <Mail className="h-6 w-6 text-amber-400 mx-auto mb-3" />
                    <h3 className="text-lg font-bold text-white mb-2">Check Your Email</h3>
                    <p className="text-gray-300 mb-3 text-sm">
                      A confirmation email has been sent with all your session details.
                    </p>
                    <p className="text-xs text-amber-300">
                      💡 <strong>Tip:</strong> If you don't see the email, please check your spam/junk folder!
                    </p>
                  </CardContent>
                </Card>

                <Card className="premium-card">
                  <CardContent className="p-4 text-center">
                    <Clock className="h-6 w-6 text-amber-400 mx-auto mb-3" />
                    <h3 className="text-lg font-bold text-white mb-2">What's Next?</h3>
                    <p className="text-gray-300 mb-3 text-sm">
                      We'll contact you within 24 hours to confirm your sessions and provide payment details.
                    </p>
                    <p className="text-xs text-green-300">Get ready to excel in your studies! 📚</p>
                  </CardContent>
                </Card>
              </div>

              {/* Contact Information */}
              <Card className="premium-card">
                <CardContent className="p-6 text-center">
                  <h3 className="text-xl font-bold text-white mb-3">Need Help?</h3>
                  <p className="text-gray-300 mb-4 text-sm">
                    If you have any questions about your booking, don't hesitate to reach out!
                  </p>
                  <div className="flex justify-center items-center">
                    <div className="flex items-center gap-2 text-amber-300">
                      <Mail className="h-4 w-4" />
                      <span className="text-sm">unitutors7@gmail.com</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Action Buttons */}
              <div className="flex gap-3 justify-center">
                <Button
                  onClick={() => (window.location.href = "/booking")}
                  className="btn-premium text-black font-medium px-6 py-2 text-sm"
                >
                  Book Another Session
                </Button>
                <Button
                  onClick={() => (window.location.href = "/")}
                  variant="outline"
                  className="border-amber-500 text-amber-400 hover:bg-amber-500 hover:text-black px-6 py-2 text-sm"
                >
                  Return to Home
                </Button>
              </div>

              {/* Fun Message */}
              <div className="p-4 bg-gradient-to-r from-amber-500/10 to-amber-600/10 rounded-lg border border-amber-500/30">
                <p className="text-base text-amber-300 font-medium text-center">
                  🌟 Welcome to the UniTutors family! We're excited to help you achieve academic excellence! 🌟
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
