import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import Navbar from "../components/Navbar"
import Sidebar from "../components/Sidebar"
import { api } from "../lib/api"

const careerOptions = ["Software Developer", "Data Scientist", "Data Analyst", "Web Developer", "AI/ML Engineer"]

function Career() {
  const navigate = useNavigate()
  const [dashboard, setDashboard] = useState(null)
  const [careerGoal, setCareerGoal] = useState("")
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState("")
  const [prediction, setPrediction] = useState(null)
  const [predicting, setPredicting] = useState(false)
  const [predictionError, setPredictionError] = useState("")

  const loadDashboard = async () => {
    try {
      const data = await api("/api/dashboard")
      setDashboard(data)
      setCareerGoal(data.profile.career_goal || "")
    } catch (requestError) {
      setError(requestError.message)
      if (["Invalid token", "User not found", "Not authenticated"].includes(requestError.message)) {
        localStorage.removeItem("accessToken")
        navigate("/login")
      }
    }
  }

  useEffect(() => { loadDashboard() }, []) // eslint-disable-line react-hooks/exhaustive-deps

  const saveCareerGoal = async () => {
    setError("")
    try {
      setSaving(true)
      await api("/api/profile", { method: "PUT", body: JSON.stringify({ career_goal: careerGoal }) })
      await loadDashboard()
    } catch (requestError) {
      setError(requestError.message)
    } finally {
      setSaving(false)
    }
  }

  if (!dashboard && !error) return <div className="flex min-h-screen items-center justify-center bg-slate-950 text-slate-300">Loading career guidance...</div>
  if (error && !dashboard) return <div className="flex min-h-screen items-center justify-center bg-slate-950 p-6 text-red-400">{error}</div>

  const { profile, skills = [], insights } = dashboard
  const name = profile.full_name || "Student"
  const strongSkills = skills.filter((skill) => skill.level >= 75)
  const roadmap = insights.suggested_roadmap || []

  const generatePrediction = async () => {
    try {
      setPredicting(true)
      setPredictionError("")

      const result = await api("/api/predictions/gemini", {
        method: "POST",
      })

      setPrediction(result)
    } catch (requestError) {
      setPredictionError(requestError.message)
    } finally {
      setPredicting(false)
    }
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <Navbar name={name} initials={name.charAt(0).toUpperCase()} />
      <div className="flex"><Sidebar />
        <main className="w-full p-6 md:p-8">
          <div className="mb-8"><h1 className="text-3xl font-bold">Career Development 🎯</h1><p className="mt-2 text-slate-400">Set your goal and see the skills you need to strengthen.</p></div>
          {error && <p className="mb-6 rounded-lg bg-red-500/10 px-4 py-3 text-sm text-red-400">{error}</p>}

          <section className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
            <h2 className="text-xl font-semibold">Your Career Goal</h2>
            <div className="mt-5 flex flex-col gap-4 sm:flex-row">
              <select value={careerGoal} onChange={(event) => setCareerGoal(event.target.value)} className="max-w-md rounded-lg border border-slate-700 bg-slate-800 px-4 py-3 outline-none focus:border-blue-500">
                <option value="">Select a career goal</option>
                {careerOptions.map((career) => <option key={career} value={career}>{career}</option>)}
              </select>
              <button onClick={saveCareerGoal} disabled={saving || !careerGoal} className="rounded-lg bg-blue-600 px-5 py-3 font-medium hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60">{saving ? "Saving..." : "Save Career Goal"}</button>
            </div>
          </section>

          <div className="mt-6 grid gap-6 lg:grid-cols-3">
            <section className="rounded-2xl border border-slate-800 bg-slate-900 p-6"><h2 className="text-xl font-semibold">Career Readiness</h2><p className="mt-1 text-sm text-slate-400">Current rule-based estimate</p><div className="mt-8 flex justify-center"><div className="flex h-40 w-40 items-center justify-center rounded-full border-8 border-blue-600"><div className="text-center"><p className="text-4xl font-bold">{insights.readiness_score}%</p><p className="text-xs text-slate-400">Ready</p></div></div></div></section>
            <section className="rounded-2xl border border-blue-900/60 bg-slate-900 p-6">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h2 className="text-xl font-semibold text-white">
                    AI Career Prediction
                  </h2>
                  <p className="mt-1 text-sm text-slate-400">
                    Generate personalised guidance from your profile, skills and academics.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={generatePrediction}
                  disabled={predicting}
                  className="rounded-lg bg-blue-600 px-4 py-2 font-medium text-white transition hover:bg-blue-500 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {predicting ? "Generating..." : "Generate AI Prediction"}
                </button>
              </div>

              {predictionError && (
                <p className="mt-4 text-sm text-red-400">
                  {predictionError}
                </p>
              )}

              {prediction && (
                <div className="mt-6 border-t border-slate-700 pt-6">
                  <div className="flex flex-wrap items-end justify-between gap-3">
                    <div>
                      <p className="text-sm text-slate-400">Career readiness</p>
                      <p className="text-4xl font-bold text-blue-400">
                        {prediction.career_readiness_score}%
                      </p>
                    </div>

                    <span className="rounded-full bg-blue-500/15 px-3 py-1 text-sm font-medium text-blue-300">
                      {prediction.readiness_level}
                    </span>
                  </div>

                  <p className="mt-4 text-slate-300">{prediction.summary}</p>

                  <div className="mt-6 grid gap-5 md:grid-cols-3">
                    <div>
                      <h3 className="font-semibold text-green-400">Strengths</h3>
                      <ul className="mt-2 list-inside list-disc space-y-1 text-sm text-slate-300">
                        {prediction.strengths.map((item) => (
                          <li key={item}>{item}</li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h3 className="font-semibold text-orange-400">Skill gaps</h3>
                      <ul className="mt-2 list-inside list-disc space-y-1 text-sm text-slate-300">
                        {prediction.skill_gaps.map((item) => (
                          <li key={item}>{item}</li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h3 className="font-semibold text-blue-400">Next steps</h3>
                      <ul className="mt-2 list-inside list-disc space-y-1 text-sm text-slate-300">
                        {prediction.recommended_next_steps.map((item) => (
                          <li key={item}>{item}</li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <p className="mt-6 text-xs text-slate-500">
                    {prediction.disclaimer}
                  </p>
                </div>
              )}
            </section>
            <section className="rounded-2xl border border-slate-800 bg-slate-900 p-6"><h2 className="text-xl font-semibold">Strong Areas 💪</h2><p className="mt-1 text-sm text-slate-400">Skills at 75% or higher</p><div className="mt-6 space-y-3">{strongSkills.length ? strongSkills.map((skill) => <SkillRow key={skill.id} name={skill.name} value={skill.level + "%"} color="text-green-400" />) : <Empty text="Add skill levels to identify strengths." />}</div></section>
            <section className="rounded-2xl border border-slate-800 bg-slate-900 p-6"><h2 className="text-xl font-semibold">Skill Gaps ⚠️</h2><p className="mt-1 text-sm text-slate-400">Needed for your selected career</p><div className="mt-6 space-y-3">{insights.skill_gaps.length ? insights.skill_gaps.map((skill) => <SkillRow key={skill} name={skill} value="Missing" color="text-yellow-400" />) : <Empty text={careerGoal ? "No career-specific gaps identified yet." : "Select a career goal to identify gaps."} />}</div></section>
          </div>

          <section className="mt-8 rounded-2xl border border-slate-800 bg-slate-900 p-6">
            <h2 className="text-xl font-semibold">Current Skill Profile 📊</h2>
            <div className="mt-8 space-y-6">{skills.length ? skills.map((skill) => <div key={skill.id}><div className="mb-2 flex justify-between"><span className="font-medium">{skill.name}</span><span className="text-blue-400">{skill.level}%</span></div><div className="h-3 rounded-full bg-slate-800"><div className="h-3 rounded-full bg-blue-600" style={{ width: skill.level + "%" }} /></div></div>) : <Empty text="Add skills from the Skills page to build your career profile." />}</div>
          </section>

          <div className="mt-8 grid gap-6 lg:grid-cols-2">
            <section className="rounded-2xl border border-slate-800 bg-slate-900 p-6"><h2 className="text-xl font-semibold">Recommended Focus 💡</h2><div className="mt-6 space-y-3">{insights.recommendations.map((recommendation, index) => <div key={recommendation} className="flex gap-3 rounded-lg bg-slate-800 p-4"><span>{index + 1}.</span><p className="text-sm">{recommendation}</p></div>)}</div></section>
            <section className="rounded-2xl border border-blue-900/50 bg-blue-950/20 p-6"><div className="flex items-center gap-3"><span className="text-3xl">🤖</span><div><h2 className="text-xl font-semibold">Career Recommendation</h2><p className="text-sm text-slate-400">Based on your saved profile</p></div></div><div className="mt-6"><p className="text-lg font-semibold text-blue-400">{careerGoal || "Choose a career goal"}</p><p className="mt-3 text-sm leading-6 text-slate-400">{careerGoal ? "Your roadmap is tailored toward your selected career. Keep your profile and skills updated for better guidance." : "Choose and save a goal to receive targeted skill-gap analysis."}</p></div></section>
          </div>

          <section className="mt-8 rounded-2xl border border-slate-800 bg-slate-900 p-6"><h2 className="text-xl font-semibold">Career Action Plan 🚀</h2><div className="mt-6 grid gap-4 md:grid-cols-3">{roadmap.length ? roadmap.slice(0, 3).map((item, index) => <div key={item.position + item.title} className="rounded-lg bg-slate-800 p-5"><div className="text-2xl">{index + 1}.</div><h3 className="mt-3 font-semibold">{item.title}</h3><p className="mt-2 text-sm text-slate-400">{item.duration} · {item.priority} priority</p></div>) : <Empty text="Save a career goal to generate an action plan." />}</div></section>
        </main>
      </div>
    </div>
  )
}

function SkillRow({ name, value, color }) {
  return <div className="flex justify-between rounded-lg bg-slate-800 p-4"><span>{name}</span><span className={color}>{value}</span></div>
}

function Empty({ text }) {
  return <p className="rounded-lg bg-slate-800 p-4 text-sm text-slate-400">{text}</p>
}

export default Career
