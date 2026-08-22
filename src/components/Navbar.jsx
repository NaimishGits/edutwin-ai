import { Link } from "react-router-dom"

function Navbar() {
  return (
    <header className="flex items-center justify-between border-b border-slate-800 bg-slate-900 px-6 py-4">

      {/* Logo */}
      <Link
        to="/dashboard"
        className="text-2xl font-bold text-blue-400"
      >
        EduTwin AI
      </Link>

      {/* Right Side */}
      <div className="flex items-center gap-3">

        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-600 font-semibold">
          A
        </div>

        <span className="hidden text-white sm:block">
          Aditi
        </span>

      </div>

    </header>
  )
}

export default Navbar