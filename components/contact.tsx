"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"

export function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission here
    console.log(formData)
    alert("Thank you for your message! We'll get back to you soon.")
    setFormData({
      name: "",
      email: "",
      subject: "",
      message: "",
    })
  }

  return (
    <section id="contact" className="py-20 relative">
      <div className="absolute inset-0 gold-pattern"></div>
      <div className="container relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4 text-white text-glow-subtle">Get in Touch</h2>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Have questions or ready to start? Contact us today to learn more about our tutoring services.
          </p>
        </div>

        {/* Centered Contact Form */}
        <div className="max-w-2xl mx-auto">
          <h3 className="text-2xl font-bold mb-6 text-white text-center">Send Us a Message</h3>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-white">
                Full Name
              </Label>
              <Input
                id="name"
                name="name"
                placeholder="Your name"
                value={formData.name}
                onChange={handleChange}
                className="bg-black/50 border-amber-500/30 text-white backdrop-blur-sm"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email" className="text-white">
                Email Address
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="your.email@example.com"
                value={formData.email}
                onChange={handleChange}
                className="bg-black/50 border-amber-500/30 text-white backdrop-blur-sm"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="subject" className="text-white">
                Subject
              </Label>
              <Select>
                <SelectTrigger className="bg-black/50 border-amber-500/30 text-white backdrop-blur-sm">
                  <SelectValue placeholder="Select a subject" />
                </SelectTrigger>
                <SelectContent className="bg-black/90 border-amber-500/30 backdrop-blur-sm">
                  <SelectItem value="general" className="text-white hover:bg-amber-500/20">
                    General Inquiry
                  </SelectItem>
                  <SelectItem value="tutoring" className="text-white hover:bg-amber-500/20">
                    Tutoring Services
                  </SelectItem>
                  <SelectItem value="pricing" className="text-white hover:bg-amber-500/20">
                    Pricing Information
                  </SelectItem>
                  <SelectItem value="become-tutor" className="text-white hover:bg-amber-500/20">
                    Become a Tutor
                  </SelectItem>
                  <SelectItem value="other" className="text-white hover:bg-amber-500/20">
                    Other
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="message" className="text-white">
                Message
              </Label>
              <Textarea
                id="message"
                name="message"
                placeholder="How can we help you?"
                rows={5}
                value={formData.message}
                onChange={handleChange}
                className="bg-black/50 border-amber-500/30 text-white backdrop-blur-sm"
                required
              />
            </div>
            <Button type="submit" className="w-full btn-premium text-black font-medium">
              Send Message
            </Button>
          </form>
        </div>
      </div>
    </section>
  )
}
