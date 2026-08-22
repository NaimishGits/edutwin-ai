import { useState } from "react"
import Navbar from "../components/Navbar"
import Sidebar from "../components/Sidebar"
import StatCard from "../components/Statcard"
import ProgressBar from "../components/ProgressBar"

function Academic() {
  const [subjects, setSubjects] = useState([
    {
      name: "Data Structures",
      marks: 85,
      attendance: 90,
      assignments: 88,
    },
    {
      name: "Database Management",
      marks: 72,
      attendance: 82,
      assignments: 75,
    },
    {
      name: "Operating Systems",
      marks: 80,
      attendance: 87,
      assignments: 84,
    },
  ])

  const [showForm, setShowForm] = useState(false)

  const [newSubject, setNewSubject] = useState({
    name: "",
    marks: "",
    attendance: "",
    assignments: "",
  })

  const handleChange = (e) => {
    setNewSubject({
      ...newSubject,
      [e.target.name]: e.target.value,
    })
  }

  const addSubject = (e) => {
    e.preventDefault()

    if (!newSubject.name) {
      return
    }

    setSubjects([
      ...subjects,
      {
        name: newSubject.name,
        marks: Number(newSubject.marks),
        attendance: Number(newSubject.attendance),
        assignments: Number(newSubject.assignments),
      },
    ])

    setNewSubject({
      name: "",
      marks: "",
      attendance: "",
      assignments: "",
    })

    setShowForm(false)
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white">

      {/* Reusable Navbar */}
      <Navbar />

      <div className="flex">

        {/* Reusable Sidebar */}
        <Sidebar />

        {/* Main Content */}
        <main className="w-full p-6 md:p-8">

          {/* Heading */}
          <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">

            <div>
              <h1 className="text-3xl font-bold">
                Academic Tracking 📚
              </h1>

              <p className="mt-2 text-slate-400">
                Monitor your academic performance and learning activity.
              </p>
            </div>

            <button
              onClick={() => setShowForm(!showForm)}
              className="rounded-lg bg-blue-600 px-5 py-3 font-semibold hover:bg-blue-700"
            >
              + Add Subject
            </button>

          </div>


          {/* ================= ADD SUBJECT FORM ================= */}

          {showForm && (
            <form
              onSubmit={addSubject}
              className="mb-8 rounded-2xl border border-slate-800 bg-slate-900 p-6"
            >

              <h2 className="mb-6 text-xl font-semibold">
                Add Academic Record
              </h2>

              <div className="grid gap-5 md:grid-cols-4">

                <div>
                  <label className="mb-2 block text-sm">
                    Subject
                  </label>

                  <input
                    name="name"
                    value={newSubject.name}
                    onChange={handleChange}
                    placeholder="Subject name"
                    className="w-full rounded-lg border border-slate-700 bg-slate-800 px-4 py-3 outline-none focus:border-blue-500"
                    required
                  />
                </div>


                <div>
                  <label className="mb-2 block text-sm">
                    Marks (%)
                  </label>

                  <input
                    name="marks"
                    value={newSubject.marks}
                    onChange={handleChange}
                    type="number"
                    min="0"
                    max="100"
                    placeholder="85"
                    className="w-full rounded-lg border border-slate-700 bg-slate-800 px-4 py-3 outline-none focus:border-blue-500"
                    required
                  />
                </div>


                <div>
                  <label className="mb-2 block text-sm">
                    Attendance (%)
                  </label>

                  <input
                    name="attendance"
                    value={newSubject.attendance}
                    onChange={handleChange}
                    type="number"
                    min="0"
                    max="100"
                    placeholder="90"
                    className="w-full rounded-lg border border-slate-700 bg-slate-800 px-4 py-3 outline-none focus:border-blue-500"
                    required
                  />
                </div>


                <div>
                  <label className="mb-2 block text-sm">
                    Assignments (%)
                  </label>

                  <input
                    name="assignments"
                    value={newSubject.assignments}
                    onChange={handleChange}
                    type="number"
                    min="0"
                    max="100"
                    placeholder="85"
                    className="w-full rounded-lg border border-slate-700 bg-slate-800 px-4 py-3 outline-none focus:border-blue-500"
                    required
                  />
                </div>

              </div>


              <div className="mt-6 flex gap-3">

                <button
                  type="submit"
                  className="rounded-lg bg-blue-600 px-6 py-2 font-medium hover:bg-blue-700"
                >
                  Save Record
                </button>

                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="rounded-lg border border-slate-700 px-6 py-2 font-medium hover:bg-slate-800"
                >
                  Cancel
                </button>

              </div>

            </form>
          )}


          {/* ================= SUMMARY CARDS ================= */}

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">

            <StatCard
              title="Overall Marks"
              value="79%"
              description="Good"
              icon="📊"
            />

            <StatCard
              title="Average Attendance"
              value="86%"
              description="Above target"
              icon="📅"
            />

            <StatCard
              title="Assignments"
              value="82%"
              description="On track"
              icon="📝"
            />

            <StatCard
              title="Subjects"
              value={subjects.length}
              description="Currently tracked"
              icon="📚"
            />

          </div>


          {/* ================= SUBJECT TABLE ================= */}

          <div className="mt-8 rounded-2xl border border-slate-800 bg-slate-900">

            <div className="border-b border-slate-800 p-6">

              <h2 className="text-xl font-semibold">
                Subject Performance
              </h2>

              <p className="mt-1 text-sm text-slate-400">
                Your current academic records
              </p>

            </div>


            <div className="overflow-x-auto">

              <table className="w-full text-left">

                <thead className="bg-slate-800/50">

                  <tr>

                    <th className="px-6 py-4 text-sm text-slate-400">
                      Subject
                    </th>

                    <th className="px-6 py-4 text-sm text-slate-400">
                      Marks
                    </th>

                    <th className="px-6 py-4 text-sm text-slate-400">
                      Attendance
                    </th>

                    <th className="px-6 py-4 text-sm text-slate-400">
                      Assignments
                    </th>

                    <th className="px-6 py-4 text-sm text-slate-400">
                      Status
                    </th>

                  </tr>

                </thead>


                <tbody>

                  {subjects.map((subject, index) => (

                    <tr
                      key={index}
                      className="border-t border-slate-800"
                    >

                      <td className="px-6 py-5 font-medium">
                        {subject.name}
                      </td>

                      <td className="px-6 py-5">
                        {subject.marks}%
                      </td>

                      <td className="px-6 py-5">
                        {subject.attendance}%
                      </td>

                      <td className="px-6 py-5">
                        {subject.assignments}%
                      </td>

                      <td className="px-6 py-5">

                        {subject.marks >= 80 ? (

                          <span className="rounded-full bg-green-500/10 px-3 py-1 text-sm text-green-400">
                            Excellent
                          </span>

                        ) : (

                          <span className="rounded-full bg-yellow-500/10 px-3 py-1 text-sm text-yellow-400">
                            Needs Improvement
                          </span>

                        )}

                      </td>

                    </tr>

                  ))}

                </tbody>

              </table>

            </div>

          </div>


          {/* ================= LEARNING ACTIVITY ================= */}

          <div className="mt-8 grid gap-6 lg:grid-cols-2">

            <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">

              <h2 className="text-xl font-semibold">
                Learning Activity 📖
              </h2>

              <p className="mt-1 text-sm text-slate-400">
                Track your study habits
              </p>


              <div className="mt-6 space-y-6">

                <ProgressBar
                  label="Daily Study Hours"
                  value={87.5}
                />

                <ProgressBar
                  label="Assignment Completion"
                  value={82}
                />

                <ProgressBar
                  label="Coding Practice"
                  value={64}
                />

              </div>

            </div>


            {/* AI Academic Insight */}

            <div className="rounded-2xl border border-blue-900/50 bg-blue-950/20 p-6">

              <div className="flex items-center gap-3">

                <span className="text-3xl">
                  🤖
                </span>

                <div>

                  <h2 className="text-xl font-semibold">
                    Academic AI Insight
                  </h2>

                  <p className="text-sm text-slate-400">
                    Initial analysis
                  </p>

                </div>

              </div>


              <div className="mt-6 space-y-4">

                <p className="text-slate-300">
                  Your overall academic performance is good.
                  However, Database Management requires additional
                  attention.
                </p>


                <div className="rounded-lg bg-slate-900 p-4">

                  <p className="font-medium text-yellow-400">
                    ⚠ Focus Area
                  </p>

                  <p className="mt-1 text-sm text-slate-400">
                    Spend more time practicing DBMS concepts
                    and SQL queries.
                  </p>

                </div>


                <div className="rounded-lg bg-slate-900 p-4">

                  <p className="font-medium text-green-400">
                    ✓ Strength
                  </p>

                  <p className="mt-1 text-sm text-slate-400">
                    Your Data Structures performance is strong.
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

export default Academic 