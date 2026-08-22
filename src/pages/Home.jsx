import { Link } from "react-router-dom"
import { useEffect, useRef, useState } from "react";

/**
 * Reveals children with a fade+rise the first time they scroll into view.
 * Respects prefers-reduced-motion by skipping straight to the visible state.
 */
function Reveal({ children, delay = 0, className = "" }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReduced) {
      setVisible(true);
      return;
    }

    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.unobserve(node);
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(24px)",
        transition: `opacity 0.7s cubic-bezier(0.16,1,0.3,1) ${delay}ms, transform 0.7s cubic-bezier(0.16,1,0.3,1) ${delay}ms`,
        willChange: "opacity, transform",
      }}
    >
      {children}
    </div>
  );
}

function Home() {
  const [heroLoaded, setHeroLoaded] = useState(false);

  useEffect(() => {
    // Trigger hero entrance on mount (page-load sequence)
    const t = setTimeout(() => setHeroLoaded(true), 50);
    return () => clearTimeout(t);
  }, []);

  const features = [
    {
      icon: "📊",
      title: "Academic Tracking",
      desc: "Track academic performance, attendance, assignments and study activities in one place.",
    },
    {
      icon: "🤖",
      title: "AI Prediction",
      desc: "Analyze your academic and skill information to generate data-driven predictions and insights.",
    },
    {
      icon: "🎯",
      title: "Career Guidance",
      desc: "Understand your skill gaps and receive guidance based on your interests and career goals.",
    },
    {
      icon: "🧠",
      title: "Skill Gap Analysis",
      desc: "Identify areas that require improvement and focus on the skills needed for your goals.",
    },
    {
      icon: "💡",
      title: "Personalized Recommendations",
      desc: "Get recommendations based on your individual profile and academic progress.",
    },
    {
      icon: "🚀",
      title: "Growth Roadmap",
      desc: "Follow a personalized roadmap for academic, skill and career development.",
    },
  ];

  const processSteps = ["Observe", "Learn", "Predict", "Recommend", "Improve"];

  return (
    <div className="min-h-screen bg-slate-950 text-white overflow-x-hidden">
      <style>{`
        @keyframes fadeDown {
          from { opacity: 0; transform: translateY(-16px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes floatUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes softPulseGlow {
          0%, 100% { box-shadow: 0 0 0 0 rgba(59,130,246,0.35); }
          50% { box-shadow: 0 0 0 10px rgba(59,130,246,0); }
        }
        @keyframes shimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
        @keyframes arrowFlow {
          0%, 100% { transform: translateX(0); opacity: 0.6; }
          50% { transform: translateX(4px); opacity: 1; }
        }
        .btn-primary {
          transition: transform 0.25s cubic-bezier(0.16,1,0.3,1), box-shadow 0.25s ease, background-color 0.25s ease;
        }
        .btn-primary:hover {
          transform: translateY(-2px) scale(1.02);
          box-shadow: 0 10px 30px -8px rgba(37,99,235,0.6);
        }
        .btn-primary:active {
          transform: translateY(0) scale(0.98);
        }
        .btn-ghost {
          transition: background-color 0.25s ease, transform 0.25s ease;
        }
        .btn-ghost:hover {
          transform: translateY(-1px);
        }
        .feature-card {
          transition: transform 0.35s cubic-bezier(0.16,1,0.3,1), border-color 0.35s ease, box-shadow 0.35s ease, background-color 0.35s ease;
        }
        .feature-card:hover {
          transform: translateY(-6px);
          border-color: rgba(96,165,250,0.5);
          box-shadow: 0 20px 40px -20px rgba(37,99,235,0.45);
          background-color: rgb(30 41 59);
        }
        .feature-icon {
          transition: transform 0.35s cubic-bezier(0.34,1.56,0.64,1);
          display: inline-block;
        }
        .feature-card:hover .feature-icon {
          transform: scale(1.2) rotate(-6deg);
        }
        .process-node {
          transition: transform 0.3s cubic-bezier(0.16,1,0.3,1), border-color 0.3s ease, background-color 0.3s ease;
        }
        .process-node:hover {
          transform: translateY(-4px) scale(1.05);
          border-color: rgb(96 165 250);
        }
        .process-arrow {
          animation: arrowFlow 1.6s ease-in-out infinite;
        }
        .cta-box {
          transition: transform 0.4s cubic-bezier(0.16,1,0.3,1), box-shadow 0.4s ease;
        }
        .cta-box:hover {
          transform: translateY(-4px);
          box-shadow: 0 30px 60px -25px rgba(37,99,235,0.55);
        }
        .cta-button {
          transition: transform 0.25s cubic-bezier(0.16,1,0.3,1), box-shadow 0.25s ease;
        }
        .cta-button:hover {
          transform: translateY(-2px) scale(1.03);
          box-shadow: 0 12px 24px -8px rgba(255,255,255,0.3);
        }
        .brand-text {
          background: linear-gradient(90deg, #60a5fa 0%, #93c5fd 50%, #60a5fa 100%);
          background-size: 200% auto;
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
          animation: shimmer 6s linear infinite;
        }
        @media (prefers-reduced-motion: reduce) {
          * {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
          }
        }
      `}</style>

      {/* Navbar */}
      <nav
        className="flex items-center justify-between px-8 py-5"
        style={{
          opacity: heroLoaded ? 1 : 0,
          transform: heroLoaded ? "translateY(0)" : "translateY(-16px)",
          transition: "opacity 0.6s ease, transform 0.6s ease",
        }}
      >
        <h1 className="text-2xl font-bold brand-text">EduTwin AI</h1>

        <div className="flex items-center gap-4">
          <Link
  to="/login"
  className="btn-ghost rounded-lg px-5 py-2 text-slate-300 hover:bg-slate-800">
  Login
</Link>

           <Link
             to="/signup"
  className="btn-primary rounded-lg bg-blue-600 px-5 py-2 font-medium hover:bg-blue-700">
  Get Started
</Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="flex min-h-[75vh] flex-col items-center justify-center px-6 text-center">
        <p
          className="mb-5 text-blue-400"
          style={{
            opacity: heroLoaded ? 1 : 0,
            transform: heroLoaded ? "translateY(0)" : "translateY(16px)",
            transition: "opacity 0.6s ease 0.1s, transform 0.6s ease 0.1s",
          }}
        >
          AI-Powered Student Digital Twin
        </p>

        <h2
          className="max-w-4xl text-5xl font-bold leading-tight md:text-6xl"
          style={{
            opacity: heroLoaded ? 1 : 0,
            transform: heroLoaded ? "translateY(0)" : "translateY(24px)",
            transition: "opacity 0.7s ease 0.2s, transform 0.7s ease 0.2s",
          }}
        >
          Your Academic Journey,
          <span className="text-blue-400"> Understood by AI</span>
        </h2>

        <p
          className="mt-6 max-w-2xl text-lg leading-8 text-slate-400"
          style={{
            opacity: heroLoaded ? 1 : 0,
            transform: heroLoaded ? "translateY(0)" : "translateY(20px)",
            transition: "opacity 0.7s ease 0.35s, transform 0.7s ease 0.35s",
          }}
        >
          EduTwin AI creates a digital representation of your academic,
          skill and career journey. Track your progress, identify skill
          gaps and receive personalized guidance.
        </p>

        <div
          className="mt-8 flex gap-4"
          style={{
            opacity: heroLoaded ? 1 : 0,
            transform: heroLoaded ? "translateY(0)" : "translateY(20px)",
            transition: "opacity 0.7s ease 0.5s, transform 0.7s ease 0.5s",
          }}
        >
          <Link
  to="/signup"
  className="rounded-lg bg-blue-600 px-6 py-3 font-semibold hover:bg-blue-700"
>
  Create Your Twin →
</Link>

          <Link
  to="/about"
  className="rounded-lg border border-slate-700 px-6 py-3 font-semibold hover:bg-slate-800"
>
  Learn More
</Link>
        </div>
      </section>

      {/* Features */}
      <section className="px-8 py-20">
        <Reveal>
          <h2 className="mb-12 text-center text-3xl font-bold">
            What EduTwin AI Does
          </h2>
        </Reveal>

        <div className="mx-auto grid max-w-6xl gap-6 md:grid-cols-3">
          {features.map((f, i) => (
            <Reveal key={f.title} delay={i * 90}>
              <div className="feature-card h-full rounded-2xl border border-slate-800 bg-slate-900 p-7">
                <div className="feature-icon mb-5 text-4xl">{f.icon}</div>
                <h3 className="mb-3 text-xl font-semibold">{f.title}</h3>
                <p className="leading-7 text-slate-400">{f.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Digital Twin Process */}
      <section className="px-8 py-20">
        <Reveal>
          <h2 className="mb-4 text-center text-3xl font-bold">
            How EduTwin AI Works
          </h2>
        </Reveal>

        <Reveal delay={100}>
          <p className="mx-auto mb-12 max-w-2xl text-center text-slate-400">
            Your digital twin continuously transforms your information
            into useful insights and recommendations.
          </p>
        </Reveal>

        <Reveal delay={200}>
          <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-center gap-4">
            {processSteps.map((step, i) => {
              const isLast = i === processSteps.length - 1;
              return (
                <div key={step} className="flex items-center gap-4">
                  <div
                    className={
                      "process-node rounded-xl px-7 py-4 " +
                      (isLast
                        ? "bg-blue-600 font-semibold"
                        : "border border-slate-700 bg-slate-900")
                    }
                  >
                    {step}
                  </div>
                  {!isLast && (
                    <span
                      className="process-arrow text-2xl text-blue-400"
                      style={{ animationDelay: `${i * 0.2}s` }}
                    >
                      →
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        </Reveal>
      </section>

      {/* CTA */}
      <section className="px-8 py-20">
        <Reveal>
          <div className="cta-box mx-auto max-w-4xl rounded-3xl bg-blue-600 px-8 py-14 text-center">
            <h2 className="text-3xl font-bold">
              Start Building Your Digital Twin
            </h2>

            <p className="mx-auto mt-4 max-w-xl text-blue-100">
              Track your journey, understand your strengths, identify
              your gaps and plan your future.
            </p>

            <button className="cta-button mt-7 rounded-lg bg-white px-7 py-3 font-semibold text-blue-600 hover:bg-slate-100">
              Get Started
            </button>
          </div>
        </Reveal>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-800 px-8 py-8 text-center text-slate-500">
        © 2026 EduTwin AI — Intelligent Student Digital Twin
      </footer>
    </div>
  );
}

export default Home;