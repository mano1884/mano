import { Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"

export function Pricing() {
  const plans = [
    {
      name: "Single Session",
      price: "$60",
      description: "One-time tutoring session",
      features: ["1-hour session", "Expert tutor in your subject", "Session notes provided", "24/7 support"],
      popular: false,
    },
    {
      name: "Monthly Package",
      price: "$220",
      description: "4 sessions per month",
      features: [
        "4 one-hour sessions",
        "Same tutor for consistency",
        "Homework help between sessions",
        "Progress tracking",
        "Study materials included",
        "24/7 support",
      ],
      popular: true,
    },
    {
      name: "Semester Package",
      price: "$800",
      description: "16 sessions (entire semester)",
      features: [
        "16 one-hour sessions",
        "Same tutor for consistency",
        "Unlimited homework help",
        "Exam preparation",
        "Custom study plan",
        "All study materials included",
        "Priority scheduling",
        "24/7 support",
      ],
      popular: false,
    },
  ]

  return (
    <section id="pricing" className="py-20 bg-muted">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Simple, Transparent Pricing</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Choose the plan that works best for your academic needs and schedule.
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <Card key={index} className={`relative ${plan.popular ? "border-amber-500 shadow-lg" : ""}`}>
              {plan.popular && (
                <div className="absolute -top-4 left-0 right-0 mx-auto w-fit px-3 py-1 bg-amber-500 text-white text-sm font-medium rounded-full">
                  Most Popular
                </div>
              )}
              <CardHeader>
                <h3 className="text-2xl font-bold">{plan.name}</h3>
                <div className="mt-4">
                  <span className="text-4xl font-bold">{plan.price}</span>
                  <span className="text-muted-foreground ml-2">{plan.description}</span>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-center">
                      <Check className="h-5 w-5 text-amber-500 mr-2" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                <Button
                  className={`w-full ${plan.popular ? "bg-amber-500 hover:bg-amber-600 text-white" : ""}`}
                  variant={plan.popular ? "default" : "outline"}
                >
                  Get Started
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
        <div className="text-center mt-10">
          <p className="text-muted-foreground mb-4">
            Need a custom plan? Contact us for group rates or specialized tutoring packages.
          </p>
          <Button variant="outline" className="border-amber-500 text-amber-500 hover:bg-amber-500 hover:text-white">
            Contact for Custom Plans
          </Button>
        </div>
      </div>
    </section>
  )
}
