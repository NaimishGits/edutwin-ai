import { Link } from "react-router-dom"

function About() {
  return (
    <div className="min-h-screen bg-slate-950 text-white">

      {/* Navbar */}
      <header className="flex items-center justify-between border-b border-slate-800 bg-slate-900 px-6 py-4">

        <Link
          to="/"
          className="text-2xl font-bold text-blue-400"
        >
          EduTwin AI
        </Link>

        <div className="flex items-center gap-4">

          <Link
            to="/login"
            className="rounded-lg px-4 py-2 text-slate-300 hover:bg-slate-800"
          >
            Login
          </Link>

          <Link
            to="/signup"
            className="rounded-lg bg-blue-600 px-4 py-2 font-medium hover:bg-blue-700"
          >
            Get Started
          </Link>

        </div>

      </header>


      {/* Hero */}
      <section className="px-6 py-20 text-center">

        <div className="mx-auto max-w-4xl">

          <p className="mb-4 font-medium text-blue-400">
            INTELLIGENT STUDENT DIGITAL TWIN
          </p>

          <h1 className="text-4xl font-bold leading-tight md:text-6xl">
            Meet Your
            <span className="text-blue-400"> Digital Twin</span>
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-slate-400">
            EduTwin AI creates an intelligent digital representation
            of your academic performance, skills, learning habits
            and career progress.
          </p>

          <Link
            to="/signup"
            className="mt-8 inline-block rounded-lg bg-blue-600 px-7 py-3 font-semibold hover:bg-blue-700"
          >
            Create Your Twin →
          </Link>

        </div>

      </section>


      {/* What is EduTwin */}
      <section className="border-y border-slate-800 bg-slate-900/50 px-6 py-16">

        <div className="mx-auto max-w-5xl">

          <h2 className="text-center text-3xl font-bold">
            What is EduTwin AI?
          </h2>

          <p className="mx-auto mt-5 max-w-3xl text-center leading-7 text-slate-400">
            EduTwin AI is more than a traditional student management
            system. It continuously analyzes student data to understand
            the student's current state and provide personalized
            predictions and recommendations.
          </p>


          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">

            <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">

              <div className="text-3xl">
                👁️
              </div>

              <h3 className="mt-4 text-xl font-semibold">
                Observe
              </h3>

              <p className="mt-3 text-sm leading-6 text-slate-400">
                Collect academic performance, attendance, study
                hours, assignments and skill information.
              </p>

            </div>


            <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">

              <div className="text-3xl">
                🧠
              </div>

              <h3 className="mt-4 text-xl font-semibold">
                Analyze
              </h3>

              <p className="mt-3 text-sm leading-6 text-slate-400">
                Analyze the student's learning patterns and
                identify strengths and areas that need attention.
              </p>

            </div>


            <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">

              <div className="text-3xl">
                🔮
              </div>

              <h3 className="mt-4 text-xl font-semibold">
                Predict
              </h3>

              <p className="mt-3 text-sm leading-6 text-slate-400">
                Use machine learning to estimate future academic
                and career-related outcomes.
              </p>

            </div>


            <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">

              <div className="text-3xl">
                💡
              </div>

              <h3 className="mt-4 text-xl font-semibold">
                Recommend
              </h3>

              <p className="mt-3 text-sm leading-6 text-slate-400">
                Provide personalized study plans, skill
                recommendations and career guidance.
              </p>

            </div>

          </div>

        </div>

      </section>


      {/* How it works */}
      <section className="px-6 py-16">

        <div className="mx-auto max-w-5xl">

          <h2 className="text-center text-3xl font-bold">
            How EduTwin Works
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-center text-slate-400">
            Your digital twin evolves as your learning data changes.
          </p>


          <div className="mt-12 space-y-6">

            <div className="flex gap-5 rounded-2xl border border-slate-800 bg-slate-900 p-6">

              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-blue-600 font-bold">
                1
              </div>

              <div>

                <h3 className="text-xl font-semibold">
                  Build Your Profile
                </h3>

                <p className="mt-2 text-slate-400">
                  Add your academic information, skills, interests,
                  study habits and career goals.
                </p>

              </div>

            </div>


            <div className="flex gap-5 rounded-2xl border border-slate-800 bg-slate-900 p-6">

              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-blue-600 font-bold">
                2
              </div>

              <div>

                <h3 className="text-xl font-semibold">
                  Track Your Progress
                </h3>

                <p className="mt-2 text-slate-400">
                  Your academic performance, skills and learning
                  activities become part of your digital twin.
                </p>

              </div>

            </div>


            <div className="flex gap-5 rounded-2xl border border-slate-800 bg-slate-900 p-6">

              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-blue-600 font-bold">
                3
              </div>

              <div>

                <h3 className="text-xl font-semibold">
                  AI Understands Your Pattern
                </h3>

                <p className="mt-2 text-slate-400">
                  Data processing and machine learning help identify
                  patterns, strengths, weaknesses and trends.
                </p>

              </div>

            </div>


            <div className="flex gap-5 rounded-2xl border border-slate-800 bg-slate-900 p-6">

              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-blue-600 font-bold">
                4
              </div>

              <div>

                <h3 className="text-xl font-semibold">
                  Receive Personalized Guidance
                </h3>

                <p className="mt-2 text-slate-400">
                  EduTwin AI recommends what you should focus on
                  next based on your current profile.
                </p>

              </div>

            </div>

          </div>

        </div>

      </section>


      {/* Features */}
      <section className="border-y border-slate-800 bg-slate-900/50 px-6 py-16">

        <div className="mx-auto max-w-5xl">

          <h2 className="text-center text-3xl font-bold">
            What Your Digital Twin Tracks
          </h2>


          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">

            <div className="rounded-xl bg-slate-800 p-5">
              📚 <span className="ml-2 font-medium">Academic Performance</span>
            </div>

            <div className="rounded-xl bg-slate-800 p-5">
              🕐 <span className="ml-2 font-medium">Attendance & Study Hours</span>
            </div>

            <div className="rounded-xl bg-slate-800 p-5">
              📝 <span className="ml-2 font-medium">Assignments & Progress</span>
            </div>

            <div className="rounded-xl bg-slate-800 p-5">
              🧠 <span className="ml-2 font-medium">Technical Skills</span>
            </div>

            <div className="rounded-xl bg-slate-800 p-5">
              🎯 <span className="ml-2 font-medium">Career Goals</span>
            </div>

            <div className="rounded-xl bg-slate-800 p-5">
              📈 <span className="ml-2 font-medium">Learning Trends</span>
            </div>

          </div>

        </div>

      </section>


      {/* CTA */}
      <section className="px-6 py-20 text-center">

        <h2 className="text-3xl font-bold">
          Ready to Build Your Digital Twin?
        </h2>

        <p className="mx-auto mt-4 max-w-xl text-slate-400">
          Start tracking your growth and get personalized
          insights powered by AI.
        </p>

        <Link
          to="/signup"
          className="mt-8 inline-block rounded-lg bg-blue-600 px-8 py-3 font-semibold hover:bg-blue-700"
        >
          Create Your Twin 🚀
        </Link>

      </section>


      {/* Footer */}
      <footer className="border-t border-slate-800 bg-slate-900 px-6 py-8 text-center">

        <p className="font-semibold text-blue-400">
          EduTwin AI
        </p>

        <p className="mt-2 text-sm text-slate-500">
          Intelligent Student Digital Twin
        </p>

      </footer>

    </div>
  )
}

export default About