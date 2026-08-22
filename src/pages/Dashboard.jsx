import Navbar from "../components/Navbar"
import Sidebar from "../components/Sidebar"
import StatCard from "../components/Statcard"
import ProgressBar from "../components/ProgressBar"

function Dashboard() {
  return (
    <div className="min-h-screen bg-slate-950 text-white">

      {/* Reusable Navbar */}
      <Navbar />

      <div className="flex">

        {/* Reusable Sidebar */}
        <Sidebar />

        {/* Main Content */}
        <main className="w-full p-6 md:p-8">

          {/* Welcome */}
          <div className="mb-8">

            <h2 className="text-3xl font-bold">
              Good Morning, Aditi 👋
            </h2>

            <p className="mt-2 text-slate-400">
              Here's an overview of your academic and career journey.
            </p>

          </div>


          {/* ================= STATS ================= */}

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">

            <StatCard
              title="Current CGPA"
              value="8.70"
              description="↑ Good performance"
              icon="🎓"
            />

            <StatCard
              title="Attendance"
              value="86%"
              description="✓ Above target"
              icon="📅"
            />

            <StatCard
              title="Study Hours / Day"
              value="3.5h"
              description="Target: 4h"
              icon="⏱️"
            />

            <StatCard
              title="Coding / Month"
              value="32"
              description="Keep improving"
              icon="💻"
            />

          </div>


          {/* ================= MIDDLE SECTION ================= */}

          <div className="mt-6 grid gap-6 lg:grid-cols-3">

            {/* Academic Performance */}
            <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6 lg:col-span-2">

              <div className="flex items-center justify-between">

                <div>

                  <h3 className="text-xl font-semibold">
                    Academic Performance
                  </h3>

                  <p className="mt-1 text-sm text-slate-400">
                    Semester-wise performance
                  </p>

                </div>

                <span className="rounded-lg bg-blue-500/10 px-3 py-1 text-sm text-blue-400">
                  CGPA
                </span>

              </div>


              {/* Simple Graph */}
              <div className="mt-8 flex h-56 items-end justify-around gap-4">

                <div className="flex h-full flex-col justify-end">
                  <div
                    className="w-10 rounded-t-lg bg-blue-600"
                    style={{ height: "55%" }}
                  />
                  <span className="mt-2 text-xs text-slate-500">
                    Sem 1
                  </span>
                </div>

                <div className="flex h-full flex-col justify-end">
                  <div
                    className="w-10 rounded-t-lg bg-blue-600"
                    style={{ height: "68%" }}
                  />
                  <span className="mt-2 text-xs text-slate-500">
                    Sem 2
                  </span>
                </div>

                <div className="flex h-full flex-col justify-end">
                  <div
                    className="w-10 rounded-t-lg bg-blue-600"
                    style={{ height: "75%" }}
                  />
                  <span className="mt-2 text-xs text-slate-500">
                    Sem 3
                  </span>
                </div>

                <div className="flex h-full flex-col justify-end">
                  <div
                    className="w-10 rounded-t-lg bg-blue-600"
                    style={{ height: "87%" }}
                  />
                  <span className="mt-2 text-xs text-slate-500">
                    Sem 4
                  </span>
                </div>

              </div>

            </div>


            {/* Career Readiness */}
            <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">

              <h3 className="text-xl font-semibold">
                Career Readiness
              </h3>

              <p className="mt-1 text-sm text-slate-400">
                AI-based estimation
              </p>


              <div className="mt-8">

                <ProgressBar
                  label="Career Readiness"
                  value={74}
                  target={100}
                />

              </div>


              <p className="mt-6 text-center text-sm text-slate-400">
                Improve your technical skills to increase readiness.
              </p>

            </div>

          </div>


          {/* ================= BOTTOM SECTION ================= */}

          <div className="mt-6 grid gap-6 lg:grid-cols-2">

            {/* AI Insights */}
            <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">

              <div className="flex items-center gap-3">

                <div className="text-3xl">
                  🤖
                </div>

                <div>

                  <h3 className="text-xl font-semibold">
                    AI Insights
                  </h3>

                  <p className="text-sm text-slate-400">
                    Based on your current profile
                  </p>

                </div>

              </div>


              <div className="mt-6 space-y-4">

                <div className="rounded-lg bg-slate-800 p-4">

                  <p className="font-medium">
                    📌 DBMS needs attention
                  </p>

                  <p className="mt-1 text-sm text-slate-400">
                    Your performance in DBMS is lower compared
                    to other subjects.
                  </p>

                </div>


                <div className="rounded-lg bg-slate-800 p-4">

                  <p className="font-medium">
                    📈 Academic performance is improving
                  </p>

                  <p className="mt-1 text-sm text-slate-400">
                    Your semester performance shows a positive trend.
                  </p>

                </div>

              </div>

            </div>


            {/* Recommendations */}
            <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">

              <h3 className="text-xl font-semibold">
                Personalized Recommendations 💡
              </h3>

              <p className="mt-1 text-sm text-slate-400">
                Recommended actions for your growth
              </p>


              <div className="mt-6 space-y-3">

                <div className="flex gap-3 rounded-lg bg-slate-800 p-4">

                  <span>1️⃣</span>

                  <p className="text-sm">
                    Practice DBMS for at least 30 minutes daily.
                  </p>

                </div>


                <div className="flex gap-3 rounded-lg bg-slate-800 p-4">

                  <span>2️⃣</span>

                  <p className="text-sm">
                    Solve 20 additional coding problems this month.
                  </p>

                </div>


                <div className="flex gap-3 rounded-lg bg-slate-800 p-4">

                  <span>3️⃣</span>

                  <p className="text-sm">
                    Increase daily study time from 3.5 to 4 hours.
                  </p>

                </div>

              </div>

            </div>

          </div>

        </main>

      </div>

    </div>
  )
}

export default Dashboard