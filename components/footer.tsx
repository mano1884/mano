export function Footer() {
  return (
    <footer className="py-8 relative">
      <div className="absolute inset-0 gold-pattern"></div>
      <div className="container relative z-10">
        <div className="text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} UniTutors. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
