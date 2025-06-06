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
              Your session has been booked! For the full confirmation details, please view in desktop mode.
            </p>
          </div>

          <Button
            onClick={enableDesktopMode}
            className="btn-premium text-black font-medium px-8 py-4 text-lg mb-4 w-full"
          >
            📱 ➡️ 🖥️ View Desktop Version
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
      <div className="container mx-auto py-8 relative z-10">
        {/* Back Button */}
        <div className="mb-8">
          <Link href="/" className="inline-flex items-center gap-2 text-amber-400 hover:text-amber-300">
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </Link>
        </div>

        {/* Main Success Content */}
        <div
          className={`max-w-4xl mx-auto text-center transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        >
          {/* Success Icon */}
          <div className="mb-8">
            <CheckCircle className="h-16 w-16 text-green-400 mx-auto mb-4" />
            <h1 className="text-4xl font-bold mb-4 text-white text-glow-subtle">Booking Confirmed! 🎉</h1>
            <p className="text-xl text-gray-300 mb-8">Your tutoring session has been successfully scheduled</p>
          </div>

          {/* Character Image - Made Larger */}
          <div className="mb-12 flex justify-center">
            <div className="relative">
              <div className="absolute inset-0 bg-amber-500/20 rounded-full blur-3xl scale-150"></div>
              <Image
                src="/images/see-you-soon.png"
                alt="See you soon!"
                width={450}
                height={450}
                className="relative z-10 w-full max-w-[450px] h-auto"
                priority
              />
            </div>
          </div>

          {/* Information Cards */}
          <div className="grid grid-cols-2 gap-6 mb-12">
            <Card className="premium-card">
              <CardContent className="p-6 text-center">
                <Mail className="h-8 w-8 text-amber-400 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-white mb-2">Check Your Email</h3>
                <p className="text-gray-300 mb-4">A confirmation email has been sent with all your session details.</p>
                <p className="text-sm text-amber-300">
                  💡 <strong>Tip:</strong> If you don't see the email, please check your spam/junk folder!
                </p>
              </CardContent>
            </Card>

            <Card className="premium-card">
              <CardContent className="p-6 text-center">
                <Clock className="h-8 w-8 text-amber-400 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-white mb-2">What's Next?</h3>
                <p className="text-gray-300 mb-4">
                  We'll contact you within 24 hours to confirm your sessions and provide payment details.
                </p>
                <p className="text-sm text-green-300">Get ready to excel in your studies! 📚</p>
              </CardContent>
            </Card>
          </div>

          {/* Contact Information - Removed Phone Number */}
          <Card className="premium-card mb-8">
            <CardContent className="p-8 text-center">
              <h3 className="text-2xl font-bold text-white mb-4">Need Help?</h3>
              <p className="text-gray-300 mb-6">
                If you have any questions about your booking, don't hesitate to reach out!
              </p>
              <div className="flex justify-center items-center">
                <div className="flex items-center gap-2 text-amber-300">
                  <Mail className="h-5 w-5" />
                  <span>unitutors7@gmail.com</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="flex gap-4 justify-center">
            <Button
              onClick={() => (window.location.href = "/booking")}
              className="btn-premium text-black font-medium px-8 py-3"
            >
              Book Another Session
            </Button>
            <Button
              onClick={() => (window.location.href = "/")}
              variant="outline"
              className="border-amber-500 text-amber-400 hover:bg-amber-500 hover:text-black px-8 py-3"
            >
              Return to Home
            </Button>
          </div>

          {/* Fun Message */}
          <div className="mt-12 p-6 bg-gradient-to-r from-amber-500/10 to-amber-600/10 rounded-lg border border-amber-500/30">
            <p className="text-lg text-amber-300 font-medium">
              🌟 Welcome to the UniTutors family! We're excited to help you achieve academic excellence! 🌟
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
