import { Card, CardContent } from "@/components/ui/card"
import { ChevronRight } from "lucide-react"

export function Subjects() {
  const subjectCategories = [
    {
      category: "Finance",
      subjects: [
        "Principles of Financial Management I & II",
        "Fundamentals of Investments",
        "Commercial Bank Management",
        "Quantitative Asset Management",
        "Derivatives",
        "Advanced Derivatives",
        "Financial Risk Management",
      ],
    },
    {
      category: "Economics",
      subjects: [
        "Principles of Microeconomics",
        "Principles of Macroeconomics",
        "Managerial Economics",
        "Introduction to Econometrics",
      ],
    },
    {
      category: "Math and Statistics",
      subjects: [
        "Mathematics for Business and Economics",
        "Numerical Methods for Finance",
        "Applied Statistics",
        "More Courses Coming Soon...",
      ],
    },
    {
      category: "Accounting",
      subjects: ["Principles of Accounting I", "Managerial Accounting", "More Courses Coming Soon..."],
    },
    {
      category: "Coming Soon",
      subjects: ["Engineering Courses"],
      isComingSoon: true,
    },
    {
      category: "Coming Soon",
      subjects: ["Management and Marketing Courses"],
      isComingSoon: true,
    },
  ]

  return (
    <section id="subjects" className="py-20 relative">
      <div className="absolute inset-0 gold-pattern"></div>
      <div className="container relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white text-glow-subtle">Subjects We Cover</h2>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            We offer expert tutoring across a wide range of university subjects and disciplines.
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {subjectCategories.map((category, index) => (
            <Card
              key={index}
              className={`premium-card ${category.isComingSoon ? "border-dashed border-amber-500/50" : ""}`}
            >
              <CardContent className="p-6">
                <h3
                  className={`text-xl font-bold mb-4 ${category.isComingSoon ? "text-amber-400" : "text-amber-300 text-glow-subtle"}`}
                >
                  {category.category}
                </h3>
                <ul className="space-y-2 text-gray-200">
                  {category.subjects.map((subject, i) => (
                    <li key={i} className="flex items-start">
                      <ChevronRight className="h-4 w-4 text-amber-400 mr-2 mt-1 flex-shrink-0" />
                      <span className={category.isComingSoon ? "text-amber-300/80" : ""}>{subject}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
