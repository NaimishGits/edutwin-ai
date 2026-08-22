import { Link } from "react-router-dom"

function Roadmap() {

  const roadmap = [
    {
      step: 1,
      title: "Strengthen SQL",
      description:
        "Practice joins, subqueries, normalization and advanced SQL queries.",
      duration: "1–2 weeks",
      status: "In Progress",
      priority: "High",
    },
    {
      step: 2,
      title: "Improve React Skills",
      description:
        "Build interactive components, understand routing, state management and API integration.",
      duration: "2–3 weeks",
      status: "Next",
      priority: "High",
    },
    {
      step: 3,
      title: "Learn REST APIs",
      description:
        "Understand HTTP methods, API requests, responses and backend integration.",
      duration: "1 week",
      status: "Upcoming",
      priority: "Medium",
    },
    {
      step: 4,
      title: "Build Practical Projects",
      description:
        "Create projects using React, Python, FastAPI and MongoDB.",
      duration: "2–3 weeks",
      status: "Upcoming",
      priority: "High",
    },
    {
      step: 5,
      title: "Practice DSA",
      description:
        "Practice arrays, strings, sorting, searching, linked lists and common interview problems.",
      duration: "3–4 weeks",
      status: "Upcoming",
      priority: "High",
    },
    {
      step: 6,
      title: "Interview Preparation",
      description:
        "Prepare technical concepts, coding questions, HR questions and mock interviews.",
      duration: "2 weeks",
      status: "Upcoming",
      priority: "Medium",
    },
  ]

  return (
    <div className="min-h-screen bg-slate-950 text-white">

      {/* Navbar */}
      <header className="flex items-center justify-between border-b border-slate-800 bg-slate-900 px-6 py-4">

        <Link
          to="/dashboard"
          className="text-2xl font-bold text-blue-400"
        >
          EduTwin AI
        </Link>

        <div className="flex items-center gap-3">

          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-600 font-semibold">
            A
          </div>

          <span className="hidden sm:block">
            Aditi
          </span>

        </div>

      </header>


      <div className="flex">

        {/* Sidebar */}
        <aside className="hidden min-h-[calc(100vh-73px)] w-64 border-r border-slate-800 bg-slate-900 p-5 md:block">

          <nav className="space-y-2">

            <Link
              to="/dashboard"
              className="block rounded-lg px-4 py-3 text-slate-400 hover:bg-slate-800 hover:text-white"
            >
              🏠 Dashboard
            </Link>

            <Link
              to="/academic"
              className="block rounded-lg px-4 py-3 text-slate-400 hover:bg-slate-800 hover:text-white"
            >
              📚 Academic
            </Link>

            <Link
              to="/skills"
              className="block rounded-lg px-4 py-3 text-slate-400 hover:bg-slate-800 hover:text-white"
            >
              🧠 Skills
            </Link>

            <Link
              to="/analytics"
              className="block rounded-lg px-4 py-3 text-slate-400 hover:bg-slate-800 hover:text-white"
            >
              📊 Analytics
            </Link>

            <Link
              to="/career"
              className="block rounded-lg px-4 py-3 text-slate-400 hover:bg-slate-800 hover:text-white"
            >
              🎯 Career
            </Link>

            <Link
              to="/roadmap"
              className="block rounded-lg bg-blue-600 px-4 py-3 font-medium"
            >
              🚀 Growth Roadmap
            </Link>

            <div className="my-6 border-t border-slate-800" />

            <Link
              to="/"
              className="block rounded-lg px-4 py-3 text-slate-400 hover:bg-slate-800 hover:text-white"
            >
              🚪 Logout
            </Link>

          </nav>

        </aside>


        {/* Main Content */}
        <main className="w-full p-6 md:p-8">

          {/* Heading */}
          <div className="mb-8">

            <h1 className="text-3xl font-bold">
              Growth Roadmap 🚀
            </h1>

            <p className="mt-2 text-slate-400">
              Follow your personalized path toward your career goal.
            </p>

          </div>


          {/* Progress */}
          <div className="mb-8 rounded-2xl border border-slate-800 bg-slate-900 p-6">

            <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">

              <div>

                <h2 className="text-xl font-semibold">
                  Your Progress
                </h2>

                <p className="mt-1 text-sm text-slate-400">
                  Keep completing your recommended activities.
                </p>

              </div>

              <div className="text-left sm:text-right">

                <p className="text-3xl font-bold text-blue-400">
                  17%
                </p>

                <p className="text-sm text-slate-500">
                  Roadmap completed
                </p>

              </div>

            </div>


            <div className="mt-6 h-3 rounded-full bg-slate-800">

              <div
                className="h-3 rounded-full bg-blue-600"
                style={{ width: "17%" }}
              />

            </div>

          </div>


          {/* AI Recommendation */}
          <div className="mb-8 rounded-2xl border border-blue-900/50 bg-blue-950/20 p-6">

            <div className="flex items-start gap-4">

              <div className="text-3xl">
                🤖
              </div>

              <div>

                <h2 className="text-xl font-semibold">
                  AI Recommended Path
                </h2>

                <p className="mt-2 leading-6 text-slate-400">
                  Based on your current academic performance,
                  skills and career goal, your next priority should
                  be strengthening SQL and React before moving to
                  advanced development topics.
                </p>

              </div>

            </div>

          </div>


          {/* Roadmap */}
          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">

            <h2 className="text-xl font-semibold">
              Your Learning Journey
            </h2>

            <p className="mt-1 text-sm text-slate-400">
              Recommended steps for your career development.
            </p>


            <div className="mt-8">

              {roadmap.map((item, index) => (

                <div
                  key={item.step}
                  className="relative flex gap-5 pb-10"
                >

                  {/* Timeline */}
                  <div className="flex flex-col items-center">

                    <div
                      className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full font-bold ${
                        item.status === "In Progress"
                          ? "bg-blue-600"
                          : "bg-slate-800 text-slate-400"
                      }`}
                    >
                      {item.step}
                    </div>

                    {index !== roadmap.length - 1 && (
                      <div className="mt-2 h-full w-0.5 bg-slate-700" />
                    )}

                  </div>


                  {/* Content */}
                  <div className="w-full rounded-xl border border-slate-800 bg-slate-800/50 p-5">

                    <div className="flex flex-col justify-between gap-3 sm:flex-row">

                      <div>

                        <h3 className="text-lg font-semibold">
                          {item.title}
                        </h3>

                        <p className="mt-2 text-sm leading-6 text-slate-400">
                          {item.description}
                        </p>

                      </div>


                      <span
                        className={`h-fit rounded-full px-3 py-1 text-xs font-medium ${
                          item.priority === "High"
                            ? "bg-red-500/10 text-red-400"
                            : "bg-yellow-500/10 text-yellow-400"
                        }`}
                      >
                        {item.priority} Priority
                      </span>

                    </div>


                    <div className="mt-5 flex flex-wrap items-center gap-3">

                      <span className="rounded-lg bg-slate-900 px-3 py-2 text-xs text-slate-400">
                        ⏱ {item.duration}
                      </span>

                      <span
                        className={`rounded-lg px-3 py-2 text-xs ${
                          item.status === "In Progress"
                            ? "bg-blue-500/10 text-blue-400"
                            : item.status === "Next"
                            ? "bg-green-500/10 text-green-400"
                            : "bg-slate-900 text-slate-500"
                        }`}
                      >
                        {item.status}
                      </span>

                    </div>

                  </div>

                </div>

              ))}

            </div>

          </div>


          {/* Final Goal */}
          <div className="mt-8 rounded-2xl border border-green-900/50 bg-green-950/20 p-6">

            <div className="flex items-center gap-4">

              <div className="text-4xl">
                🎯
              </div>

              <div>

                <h2 className="text-xl font-semibold">
                  Final Goal: Placement Ready
                </h2>

                <p className="mt-2 text-sm leading-6 text-slate-400">
                  Complete the roadmap to strengthen your technical
                  skills, projects and interview preparation.
                </p>

              </div>

            </div>

          </div>

        </main>

      </div>

    </div>
  )
}

export default Roadmap