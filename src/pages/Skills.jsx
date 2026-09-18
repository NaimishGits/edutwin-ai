import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import Navbar from "../components/Navbar"
import Sidebar from "../components/Sidebar"
import { api } from "../lib/api"

function Skills() {
  const navigate = useNavigate()
  const [skills, setSkills] = useState([])
  const [interests, setInterests] = useState([])
  const [profile, setProfile] = useState(null)
  const [newSkill, setNewSkill] = useState({ name: "", level: "", category: "" })
  const [newInterest, setNewInterest] = useState("")
  const [showForm, setShowForm] = useState(false)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState("")
  const [editingSkill, setEditingSkill] = useState(null)

  useEffect(() => {
    const loadData = async () => {
      try {
        const [savedSkills, savedProfile] = await Promise.all([api("/api/skills"), api("/api/me")])
        setSkills(savedSkills)
        setProfile(savedProfile)
        setInterests(savedProfile.interests || [])
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

  const addSkill = async (event) => {
    event.preventDefault()
    setError("")

    try {
      setSaving(true)
      const savedSkill = await api("/api/skills", {
        method: "POST",
        body: JSON.stringify({ ...newSkill, level: Number(newSkill.level) }),
      })
      setSkills((currentSkills) => [...currentSkills, savedSkill].sort((a, b) => a.name.localeCompare(b.name)))
      setNewSkill({ name: "", level: "", category: "" })
      setShowForm(false)
    } catch (requestError) {
      setError(requestError.message)
    } finally {
      setSaving(false)
    }
  }

  const deleteSkill = async (skillId) => {
    try {
      await api(`/api/skills/${skillId}`, { method: "DELETE" })
      setSkills((currentSkills) => currentSkills.filter((skill) => skill.id !== skillId))
    } catch (requestError) {
      setError(requestError.message)
    }
  }

  const saveInterests = async (updatedInterests) => {
    setInterests(updatedInterests)
    try {
      const updatedProfile = await api("/api/profile", {
        method: "PUT",
        body: JSON.stringify({ interests: updatedInterests }),
      })
      setProfile(updatedProfile)
    } catch (requestError) {
      setError(requestError.message)
    }
  }

  const addInterest = () => {
    const interest = newInterest.trim()
    if (!interest || interests.some((item) => item.toLowerCase() === interest.toLowerCase())) return
    saveInterests([...interests, interest])
    setNewInterest("")
  }

  const averageLevel = skills.length
    ? Math.round(skills.reduce((total, skill) => total + skill.level, 0) / skills.length)
    : 0

  if (!profile && !error) {
    return <div className="flex min-h-screen items-center justify-center bg-slate-950 text-slate-300">Loading skills...</div>
  }

  if (error && !profile) {
    return <div className="flex min-h-screen items-center justify-center bg-slate-950 p-6 text-red-400">{error}</div>
  }

  const name = profile?.full_name || "Student"

  const startEditSkill = (skill) => {
    setEditingSkill({
      ...skill,
      level: String(skill.level),
    })
  }

  const saveSkillEdit = async (event) => {
    event.preventDefault()
    setError("")

    try {
      setSaving(true)

      const updatedSkill = await api(`/api/skills/${editingSkill.id}`, {
        method: "PATCH",
        body: JSON.stringify({
          name: editingSkill.name,
          category: editingSkill.category,
          level: Number(editingSkill.level),
        }),
      })

      setSkills((currentSkills) =>
        currentSkills.map((skill) =>
          skill.id === updatedSkill.id ? updatedSkill : skill
        )
      )

      setEditingSkill(null)
    } catch (requestError) {
      setError(requestError.message)
    } finally {
      setSaving(false)
    }
  }



  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <Navbar name={name} initials={name.charAt(0).toUpperCase()} />
      <div className="flex">
        <Sidebar />
        <main className="w-full p-6 md:p-8">
          <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
            <div>
              <h1 className="text-3xl font-bold">Skills & Interests 🧠</h1>
              <p className="mt-2 text-slate-400">Track your skills, interests and areas of expertise.</p>
            </div>
            <button onClick={() => setShowForm((visible) => !visible)} className="rounded-lg bg-blue-600 px-5 py-3 font-semibold hover:bg-blue-700">
              + Add Skill
            </button>
          </div>

          {error && <p className="mb-6 rounded-lg bg-red-500/10 px-4 py-3 text-sm text-red-400">{error}</p>}

          {showForm && (
            <form onSubmit={addSkill} className="mb-8 rounded-2xl border border-slate-800 bg-slate-900 p-6">
              <h2 className="mb-6 text-xl font-semibold">Add New Skill</h2>
              <div className="grid gap-5 md:grid-cols-3">
                <input name="name" value={newSkill.name} onChange={(event) => setNewSkill({ ...newSkill, name: event.target.value })} placeholder="e.g. Python" className="rounded-lg border border-slate-700 bg-slate-800 px-4 py-3 outline-none focus:border-blue-500" required />
                <input name="level" value={newSkill.level} onChange={(event) => setNewSkill({ ...newSkill, level: event.target.value })} type="number" min="0" max="100" placeholder="Skill level (%)" className="rounded-lg border border-slate-700 bg-slate-800 px-4 py-3 outline-none focus:border-blue-500" required />
                <select name="category" value={newSkill.category} onChange={(event) => setNewSkill({ ...newSkill, category: event.target.value })} className="rounded-lg border border-slate-700 bg-slate-800 px-4 py-3 outline-none focus:border-blue-500" required>
                  <option value="">Select category</option>
                  <option value="Programming">Programming</option>
                  <option value="Database">Database</option>
                  <option value="Web Development">Web Development</option>
                  <option value="AI / ML">AI / ML</option>
                  <option value="Soft Skills">Soft Skills</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <div className="mt-6 flex gap-3">
                <button type="submit" disabled={saving} className="rounded-lg bg-blue-600 px-6 py-2 font-medium hover:bg-blue-700 disabled:opacity-60">{saving ? "Saving..." : "Save Skill"}</button>
                <button type="button" onClick={() => setShowForm(false)} className="rounded-lg border border-slate-700 px-6 py-2 hover:bg-slate-800">Cancel</button>
              </div>
            </form>
          )}

          {editingSkill && (
            <form
              onSubmit={saveSkillEdit}
              className="mb-8 rounded-2xl border border-blue-900 bg-slate-900 p-6"
            >
              <div className="mb-6 flex items-center justify-between">
                <h2 className="text-xl font-semibold">Edit Skill</h2>

                <button
                  type="button"
                  onClick={() => setEditingSkill(null)}
                  className="text-sm text-slate-400 hover:text-white"
                >
                  Cancel
                </button>
              </div>

              <div className="grid gap-5 md:grid-cols-3">
                <div>
                  <label className="mb-2 block text-sm">Skill Name</label>

                  <input
                    value={editingSkill.name}
                    onChange={(event) =>
                      setEditingSkill({
                        ...editingSkill,
                        name: event.target.value,
                      })
                    }
                    className="w-full rounded-lg border border-slate-700 bg-slate-800 px-4 py-3 outline-none focus:border-blue-500"
                    required
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm">Skill Level (%)</label>

                  <input
                    type="number"
                    min="0"
                    max="100"
                    value={editingSkill.level}
                    onChange={(event) =>
                      setEditingSkill({
                        ...editingSkill,
                        level: event.target.value,
                      })
                    }
                    className="w-full rounded-lg border border-slate-700 bg-slate-800 px-4 py-3 outline-none focus:border-blue-500"
                    required
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm">Category</label>

                  <select
                    value={editingSkill.category}
                    onChange={(event) =>
                      setEditingSkill({
                        ...editingSkill,
                        category: event.target.value,
                      })
                    }
                    className="w-full rounded-lg border border-slate-700 bg-slate-800 px-4 py-3 outline-none focus:border-blue-500"
                    required
                  >
                    <option value="Programming">Programming</option>
                    <option value="Database">Database</option>
                    <option value="Web Development">Web Development</option>
                    <option value="AI / ML">AI / ML</option>
                    <option value="Soft Skills">Soft Skills</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>

              <button
                type="submit"
                disabled={saving}
                className="mt-6 rounded-lg bg-blue-600 px-6 py-2 font-medium hover:bg-blue-700 disabled:opacity-60"
              >
                {saving ? "Saving..." : "Save Changes"}
              </button>
            </form>
          )}



          <div className="grid gap-6 lg:grid-cols-2">
            <section className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
              <h2 className="text-xl font-semibold">My Skills</h2>
              <p className="mt-1 text-sm text-slate-400">Current skill proficiency</p>
              <div className="mt-6 space-y-6">
                {skills.length ? skills.map((skill) => (
                  <div key={skill.id}>
                    <div className="mb-2 flex items-center justify-between">
                      <div><p className="font-medium">{skill.name}</p><p className="text-xs text-slate-500">{skill.category}</p></div>
                      <div className="flex items-center gap-3">
                        <span className="text-sm text-blue-400">
                          {skill.level}%
                        </span>

                        <button
                          onClick={() => startEditSkill(skill)}
                          className="text-xs text-blue-400 hover:text-blue-300"
                        >
                          Edit
                        </button>

                        <button
                          onClick={() => deleteSkill(skill.id)}
                          className="text-xs text-red-400 hover:text-red-300"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                    <div className="h-2 rounded-full bg-slate-800"><div className="h-2 rounded-full bg-blue-600" style={{ width: `${skill.level}%` }} /></div>
                  </div>
                )) : <p className="rounded-lg bg-slate-800 p-4 text-sm text-slate-400">No skills saved yet. Add your first skill above.</p>}
              </div>
            </section>

            <section className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
              <h2 className="text-xl font-semibold">Skill Overview 📊</h2>
              <div className="mt-8 grid grid-cols-2 gap-4">
                <OverviewCard label="Total Skills" value={skills.length} />
                <OverviewCard label="Strong Skills" value={skills.filter((skill) => skill.level >= 75).length} />
                <OverviewCard label="Average Level" value={`${averageLevel}%`} />
                <OverviewCard label="Interests" value={interests.length} />
              </div>
            </section>
          </div>

          <section className="mt-8 rounded-2xl border border-slate-800 bg-slate-900 p-6">
            <h2 className="text-xl font-semibold">My Interests 💡</h2>
            <div className="mt-6 flex flex-wrap gap-3">
              {interests.map((interest) => (
                <div key={interest} className="flex items-center gap-2 rounded-full border border-blue-900 bg-blue-500/10 px-4 py-2 text-blue-400">
                  <span>{interest}</span>
                  <button onClick={() => saveInterests(interests.filter((item) => item !== interest))} className="text-blue-300 hover:text-white">×</button>
                </div>
              ))}
            </div>
            <div className="mt-6 flex max-w-xl gap-3">
              <input value={newInterest} onChange={(event) => setNewInterest(event.target.value)} onKeyDown={(event) => { if (event.key === "Enter") { event.preventDefault(); addInterest() } }} placeholder="Add a new interest" className="flex-1 rounded-lg border border-slate-700 bg-slate-800 px-4 py-3 outline-none focus:border-blue-500" />
              <button onClick={addInterest} className="rounded-lg bg-blue-600 px-5 py-3 font-medium hover:bg-blue-700">Add</button>
            </div>
          </section>
        </main>
      </div>
    </div>
  )
}

function OverviewCard({ label, value }) {
  return <div className="rounded-xl bg-slate-800 p-5"><p className="text-sm text-slate-400">{label}</p><p className="mt-2 text-3xl font-bold">{value}</p></div>
}

export default Skills
