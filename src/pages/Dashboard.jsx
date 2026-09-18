import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import Navbar from "../components/Navbar"
import Sidebar from "../components/Sidebar"
import StatCard from "../components/Statcard"
import ProgressBar from "../components/ProgressBar"
import { api } from "../lib/api"

function Dashboard() {
  const navigate = useNavigate()
  const [dashboard, setDashboard] = useState(null)
  const [error, setError] = useState("")

  useEffect(() => {
    const loadDashboard = async () => {
      try {
        setDashboard(await api("/api/dashboard"))
      } catch (requestError) {
        setError(requestError.message)
        if (["Invalid token", "User not found"].includes(requestError.message)) {
          localStorage.removeItem("accessToken")
          navigate("/login")
        }
      }
    }
    loadDashboard()
  }, [navigate])

  if (error) {
    return <div className="flex min-h-screen items-center justify-center bg-slate-950 p-6 text-red-400">{error}</div>
  }

  if (!dashboard) {
    return <div className="flex min-h-screen items-center justify-center bg-slate-950 text-slate-300">Loading your digital twin...</div>
  }

  const { profile, skills = [], recent_academics: records = [], insights } = dashboard
  const name = profile.full_name || "Student"
  const avgSkill = skills.length ? Math.round(skills.reduce((sum, skill) => sum + skill.level, 0) / skills.length) : 0

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <Navbar name={name} initials={name.charAt(0).toUpperCase()} />
      <div className="flex">
        <Sidebar />
        <main className="w-full p-6 md:p-8">
          <div className="mb-8">
            <h2 className="text-3xl font-bold">Welcome, {name} 👋</h2>
            <p className="mt-2 text-slate-400">Here is your live academic and career overview.</p>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            <StatCard title="Current CGPA" value={profile.cgpa ?? "Not added"} description="Academic profile" icon="🎓" />
            <StatCard title="Attendance" value={profile.attendance != null ? `${profile.attendance}%` : "Not added"} description="Target: 75%" icon="📅" />
            <StatCard title="Study Hours / Day" value={profile.study_hours_per_day != null ? `${profile.study_hours_per_day}h` : "Not added"} description="Build a consistent routine" icon="⏱️" />
            <StatCard title="Coding / Month" value={profile.coding_problems_per_month ?? "Not added"} description="Practice consistently" icon="💻" />
          </div>

          <div className="mt-6 grid gap-6 lg:grid-cols-3">
            <section className="rounded-2xl border border-slate-800 bg-slate-900 p-6 lg:col-span-2">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-semibold">Recent Academic Records</h3>
                  <p className="mt-1 text-sm text-slate-400">Your most recently saved subject scores</p>
                </div>
                <span className="rounded-lg bg-blue-500/10 px-3 py-1 text-sm text-blue-400">{records.length} records</span>
              </div>
              {records.length ? (
                <div className="mt-6 space-y-3">
                  {records.map((record) => (
                    <div key={record.id} className="flex items-center justify-between rounded-lg bg-slate-800 p-4">
                      <div>
                        <p className="font-medium">{record.subject}</p>
                        <p className="mt-1 text-xs text-slate-400">Attendance: {record.attendance != null ? `${record.attendance}%` : "Not added"}</p>
                      </div>
                      <p className="text-lg font-semibold text-blue-400">{record.score}/{record.maximum_score}</p>
                    </div>
                  ))}
                </div>
              ) : <p className="mt-8 rounded-lg bg-slate-800 p-4 text-sm text-slate-400">No academic records yet. Add one on the Academic page.</p>}
            </section>

            <section className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
              <h3 className="text-xl font-semibold">Career Readiness</h3>
              <p className="mt-1 text-sm text-slate-400">Rule-based estimation</p>
              <div className="mt-8"><ProgressBar label="Career Readiness" value={insights.readiness_score} target={100} /></div>
              <p className="mt-6 text-center text-sm text-slate-400">{skills.length ? `Average skill level: ${avgSkill}%` : "Add skills to improve your analysis."}</p>
            </section>
          </div>

          <div className="mt-6 grid gap-6 lg:grid-cols-2">
            <section className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
              <div className="flex items-center gap-3">
                <div className="text-3xl">🤖</div>
                <div><h3 className="text-xl font-semibold">AI Insights</h3><p className="text-sm text-slate-400">Based on your current profile</p></div>
              </div>
              <div className="mt-6 space-y-4">
                <div className="rounded-lg bg-slate-800 p-4"><p className="font-medium">💪 Strengths</p><p className="mt-1 text-sm text-slate-400">{insights.strengths.length ? insights.strengths.join(", ") : "Add skills with a level of 75% or higher to reveal strengths."}</p></div>
                <div className="rounded-lg bg-slate-800 p-4"><p className="font-medium">🎯 Skill gaps</p><p className="mt-1 text-sm text-slate-400">{insights.skill_gaps.length ? insights.skill_gaps.join(", ") : "No career-specific gaps identified yet."}</p></div>
              </div>
            </section>

            <section className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
              <h3 className="text-xl font-semibold">Personalized Recommendations 💡</h3>
              <p className="mt-1 text-sm text-slate-400">Recommended actions for your growth</p>
              <div className="mt-6 space-y-3">
                {insights.recommendations.map((recommendation, index) => (
                  <div key={recommendation} className="flex gap-3 rounded-lg bg-slate-800 p-4"><span>{index + 1}.</span><p className="text-sm">{recommendation}</p></div>
                ))}
              </div>
            </section>
          </div>
        </main>
      </div>
    </div>
  )
}

export default Dashboard
