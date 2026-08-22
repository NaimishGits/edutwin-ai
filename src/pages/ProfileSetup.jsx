import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"

function ProfileSetup() {
    const navigate = useNavigate()

  const [formData, setFormData] = useState({
    fullName: "",
    course: "",
    semester: "",
    college: "",
    cgpa: "",
    attendance: "",
    studyHours: "",
    assignments: "",
    codingProblems: "",
    skills: "",
    interests: "",
    careerGoal: ""
  })

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e) => {
  e.preventDefault()

  console.log("Student Profile:", formData)

  navigate("/dashboard")
}

  return (
    <div className="min-h-screen bg-slate-950 px-6 py-10 text-white">

      {/* Header */}
      <div className="mx-auto mb-10 max-w-4xl">

        <Link
          to="/"
          className="text-2xl font-bold text-blue-400"
        >
          EduTwin AI
        </Link>

        <h1 className="mt-8 text-3xl font-bold">
          Create Your Digital Twin 🧠
        </h1>

        <p className="mt-2 text-slate-400">
          Tell us about your academic journey, skills and career goals.
        </p>

      </div>


      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="mx-auto max-w-4xl space-y-8"
      >

        {/* Personal Information */}
        <section className="rounded-2xl border border-slate-800 bg-slate-900 p-8">

          <h2 className="mb-6 text-2xl font-semibold">
            Personal Information
          </h2>

          <div className="grid gap-5 md:grid-cols-2">

            <div>
              <label className="mb-2 block text-sm">
                Full Name
              </label>

              <input
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                type="text"
                placeholder="Enter your full name"
                className="w-full rounded-lg border border-slate-700 bg-slate-800 px-4 py-3 outline-none focus:border-blue-500"
                required
              />
            </div>


            <div>
              <label className="mb-2 block text-sm">
                College / University
              </label>

              <input
                name="college"
                value={formData.college}
                onChange={handleChange}
                type="text"
                placeholder="Enter your college"
                className="w-full rounded-lg border border-slate-700 bg-slate-800 px-4 py-3 outline-none focus:border-blue-500"
                required
              />
            </div>

          </div>

        </section>


        {/* Academic Information */}
        <section className="rounded-2xl border border-slate-800 bg-slate-900 p-8">

          <h2 className="mb-6 text-2xl font-semibold">
            Academic Information 📚
          </h2>

          <div className="grid gap-5 md:grid-cols-2">

            <div>
              <label className="mb-2 block text-sm">
                Course
              </label>

              <input
                name="course"
                value={formData.course}
                onChange={handleChange}
                type="text"
                placeholder="e.g. MCA"
                className="w-full rounded-lg border border-slate-700 bg-slate-800 px-4 py-3 outline-none focus:border-blue-500"
                required
              />
            </div>


            <div>
              <label className="mb-2 block text-sm">
                Current Semester
              </label>

              <input
                name="semester"
                value={formData.semester}
                onChange={handleChange}
                type="number"
                placeholder="e.g. 4"
                className="w-full rounded-lg border border-slate-700 bg-slate-800 px-4 py-3 outline-none focus:border-blue-500"
                required
              />
            </div>


            <div>
              <label className="mb-2 block text-sm">
                Current CGPA
              </label>

              <input
                name="cgpa"
                value={formData.cgpa}
                onChange={handleChange}
                type="number"
                step="0.01"
                placeholder="e.g. 8.50"
                className="w-full rounded-lg border border-slate-700 bg-slate-800 px-4 py-3 outline-none focus:border-blue-500"
              />
            </div>


            <div>
              <label className="mb-2 block text-sm">
                Attendance (%)
              </label>

              <input
                name="attendance"
                value={formData.attendance}
                onChange={handleChange}
                type="number"
                placeholder="e.g. 85"
                className="w-full rounded-lg border border-slate-700 bg-slate-800 px-4 py-3 outline-none focus:border-blue-500"
              />
            </div>

          </div>

        </section>


        {/* Learning Activity */}
        <section className="rounded-2xl border border-slate-800 bg-slate-900 p-8">

          <h2 className="mb-6 text-2xl font-semibold">
            Learning Activity 📖
          </h2>

          <div className="grid gap-5 md:grid-cols-3">

            <div>
              <label className="mb-2 block text-sm">
                Study Hours / Day
              </label>

              <input
                name="studyHours"
                value={formData.studyHours}
                onChange={handleChange}
                type="number"
                step="0.5"
                placeholder="e.g. 3.5"
                className="w-full rounded-lg border border-slate-700 bg-slate-800 px-4 py-3 outline-none focus:border-blue-500"
              />
            </div>


            <div>
              <label className="mb-2 block text-sm">
                Assignment Completion (%)
              </label>

              <input
                name="assignments"
                value={formData.assignments}
                onChange={handleChange}
                type="number"
                placeholder="e.g. 80"
                className="w-full rounded-lg border border-slate-700 bg-slate-800 px-4 py-3 outline-none focus:border-blue-500"
              />
            </div>


            <div>
              <label className="mb-2 block text-sm">
                Coding Problems / Month
              </label>

              <input
                name="codingProblems"
                value={formData.codingProblems}
                onChange={handleChange}
                type="number"
                placeholder="e.g. 30"
                className="w-full rounded-lg border border-slate-700 bg-slate-800 px-4 py-3 outline-none focus:border-blue-500"
              />
            </div>

          </div>

        </section>


        {/* Skills */}
        <section className="rounded-2xl border border-slate-800 bg-slate-900 p-8">

          <h2 className="mb-6 text-2xl font-semibold">
            Skills & Interests 💡
          </h2>

          <div className="space-y-5">

            <div>

              <label className="mb-2 block text-sm">
                Technical & Non-Technical Skills
              </label>

              <textarea
                name="skills"
                value={formData.skills}
                onChange={handleChange}
                rows="3"
                placeholder="e.g. Java, Python, SQL, React, Communication"
                className="w-full resize-none rounded-lg border border-slate-700 bg-slate-800 px-4 py-3 outline-none focus:border-blue-500"
              />

            </div>


            <div>

              <label className="mb-2 block text-sm">
                Interests
              </label>

              <textarea
                name="interests"
                value={formData.interests}
                onChange={handleChange}
                rows="3"
                placeholder="e.g. AI/ML, Web Development, Data Science"
                className="w-full resize-none rounded-lg border border-slate-700 bg-slate-800 px-4 py-3 outline-none focus:border-blue-500"
              />

            </div>

          </div>

        </section>


        {/* Career */}
        <section className="rounded-2xl border border-slate-800 bg-slate-900 p-8">

          <h2 className="mb-6 text-2xl font-semibold">
            Career Goal 🎯
          </h2>

          <label className="mb-2 block text-sm">
            What is your target career?
          </label>

          <input
            name="careerGoal"
            value={formData.careerGoal}
            onChange={handleChange}
            type="text"
            placeholder="e.g. Software Developer, Data Scientist"
            className="w-full rounded-lg border border-slate-700 bg-slate-800 px-4 py-3 outline-none focus:border-blue-500"
          />

        </section>


        {/* Submit */}
        <div className="flex justify-end pb-10">

          <button
            type="submit"
            className="rounded-lg bg-blue-600 px-8 py-3 font-semibold hover:bg-blue-700"
          >
            Save Profile & Continue →
          </button>

        </div>

      </form>

    </div>
  )
}

export default ProfileSetup