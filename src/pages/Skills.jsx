import { useState } from "react"
import { Link } from "react-router-dom"

function Skills() {
  const [skills, setSkills] = useState([
    { name: "Python", level: 80, category: "Programming" },
    { name: "Java", level: 75, category: "Programming" },
    { name: "SQL", level: 70, category: "Database" },
    { name: "React", level: 60, category: "Web Development" },
  ])

  const [showForm, setShowForm] = useState(false)

  const [newSkill, setNewSkill] = useState({
    name: "",
    level: "",
    category: "",
  })

  const [interests, setInterests] = useState([
    "Artificial Intelligence",
    "Machine Learning",
    "Web Development",
  ])

  const [newInterest, setNewInterest] = useState("")

  const handleSkillChange = (e) => {
    setNewSkill({
      ...newSkill,
      [e.target.name]: e.target.value,
    })
  }

  const addSkill = (e) => {
    e.preventDefault()

    if (!newSkill.name) return

    setSkills([
      ...skills,
      {
        name: newSkill.name,
        level: Number(newSkill.level),
        category: newSkill.category,
      },
    ])

    setNewSkill({
      name: "",
      level: "",
      category: "",
    })

    setShowForm(false)
  }

  const addInterest = () => {
    if (!newInterest.trim()) return

    setInterests([...interests, newInterest.trim()])
    setNewInterest("")
  }

  const removeInterest = (index) => {
    setInterests(interests.filter((_, i) => i !== index))
  }

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
              className="block rounded-lg bg-blue-600 px-4 py-3 font-medium"
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
          <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">

            <div>

              <h1 className="text-3xl font-bold">
                Skills & Interests 🧠
              </h1>

              <p className="mt-2 text-slate-400">
                Track your skills, interests and areas of expertise.
              </p>

            </div>

            <button
              onClick={() => setShowForm(!showForm)}
              className="rounded-lg bg-blue-600 px-5 py-3 font-semibold hover:bg-blue-700"
            >
              + Add Skill
            </button>

          </div>


          {/* Add Skill */}
          {showForm && (

            <form
              onSubmit={addSkill}
              className="mb-8 rounded-2xl border border-slate-800 bg-slate-900 p-6"
            >

              <h2 className="mb-6 text-xl font-semibold">
                Add New Skill
              </h2>

              <div className="grid gap-5 md:grid-cols-3">

                <div>

                  <label className="mb-2 block text-sm">
                    Skill Name
                  </label>

                  <input
                    name="name"
                    value={newSkill.name}
                    onChange={handleSkillChange}
                    placeholder="e.g. Python"
                    className="w-full rounded-lg border border-slate-700 bg-slate-800 px-4 py-3 outline-none focus:border-blue-500"
                    required
                  />

                </div>


                <div>

                  <label className="mb-2 block text-sm">
                    Skill Level (%)
                  </label>

                  <input
                    name="level"
                    value={newSkill.level}
                    onChange={handleSkillChange}
                    type="number"
                    min="0"
                    max="100"
                    placeholder="e.g. 80"
                    className="w-full rounded-lg border border-slate-700 bg-slate-800 px-4 py-3 outline-none focus:border-blue-500"
                    required
                  />

                </div>


                <div>

                  <label className="mb-2 block text-sm">
                    Category
                  </label>

                  <select
                    name="category"
                    value={newSkill.category}
                    onChange={handleSkillChange}
                    className="w-full rounded-lg border border-slate-700 bg-slate-800 px-4 py-3 outline-none focus:border-blue-500"
                    required
                  >

                    <option value="">
                      Select category
                    </option>

                    <option value="Programming">
                      Programming
                    </option>

                    <option value="Database">
                      Database
                    </option>

                    <option value="Web Development">
                      Web Development
                    </option>

                    <option value="AI / ML">
                      AI / ML
                    </option>

                    <option value="Soft Skills">
                      Soft Skills
                    </option>

                    <option value="Other">
                      Other
                    </option>

                  </select>

                </div>

              </div>


              <div className="mt-6 flex gap-3">

                <button
                  type="submit"
                  className="rounded-lg bg-blue-600 px-6 py-2 font-medium hover:bg-blue-700"
                >
                  Save Skill
                </button>

                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="rounded-lg border border-slate-700 px-6 py-2 hover:bg-slate-800"
                >
                  Cancel
                </button>

              </div>

            </form>

          )}


          {/* Skill Cards */}
          <div className="grid gap-6 lg:grid-cols-2">

            <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">

              <h2 className="text-xl font-semibold">
                My Skills
              </h2>

              <p className="mt-1 text-sm text-slate-400">
                Current skill proficiency
              </p>


              <div className="mt-6 space-y-6">

                {skills.map((skill, index) => (

                  <div key={index}>

                    <div className="mb-2 flex items-center justify-between">

                      <div>

                        <p className="font-medium">
                          {skill.name}
                        </p>

                        <p className="text-xs text-slate-500">
                          {skill.category}
                        </p>

                      </div>

                      <span className="text-sm text-blue-400">
                        {skill.level}%
                      </span>

                    </div>


                    <div className="h-2 rounded-full bg-slate-800">

                      <div
                        className="h-2 rounded-full bg-blue-600"
                        style={{
                          width: `${skill.level}%`,
                        }}
                      />

                    </div>

                  </div>

                ))}

              </div>

            </div>


            {/* Skill Overview */}
            <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">

              <h2 className="text-xl font-semibold">
                Skill Overview 📊
              </h2>

              <p className="mt-1 text-sm text-slate-400">
                Your current strengths
              </p>


              <div className="mt-8 grid grid-cols-2 gap-4">

                <div className="rounded-xl bg-slate-800 p-5">

                  <p className="text-sm text-slate-400">
                    Total Skills
                  </p>

                  <p className="mt-2 text-3xl font-bold">
                    {skills.length}
                  </p>

                </div>


                <div className="rounded-xl bg-slate-800 p-5">

                  <p className="text-sm text-slate-400">
                    Strong Skills
                  </p>

                  <p className="mt-2 text-3xl font-bold">
                    {skills.filter((skill) => skill.level >= 75).length}
                  </p>

                </div>


                <div className="rounded-xl bg-slate-800 p-5">

                  <p className="text-sm text-slate-400">
                    Average Level
                  </p>

                  <p className="mt-2 text-3xl font-bold">
                    {Math.round(
                      skills.reduce(
                        (total, skill) => total + skill.level,
                        0
                      ) / skills.length
                    )}%
                  </p>

                </div>


                <div className="rounded-xl bg-slate-800 p-5">

                  <p className="text-sm text-slate-400">
                    Interests
                  </p>

                  <p className="mt-2 text-3xl font-bold">
                    {interests.length}
                  </p>

                </div>

              </div>

            </div>

          </div>


          {/* Interests */}
          <div className="mt-8 rounded-2xl border border-slate-800 bg-slate-900 p-6">

            <h2 className="text-xl font-semibold">
              My Interests 💡
            </h2>

            <p className="mt-1 text-sm text-slate-400">
              Areas you are interested in exploring
            </p>


            <div className="mt-6 flex flex-wrap gap-3">

              {interests.map((interest, index) => (

                <div
                  key={index}
                  className="flex items-center gap-2 rounded-full border border-blue-900 bg-blue-500/10 px-4 py-2 text-blue-400"
                >

                  <span>
                    {interest}
                  </span>

                  <button
                    onClick={() => removeInterest(index)}
                    className="text-blue-300 hover:text-white"
                  >
                    ×
                  </button>

                </div>

              ))}

            </div>


            {/* Add Interest */}
            <div className="mt-6 flex max-w-xl gap-3">

              <input
                value={newInterest}
                onChange={(e) => setNewInterest(e.target.value)}
                placeholder="Add a new interest"
                className="flex-1 rounded-lg border border-slate-700 bg-slate-800 px-4 py-3 outline-none focus:border-blue-500"
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault()
                    addInterest()
                  }
                }}
              />

              <button
                onClick={addInterest}
                className="rounded-lg bg-blue-600 px-5 py-3 font-medium hover:bg-blue-700"
              >
                Add
              </button>

            </div>

          </div>


          {/* AI Skill Insight */}
          <div className="mt-8 rounded-2xl border border-blue-900/50 bg-blue-950/20 p-6">

            <div className="flex items-center gap-3">

              <span className="text-3xl">
                🤖
              </span>

              <div>

                <h2 className="text-xl font-semibold">
                  AI Skill Insight
                </h2>

                <p className="text-sm text-slate-400">
                  Initial skill analysis
                </p>

              </div>

            </div>


            <div className="mt-6 grid gap-4 md:grid-cols-2">

              <div className="rounded-lg bg-slate-900 p-4">

                <p className="font-medium text-green-400">
                  ✓ Strength
                </p>

                <p className="mt-1 text-sm text-slate-400">
                  Your programming and database skills provide
                  a strong technical foundation.
                </p>

              </div>


              <div className="rounded-lg bg-slate-900 p-4">

                <p className="font-medium text-yellow-400">
                  ⚠ Improvement Area
                </p>

                <p className="mt-1 text-sm text-slate-400">
                  Consider improving React and AI/ML skills
                  to strengthen your development profile.
                </p>

              </div>

            </div>

          </div>

        </main>

      </div>

    </div>
  )
}

export default Skills