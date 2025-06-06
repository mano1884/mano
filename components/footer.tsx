export function Footer() {
  return (
    <footer className="py-8 relative">
      <div className="absolute inset-0 gold-pattern"></div>
      <div className="container relative z-10">
        <div className="text-center text-gray-400">
          <div className="flex items-center justify-center gap-4 mb-2">
            <span className="text-amber-300">📧 unitutors7@gmail.com</span>
            <span className="text-amber-300">📞 70302418</span>
          </div>
          <p>&copy; {new Date().getFullYear()} UniTutors. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
