import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { api } from "../lib/api"

function Login() {
  const navigate = useNavigate()

  const [form, setForm] = useState({
    email: "",
    password: "",
  })

  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const handleChange = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value })
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setError("")

    try {
      setLoading(true)

      const result = await api("/api/auth/login", {
        method: "POST",
        body: JSON.stringify(form),
      })

      localStorage.setItem("accessToken", result.access_token)
      navigate("/dashboard")
    } catch (requestError) {
      setError(requestError.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center px-6">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-blue-400">EduTwin AI</h1>
          <p className="mt-2 text-slate-400">
            Your Intelligent Student Digital Twin
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="rounded-2xl border border-slate-800 bg-slate-900 p-8 shadow-xl"
        >
          <h2 className="text-2xl font-bold text-center">Welcome Back</h2>

          <p className="mt-2 mb-8 text-center text-slate-400">
            Login to continue to your digital twin
          </p>

          {error && (
            <p className="mb-5 rounded-lg bg-red-500/10 px-4 py-3 text-sm text-red-400">
              {error}
            </p>
          )}

          <div className="mb-5">
            <label className="mb-2 block text-sm font-medium">Email</label>
            <input
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Enter your email"
              className="w-full rounded-lg border border-slate-700 bg-slate-800 px-4 py-3 outline-none focus:border-blue-500"
              required
            />
          </div>

          <div className="mb-6">
            <label className="mb-2 block text-sm font-medium">Password</label>
            <input
              name="password"
              type="password"
              value={form.password}
              onChange={handleChange}
              placeholder="Enter your password"
              className="w-full rounded-lg border border-slate-700 bg-slate-800 px-4 py-3 outline-none focus:border-blue-500"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-blue-600 py-3 font-semibold hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? "Logging in..." : "Login"}
          </button>

          <p className="mt-6 text-center text-sm text-slate-400">
            Don't have an account?{" "}
            <Link className="font-medium text-blue-400 hover:text-blue-300" to="/signup">
              Sign Up
            </Link>
          </p>
        </form>

        <div className="mt-6 text-center">
          <Link className="text-sm text-slate-500 hover:text-slate-300" to="/">
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Login