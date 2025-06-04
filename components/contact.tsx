"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Mail, Phone, MapPin } from "lucide-react"

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
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white text-glow-subtle">Get in Touch</h2>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Have questions or ready to start? Contact us today to learn more about our tutoring services.
          </p>
        </div>
        <div className="grid md:grid-cols-2 gap-12">
          <div>
            <h3 className="text-2xl font-bold mb-6 text-white">Contact Information</h3>
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <Mail className="h-6 w-6 text-amber-500 mt-1" />
                <div>
                  <h4 className="font-medium text-white">Email Us</h4>
                  <p className="text-gray-300">info@unitutors.com</p>
                  <p className="text-gray-300">support@unitutors.com</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <Phone className="h-6 w-6 text-amber-500 mt-1" />
                <div>
                  <h4 className="font-medium text-white">Call Us</h4>
                  <p className="text-gray-300">(555) 123-4567</p>
                  <p className="text-gray-300">Mon-Fri: 9am-8pm, Sat: 10am-4pm</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <MapPin className="h-6 w-6 text-amber-500 mt-1" />
                <div>
                  <h4 className="font-medium text-white">Visit Us</h4>
                  <p className="text-gray-300">123 University Ave</p>
                  <p className="text-gray-300">College Town, CA 12345</p>
                </div>
              </div>
            </div>
            <div className="mt-10">
              <h3 className="text-2xl font-bold mb-6 text-white">Office Hours</h3>
              <div className="space-y-2 text-gray-300">
                <div className="flex justify-between">
                  <span>Monday - Friday</span>
                  <span>9:00 AM - 8:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span>Saturday</span>
                  <span>10:00 AM - 4:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span>Sunday</span>
                  <span>Closed</span>
                </div>
              </div>
            </div>
          </div>
          <div>
            <h3 className="text-2xl font-bold mb-6 text-white">Send Us a Message</h3>
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
      </div>
    </section>
  )
}
