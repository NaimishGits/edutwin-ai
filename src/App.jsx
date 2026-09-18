import { BrowserRouter, Routes, Route } from "react-router-dom"

import Home from "./pages/Home"
import Login from "./pages/Login"
import Signup from "./pages/Signup"
import ProfileSetup from "./pages/ProfileSetup"
import Dashboard from "./pages/Dashboard"
import Academic from "./pages/Academic"
import Skills from "./pages/Skills"
import Analytics from "./pages/Analytics"
import Career from "./pages/Career"
import Roadmap from "./pages/RoadMap"
import About from "./pages/About"
import ProtectedRoute from "./components/ProtectedRoute"


function App() {
  return (
    <BrowserRouter>

      <Routes>

        <Route
          path="/profile-setup"
          element={
            <ProtectedRoute>
              <ProfileSetup />
            </ProtectedRoute>
          }
        />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/academic"
          element={
            <ProtectedRoute>
              <Academic />
            </ProtectedRoute>
          }
        />

        <Route
          path="/skills"
          element={
            <ProtectedRoute>
              <Skills />
            </ProtectedRoute>
          }
        />

        <Route
          path="/analytics"
          element={
            <ProtectedRoute>
              <Analytics />
            </ProtectedRoute>
          }
        />

        <Route
          path="/career"
          element={
            <ProtectedRoute>
              <Career />
            </ProtectedRoute>
          }
        />

        <Route
          path="/roadmap"
          element={
            <ProtectedRoute>
              <Roadmap />
            </ProtectedRoute>
          }
        />

        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} /> 
        <Route path="/about" element={<About />} />

      </Routes>

      {/* <Routes>

        <Route path="/" element={<Home />} />

        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/profile-setup" element={<ProfileSetup />} />
        <Route path="/dashboard" element={<Dashboard />}/>
        <Route path="/academic" element={<Academic />} />
        <Route path="/skills" element={<Skills />} />
        <Route path="/analytics" element={<Analytics />} />
        <Route path="/career" element={<Career />} />
        <Route path="/roadmap" element={<Roadmap />} />
        <Route path="/about" element={<About />} />
        


      </Routes> */}

    </BrowserRouter>
  )
}

export default App