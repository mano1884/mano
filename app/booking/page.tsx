"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Calendar } from "@/components/ui/calendar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Textarea } from "@/components/ui/textarea"
import { Slider } from "@/components/ui/slider"
import { ArrowLeft, Clock, DollarSign, User, Users, Plus, X } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

interface SessionSlot {
  id: string
  date: Date | undefined
  time: string
}

export default function BookingPage() {
  const [sessionType, setSessionType] = useState("")
  const [groupSize, setGroupSize] = useState([2])
  const [numberOfSessions, setNumberOfSessions] = useState("")
  const [sessionSlots, setSessionSlots] = useState<SessionSlot[]>([{ id: "1", date: new Date(), time: "" }])
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [showDesktop, setShowDesktop] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    notes: "",
  })

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

    // Preload images for booking page too
    const preloadImages = async () => {
      try {
        const imagePromises = [
          new Promise<void>((resolve, reject) => {
            const img = new Image()
            img.onload = () => resolve()
            img.onerror = () => reject(new Error("Failed to load logo"))
            img.src = "/images/unitutors-logo-new.png"
          }),
          new Promise<void>((resolve, reject) => {
            const img = new Image()
            img.onload = () => resolve()
            img.onerror = () => reject(new Error("Failed to load see you soon image"))
            img.src = "/images/see-you-soon.png"
          }),
        ]

        await Promise.all(imagePromises)
      } catch (error) {
        console.log("Image preloading failed, continuing anyway:", error)
      }
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

  // Get available time slots based on the day of the week
  const getTimeSlots = (date: Date | undefined) => {
    if (!date) return []

    const day = date.getDay() // 0 is Sunday, 1 is Monday, etc.

    // Monday (1), Wednesday (3), Friday (5)
    if (day === 1 || day === 3 || day === 5) {
      return ["10:00 AM", "11:00 AM", "12:00 PM", "1:00 PM", "2:00 PM"]
    }
    // Tuesday (2), Thursday (4), Saturday (6), Sunday (0)
    else {
      return ["1:00 PM", "2:00 PM", "6:00 PM", "7:00 PM", "8:00 PM", "9:00 PM", "10:00 PM", "11:00 PM"]
    }
  }

  const subjects = [
    "Principles of Financial Management I & II",
    "Fundamentals of Investments",
    "Commercial Bank Management",
    "Quantitative Asset Management",
    "Derivatives",
    "Advanced Derivatives",
    "Financial Risk Management",
    "Principles of Microeconomics",
    "Principles of Macroeconomics",
    "Managerial Economics",
    "Introduction to Econometrics",
    "Mathematics for Business and Economics",
    "Numerical Methods for Finance",
    "Applied Statistics",
    "Principles of Accounting I",
    "Managerial Accounting",
  ]

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const addSessionSlot = () => {
    const maxSessions = Number.parseInt(numberOfSessions) || 0
    if (sessionSlots.length < maxSessions) {
      const newSlot: SessionSlot = {
        id: Date.now().toString(),
        date: undefined,
        time: "",
      }
      setSessionSlots([...sessionSlots, newSlot])
    }
  }

  const removeSessionSlot = (id: string) => {
    if (sessionSlots.length > 1) {
      setSessionSlots(sessionSlots.filter((slot) => slot.id !== id))
    }
  }

  const updateSessionSlot = (id: string, field: keyof SessionSlot, value: any) => {
    setSessionSlots(
      sessionSlots.map((slot) => {
        if (slot.id === id) {
          // If updating the date, reset the time since available times may change
          if (field === "date") {
            return { ...slot, [field]: value, time: "" }
          }
          return { ...slot, [field]: value }
        }
        return slot
      }),
    )
  }

  const getTotalHours = () => {
    return Number.parseInt(numberOfSessions) || 0
  }

  const getGroupPrice = () => {
    const size = groupSize[0]
    switch (size) {
      case 2:
        return 35
      case 3:
        return 45
      case 4:
        return 55
      default:
        return 35
    }
  }

  const getSessionPrice = () => {
    const totalHours = getTotalHours()
    const basePrice = sessionType === "1-on-1" ? 25 : sessionType === "group" ? getGroupPrice() : 0

    // Calculate free hours (1 free for every 5 hours)
    const freeHours = Math.floor(totalHours / 5)
    const billableHours = totalHours - freeHours

    return basePrice * billableHours
  }

  const getBillableHours = () => {
    const totalHours = getTotalHours()
    const freeHours = Math.floor(totalHours / 5)
    return totalHours - freeHours
  }

  const getFreeHours = () => {
    const totalHours = getTotalHours()
    return Math.floor(totalHours / 5)
  }

  const canAddMoreSessions = () => {
    const maxSessions = Number.parseInt(numberOfSessions) || 0
    return sessionSlots.length < maxSessions
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // Format session details for email
      const sessionDetailsText = sessionSlots
        .map(
          (slot, index) =>
            `<div style="margin-bottom: 8px;"><strong>Session ${index + 1}:</strong> ${slot.date?.toLocaleDateString() || "Date not set"} at ${slot.time || "Time not set"}</div>`,
        )
        .join("")

      const sessionTypeText = sessionType === "1-on-1" ? "1-on-1 Session" : `Group Session (${groupSize[0]} persons)`

      // Send booking data to API route
      const response = await fetch("/api/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          subject: formData.subject,
          sessionDetails: sessionDetailsText,
          totalAmount: getSessionPrice(),
          sessionType: sessionTypeText,
          numberOfSessions: getTotalHours(),
          notes: formData.notes, // Include notes in the email
        }),
      })

      const result = await response.json()

      if (result.success) {
        // Redirect to success page instead of showing alert
        window.location.href = "/booking-success"
      } else {
        console.error("Email sending failed:", result.error)
        alert(
          "Booking submitted successfully! However, there was an issue sending the confirmation email. We'll contact you directly to confirm your sessions.",
        )
      }
    } catch (error) {
      console.error("Booking submission error:", error)
      alert("Booking request submitted! We'll contact you soon to confirm your sessions.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const isFormValid = () => {
    return (
      sessionType &&
      numberOfSessions &&
      formData.name &&
      formData.email &&
      formData.subject &&
      sessionSlots.every((slot) => slot.date && slot.time)
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
            <h1 className="text-3xl font-bold mb-4 text-white text-glow-subtle">Booking Page</h1>
            <p className="text-gray-300 mb-8 leading-relaxed">
              To book your tutoring session, please view this page in desktop mode.
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
      <div className="booking-container mx-auto py-4 relative z-10">
        <div className="mb-6 px-4">
          <Link href="/" className="inline-flex items-center gap-2 text-amber-400 hover:text-amber-300">
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </Link>
        </div>

        <div className="text-center mb-8 px-4">
          <h1 className="text-3xl font-bold mb-4 text-white text-glow-subtle">Book Your Tutoring Session</h1>
          <p className="text-gray-300 text-base">Schedule sessions with Mr. Emanuel Youssef</p>
        </div>

        <div className="grid grid-cols-3 gap-4 px-4">
          {/* Session Details Form - First Column */}
          <Card className="premium-card">
            <CardHeader className="pb-4">
              <CardTitle className="text-white flex items-center gap-2 text-base">
                <User className="h-4 w-4 text-amber-400" />
                Session Details
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label className="text-white mb-2 block text-sm">Session Type</Label>
                  <RadioGroup value={sessionType} onValueChange={setSessionType}>
                    <div className="flex items-center space-x-2 p-2 border border-amber-500/30 rounded-md hover:bg-amber-500/10 transition-colors">
                      <RadioGroupItem value="1-on-1" id="one-on-one" />
                      <Label
                        htmlFor="one-on-one"
                        className="text-gray-200 flex items-center gap-2 cursor-pointer flex-1 text-xs"
                      >
                        <User className="h-3 w-3" />
                        1-on-1 Session
                        <span className="text-amber-400 font-semibold ml-auto">$25/hour</span>
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2 p-2 border border-amber-500/30 rounded-md hover:bg-amber-500/10 transition-colors">
                      <RadioGroupItem value="group" id="group" />
                      <Label
                        htmlFor="group"
                        className="text-gray-200 flex items-center gap-2 cursor-pointer flex-1 text-xs"
                      >
                        <Users className="h-3 w-3" />
                        Group Session
                        <span className="text-amber-400 font-semibold ml-auto">${getGroupPrice()}/hour</span>
                      </Label>
                    </div>
                  </RadioGroup>

                  {sessionType === "group" && (
                    <div className="mt-3 p-3 premium-card rounded-lg">
                      <Label className="text-white mb-2 block text-xs">Group Size: {groupSize[0]} persons</Label>
                      <Slider
                        value={groupSize}
                        onValueChange={setGroupSize}
                        max={4}
                        min={2}
                        step={1}
                        className="w-full"
                      />
                      <div className="flex justify-between text-xs text-amber-300 mt-1">
                        <span>2 ($35/hr)</span>
                        <span>3 ($45/hr)</span>
                        <span>4 ($55/hr)</span>
                      </div>
                    </div>
                  )}
                </div>

                <div>
                  <Label className="text-white mb-2 block text-sm">Number of Sessions</Label>
                  <Select value={numberOfSessions} onValueChange={setNumberOfSessions}>
                    <SelectTrigger className="bg-black/50 border-amber-500/30 text-white backdrop-blur-sm h-8 text-xs">
                      <SelectValue placeholder="Select hours" />
                    </SelectTrigger>
                    <SelectContent className="bg-black/90 border-amber-500/30 backdrop-blur-sm">
                      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((hours) => (
                        <SelectItem
                          key={hours}
                          value={hours.toString()}
                          className="text-white hover:bg-amber-500/20 text-xs"
                        >
                          {hours} Hour{hours > 1 ? "s" : ""}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <p className="text-xs text-amber-400 mt-1">💡 Every 5 hours, get 1 free!</p>
                </div>

                <div>
                  <Label htmlFor="name" className="text-white text-sm">
                    Full Name
                  </Label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="bg-black/50 border-amber-500/30 text-white backdrop-blur-sm h-8 text-xs"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="email" className="text-white text-sm">
                    Email Address
                  </Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="bg-black/50 border-amber-500/30 text-white backdrop-blur-sm h-8 text-xs"
                    required
                  />
                </div>

                <div>
                  <Label className="text-white text-sm">Subject</Label>
                  <Select
                    value={formData.subject}
                    onValueChange={(value) => setFormData((prev) => ({ ...prev, subject: value }))}
                  >
                    <SelectTrigger className="bg-black/50 border-amber-500/30 text-white backdrop-blur-sm h-8 text-xs">
                      <SelectValue placeholder="Select subject" />
                    </SelectTrigger>
                    <SelectContent className="bg-black/90 border-amber-500/30 backdrop-blur-sm">
                      {subjects.map((subject) => (
                        <SelectItem key={subject} value={subject} className="text-white hover:bg-amber-500/20 text-xs">
                          {subject}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="notes" className="text-white text-sm">
                    Notes & Files (Optional)
                  </Label>
                  <div className="p-3 border border-amber-500/30 rounded-lg bg-black/30 backdrop-blur-sm space-y-2">
                    <Textarea
                      id="notes"
                      name="notes"
                      value={formData.notes}
                      onChange={handleInputChange}
                      placeholder="Topics to focus on?"
                      className="bg-black/50 border-amber-500/30 text-white backdrop-blur-sm text-xs"
                      rows={2}
                    />
                    <div className="space-y-1">
                      <Label htmlFor="files" className="text-amber-300 text-xs">
                        Attach files
                      </Label>
                      <Input
                        id="files"
                        name="files"
                        type="file"
                        multiple
                        accept=".pdf,.doc,.docx,.jpg,.jpeg,.png,.txt"
                        className="bg-black/50 border-amber-500/30 text-white file:bg-amber-500 file:text-black file:border-0 file:rounded file:px-2 file:py-1 file:mr-2 backdrop-blur-sm h-8 text-xs"
                      />
                    </div>
                  </div>
                </div>
              </form>
            </CardContent>
          </Card>

          {/* Calendar Section - Second Column */}
          <Card className="premium-card">
            <CardHeader className="pb-4">
              <CardTitle className="text-white flex items-center gap-2 text-base">
                <Clock className="h-4 w-4 text-amber-400" />
                Select Dates & Times
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 pt-0">
              <div className="space-y-3">
                {sessionSlots.map((slot, index) => (
                  <div key={slot.id} className="p-3 bg-black/30 rounded-lg border border-amber-500/30 backdrop-blur-sm">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="text-white font-medium text-sm">Session {index + 1}</h4>
                      {sessionSlots.length > 1 && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeSessionSlot(slot.id)}
                          className="text-red-400 hover:text-red-300 hover:bg-red-900/20 h-6 w-6 p-0"
                        >
                          <X className="h-3 w-3" />
                        </Button>
                      )}
                    </div>

                    <div className="space-y-2">
                      <div>
                        <Label className="text-amber-300 text-xs mb-1 block">Date</Label>
                        <Calendar
                          mode="single"
                          selected={slot.date}
                          onSelect={(date) => updateSessionSlot(slot.id, "date", date)}
                          className="rounded-md border border-amber-500/30 bg-black/50 text-white w-full backdrop-blur-sm text-xs"
                          disabled={(date) => date < new Date() || date.getDay() === 0}
                        />
                      </div>

                      <div>
                        <Label className="text-amber-300 text-xs mb-1 block">Time</Label>
                        <div className="grid grid-cols-2 gap-1">
                          {getTimeSlots(slot.date).map((time) => (
                            <Button
                              key={time}
                              variant={slot.time === time ? "default" : "outline"}
                              size="sm"
                              className={`text-xs h-6 ${
                                slot.time === time
                                  ? "btn-premium text-black"
                                  : "border-amber-500/30 text-amber-200 hover:bg-amber-500/20 backdrop-blur-sm"
                              }`}
                              onClick={() => updateSessionSlot(slot.id, "time", time)}
                            >
                              {time}
                            </Button>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <Button
                onClick={addSessionSlot}
                variant="outline"
                className={`w-full h-8 text-xs ${
                  canAddMoreSessions()
                    ? "border-amber-500 text-amber-400 hover:bg-amber-500 hover:text-black backdrop-blur-sm"
                    : "border-amber-500/30 text-amber-500/50 cursor-not-allowed backdrop-blur-sm"
                }`}
                disabled={!canAddMoreSessions()}
              >
                <Plus className="h-3 w-3 mr-1" />
                Add Session
              </Button>
            </CardContent>
          </Card>

          {/* Payment Summary - Third Column */}
          <Card className="premium-card">
            <CardHeader className="pb-4">
              <CardTitle className="text-white flex items-center gap-2 text-base">
                <DollarSign className="h-4 w-4 text-amber-400" />
                Payment Summary
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 pt-0">
              <div className="space-y-3">
                <div className="flex justify-between items-center p-2 bg-black/30 rounded-lg backdrop-blur-sm">
                  <span className="text-amber-300 text-xs">Session Type:</span>
                  <span className="text-white font-medium text-xs">
                    {sessionType ? (sessionType === "1-on-1" ? "1-on-1" : `Group (${groupSize[0]})`) : "Not selected"}
                  </span>
                </div>

                <div className="flex justify-between items-center p-2 bg-black/30 rounded-lg backdrop-blur-sm">
                  <span className="text-amber-300 text-xs">Total Hours:</span>
                  <span className="text-white font-medium text-xs">{getTotalHours()}</span>
                </div>

                <div className="flex justify-between items-center p-2 bg-black/30 rounded-lg backdrop-blur-sm">
                  <span className="text-amber-300 text-xs">Sessions:</span>
                  <span className="text-white font-medium text-xs">{sessionSlots.length}</span>
                </div>

                {getFreeHours() > 0 && (
                  <div className="flex justify-between items-center p-2 bg-green-900/30 border border-green-500/30 rounded-lg backdrop-blur-sm">
                    <span className="text-green-300 text-xs">Free Hours:</span>
                    <span className="text-green-400 font-medium text-xs">{getFreeHours()}</span>
                  </div>
                )}

                <div className="flex justify-between items-center p-2 bg-black/30 rounded-lg backdrop-blur-sm">
                  <span className="text-amber-300 text-xs">Billable:</span>
                  <span className="text-white font-medium text-xs">{getBillableHours()}</span>
                </div>

                <div className="border-t border-amber-500/30 pt-3">
                  <div className="flex justify-between items-center p-2 bg-amber-500/10 border border-amber-500/30 rounded-lg backdrop-blur-sm">
                    <span className="text-amber-300 font-semibold text-xs">Total:</span>
                    <span className="text-amber-400 font-bold text-lg text-glow-subtle">${getSessionPrice()}</span>
                  </div>
                </div>

                {sessionSlots.length > 0 && (
                  <div className="space-y-1">
                    <h4 className="text-white font-medium text-xs">Schedule:</h4>
                    {sessionSlots.map((slot, index) => (
                      <div
                        key={slot.id}
                        className="text-xs p-2 bg-black/30 rounded border border-amber-500/30 backdrop-blur-sm"
                      >
                        <div className="text-amber-300">
                          {index + 1}: {slot.date?.toLocaleDateString() || "No date"} at {slot.time || "No time"}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <Button
                onClick={handleSubmit}
                className="w-full btn-premium text-black font-medium py-2 text-sm"
                disabled={!isFormValid() || isSubmitting}
              >
                {isSubmitting ? "Booking..." : "Book Session(s)"}
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
