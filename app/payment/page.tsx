"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, CreditCard, Phone, Hash } from "lucide-react"

export default function PaymentPage() {
  const [bookingData, setBookingData] = useState<{ totalAmount: number; orderId: string } | null>(null)
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

    // Get booking data from localStorage
    const storedBookingData = localStorage.getItem("bookingData")
    if (storedBookingData) {
      setBookingData(JSON.parse(storedBookingData))
    } else {
      // Generate default data if not found
      setBookingData({
        totalAmount: 0,
        orderId: Math.floor(10000 + Math.random() * 90000).toString(),
      })
    }

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
            <CreditCard className="h-16 w-16 text-amber-400 mx-auto mb-4" />
            <h1 className="text-3xl font-bold mb-4 text-white text-glow-subtle">Payment</h1>
            <p className="text-gray-300 mb-8 leading-relaxed">
              Please view this page in desktop mode to complete your payment.
            </p>
          </div>

          <Button
            onClick={enableDesktopMode}
            className="btn-premium text-black font-medium px-8 py-4 text-lg mb-4 w-full"
          >
            View Desktop Version
          </Button>

          <div className="mt-6">
            <Link href="/booking-success" className="text-amber-400 hover:text-amber-300 text-sm">
              ← Back to Booking
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
          <Link href="/booking-success" className="inline-flex items-center gap-2 text-amber-400 hover:text-amber-300">
            <ArrowLeft className="h-4 w-4" />
            Back to Booking
          </Link>
        </div>

        {/* Main Payment Content - New Layout */}
        <div className="grid grid-cols-1 md:grid-cols-[300px_1fr] gap-8 items-center max-w-6xl mx-auto">
          {/* Left Column: Image */}
          <div className="hidden md:flex items-center justify-center p-4">
            <Image
              src="/images/see-you-soon-waving.png"
              alt="See you soon!"
              width={500}
              height={500}
              className="w-full h-auto max-w-[500px] object-contain"
              priority
            />
          </div>

          {/* Right Column: Payment Details */}
          <div className="max-w-2xl mx-auto w-full">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold mb-4 text-white text-glow-subtle">Complete Your Payment</h1>
              <p className="text-gray-300">Secure payment via WhishMoney</p>
            </div>

            <Card className="premium-card">
              <CardHeader className="text-center pb-6">
                <div className="flex justify-center mb-4">
                  <Image
                    src="/images/wishmoney-logo.jpg"
                    alt="WhishMoney Logo"
                    width={120}
                    height={120}
                    className="w-20 h-20 rounded-lg"
                  />
                </div>
                <CardTitle className="text-white text-xl">WhishMoney Payment</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Order Details */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-black/30 rounded-lg border border-amber-500/30">
                    <div className="flex items-center gap-3">
                      <Hash className="h-5 w-5 text-amber-400" />
                      <span className="text-white font-medium">Order ID</span>
                    </div>
                    <span className="text-amber-300 font-mono text-lg">{bookingData?.orderId}</span>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-black/30 rounded-lg border border-amber-500/30">
                    <div className="flex items-center gap-3">
                      <Phone className="h-5 w-5 text-amber-400" />
                      <span className="text-white font-medium">Payment Number</span>
                    </div>
                    <span className="text-amber-300 font-mono text-lg">70302418</span>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-amber-500/10 rounded-lg border border-amber-500/30">
                    <div className="flex items-center gap-3">
                      <CreditCard className="h-5 w-5 text-amber-400" />
                      <span className="text-white font-medium">Amount to Pay</span>
                    </div>
                    <span className="text-amber-400 font-bold text-2xl">${bookingData?.totalAmount}</span>
                  </div>
                </div>

                {/* Payment Instructions */}
                <div className="p-6 bg-gradient-to-r from-amber-500/10 to-amber-600/10 rounded-lg border border-amber-500/30">
                  <h3 className="text-white font-bold mb-4 text-center">Note</h3>
                  <div className="space-y-3 text-gray-300 text-sm">
                    <div className="flex items-start gap-3 justify-center">
                      <span>
                        Include Order ID <strong className="text-amber-300">{bookingData?.orderId}</strong> in the
                        payment note
                      </span>
                    </div>
                  </div>
                </div>

                {/* Contact Support */}
                <div className="text-center p-4 bg-black/30 rounded-lg border border-amber-500/30">
                  <p className="text-gray-300 text-sm mb-2">Need help with payment?</p>
                  <p className="text-amber-300 text-sm">📧 unitutors7@gmail.com | 📞 70302418</p>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3 justify-center pt-4">
                  <Button
                    onClick={() => (window.location.href = "/")}
                    className="btn-premium text-black font-medium px-6 py-2"
                  >
                    Return to Home
                  </Button>
                  <Button
                    onClick={() => (window.location.href = "/booking")}
                    variant="outline"
                    className="border-amber-500 text-amber-400 hover:bg-amber-500 hover:text-black px-6 py-2"
                  >
                    Book Another Session
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
