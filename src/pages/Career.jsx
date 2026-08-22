import { useState } from "react"
import { Link } from "react-router-dom"

function Career() {

  const [careerGoal, setCareerGoal] = useState("Software Developer")

  const [skills, setSkills] = useState([
    { name: "Python", current: 80, required: 85 },
    { name: "Java", current: 75, required: 80 },
    { name: "SQL", current: 70, required: 85 },
    { name: "React", current: 60, required: 80 },
    { name: "Data Structures", current: 82, required: 85 },
  ])

  const careerOptions = [
    "Software Developer",
    "Data Scientist",
    "Machine Learning Engineer",
    "Full Stack Developer",
    "Data Analyst",
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
              className="block rounded-lg bg-blue-600 px-4 py-3 font-medium"
            >
              🎯 Career
            </Link>

            <Link
              to="/roadmap"
              className="block rounded-lg px-4 py-3 text-slate-400 hover:bg-slate-800 hover:text-white"
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
              Career Development 🎯
            </h1>

            <p className="mt-2 text-slate-400">
              Explore your career goal and identify the skills
              you need to reach it.
            </p>

          </div>


          {/* Career Goal */}
          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">

            <h2 className="text-xl font-semibold">
              Your Career Goal
            </h2>

            <p className="mt-1 text-sm text-slate-400">
              Select the role you want to prepare for.
            </p>


            <div className="mt-5 flex flex-col gap-4 sm:flex-row">

              <select
                value={careerGoal}
                onChange={(e) => setCareerGoal(e.target.value)}
                className="max-w-md rounded-lg border border-slate-700 bg-slate-800 px-4 py-3 outline-none focus:border-blue-500"
              >

                {careerOptions.map((career, index) => (
                  <option key={index} value={career}>
                    {career}
                  </option>
                ))}

              </select>

              <div className="rounded-lg bg-blue-500/10 px-5 py-3 text-blue-400">
                🎯 Target: {careerGoal}
              </div>

            </div>

          </div>


          {/* Career Readiness */}
          <div className="mt-6 grid gap-6 lg:grid-cols-3">

            {/* Score */}
            <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">

              <h2 className="text-xl font-semibold">
                Career Readiness
              </h2>

              <p className="mt-1 text-sm text-slate-400">
                Current preparation level
              </p>


              <div className="mt-8 flex justify-center">

                <div className="flex h-40 w-40 items-center justify-center rounded-full border-14px border-blue-600">

                  <div className="text-center">

                    <p className="text-4xl font-bold">
                      74%
                    </p>

                    <p className="text-xs text-slate-400">
                      Ready
                    </p>

                  </div>

                </div>

              </div>

            </div>


            {/* Strength */}
            <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">

              <h2 className="text-xl font-semibold">
                Strong Areas 💪
              </h2>

              <p className="mt-1 text-sm text-slate-400">
                Skills already close to the target
              </p>


              <div className="mt-6 space-y-4">

                <div className="rounded-lg bg-slate-800 p-4">

                  <div className="flex justify-between">

                    <span>
                      Python
                    </span>

                    <span className="text-green-400">
                      80%
                    </span>

                  </div>

                </div>


                <div className="rounded-lg bg-slate-800 p-4">

                  <div className="flex justify-between">

                    <span>
                      Data Structures
                    </span>

                    <span className="text-green-400">
                      82%
                    </span>

                  </div>

                </div>


                <div className="rounded-lg bg-slate-800 p-4">

                  <div className="flex justify-between">

                    <span>
                      Java
                    </span>

                    <span className="text-green-400">
                      75%
                    </span>

                  </div>

                </div>

              </div>

            </div>


            {/* Skill Gaps */}
            <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">

              <h2 className="text-xl font-semibold">
                Skill Gaps ⚠️
              </h2>

              <p className="mt-1 text-sm text-slate-400">
                Skills requiring improvement
              </p>


              <div className="mt-6 space-y-4">

                <div className="rounded-lg bg-slate-800 p-4">

                  <div className="flex justify-between">

                    <span>
                      SQL
                    </span>

                    <span className="text-yellow-400">
                      -15%
                    </span>

                  </div>

                </div>


                <div className="rounded-lg bg-slate-800 p-4">

                  <div className="flex justify-between">

                    <span>
                      React
                    </span>

                    <span className="text-yellow-400">
                      -20%
                    </span>

                  </div>

                </div>

              </div>

            </div>

          </div>


          {/* Skill Gap Analysis */}
          <div className="mt-8 rounded-2xl border border-slate-800 bg-slate-900 p-6">

            <h2 className="text-xl font-semibold">
              Skill Gap Analysis 📊
            </h2>

            <p className="mt-1 text-sm text-slate-400">
              Compare your current skills with the expected level
              for your target career.
            </p>


            <div className="mt-8 space-y-6">

              {skills.map((skill, index) => {

                const gap = skill.required - skill.current

                return (
                  <div key={index}>

                    <div className="mb-2 flex items-center justify-between">

                      <div>

                        <span className="font-medium">
                          {skill.name}
                        </span>

                        <span className="ml-3 text-sm text-slate-500">
                          Target: {skill.required}%
                        </span>

                      </div>

                      <span
                        className={
                          gap > 0
                            ? "text-yellow-400"
                            : "text-green-400"
                        }
                      >
                        {skill.current}%
                      </span>

                    </div>


                    <div className="h-3 rounded-full bg-slate-800">

                      <div
                        className={
                          gap > 0
                            ? "h-3 rounded-full bg-yellow-500"
                            : "h-3 rounded-full bg-green-500"
                        }
                        style={{
                          width: `${skill.current}%`,
                        }}
                      />

                    </div>


                    {gap > 0 && (

                      <p className="mt-2 text-xs text-slate-500">
                        Improve by approximately {gap}% to reach
                        the target level.
                      </p>

                    )}

                  </div>
                )

              })}

            </div>

          </div>


          {/* Recommended Skills */}
          <div className="mt-8 grid gap-6 lg:grid-cols-2">

            <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">

              <h2 className="text-xl font-semibold">
                Recommended Skills 💡
              </h2>

              <p className="mt-1 text-sm text-slate-400">
                Skills that can improve your career readiness
              </p>


              <div className="mt-6 space-y-4">

                <div className="flex items-center justify-between rounded-lg bg-slate-800 p-4">

                  <div>

                    <p className="font-medium">
                      Advanced SQL
                    </p>

                    <p className="text-sm text-slate-500">
                      High priority
                    </p>

                  </div>

                  <span className="rounded-full bg-red-500/10 px-3 py-1 text-xs text-red-400">
                    High
                  </span>

                </div>


                <div className="flex items-center justify-between rounded-lg bg-slate-800 p-4">

                  <div>

                    <p className="font-medium">
                      React.js
                    </p>

                    <p className="text-sm text-slate-500">
                      Important for development roles
                    </p>

                  </div>

                  <span className="rounded-full bg-yellow-500/10 px-3 py-1 text-xs text-yellow-400">
                    Medium
                  </span>

                </div>


                <div className="flex items-center justify-between rounded-lg bg-slate-800 p-4">

                  <div>

                    <p className="font-medium">
                      REST APIs
                    </p>

                    <p className="text-sm text-slate-500">
                      Useful for full-stack development
                    </p>

                  </div>

                  <span className="rounded-full bg-yellow-500/10 px-3 py-1 text-xs text-yellow-400">
                    Medium
                  </span>

                </div>

              </div>

            </div>


            {/* AI Career Recommendation */}
            <div className="rounded-2xl border border-blue-900/50 bg-blue-950/20 p-6">

              <div className="flex items-center gap-3">

                <span className="text-3xl">
                  🤖
                </span>

                <div>

                  <h2 className="text-xl font-semibold">
                    AI Career Recommendation
                  </h2>

                  <p className="text-sm text-slate-400">
                    Based on your current profile
                  </p>

                </div>

              </div>


              <div className="mt-6">

                <p className="text-lg font-semibold text-blue-400">
                  Software Developer
                </p>

                <p className="mt-3 text-sm leading-6 text-slate-400">
                  Your current programming, database and data
                  structure skills indicate a good foundation for
                  a software development career.
                </p>

              </div>


              <div className="mt-6 rounded-lg bg-slate-900 p-4">

                <p className="font-medium">
                  🎯 Next Focus
                </p>

                <p className="mt-2 text-sm text-slate-400">
                  Improve SQL, React and REST API development and
                  build practical projects.
                </p>

              </div>

            </div>

          </div>


          {/* Career Action Plan */}
          <div className="mt-8 rounded-2xl border border-slate-800 bg-slate-900 p-6">

            <h2 className="text-xl font-semibold">
              Career Action Plan 🚀
            </h2>

            <p className="mt-1 text-sm text-slate-400">
              Suggested steps for the next few weeks
            </p>


            <div className="mt-6 grid gap-4 md:grid-cols-3">

              <div className="rounded-lg bg-slate-800 p-5">

                <div className="text-2xl">
                  1️⃣
                </div>

                <h3 className="mt-3 font-semibold">
                  Strengthen SQL
                </h3>

                <p className="mt-2 text-sm text-slate-400">
                  Practice queries, joins, subqueries and
                  database design.
                </p>

              </div>


              <div className="rounded-lg bg-slate-800 p-5">

                <div className="text-2xl">
                  2️⃣
                </div>

                <h3 className="mt-3 font-semibold">
                  Build Projects
                </h3>

                <p className="mt-2 text-sm text-slate-400">
                  Build practical projects using React,
                  Python and APIs.
                </p>

              </div>


              <div className="rounded-lg bg-slate-800 p-5">

                <div className="text-2xl">
                  3️⃣
                </div>

                <h3 className="mt-3 font-semibold">
                  Practice Interviews
                </h3>

                <p className="mt-2 text-sm text-slate-400">
                  Practice technical questions, coding and
                  communication skills.
                </p>

              </div>

            </div>

          </div>

        </main>

      </div>

    </div>
  )
}

export default Career