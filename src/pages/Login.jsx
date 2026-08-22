import { Link } from "react-router-dom"

function Login() {
  return (
    <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center px-6">

      <div className="w-full max-w-md">

        {/* Logo */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-blue-400">
            EduTwin AI
          </h1>

          <p className="mt-2 text-slate-400">
            Your Intelligent Student Digital Twin
          </p>
        </div>


        {/* Login Card */}
        <div className="rounded-2xl border border-slate-800 bg-slate-900 p-8 shadow-xl">

          <h2 className="text-2xl font-bold text-center">
            Welcome Back 👋
          </h2>

          <p className="mt-2 mb-8 text-center text-slate-400">
            Login to continue to your digital twin
          </p>


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
          <div className="mb-4">

            <label className="mb-2 block text-sm font-medium">
              Password
            </label>

            <input
              type="password"
              placeholder="Enter your password"
              className="w-full rounded-lg border border-slate-700 bg-slate-800 px-4 py-3 outline-none focus:border-blue-500"
            />

          </div>


          {/* Forgot Password */}
          <div className="mb-6 text-right">

            <button className="text-sm text-blue-400 hover:text-blue-300">
              Forgot Password?
            </button>

          </div>


          {/* Login Button */}
          <button
            className="w-full rounded-lg bg-blue-600 py-3 font-semibold hover:bg-blue-700"
          >
            Login
          </button>


          {/* Signup */}
          <p className="mt-6 text-center text-sm text-slate-400">

            Don't have an account?{" "}

            <Link
              to="/signup"
              className="font-medium text-blue-400 hover:text-blue-300"
            >
              Sign Up
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

export default Login