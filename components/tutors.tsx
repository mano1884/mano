"use client"

import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export function Tutors() {
  const tutors = [
    {
      name: "Mr. Emanuel Youssef",
      image: "/images/emanuel-avatar.png",
      role: "NDU FBAE Valedictorian 2024-2025",
      education: "MSc in FRM, BBA in Fin. Eng",
      subjects: ["Finance", "Economics", "Math and Statistics", "Accounting"],
      rating: 5.0,
      isAvailable: true,
    },
    {
      name: "Coming Soon",
      image: "/images/coming-soon-avatar-1.png",
      role: "FBAE Valedictorian",
      education: "BBA in Marketing",
      subjects: ["Management and Marketing Courses"],
      isComingSoon: true,
    },
    {
      name: "Coming Soon",
      image: "/images/coming-soon-avatar-2.png",
      role: "FE Valedictorian",
      education: "BE",
      subjects: ["Engineering Courses"],
      isComingSoon: true,
    },
  ]

  return (
    <section id="tutors" className="py-20 relative">
      <div className="absolute inset-0 gold-pattern"></div>
      <div className="container relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4 text-white text-glow-subtle">Meet Our Expert Tutors</h2>
        </div>
        <div className="grid grid-cols-3 gap-6 justify-center">
          {tutors.map((tutor, index) => (
            <Card
              key={index}
              className={`overflow-hidden premium-card ${tutor.isComingSoon ? "border-dashed border-amber-500/50" : ""} flex flex-col h-full`}
            >
              <div className="relative h-80 w-full bg-gradient-to-b from-amber-500/10 to-transparent">
                <Image
                  src={tutor.image || "/placeholder.svg"}
                  alt={tutor.name}
                  fill
                  className="object-cover object-top"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
              </div>
              <CardContent className="pt-6 flex-grow relative">
                <div className="flex items-start justify-between mb-2">
                  <h3 className={`font-bold text-lg flex-1 ${tutor.isComingSoon ? "text-amber-400" : "text-white"}`}>
                    {tutor.name}
                  </h3>
                  {tutor.rating && (
                    <Badge
                      variant="outline"
                      className="bg-amber-500/20 text-amber-300 border-amber-500/30 ml-2 flex-shrink-0"
                    >
                      {tutor.rating} ★
                    </Badge>
                  )}
                </div>
                <p className="text-amber-400 font-medium mb-2">{tutor.role}</p>
                <p className="text-sm text-gray-300 mb-4">{tutor.education}</p>
                <div className="flex flex-wrap gap-2">
                  {tutor.subjects.map((subject, i) => (
                    <Badge
                      key={i}
                      variant="secondary"
                      className={`${tutor.isComingSoon ? "bg-amber-500/20 text-amber-300" : "bg-amber-500/10 text-amber-200 border border-amber-500/30"}`}
                    >
                      {subject}
                    </Badge>
                  ))}
                </div>
              </CardContent>
              <CardFooter className="mt-auto">
                <Button
                  variant="outline"
                  className={`w-full ${
                    tutor.isComingSoon
                      ? "border-amber-500/50 text-amber-400 cursor-not-allowed"
                      : "btn-premium border-amber-500 text-black hover:bg-amber-500 hover:text-black"
                  }`}
                  disabled={tutor.isComingSoon}
                  onClick={() => {
                    if (!tutor.isComingSoon) {
                      window.location.href = "/booking"
                    }
                  }}
                >
                  {tutor.isComingSoon ? "Coming Soon" : "Book a Session"}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
