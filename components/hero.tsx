import Image from "next/image"
import { Button } from "@/components/ui/button"

export function Hero() {
  return (
    <section className="relative py-20 md:py-32 overflow-hidden animated-gradient text-white">
      <div className="absolute inset-0 gold-pattern" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-transparent to-black/60" />

      {/* Floating gold particles effect */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-amber-500/30 rounded-full animate-pulse"></div>
        <div className="absolute top-3/4 right-1/4 w-1 h-1 bg-amber-400/40 rounded-full animate-ping"></div>
        <div className="absolute top-1/2 left-3/4 w-1.5 h-1.5 bg-amber-300/20 rounded-full animate-pulse"></div>
        <div className="absolute top-1/3 right-1/3 w-1 h-1 bg-amber-500/50 rounded-full animate-ping"></div>
      </div>

      <div className="container grid md:grid-cols-2 gap-8 items-center relative z-10">
        <div className="flex flex-col gap-6">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-glow">
            Expert Tutoring for <span className="text-amber-400 text-glow-subtle">University Students</span>
          </h1>
          <p className="text-lg text-gray-200">Get taught by the best. Here, excellence is the standard.</p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button size="lg" className="btn-premium text-black font-medium">
              Find a Tutor
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-amber-500 text-amber-400 hover:bg-amber-500 hover:text-black backdrop-blur-sm"
            >
              Learn More
            </Button>
          </div>
        </div>
        <div className="flex items-center justify-center">
          <div className="relative">
            <div className="absolute inset-0 bg-amber-500/20 rounded-full blur-3xl"></div>
            <Image
              src="/images/unitutors-logo-clean.png"
              alt="UniTutors Logo"
              width={400}
              height={200}
              className="w-full max-w-[400px] h-auto relative z-10"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  )
}
