"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Star } from "lucide-react"

export function Testimonials() {
  const testimonials = [
    {
      name: "Alex Thompson",
      university: "Stanford University",
      image: "/placeholder.svg?height=100&width=100",
      text: "My calculus grades improved from a C to an A- after just 5 sessions with Dr. Johnson. The personalized approach made all the difference.",
      rating: 5,
    },
    {
      name: "Priya Patel",
      university: "UC Berkeley",
      image: "/placeholder.svg?height=100&width=100",
      text: "Professor Chen helped me understand complex programming concepts that I had been struggling with for months. Highly recommend!",
      rating: 5,
    },
    {
      name: "Marcus Johnson",
      university: "NYU",
      image: "/placeholder.svg?height=100&width=100",
      text: "The organic chemistry tutoring I received was exceptional. Dr. Rodriguez explained reactions in a way that finally made sense to me.",
      rating: 4,
    },
    {
      name: "Emma Wilson",
      university: "University of Michigan",
      image: "/placeholder.svg?height=100&width=100",
      text: "I was about to drop my economics course before finding UniTutors. Prof. Wilson's explanations were clear and helped me pass with a B+.",
      rating: 5,
    },
    {
      name: "David Kim",
      university: "Columbia University",
      image: "/placeholder.svg?height=100&width=100",
      text: "The flexible scheduling allowed me to fit tutoring around my busy schedule. My tutor was always prepared and extremely knowledgeable.",
      rating: 5,
    },
    {
      name: "Sophia Martinez",
      university: "UCLA",
      image: "/placeholder.svg?height=100&width=100",
      text: "UniTutors helped me prepare for my finals and I ended up with the highest grade in the class. Worth every penny!",
      rating: 5,
    },
  ]

  return (
    <section id="testimonials" className="py-20 relative">
      <div className="absolute inset-0 gold-pattern"></div>
      <div className="container relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4 text-white text-glow-subtle">What Our Students Say</h2>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Hear from students who have transformed their academic performance with UniTutors.
          </p>
        </div>
        <div className="grid grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="premium-card">
              <CardContent className="p-6">
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-5 w-5 ${i < testimonial.rating ? "fill-amber-500 text-amber-500" : "fill-muted text-muted"}`}
                    />
                  ))}
                </div>
                <p className="mb-6 italic text-gray-200">"{testimonial.text}"</p>
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-amber-500/20 flex items-center justify-center text-sm font-medium text-amber-400">
                    {testimonial.name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-medium text-white">{testimonial.name}</p>
                    <p className="text-sm text-gray-400">{testimonial.university}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
