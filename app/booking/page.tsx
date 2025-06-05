"use client"

import type React from "react"

import { useState } from "react"
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
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    notes: "",
  })

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
        }),
      })

      const result = await response.json()

      if (result.success) {
        alert(
          "🎉 Booking confirmed! A confirmation email has been sent to your inbox. We'll contact you within 24 hours to finalize the details.",
        )

        // Reset form
        setFormData({ name: "", email: "", subject: "", notes: "" })
        setSessionType("")
        setNumberOfSessions("")
        setSessionSlots([{ id: "1", date: new Date(), time: "" }])
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

  return (
    <div className="min-h-screen animated-gradient text-white relative">
      <div className="absolute inset-0 gold-pattern"></div>
      <div className="container mx-auto py-8 relative z-10" style={{ width: "1200px", maxWidth: "100%" }}>
        <div className="mb-8">
          <Link href="/" className="inline-flex items-center gap-2 text-amber-400 hover:text-amber-300">
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </Link>
        </div>

        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4 text-white text-glow-subtle">Book Your Tutoring Session</h1>
          <p className="text-gray-300 text-lg">Schedule sessions with Mr. Emanuel Youssef</p>
        </div>

        <div className="grid grid-cols-3 gap-8 max-w-7xl mx-auto">
          {/* Session Details Form - First Column */}
          <Card className="premium-card">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <User className="h-5 w-5 text-amber-400" />
                Session Details
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <Label className="text-white mb-2 block">Session Type</Label>
                  <RadioGroup value={sessionType} onValueChange={setSessionType}>
                    <div className="flex items-center space-x-2 p-3 border border-amber-500/30 rounded-md hover:bg-amber-500/10 transition-colors">
                      <RadioGroupItem value="1-on-1" id="one-on-one" />
                      <Label
                        htmlFor="one-on-one"
                        className="text-gray-200 flex items-center gap-2 cursor-pointer flex-1"
                      >
                        <User className="h-4 w-4" />
                        1-on-1 Session
                        <span className="text-amber-400 font-semibold ml-auto">$25/hour</span>
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2 p-3 border border-amber-500/30 rounded-md hover:bg-amber-500/10 transition-colors">
                      <RadioGroupItem value="group" id="group" />
                      <Label htmlFor="group" className="text-gray-200 flex items-center gap-2 cursor-pointer flex-1">
                        <Users className="h-4 w-4" />
                        Group Session
                        <span className="text-amber-400 font-semibold ml-auto">${getGroupPrice()}/hour</span>
                      </Label>
                    </div>
                  </RadioGroup>

                  {sessionType === "group" && (
                    <div className="mt-4 p-4 premium-card rounded-lg">
                      <Label className="text-white mb-3 block">Group Size: {groupSize[0]} persons</Label>
                      <Slider
                        value={groupSize}
                        onValueChange={setGroupSize}
                        max={4}
                        min={2}
                        step={1}
                        className="w-full"
                      />
                      <div className="flex justify-between text-xs text-amber-300 mt-2">
                        <span>2 persons ($35/hour)</span>
                        <span>3 persons ($45/hour)</span>
                        <span>4 persons ($55/hour)</span>
                      </div>
                    </div>
                  )}
                </div>

                <div>
                  <Label className="text-white mb-2 block">Number of Sessions</Label>
                  <Select value={numberOfSessions} onValueChange={setNumberOfSessions}>
                    <SelectTrigger className="bg-black/50 border-amber-500/30 text-white backdrop-blur-sm">
                      <SelectValue placeholder="Select number of hours" />
                    </SelectTrigger>
                    <SelectContent className="bg-black/90 border-amber-500/30 backdrop-blur-sm">
                      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((hours) => (
                        <SelectItem key={hours} value={hours.toString()} className="text-white hover:bg-amber-500/20">
                          {hours} Hour{hours > 1 ? "s" : ""}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <p className="text-xs text-amber-400 mt-1">💡 Every 5 hours, get 1 hour free!</p>
                </div>

                <div>
                  <Label htmlFor="name" className="text-white">
                    Full Name
                  </Label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="bg-black/50 border-amber-500/30 text-white backdrop-blur-sm"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="email" className="text-white">
                    Email Address
                  </Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="bg-black/50 border-amber-500/30 text-white backdrop-blur-sm"
                    required
                  />
                </div>

                <div>
                  <Label className="text-white">Subject</Label>
                  <Select
                    value={formData.subject}
                    onValueChange={(value) => setFormData((prev) => ({ ...prev, subject: value }))}
                  >
                    <SelectTrigger className="bg-black/50 border-amber-500/30 text-white backdrop-blur-sm">
                      <SelectValue placeholder="Select a subject" />
                    </SelectTrigger>
                    <SelectContent className="bg-black/90 border-amber-500/30 backdrop-blur-sm">
                      {subjects.map((subject) => (
                        <SelectItem key={subject} value={subject} className="text-white hover:bg-amber-500/20">
                          {subject}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-3">
                  <Label htmlFor="notes" className="text-white">
                    Additional Notes & Files (Optional)
                  </Label>
                  <div className="p-4 border border-amber-500/30 rounded-lg bg-black/30 backdrop-blur-sm space-y-3">
                    <Textarea
                      id="notes"
                      name="notes"
                      value={formData.notes}
                      onChange={handleInputChange}
                      placeholder="Any specific topics you'd like to focus on?"
                      className="bg-black/50 border-amber-500/30 text-white backdrop-blur-sm"
                      rows={3}
                    />
                    <div className="space-y-2">
                      <Label htmlFor="files" className="text-amber-300 text-sm">
                        Attach files (homework, assignments, etc.)
                      </Label>
                      <Input
                        id="files"
                        name="files"
                        type="file"
                        multiple
                        accept=".pdf,.doc,.docx,.jpg,.jpeg,.png,.txt"
                        className="bg-black/50 border-amber-500/30 text-white file:bg-amber-500 file:text-black file:border-0 file:rounded file:px-3 file:py-1 file:mr-3 backdrop-blur-sm"
                      />
                      <p className="text-xs text-amber-300/70">Supported formats: PDF, DOC, DOCX, JPG, PNG, TXT</p>
                    </div>
                  </div>
                </div>
              </form>
            </CardContent>
          </Card>

          {/* Calendar Section - Second Column */}
          <Card className="premium-card">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Clock className="h-5 w-5 text-amber-400" />
                Select Dates & Times
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                {sessionSlots.map((slot, index) => (
                  <div key={slot.id} className="p-4 bg-black/30 rounded-lg border border-amber-500/30 backdrop-blur-sm">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="text-white font-medium">Session {index + 1}</h4>
                      {sessionSlots.length > 1 && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeSessionSlot(slot.id)}
                          className="text-red-400 hover:text-red-300 hover:bg-red-900/20"
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      )}
                    </div>

                    <div className="space-y-3">
                      <div>
                        <Label className="text-amber-300 text-sm mb-1 block">Date</Label>
                        <Calendar
                          mode="single"
                          selected={slot.date}
                          onSelect={(date) => updateSessionSlot(slot.id, "date", date)}
                          className="rounded-md border border-amber-500/30 bg-black/50 text-white w-full backdrop-blur-sm"
                          disabled={(date) => date < new Date() || date.getDay() === 0}
                        />
                      </div>

                      <div>
                        <Label className="text-amber-300 text-sm mb-2 block">Time</Label>
                        <div className="grid grid-cols-2 gap-1">
                          {getTimeSlots(slot.date).map((time) => (
                            <Button
                              key={time}
                              variant={slot.time === time ? "default" : "outline"}
                              size="sm"
                              className={`text-xs ${
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
                        {!slot.date && (
                          <p className="text-xs text-amber-400 mt-2">Please select a date to see available times</p>
                        )}
                        {slot.date && getTimeSlots(slot.date).length === 0 && (
                          <p className="text-xs text-amber-400 mt-2">No time slots available for this date</p>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <Button
                onClick={addSessionSlot}
                variant="outline"
                className={`w-full ${
                  canAddMoreSessions()
                    ? "border-amber-500 text-amber-400 hover:bg-amber-500 hover:text-black backdrop-blur-sm"
                    : "border-amber-500/30 text-amber-500/50 cursor-not-allowed backdrop-blur-sm"
                }`}
                disabled={!canAddMoreSessions()}
              >
                <Plus className="h-4 w-4 mr-2" />
                {canAddMoreSessions()
                  ? "Add Another Session"
                  : `Maximum ${numberOfSessions || 0} session${Number.parseInt(numberOfSessions) > 1 ? "s" : ""} reached`}
              </Button>
            </CardContent>
          </Card>

          {/* Payment Summary - Third Column */}
          <Card className="premium-card">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <DollarSign className="h-5 w-5 text-amber-400" />
                Payment Summary
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex justify-between items-center p-4 bg-black/30 rounded-lg backdrop-blur-sm">
                  <span className="text-amber-300">Session Type:</span>
                  <span className="text-white font-medium">
                    {sessionType
                      ? sessionType === "1-on-1"
                        ? "1-on-1"
                        : `Group (${groupSize[0]} persons)`
                      : "Not selected"}
                  </span>
                </div>

                <div className="flex justify-between items-center p-4 bg-black/30 rounded-lg backdrop-blur-sm">
                  <span className="text-amber-300">Total Hours:</span>
                  <span className="text-white font-medium">{getTotalHours()}</span>
                </div>

                <div className="flex justify-between items-center p-4 bg-black/30 rounded-lg backdrop-blur-sm">
                  <span className="text-amber-300">Sessions Scheduled:</span>
                  <span className="text-white font-medium">{sessionSlots.length}</span>
                </div>

                {getFreeHours() > 0 && (
                  <div className="flex justify-between items-center p-4 bg-green-900/30 border border-green-500/30 rounded-lg backdrop-blur-sm">
                    <span className="text-green-300">Free Hours:</span>
                    <span className="text-green-400 font-medium">
                      {getFreeHours()} hour{getFreeHours() > 1 ? "s" : ""}
                    </span>
                  </div>
                )}

                <div className="flex justify-between items-center p-4 bg-black/30 rounded-lg backdrop-blur-sm">
                  <span className="text-amber-300">Billable Hours:</span>
                  <span className="text-white font-medium">
                    {getBillableHours()} hour{getBillableHours() > 1 ? "s" : ""}
                  </span>
                </div>

                <div className="border-t border-amber-500/30 pt-4">
                  <div className="flex justify-between items-center p-4 bg-amber-500/10 border border-amber-500/30 rounded-lg backdrop-blur-sm">
                    <span className="text-amber-300 font-semibold">Total Amount:</span>
                    <span className="text-amber-400 font-bold text-xl text-glow-subtle">${getSessionPrice()}</span>
                  </div>
                </div>

                {sessionSlots.length > 0 && (
                  <div className="space-y-2">
                    <h4 className="text-white font-medium">Scheduled Sessions:</h4>
                    {sessionSlots.map((slot, index) => (
                      <div
                        key={slot.id}
                        className="text-sm p-3 bg-black/30 rounded border border-amber-500/30 backdrop-blur-sm"
                      >
                        <div className="text-amber-300">
                          Session {index + 1}: {slot.date?.toLocaleDateString() || "Date not set"} at{" "}
                          {slot.time || "Time not set"}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <Button
                onClick={handleSubmit}
                className="w-full btn-premium text-black font-medium py-3"
                disabled={!isFormValid() || isSubmitting}
              >
                {isSubmitting ? "Sending..." : "Book Session(s)"}
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
