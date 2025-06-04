import { BookOpen, Award, Clock, Users, UsersIcon } from "lucide-react"

export function Features() {
  const features = [
    {
      icon: <BookOpen className="h-10 w-10 text-amber-400" />,
      title: "Expert Tutors",
      description: "Learn from top graduates with proven track records in their fields.",
    },
    {
      icon: <Award className="h-10 w-10 text-amber-400" />,
      title: "Guaranteed Results",
      description: "Our tutoring methods are proven to improve grades and understanding.",
    },
    {
      icon: <Clock className="h-10 w-10 text-amber-400" />,
      title: "Flexible Scheduling",
      description: "Book sessions that fit your busy university schedule, including evenings and weekends.",
    },
    {
      icon: <Users className="h-10 w-10 text-amber-400" />,
      title: "1-on-1 Attention",
      description: "Get personalized instruction tailored to your learning style and needs.",
    },
    {
      icon: <UsersIcon className="h-10 w-10 text-amber-400" />,
      title: "Group Tutoring",
      description: "Learn together, grow together.",
    },
  ]

  return (
    <section id="features" className="py-20 relative">
      <div className="absolute inset-0 gold-pattern"></div>
      <div className="container relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white text-glow-subtle">Why Choose UniTutors</h2>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            We provide the highest quality tutoring services to help university students excel in their studies.
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.slice(0, 3).map((feature, index) => (
            <div key={index} className="premium-card p-6 rounded-lg">
              <div className="mb-4">{feature.icon}</div>
              <h3 className="text-xl font-bold mb-2 text-white">{feature.title}</h3>
              <p className="text-gray-300">{feature.description}</p>
            </div>
          ))}
        </div>
        <div className="grid md:grid-cols-2 gap-8 mt-8 max-w-2xl mx-auto">
          {features.slice(3, 5).map((feature, index) => (
            <div key={index + 3} className="premium-card p-6 rounded-lg">
              <div className="mb-4">{feature.icon}</div>
              <h3 className="text-xl font-bold mb-2 text-white">{feature.title}</h3>
              <p className="text-gray-300">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
