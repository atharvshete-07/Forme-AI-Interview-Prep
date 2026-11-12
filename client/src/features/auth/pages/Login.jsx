
import React, { useState } from "react";
import { useAuth } from "../hooks/useAuth.js";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {

  const { loading, handleLogin } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await handleLogin({ email, password });
      navigate("/");
    } catch (err) {
      setError(
        err.response?.data?.message ||
        (err.request
          ? "Cannot connect to the server. Make sure the backend is running and try again."
          : "Unable to log in. Please try again.")
      );
    }
  };

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#090B14] px-4 py-5 text-white">

      {/* Background */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_15%_20%,rgba(79,70,229,0.16),transparent_35%),radial-gradient(circle_at_85%_80%,rgba(124,58,237,0.12),transparent_35%)]" />

      {/* Main Container */}
      <section className="relative z-10 grid w-full max-w-5xl overflow-hidden rounded-2xl border border-white/30 bg-[#11141F] shadow-2xl lg:grid-cols-[0.85fr_1.15fr]">

        {/* Left Panel */}
        <div className="relative hidden flex-col justify-between overflow-hidden bg-gradient-to-br from-indigo-950 via-[#17172D] to-[#11121D] p-10 lg:flex">

          {/* Decorative Circles */}
          <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full border border-indigo-400/10" />
          <div className="absolute -right-10 -top-10 h-52 w-52 rounded-full border border-indigo-400/10" />

          {/* Brand */}
          <Link to="/" className="relative text-3xl font-bold tracking-tight">
            forme<span className="text-indigo-400">.</span>
          </Link>

          {/* Content */}
          <div className="relative">

            <p className="mb-5 text-xs font-bold tracking-[0.2em] text-indigo-400">
              WELCOME BACK
            </p>

            <h2 className="text-4xl font-bold leading-tight tracking-tight">
              Prepare smarter.
              <br />
              Perform
              <br />
              <span className="text-indigo-400">better.</span>
            </h2>

            <p className="mt-5 max-w-xs text-sm leading-7 text-slate-400">
              Your personal space to practice, prepare and build
              confidence for your next interview.
            </p>

            {/* Features */}
            <div className="mt-8 space-y-4">

              {[
                "Practice with confidence",
                "Improve your interview skills",
                "Get ready for new opportunities"
              ].map((item, index) => (
                <div key={index} className="flex items-center gap-3 text-sm text-slate-300">

                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-indigo-500/15 text-indigo-400">
                    ✓
                  </span>

                  {item}

                </div>
              ))}

            </div>
          </div>

          {/* Footer */}
          <p className="relative text-xs text-slate-600">
            © 2026 forme. All rights reserved.
          </p>

        </div>

        {/* Right Panel */}
        <div className="flex items-center justify-center px-6 py-10 sm:px-10 lg:px-12">

          <div className="w-full max-w-md">

            {/* Mobile Brand */}
            <Link
              to="/"
              className="mb-8 flex justify-center text-2xl font-bold lg:hidden"
            >
              forme<span className="text-indigo-400">.</span>
            </Link>

            {/* Heading */}
            <div className="mb-8">

              <p className="mb-2 text-[11px] font-bold tracking-[0.2em] text-indigo-400">
                WELCOME BACK
              </p>

              <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
                Sign in
              </h1>

              <p className="mt-2 text-sm text-slate-400">
                Sign in to continue building your interview edge.
              </p>

            </div>

            {/* Login Form */}
            <form onSubmit={handleSubmit} className="space-y-5">

              {/* Error */}
              {error && (
                <p
                  className="rounded-lg border border-rose-400/20 bg-rose-400/10 px-3 py-2 text-xs text-rose-300"
                  role="alert"
                >
                  {error}
                </p>
              )}

              {/* Email */}
              <div>

                <label
                  htmlFor="email"
                  className="mb-1.5 block text-xs font-semibold text-slate-300"
                >
                  Email address
                </label>

                <input
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                  id="email"
                  name="email"
                  value={email}
                  placeholder="you@example.com"
                  required
                  autoComplete="email"
                  className="h-12 w-full rounded-lg border border-white/10 bg-[#090B14] px-4 text-sm text-white outline-none transition placeholder:text-slate-600 hover:border-white/20 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/10"
                />

              </div>

              {/* Password */}
              <div>

                <div className="mb-1.5 flex items-center justify-between">

                  <label
                    htmlFor="password"
                    className="text-xs font-semibold text-slate-300"
                  >
                    Password
                  </label>

                  <Link
                    to="/forgot-password"
                    className="text-xs font-semibold text-indigo-400 transition hover:text-indigo-300"
                  >
                    Forgot password?
                  </Link>

                </div>

                <input
                  onChange={(e) => setPassword(e.target.value)}
                  type="password"
                  id="password"
                  name="password"
                  value={password}
                  placeholder="Enter your password"
                  required
                  autoComplete="current-password"
                  className="h-12 w-full rounded-lg border border-white/10 bg-[#090B14] px-4 text-sm text-white outline-none transition placeholder:text-slate-600 hover:border-white/20 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/10"
                />

              </div>

              {/* Remember Me */}
              <label className="flex cursor-pointer items-center gap-2.5 text-xs text-slate-400">

                <input
                  type="checkbox"
                  className="h-4 w-4 cursor-pointer accent-indigo-500"
                />

                Remember me

              </label>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="group flex h-12 w-full items-center justify-center gap-3 rounded-lg bg-gradient-to-r from-indigo-600 to-violet-600 text-sm font-bold text-white shadow-lg shadow-indigo-950/30 transition duration-300 hover:-translate-y-0.5 hover:brightness-110 active:translate-y-0 disabled:cursor-not-allowed disabled:opacity-60"
              >

                <span>
                  {loading ? "Logging in..." : "Sign in"}
                </span>

                <span className="text-lg transition-transform group-hover:translate-x-1">
                  →
                </span>

              </button>

            </form>

            {/* Footer */}
            <div className="mt-7 border-t border-white/10 pt-5">

              <p className="text-center text-sm text-slate-400">
                Don't have an account?

                <Link
                  to="/register"
                  className="ml-1.5 font-bold text-indigo-400 transition hover:text-indigo-300"
                >
                  Create account
                </Link>
              </p>

            </div>

          </div>
        </div>

      </section>
    </main>
  );
};

export default Login;
