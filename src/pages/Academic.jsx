import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import Navbar from "../components/Navbar"
import Sidebar from "../components/Sidebar"
import StatCard from "../components/Statcard"
import ProgressBar from "../components/ProgressBar"
import { api } from "../lib/api"

function Academic() {
  const navigate = useNavigate()
  const [records, setRecords] = useState([])
  const [profile, setProfile] = useState(null)
  const [showForm, setShowForm] = useState(false)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState("")
  const [newRecord, setNewRecord] = useState({
    subject: "", score: "", attendance: "", assignment_completion: "",
  })
  const [editingRecord, setEditingRecord] = useState(null)

  useEffect(() => {
    const loadData = async () => {
      try {
        const [savedRecords, savedProfile] = await Promise.all([api("/api/academics"), api("/api/me")])
        setRecords(savedRecords)
        setProfile(savedProfile)
      } catch (requestError) {
        setError(requestError.message)
        if (["Invalid token", "User not found", "Not authenticated"].includes(requestError.message)) {
          localStorage.removeItem("accessToken")
          navigate("/login")
        }
      }
    }
    loadData()
  }, [navigate])

  const addRecord = async (event) => {
    event.preventDefault()
    setError("")
    try {
      setSaving(true)
      const savedRecord = await api("/api/academics", {
        method: "POST",
        body: JSON.stringify({
          subject: newRecord.subject,
          score: Number(newRecord.score),
          maximum_score: 100,
          attendance: Number(newRecord.attendance),
          assignment_completion: Number(newRecord.assignment_completion),
        }),
      })
      setRecords((currentRecords) => [savedRecord, ...currentRecords])
      setNewRecord({ subject: "", score: "", attendance: "", assignment_completion: "" })
      setShowForm(false)
    } catch (requestError) {
      setError(requestError.message)
    } finally {
      setSaving(false)
    }
  }

  const average = (values) => values.length ? Math.round(values.reduce((sum, value) => sum + value, 0) / values.length) : 0
  const averageMarks = average(records.map((record) => (record.score / record.maximum_score) * 100))
  const averageAttendance = average(records.filter((record) => record.attendance != null).map((record) => record.attendance))
  const averageAssignments = average(records.filter((record) => record.assignment_completion != null).map((record) => record.assignment_completion))
  const lowestRecord = records.length ? records.reduce((lowest, record) => record.score < lowest.score ? record : lowest) : null
  const strongestRecord = records.length ? records.reduce((highest, record) => record.score > highest.score ? record : highest) : null

  if (!profile && !error) return <div className="flex min-h-screen items-center justify-center bg-slate-950 text-slate-300">Loading academic records...</div>
  if (error && !profile) return <div className="flex min-h-screen items-center justify-center bg-slate-950 p-6 text-red-400">{error}</div>

  const name = profile?.full_name || "Student"
  const getStatus = (score) => score >= 80
    ? ["Excellent", "bg-green-500/10 text-green-400"]
    : score >= 60
      ? ["Good", "bg-blue-500/10 text-blue-400"]
      : ["Needs Improvement", "bg-yellow-500/10 text-yellow-400"]

  const deleteRecord = async (recordId) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this academic record?"
    )

    if (!confirmed) return

    try {
      await api(`/api/academics/${recordId}`, {
        method: "DELETE",
      })

      setRecords((currentRecords) =>
        currentRecords.filter((record) => record.id !== recordId)
      )
    } catch (requestError) {
      setError(requestError.message)
    }
  }

  const startEdit = (record) => {
    setEditingRecord({
      ...record,
      score: String(record.score),
      attendance:
        record.attendance == null ? "" : String(record.attendance),
      assignment_completion:
        record.assignment_completion == null
          ? ""
          : String(record.assignment_completion),
    })
  }

  const saveEdit = async (event) => {
    event.preventDefault()

    try {
      const updatedRecord = await api(
        `/api/academics/${editingRecord.id}`,
        {
          method: "PATCH",
          body: JSON.stringify({
            subject: editingRecord.subject,
            score: Number(editingRecord.score),
            attendance:
              editingRecord.attendance === ""
                ? undefined
                : Number(editingRecord.attendance),
            assignment_completion:
              editingRecord.assignment_completion === ""
                ? undefined
                : Number(editingRecord.assignment_completion),
          }),
        }
      )

      setRecords((currentRecords) =>
        currentRecords.map((record) =>
          record.id === updatedRecord.id ? updatedRecord : record
        )
      )

      setEditingRecord(null)
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
          <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
            <div><h1 className="text-3xl font-bold">Academic Tracking 📚</h1><p className="mt-2 text-slate-400">Monitor your academic performance and learning activity.</p></div>
            <button onClick={() => setShowForm((visible) => !visible)} className="rounded-lg bg-blue-600 px-5 py-3 font-semibold hover:bg-blue-700">+ Add Subject</button>
          </div>

          {error && <p className="mb-6 rounded-lg bg-red-500/10 px-4 py-3 text-sm text-red-400">{error}</p>}

          {showForm && (
            <form onSubmit={addRecord} className="mb-8 rounded-2xl border border-slate-800 bg-slate-900 p-6">
              <h2 className="mb-6 text-xl font-semibold">Add Academic Record</h2>
              <div className="grid gap-5 md:grid-cols-4">
                <Field label="Subject" name="subject" value={newRecord.subject} onChange={(event) => setNewRecord({ ...newRecord, subject: event.target.value })} placeholder="Subject name" />
                <Field label="Marks (%)" name="score" value={newRecord.score} onChange={(event) => setNewRecord({ ...newRecord, score: event.target.value })} placeholder="85" type="number" />
                <Field label="Attendance (%)" name="attendance" value={newRecord.attendance} onChange={(event) => setNewRecord({ ...newRecord, attendance: event.target.value })} placeholder="90" type="number" />
                <Field label="Assignments (%)" name="assignment_completion" value={newRecord.assignment_completion} onChange={(event) => setNewRecord({ ...newRecord, assignment_completion: event.target.value })} placeholder="85" type="number" />
              </div>
              <div className="mt-6 flex gap-3">
                <button type="submit" disabled={saving} className="rounded-lg bg-blue-600 px-6 py-2 font-medium hover:bg-blue-700 disabled:opacity-60">{saving ? "Saving..." : "Save Record"}</button>
                <button type="button" onClick={() => setShowForm(false)} className="rounded-lg border border-slate-700 px-6 py-2 font-medium hover:bg-slate-800">Cancel</button>
              </div>
            </form>
          )}


          {editingRecord && (
            <form
              onSubmit={saveEdit}
              className="mb-8 rounded-2xl border border-blue-900 bg-slate-900 p-6"
            >
              <div className="mb-6 flex items-center justify-between">
                <h2 className="text-xl font-semibold">
                  Edit Academic Record
                </h2>

                <button
                  type="button"
                  onClick={() => setEditingRecord(null)}
                  className="text-sm text-slate-400 hover:text-white"
                >
                  Cancel
                </button>
              </div>

              <div className="grid gap-5 md:grid-cols-4">
                <div>
                  <label className="mb-2 block text-sm">Subject</label>

                  <input
                    value={editingRecord.subject}
                    onChange={(event) =>
                      setEditingRecord({
                        ...editingRecord,
                        subject: event.target.value,
                      })
                    }
                    className="w-full rounded-lg border border-slate-700 bg-slate-800 px-4 py-3 outline-none focus:border-blue-500"
                    required
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm">Marks (%)</label>

                  <input
                    type="number"
                    min="0"
                    max="100"
                    value={editingRecord.score}
                    onChange={(event) =>
                      setEditingRecord({
                        ...editingRecord,
                        score: event.target.value,
                      })
                    }
                    className="w-full rounded-lg border border-slate-700 bg-slate-800 px-4 py-3 outline-none focus:border-blue-500"
                    required
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm">Attendance (%)</label>

                  <input
                    type="number"
                    min="0"
                    max="100"
                    value={editingRecord.attendance}
                    onChange={(event) =>
                      setEditingRecord({
                        ...editingRecord,
                        attendance: event.target.value,
                      })
                    }
                    className="w-full rounded-lg border border-slate-700 bg-slate-800 px-4 py-3 outline-none focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm">Assignments (%)</label>

                  <input
                    type="number"
                    min="0"
                    max="100"
                    value={editingRecord.assignment_completion}
                    onChange={(event) =>
                      setEditingRecord({
                        ...editingRecord,
                        assignment_completion: event.target.value,
                      })
                    }
                    className="w-full rounded-lg border border-slate-700 bg-slate-800 px-4 py-3 outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="mt-6 rounded-lg bg-blue-600 px-6 py-2 font-medium hover:bg-blue-700"
              >
                Save Changes
              </button>
            </form>
          )}



          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            <StatCard title="Overall Marks" value={records.length ? `${averageMarks}%` : "Not added"} description="Average recorded marks" icon="📊" />
            <StatCard title="Average Attendance" value={records.length ? `${averageAttendance}%` : "Not added"} description="Target: 75%" icon="📅" />
            <StatCard title="Assignments" value={records.length ? `${averageAssignments}%` : "Not added"} description="Average completion" icon="📝" />
            <StatCard title="Subjects" value={records.length} description="Currently tracked" icon="📚" />
          </div>

          <section className="mt-8 rounded-2xl border border-slate-800 bg-slate-900">
            <div className="border-b border-slate-800 p-6"><h2 className="text-xl font-semibold">Subject Performance</h2><p className="mt-1 text-sm text-slate-400">Your saved academic records</p></div>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-slate-800/50"><tr><th className="px-6 py-4 text-sm text-slate-400">Subject</th><th className="px-6 py-4 text-sm text-slate-400">Marks</th><th className="px-6 py-4 text-sm text-slate-400">Attendance</th><th className="px-6 py-4 text-sm text-slate-400">Assignments</th><th className="px-6 py-4 text-sm text-slate-400">Status</th><th className="px-6 py-4 text-sm text-slate-400">
                  Actions
                </th></tr></thead>
                <tbody>
                  {records.length ? records.map((record) => {
                    const [label, colorClasses] = getStatus((record.score / record.maximum_score) * 100)
                    return <tr key={record.id} className="border-t border-slate-800"><td className="px-6 py-5 font-medium">{record.subject}</td><td className="px-6 py-5">{record.score}/{record.maximum_score}</td><td className="px-6 py-5">{record.attendance != null ? `${record.attendance}%` : "—"}</td><td className="px-6 py-5">{record.assignment_completion != null ? `${record.assignment_completion}%` : "—"}</td><td className="px-6 py-5"><span className={`rounded-full px-3 py-1 text-sm ${colorClasses}`}>{label}</span></td><td className="px-6 py-5">
                      <div className="flex gap-3">
                        <button
                          onClick={() => startEdit(record)}
                          className="text-sm text-blue-400 hover:text-blue-300"
                        >
                          Edit
                        </button>

                        <button
                          onClick={() => deleteRecord(record.id)}
                          className="text-sm text-red-400 hover:text-red-300"
                        >
                          Delete
                        </button>
                      </div>
                    </td></tr>
                  }) : <tr><td colSpan="5" className="px-6 py-8 text-center text-slate-400">No academic records saved yet.</td></tr>}
                </tbody>
              </table>
            </div>
          </section>

          <div className="mt-8 grid gap-6 lg:grid-cols-2">
            <section className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
              <h2 className="text-xl font-semibold">Learning Activity 📖</h2>
              <div className="mt-6 space-y-6">
                <ProgressBar label="Daily Study Hours" value={Math.min((profile?.study_hours_per_day || 0) * 25, 100)} target={4} />
                <ProgressBar label="Assignment Completion" value={profile?.assignment_completion || averageAssignments} target={100} />
                <ProgressBar label="Coding Practice" value={Math.min((profile?.coding_problems_per_month || 0) * 2, 100)} target={50} />
              </div>
            </section>
            <section className="rounded-2xl border border-blue-900/50 bg-blue-950/20 p-6">
              <h2 className="text-xl font-semibold">Academic Insight 🤖</h2>
              <div className="mt-6 space-y-4 text-sm text-slate-300">
                <p>{records.length ? `Your current average across saved subjects is ${averageMarks}%.` : "Add records to receive academic insights."}</p>
                {lowestRecord && <div className="rounded-lg bg-slate-900 p-4"><p className="font-medium text-yellow-400">⚠ Focus Area</p><p className="mt-1 text-slate-400">{lowestRecord.subject} is your lowest saved score. Review this subject first.</p></div>}
                {strongestRecord && <div className="rounded-lg bg-slate-900 p-4"><p className="font-medium text-green-400">✓ Strength</p><p className="mt-1 text-slate-400">{strongestRecord.subject} is your strongest saved subject.</p></div>}
              </div>
            </section>
          </div>
        </main>
      </div>
    </div>
  )
}

function Field({ label, ...props }) {

  return <div><label className="mb-2 block text-sm">{label}</label><input {...props} min={props.type === "number" ? "0" : undefined} max={props.type === "number" ? "100" : undefined} className="w-full rounded-lg border border-slate-700 bg-slate-800 px-4 py-3 outline-none focus:border-blue-500" required /></div>
}

export default Academic
