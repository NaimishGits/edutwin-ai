import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import Navbar from "../components/Navbar"
import Sidebar from "../components/Sidebar"
import { api } from "../lib/api"

function Analytics() {
  const navigate = useNavigate()
  const [dashboard, setDashboard] = useState(null)
  const [error, setError] = useState("")

  useEffect(() => {
    api("/api/dashboard")
      .then(setDashboard)
      .catch((requestError) => {
        setError(requestError.message)
        if (["Invalid token", "User not found", "Not authenticated"].includes(requestError.message)) {
          localStorage.removeItem("accessToken")
          navigate("/login")
        }
      })
  }, [navigate])

  if (!dashboard && !error) return <div className="flex min-h-screen items-center justify-center bg-slate-950 text-slate-300">Loading analytics...</div>
  if (error && !dashboard) return <div className="flex min-h-screen items-center justify-center bg-slate-950 p-6 text-red-400">{error}</div>

  const { profile, skills = [], recent_academics: records = [], insights } = dashboard
  const name = profile.full_name || "Student"
  const percentage = (record) => Math.round((record.score / record.maximum_score) * 100)
  const average = (values) => values.length ? Math.round(values.reduce((sum, value) => sum + value, 0) / values.length) : 0
  const academicScore = average(records.map(percentage))
  const academicAttendance = average(records.filter((record) => record.attendance != null).map((record) => record.attendance))
  const studyConsistency = Math.min(Math.round((profile.study_hours_per_day || 0) * 25), 100)
  const strengthItems = [
    ...records.filter((record) => percentage(record) >= 80).map((record) => ({ name: record.subject, value: percentage(record), type: "subject" })),
    ...skills.filter((skill) => skill.level >= 75).map((skill) => ({ name: skill.name, value: skill.level, type: "skill" })),
  ].slice(0, 5)
  const improvementItems = [
    ...records.filter((record) => percentage(record) < 80).map((record) => ({ name: record.subject, value: percentage(record), advice: "Review weak topics and practise regularly." })),
    ...skills.filter((skill) => skill.level < 75).map((skill) => ({ name: skill.name, value: skill.level, advice: "Build practical projects and practise this skill." })),
  ].slice(0, 5)

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <Navbar name={name} initials={name.charAt(0).toUpperCase()} />
      <div className="flex">
        <Sidebar />
        <main className="w-full p-6 md:p-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold">Performance Analytics 📊</h1>
            <p className="mt-2 text-slate-400">A live summary of your academic records, skills and career readiness.</p>
          </div>
          {error && <p className="mb-6 rounded-lg bg-red-500/10 px-4 py-3 text-sm text-red-400">{error}</p>}

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            <Metric label="Academic Score" value={records.length ? `${academicScore}%` : "Not added"} detail="Average saved subject score" />
            <Metric label="Attendance" value={records.length ? `${academicAttendance}%` : profile.attendance != null ? `${profile.attendance}%` : "Not added"} detail="Target: 75%" />
            <Metric label="Study Consistency" value={profile.study_hours_per_day != null ? `${studyConsistency}%` : "Not added"} detail={profile.study_hours_per_day != null ? `${profile.study_hours_per_day} hours per day` : "Add study hours in Profile Setup"} />
            <Metric label="Career Readiness" value={`${insights.readiness_score}%`} detail="Rule-based current estimate" />
          </div>

          <div className="mt-8 grid gap-6 lg:grid-cols-2">
            <section className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
              <h2 className="text-xl font-semibold">Subject Performance</h2>
              <p className="mt-1 text-sm text-slate-400">Scores from your saved academic records</p>
              <div className="mt-8 space-y-6">
                {records.length ? records.map((record) => <ScoreBar key={record.id} label={record.subject} value={percentage(record)} />) : <Empty text="Add academic records to see subject performance." />}
              </div>
            </section>

            <section className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
              <h2 className="text-xl font-semibold">Skill Performance</h2>
              <p className="mt-1 text-sm text-slate-400">Levels from your saved skill profile</p>
              <div className="mt-8 space-y-6">
                {skills.length ? skills.map((skill) => <ScoreBar key={skill.id} label={skill.name} value={skill.level} />) : <Empty text="Add skills to see your skill analysis." />}
              </div>
            </section>
          </div>

          <div className="mt-8 grid gap-6 lg:grid-cols-2">
            <section className="rounded-2xl border border-green-900/50 bg-slate-900 p-6">
              <h2 className="text-xl font-semibold">Your Strengths 💪</h2>
              <p className="mt-1 text-sm text-slate-400">Subjects and skills at 80% or 75% and above</p>
              <div className="mt-6 space-y-4">
                {strengthItems.length ? strengthItems.map((item) => <div key={`${item.type}-${item.name}`} className="rounded-lg bg-slate-800 p-4"><div className="flex justify-between"><span>{item.name}</span><span className="text-green-400">{item.value}%</span></div><div className="mt-2 h-2 rounded-full bg-slate-700"><div className="h-2 rounded-full bg-green-500" style={{ width: `${item.value}%` }} /></div></div>) : <Empty text="Add more records and skills to identify strengths." />}
              </div>
            </section>

            <section className="rounded-2xl border border-yellow-900/50 bg-slate-900 p-6">
              <h2 className="text-xl font-semibold">Areas to Improve ⚠️</h2>
              <p className="mt-1 text-sm text-slate-400">Subjects or skills below the strength threshold</p>
              <div className="mt-6 space-y-4">
                {improvementItems.length ? improvementItems.map((item) => <div key={item.name} className="rounded-lg bg-slate-800 p-4"><div className="flex justify-between"><span>{item.name}</span><span className="text-yellow-400">{item.value}%</span></div><p className="mt-2 text-sm text-slate-400">{item.advice}</p></div>) : <Empty text="No weak areas identified from your current data." />}
              </div>
            </section>
          </div>

          <section className="mt-8 rounded-2xl border border-blue-900/50 bg-blue-950/20 p-6">
            <div className="flex items-center gap-3"><span className="text-3xl">🤖</span><div><h2 className="text-xl font-semibold">AI Performance Analysis</h2><p className="text-sm text-slate-400">Live rule-based analysis of your profile</p></div></div>
            <div className="mt-6 grid gap-4 md:grid-cols-3">
              <AnalysisCard label="Readiness" value={`${insights.readiness_score}%`} description="Calculated from academics, activity and skill levels." color="text-green-400" />
              <AnalysisCard label="Skill Gaps" value={insights.skill_gaps.length || "None"} description={insights.skill_gaps.length ? insights.skill_gaps.slice(0, 3).join(", ") : "No career-specific gap identified yet."} color="text-yellow-400" />
              <AnalysisCard label="Next Action" value="Recommendation" description={insights.recommendations[0]} color="text-blue-400" />
            </div>
          </section>
        </main>
      </div>
    </div>
  )
}

function Metric({ label, value, detail }) {
  return <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6"><p className="text-sm text-slate-400">{label}</p><h2 className="mt-2 text-3xl font-bold">{value}</h2><p className="mt-2 text-sm text-slate-500">{detail}</p></div>
}

function ScoreBar({ label, value }) {
  return <div><div className="mb-2 flex justify-between"><span className="text-sm">{label}</span><span className="text-sm text-blue-400">{value}%</span></div><div className="h-3 rounded-full bg-slate-800"><div className="h-3 rounded-full bg-blue-600" style={{ width: `${value}%` }} /></div></div>
}

function AnalysisCard({ label, value, description, color }) {
  return <div className="rounded-lg bg-slate-900 p-5"><p className="text-sm text-slate-400">{label}</p><p className={`mt-2 text-lg font-semibold ${color}`}>{value}</p><p className="mt-2 text-sm text-slate-500">{description}</p></div>
}

function Empty({ text }) {
  return <p className="rounded-lg bg-slate-800 p-4 text-sm text-slate-400">{text}</p>
}

export default Analytics
