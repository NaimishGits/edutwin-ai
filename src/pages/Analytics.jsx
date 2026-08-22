import { Link } from "react-router-dom"

function Analytics() {

  const subjects = [
    { name: "Data Structures", score: 85 },
    { name: "DBMS", score: 72 },
    { name: "Operating Systems", score: 80 },
    { name: "Computer Networks", score: 88 },
    { name: "Software Engineering", score: 82 },
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
              className="block rounded-lg bg-blue-600 px-4 py-3 font-medium"
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


        {/* Main */}
        <main className="w-full p-6 md:p-8">

          {/* Heading */}
          <div className="mb-8">

            <h1 className="text-3xl font-bold">
              Performance Analytics 📊
            </h1>

            <p className="mt-2 text-slate-400">
              Understand your academic progress, strengths and areas
              that need improvement.
            </p>

          </div>


          {/* Overview Cards */}
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">

            <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">

              <p className="text-sm text-slate-400">
                Academic Score
              </p>

              <h2 className="mt-2 text-3xl font-bold">
                81%
              </h2>

              <p className="mt-2 text-sm text-green-400">
                ↑ 6% from last semester
              </p>

            </div>


            <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">

              <p className="text-sm text-slate-400">
                Attendance
              </p>

              <h2 className="mt-2 text-3xl font-bold">
                86%
              </h2>

              <p className="mt-2 text-sm text-green-400">
                Healthy
              </p>

            </div>


            <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">

              <p className="text-sm text-slate-400">
                Study Consistency
              </p>

              <h2 className="mt-2 text-3xl font-bold">
                78%
              </h2>

              <p className="mt-2 text-sm text-yellow-400">
                Can improve
              </p>

            </div>


            <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">

              <p className="text-sm text-slate-400">
                Overall Trend
              </p>

              <h2 className="mt-2 text-3xl font-bold">
                ↗ Positive
              </h2>

              <p className="mt-2 text-sm text-green-400">
                Improving
              </p>

            </div>

          </div>


          {/* Charts Section */}
          <div className="mt-8 grid gap-6 lg:grid-cols-2">

            {/* Subject Performance */}
            <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">

              <h2 className="text-xl font-semibold">
                Subject Performance
              </h2>

              <p className="mt-1 text-sm text-slate-400">
                Current performance by subject
              </p>


              <div className="mt-8 space-y-6">

                {subjects.map((subject, index) => (

                  <div key={index}>

                    <div className="mb-2 flex justify-between">

                      <span className="text-sm">
                        {subject.name}
                      </span>

                      <span className="text-sm text-blue-400">
                        {subject.score}%
                      </span>

                    </div>


                    <div className="h-3 rounded-full bg-slate-800">

                      <div
                        className="h-3 rounded-full bg-blue-600"
                        style={{
                          width: `${subject.score}%`
                        }}
                      />

                    </div>

                  </div>

                ))}

              </div>

            </div>


            {/* Semester Trend */}
            <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">

              <h2 className="text-xl font-semibold">
                Semester Performance Trend
              </h2>

              <p className="mt-1 text-sm text-slate-400">
                CGPA progression
              </p>


              {/* Graph */}
              <div className="mt-8 flex h-64 items-end justify-around gap-5 border-b border-slate-700">

                <div className="flex h-full flex-col justify-end">

                  <div
                    className="w-12 rounded-t-lg bg-blue-600"
                    style={{ height: "55%" }}
                  />

                  <span className="mt-2 text-xs text-slate-500">
                    Sem 1
                  </span>

                </div>


                <div className="flex h-full flex-col justify-end">

                  <div
                    className="w-12 rounded-t-lg bg-blue-600"
                    style={{ height: "67%" }}
                  />

                  <span className="mt-2 text-xs text-slate-500">
                    Sem 2
                  </span>

                </div>


                <div className="flex h-full flex-col justify-end">

                  <div
                    className="w-12 rounded-t-lg bg-blue-600"
                    style={{ height: "74%" }}
                  />

                  <span className="mt-2 text-xs text-slate-500">
                    Sem 3
                  </span>

                </div>


                <div className="flex h-full flex-col justify-end">

                  <div
                    className="w-12 rounded-t-lg bg-blue-600"
                    style={{ height: "85%" }}
                  />

                  <span className="mt-2 text-xs text-slate-500">
                    Sem 4
                  </span>

                </div>

              </div>

            </div>

          </div>


          {/* Strength and Weakness */}
          <div className="mt-8 grid gap-6 lg:grid-cols-2">

            {/* Strengths */}
            <div className="rounded-2xl border border-green-900/50 bg-slate-900 p-6">

              <h2 className="text-xl font-semibold">
                Your Strengths 💪
              </h2>

              <p className="mt-1 text-sm text-slate-400">
                Areas where you are performing well
              </p>


              <div className="mt-6 space-y-4">

                <div className="rounded-lg bg-slate-800 p-4">

                  <div className="flex justify-between">

                    <span>
                      Computer Networks
                    </span>

                    <span className="text-green-400">
                      88%
                    </span>

                  </div>

                  <div className="mt-2 h-2 rounded-full bg-slate-700">

                    <div
                      className="h-2 rounded-full bg-green-500"
                      style={{ width: "88%" }}
                    />

                  </div>

                </div>


                <div className="rounded-lg bg-slate-800 p-4">

                  <div className="flex justify-between">

                    <span>
                      Data Structures
                    </span>

                    <span className="text-green-400">
                      85%
                    </span>

                  </div>

                  <div className="mt-2 h-2 rounded-full bg-slate-700">

                    <div
                      className="h-2 rounded-full bg-green-500"
                      style={{ width: "85%" }}
                    />

                  </div>

                </div>


                <div className="rounded-lg bg-slate-800 p-4">

                  <div className="flex justify-between">

                    <span>
                      Software Engineering
                    </span>

                    <span className="text-green-400">
                      82%
                    </span>

                  </div>

                  <div className="mt-2 h-2 rounded-full bg-slate-700">

                    <div
                      className="h-2 rounded-full bg-green-500"
                      style={{ width: "82%" }}
                    />

                  </div>

                </div>

              </div>

            </div>


            {/* Weak Areas */}
            <div className="rounded-2xl border border-yellow-900/50 bg-slate-900 p-6">

              <h2 className="text-xl font-semibold">
                Areas to Improve ⚠️
              </h2>

              <p className="mt-1 text-sm text-slate-400">
                Subjects that require additional attention
              </p>


              <div className="mt-6 space-y-4">

                <div className="rounded-lg bg-slate-800 p-4">

                  <div className="flex justify-between">

                    <span>
                      Database Management
                    </span>

                    <span className="text-yellow-400">
                      72%
                    </span>

                  </div>

                  <p className="mt-2 text-sm text-slate-400">
                    Practice SQL queries and normalization.
                  </p>

                </div>


                <div className="rounded-lg bg-slate-800 p-4">

                  <div className="flex justify-between">

                    <span>
                      Study Consistency
                    </span>

                    <span className="text-yellow-400">
                      78%
                    </span>

                  </div>

                  <p className="mt-2 text-sm text-slate-400">
                    Try maintaining a consistent daily study routine.
                  </p>

                </div>


                <div className="rounded-lg bg-slate-800 p-4">

                  <div className="flex justify-between">

                    <span>
                      React
                    </span>

                    <span className="text-yellow-400">
                      60%
                    </span>

                  </div>

                  <p className="mt-2 text-sm text-slate-400">
                    Build more projects to strengthen frontend skills.
                  </p>

                </div>

              </div>

            </div>

          </div>


          {/* AI Analysis */}
          <div className="mt-8 rounded-2xl border border-blue-900/50 bg-blue-950/20 p-6">

            <div className="flex items-center gap-3">

              <span className="text-3xl">
                🤖
              </span>

              <div>

                <h2 className="text-xl font-semibold">
                  AI Performance Analysis
                </h2>

                <p className="text-sm text-slate-400">
                  Initial analysis of your learning pattern
                </p>

              </div>

            </div>


            <div className="mt-6 grid gap-4 md:grid-cols-3">

              <div className="rounded-lg bg-slate-900 p-5">

                <p className="text-sm text-slate-400">
                  Performance Trend
                </p>

                <p className="mt-2 text-lg font-semibold text-green-400">
                  Positive ↗
                </p>

                <p className="mt-2 text-sm text-slate-500">
                  Your academic performance is gradually improving.
                </p>

              </div>


              <div className="rounded-lg bg-slate-900 p-5">

                <p className="text-sm text-slate-400">
                  Primary Weakness
                </p>

                <p className="mt-2 text-lg font-semibold text-yellow-400">
                  DBMS
                </p>

                <p className="mt-2 text-sm text-slate-500">
                  Additional practice is recommended.
                </p>

              </div>


              <div className="rounded-lg bg-slate-900 p-5">

                <p className="text-sm text-slate-400">
                  Recommendation
                </p>

                <p className="mt-2 text-lg font-semibold text-blue-400">
                  Consistency
                </p>

                <p className="mt-2 text-sm text-slate-500">
                  Maintain a regular study schedule.
                </p>

              </div>

            </div>

          </div>

        </main>

      </div>

    </div>
  )
}

export default Analytics