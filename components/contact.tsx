"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"

export function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    resume: null as File | null,
    reason: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null
    setFormData((prev) => ({ ...prev, resume: file }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission here
    console.log(formData)
    alert("Thank you for your application! We'll get back to you soon.")
    setFormData({
      name: "",
      email: "",
      resume: null,
      reason: "",
    })
    // Reset file input
    const fileInput = document.getElementById("resume") as HTMLInputElement
    if (fileInput) fileInput.value = ""
  }

  return (
    <section id="contact" className="py-20 relative">
      <div className="absolute inset-0 gold-pattern"></div>
      <div className="container relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4 text-white text-glow-subtle">Become a Tutor</h2>
        </div>

        {/* Centered Application Form */}
        <div className="max-w-2xl mx-auto">
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
              <Label htmlFor="resume" className="text-white">
                Resume
              </Label>
              <Input
                id="resume"
                name="resume"
                type="file"
                accept=".pdf,.doc,.docx"
                onChange={handleFileChange}
                className="bg-black/50 border-amber-500/30 text-white file:bg-amber-500 file:text-black file:border-0 file:rounded file:px-4 file:py-2 file:mr-4 backdrop-blur-sm h-12"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="reason" className="text-white">
                Why UniTutors?
              </Label>
              <Textarea
                id="reason"
                name="reason"
                placeholder="We'd love to hear your reason."
                rows={5}
                value={formData.reason}
                onChange={handleChange}
                className="bg-black/50 border-amber-500/30 text-white backdrop-blur-sm"
                required
              />
            </div>
            <Button type="submit" className="w-full btn-premium text-black font-medium">
              Submit Application
            </Button>
          </form>
        </div>
      </div>
    </section>
  )
}
