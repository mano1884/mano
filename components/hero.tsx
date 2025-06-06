import Image from "next/image"

export function Hero() {
  return (
    <section className="relative py-20 overflow-hidden">
      <div className="absolute inset-0 gold-pattern"></div>
      <div className="container grid grid-cols-2 gap-8 items-center relative z-10">
        <div className="flex flex-col gap-6">
          <h1 className="text-6xl font-bold tracking-tight text-glow">
            Expert Tutoring for <span className="text-amber-400 text-glow-subtle">University Students</span>
          </h1>
          <p className="text-lg text-gray-200">Get taught by the best. Here, excellence is the standard.</p>
        </div>
        <div className="flex items-center justify-center">
          <div className="relative">
            <div className="absolute inset-0 bg-amber-500/20 rounded-full blur-3xl"></div>
            <Image
              src="/images/unitutors-logo-new.png"
              alt="UniTutors Logo"
              width={400}
              height={400}
              className="w-full max-w-[400px] h-auto relative z-10"
              priority
              quality={90}
            />
          </div>
        </div>
      </div>
    </section>
  )
}
