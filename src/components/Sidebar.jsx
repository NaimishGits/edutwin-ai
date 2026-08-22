import { Link, useLocation } from "react-router-dom"

function Sidebar() {
  const location = useLocation()

  const menuItems = [
    {
      name: "Dashboard",
      path: "/dashboard",
      icon: "🏠",
    },
    {
      name: "Academic",
      path: "/academic",
      icon: "📚",
    },
    {
      name: "Skills",
      path: "/skills",
      icon: "🧠",
    },
    {
      name: "Analytics",
      path: "/analytics",
      icon: "📊",
    },
    {
      name: "Career",
      path: "/career",
      icon: "🎯",
    },
    {
      name: "Growth Roadmap",
      path: "/roadmap",
      icon: "🚀",
    },
  ]

  return (
    <aside className="hidden min-h-[calc(100vh-73px)] w-64 border-r border-slate-800 bg-slate-900 p-5 md:block">
      <nav className="space-y-2">

        {menuItems.map((item) => {
          const isActive = location.pathname === item.path

          return (
            <Link
              key={item.path}
              to={item.path}
              className={`block rounded-lg px-4 py-3 transition ${
                isActive
                  ? "bg-blue-600 text-white"
                  : "text-slate-400 hover:bg-slate-800 hover:text-white"
              }`}
            >
              {item.icon} {item.name}
            </Link>
          )
        })}

        <div className="my-6 border-t border-slate-800" />

        <Link
          to="/"
          className="block rounded-lg px-4 py-3 text-slate-400 hover:bg-slate-800 hover:text-white"
        >
          🚪 Logout
        </Link>

      </nav>
    </aside>
  )
}

export default Sidebar