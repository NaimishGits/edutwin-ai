import { Link } from "react-router-dom"

function Signup() {
  return (
    <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center px-6 py-10">

      <div className="w-full max-w-md">

        {/* Logo */}
        <div className="text-center mb-8">

          <h1 className="text-3xl font-bold text-blue-400">
            EduTwin AI
          </h1>

          <p className="mt-2 text-slate-400">
            Create your intelligent student digital twin
          </p>

        </div>


        {/* Signup Card */}
        <div className="rounded-2xl border border-slate-800 bg-slate-900 p-8 shadow-xl">

          <h2 className="text-2xl font-bold text-center">
            Create Account 🚀
          </h2>

          <p className="mt-2 mb-8 text-center text-slate-400">
            Start your personalized academic journey
          </p>


          {/* Full Name */}
          <div className="mb-5">

            <label className="mb-2 block text-sm font-medium">
              Full Name
            </label>

            <input
              type="text"
              placeholder="Enter your full name"
              className="w-full rounded-lg border border-slate-700 bg-slate-800 px-4 py-3 outline-none focus:border-blue-500"
            />

          </div>


          {/* Email */}
          <div className="mb-5">

            <label className="mb-2 block text-sm font-medium">
              Email
            </label>

            <input
              type="email"
              placeholder="Enter your email"
              className="w-full rounded-lg border border-slate-700 bg-slate-800 px-4 py-3 outline-none focus:border-blue-500"
            />

          </div>


          {/* Password */}
          <div className="mb-5">

            <label className="mb-2 block text-sm font-medium">
              Password
            </label>

            <input
              type="password"
              placeholder="Create a password"
              className="w-full rounded-lg border border-slate-700 bg-slate-800 px-4 py-3 outline-none focus:border-blue-500"
            />

          </div>


          {/* Confirm Password */}
          <div className="mb-6">

            <label className="mb-2 block text-sm font-medium">
              Confirm Password
            </label>

            <input
              type="password"
              placeholder="Confirm your password"
              className="w-full rounded-lg border border-slate-700 bg-slate-800 px-4 py-3 outline-none focus:border-blue-500"
            />

          </div>


          {/* Signup Button */}
          <Link
  to="/profile-setup"
  className="block w-full rounded-lg bg-blue-600 py-3 text-center font-semibold hover:bg-blue-700"
>
  Create Account
</Link>


          {/* Login Link */}
          <p className="mt-6 text-center text-sm text-slate-400">

            Already have an account?{" "}

            <Link
              to="/login"
              className="font-medium text-blue-400 hover:text-blue-300"
            >
              Login
            </Link>

          </p>

        </div>


        {/* Back to Home */}
        <div className="mt-6 text-center">

          <Link
            to="/"
            className="text-sm text-slate-500 hover:text-slate-300"
          >
            ← Back to Home
          </Link>

        </div>

      </div>

    </div>
  )
}

export default Signup