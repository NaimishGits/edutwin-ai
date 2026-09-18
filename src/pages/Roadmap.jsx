import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import Navbar from "../components/Navbar"
import Sidebar from "../components/Sidebar"
import { api } from "../lib/api"

function Roadmap() {
  const navigate = useNavigate()
  const [profile, setProfile] = useState(null)
  const [insights, setInsights] = useState(null)
  const [error, setError] = useState("")
  const [completedTitles, setCompletedTitles] = useState([])

  useEffect(() => {
    const loadRoadmap = async () => {
      try {
        const [savedProfile, savedInsights, savedProgress] = await Promise.all([
          api("/api/me"),
          api("/api/insights"),
          api("/api/roadmap-progress"),
        ])
        setProfile(savedProfile)
        setInsights(savedInsights)
        setCompletedTitles(savedProgress.completed_titles || [])
      } catch (requestError) {
        setError(requestError.message)
        if (["Invalid token", "User not found", "Not authenticated"].includes(requestError.message)) {
          localStorage.removeItem("accessToken")
          navigate("/login")
        }
      }
    }
    loadRoadmap()
  }, [navigate])

  if (!profile && !error) return <div className="flex min-h-screen items-center justify-center bg-slate-950 text-slate-300">Generating your roadmap...</div>
  if (error && !profile) return <div className="flex min-h-screen items-center justify-center bg-slate-950 p-6 text-red-400">{error}</div>

  const name = profile.full_name || "Student"
  const roadmap = insights.suggested_roadmap || []
  const completedCount = roadmap.filter((item) =>
    completedTitles.includes(item.title)
  ).length

  const progressPercent = roadmap.length
    ? Math.round((completedCount / roadmap.length) * 100)
    : 0
  const nextStep = roadmap[0]

  const toggleRoadmapStep = async (title) => {
    try {
      const updatedTitles = completedTitles.includes(title)
        ? completedTitles.filter((item) => item !== title)
        : [...completedTitles, title]

      const result = await api("/api/roadmap-progress", {
        method: "PUT",
        body: JSON.stringify({
          completed_titles: updatedTitles,
        }),
      })

      setCompletedTitles(result.completed_titles)
    } catch (requestError) {
      setError(requestError.message)
    }
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <Navbar name={name} initials={name.charAt(0).toUpperCase()} />
      <div className="flex">
        <Sidebar />
        <main className="w-full p-6 md:p-8">
          <div className="mb-8"><h1 className="text-3xl font-bold">Growth Roadmap 🚀</h1><p className="mt-2 text-slate-400">Your live, personalised path toward {profile.career_goal || "your career goal"}.</p></div>
          {error && <p className="mb-6 rounded-lg bg-red-500/10 px-4 py-3 text-sm text-red-400">{error}</p>}

          <section className="mb-8 rounded-2xl border border-slate-800 bg-slate-900 p-6">
            <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
              <div><h2 className="text-xl font-semibold">Career Readiness</h2><p className="mt-1 text-sm text-slate-400">Your current readiness estimate, based on saved profile data.</p></div>
              <div className="text-left sm:text-right"><p className="text-3xl font-bold text-blue-400">{insights.readiness_score}%</p><p className="text-sm text-slate-500">Current readiness</p></div>
            </div>
            <div className="mt-6 h-3 rounded-full bg-slate-800"><div className="h-3 rounded-full bg-blue-600" style={{ width: insights.readiness_score + "%" }} /></div>
          </section>

          <section className="mb-8 rounded-2xl border border-blue-900/50 bg-blue-950/20 p-6">
            <div className="flex items-start gap-4"><div className="text-3xl">🤖</div><div><h2 className="text-xl font-semibold">AI Recommended Path</h2><p className="mt-2 leading-6 text-slate-400">{nextStep ? "Your current priority is " + nextStep.title + ". Complete the suggested steps in order and update your profile as you progress." : "Add a career goal and skills to receive a personalised roadmap."}</p></div></div>
          </section>

          <section className="mb-8 rounded-2xl border border-slate-800 bg-slate-900 p-6">
            <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
              <div>
                <h2 className="text-xl font-semibold">
                  Roadmap Progress
                </h2>

                <p className="mt-1 text-sm text-slate-400">
                  Complete each recommended step to track your growth.
                </p>
              </div>

              <div className="text-left sm:text-right">
                <p className="text-3xl font-bold text-blue-400">
                  {progressPercent}%
                </p>

                <p className="text-sm text-slate-500">
                  {completedCount} of {roadmap.length} roadmap steps completed
                </p>
              </div>
            </div>

            <div className="mt-6 h-3 rounded-full bg-slate-800">
              <div
                className="h-3 rounded-full bg-blue-600 transition-all duration-500"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </section>

          <section className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
            <h2 className="text-xl font-semibold">Your Learning Journey</h2><p className="mt-1 text-sm text-slate-400">Generated from your current skill gaps and recommendations.</p>
            <div className="mt-8">
              {roadmap.length ? roadmap.map((item, index) => (
                <div key={item.position + item.title} className="relative flex gap-5 pb-10">
                  <div className="flex flex-col items-center"><div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full font-bold ${index === 0 ? "bg-blue-600" : "bg-slate-800 text-slate-400"}`}>{index + 1}</div>{index !== roadmap.length - 1 && <div className="mt-2 h-full w-0.5 bg-slate-700" />}</div>
                  <div className="w-full rounded-xl border border-slate-800 bg-slate-800/50 p-5">
                    <div className="flex flex-col justify-between gap-3 sm:flex-row"><div><h3 className="text-lg font-semibold">{item.title}</h3><p className="mt-2 text-sm leading-6 text-slate-400">{index === 0 ? "Start with this priority, then continue to the following steps." : "Recommended next step for your career preparation."}</p></div><span className={`h-fit rounded-full px-3 py-1 text-xs font-medium ${item.priority === "High" ? "bg-red-500/10 text-red-400" : "bg-yellow-500/10 text-yellow-400"}`}>{item.priority} Priority</span></div>
                    <div className="mt-5 flex flex-wrap items-center gap-3">
                      <span className="rounded-lg bg-slate-900 px-3 py-2 text-xs text-slate-400">
                        ⏱ {item.duration}
                      </span>

                      <span
                        className={`rounded-lg px-3 py-2 text-xs ${index === 0
                            ? "bg-blue-500/10 text-blue-400"
                            : "bg-slate-900 text-slate-500"
                          }`}
                      >
                        {index === 0 ? "Start here" : "Upcoming"}
                      </span>

                      <button
                        onClick={() => toggleRoadmapStep(item.title)}
                        className={`rounded-lg px-3 py-2 text-xs font-medium ${completedTitles.includes(item.title)
                            ? "bg-green-500/10 text-green-400"
                            : "bg-blue-600 text-white hover:bg-blue-700"
                          }`}
                      >
                        {completedTitles.includes(item.title)
                          ? "✓ Completed"
                          : "Mark Complete"}
                      </button>
                    </div>
                  </div>
                </div>
              )) : <p className="rounded-lg bg-slate-800 p-4 text-sm text-slate-400">No roadmap steps yet. Save your career goal and add skills to generate one.</p>}
            </div>
          </section>

          <section className="mt-8 rounded-2xl border border-green-900/50 bg-green-950/20 p-6"><div className="flex items-center gap-4"><div className="text-4xl">🎯</div><div><h2 className="text-xl font-semibold">Final Goal: Career Ready</h2><p className="mt-2 text-sm leading-6 text-slate-400">Keep your academic records, skills, and profile current so this roadmap stays relevant.</p></div></div></section>
        </main>
      </div>
    </div>
  )
}

export default Roadmap
