import React, { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../auth/hooks/useAuth.js";
import { useInterview } from "../hooks/useInterview.js";

const ArrowIcon = ({ diagonal = false }) => (
    <svg
        aria-hidden="true"
        width="17"
        height="17"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
    >
        {diagonal ? (
            <>
                <path d="M7 17 17 7M7 7h10v10" />
            </>
        ) : (
            <>
                <path d="M5 12h14" />
                <path d="m13 6 6 6-6 6" />
            </>
        )}
    </svg>
);

const CURRENT_YEAR = new Date().getFullYear();

const formatReportDate = (value) => {
    const [year, month, day] = (value || "").slice(0, 10).split("-");

    const monthName = [
        "Jan", "Feb", "Mar", "Apr", "May", "Jun",
        "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
    ][Number(month) - 1];

    return monthName
        ? `${monthName} ${Number(day)}, ${year}`
        : "Recently";
};

const Home = () => {
    const { loading, generateReport, reports } = useInterview();

    const { handleLogout, user } = useAuth();

    const [jobDescription, setJobDescription] = useState("");
    const [selfDescription, setSelfDescription] = useState("");
    const [resumeFile, setResumeFile] = useState(null);
    const [generationError, setGenerationError] = useState("");
    const [loggingOut, setLoggingOut] = useState(false);

    const resumeInputRef = useRef(null);

    const navigate = useNavigate();

    // Generate Interview Report
    const handleGenerateReport = async () => {
        setGenerationError("");

        try {
            const data = await generateReport({
                jobDescription,
                selfDescription,
                resumeFile
            });

            if (!data?._id) {
                throw new Error(
                    "The server did not return a saved interview report."
                );
            }

            navigate(`/interview/${data._id}`);
        } catch (error) {
            console.error("Error generating interview report:", error);

            setGenerationError(
                error.response?.data?.message ||
                error.message ||
                "Could not generate the interview plan. Please try again."
            );
        }
    };

    // Sign Out
    const handleSignOut = async () => {
        setLoggingOut(true);

        try {
            await handleLogout();

            navigate("/login");
        } catch (error) {
            console.error("Unable to sign out:", error);

            setGenerationError(
                "We couldn't sign you out. Please try again."
            );

            setLoggingOut(false);
        }
    };

    // Loading Screen
    if (loading) {
        return (
            <main className="flex min-h-screen items-center justify-center bg-[#090B14] text-center text-white">
                <div>
                    <span className="mx-auto mb-5 block h-10 w-10 animate-spin rounded-full border-2 border-indigo-400/20 border-t-indigo-400" />
                    <h1 className="text-lg font-semibold">
                        Loading your workspace
                    </h1>
                    <p className="mt-2 text-sm text-slate-500">
                        Getting everything ready for you.
                    </p>
                </div>
            </main>
        );
    }

    return (
        <main className="relative min-h-screen bg-[#090B14] text-white">
            {/* Background */}
            <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_10%_10%,rgba(79,70,229,0.13),transparent_35%),radial-gradient(circle_at_90%_90%,rgba(124,58,237,0.09),transparent_35%)]" />
            <div className="relative mx-auto flex min-h-screen w-full max-w-[1500px] flex-col px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
                {/* NAVBAR */}
                <nav className="flex shrink-0 items-center justify-between border-b border-white/10 pb-5">
                    <Link to="/" className="flex items-center gap-3">
                        <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 text-lg font-bold shadow-lg shadow-indigo-950/40">
                            f.
                        </span>
                        <span className="text-xl font-bold tracking-tight">
                            forme<span className="text-indigo-400">.</span>
                        </span>
                    </Link>
                    <div className="flex items-center gap-4">
                        <div className="hidden text-right sm:block">
                            <p className="text-xs font-semibold text-white">
                                Welcome back{user?.username ? `, ${user.username}` : ""}
                            </p>
                            <p className="mt-1 text-[10px] text-slate-500">
                                Ready for your next opportunity?
                            </p>
                        </div>
                        <div className="flex h-9 w-9 items-center justify-center rounded-full border border-indigo-400/20 bg-indigo-500/10 text-sm font-bold text-indigo-300">
                            {user?.username?.charAt(0)?.toUpperCase() || "U"}
                        </div>
                        <button
                            type="button"
                            onClick={handleSignOut}
                            disabled={loggingOut}
                            className="rounded-lg border border-white/10 bg-white/[0.04] px-4 py-2 text-xs font-semibold text-slate-300 transition hover:border-rose-400/30 hover:bg-rose-400/10 hover:text-rose-300 disabled:opacity-50"
                        >
                            {loggingOut ? "Signing out..." : "Sign out"}
                        </button>
                    </div>
                </nav>
                {/* MAIN DASHBOARD */}
                <section className="grid gap-6 py-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-stretch lg:gap-8">
                    {/* LEFT HERO */}
                    <div className="relative flex flex-col justify-center overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-[#191B32] via-[#151A2B] to-[#11141F] p-7 sm:p-10 lg:p-12">
                        <div className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full border border-indigo-400/10" />
                        <div className="pointer-events-none absolute -right-10 -top-10 h-52 w-52 rounded-full border border-indigo-400/10" />
                        <div className="relative z-10">
                            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-indigo-400/20 bg-indigo-400/10 px-3 py-2">
                                <span className="h-2 w-2 rounded-full bg-indigo-400" />
                                <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-300">
                                    Your preparation workspace
                                </span>
                            </div>
                            <h1 className="text-4xl font-bold leading-[1.15] tracking-tight sm:text-5xl">
                                Show up ready
                                <br />
                                for <span className="text-indigo-400">what's next.</span>
                            </h1>
                            <p className="mt-5 max-w-md text-sm leading-7 text-slate-400">
                                Thoughtful preparation for the role you want.
                                Share the opportunity and a little about yourself.
                                We'll help you prepare for your next move.
                            </p>
                            <div className="mt-8 space-y-4">
                                {[
                                    "Role-specific interview questions",
                                    "Personalized preparation roadmap",
                                    "Resume tailored to your target role"
                                ].map((item, index) => (
                                    <div key={index} className="flex items-center gap-3 text-sm text-slate-300">
                                        <span className="flex h-6 w-6 items-center justify-center rounded-full bg-indigo-500/15 text-indigo-300">
                                            ✓
                                        </span>
                                        {item}
                                    </div>
                                ))}
                            </div>
                            <div className="mt-9 border-t border-white/10 pt-5">
                                <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-slate-500">
                                    A better way to prepare
                                </p>
                                <p className="mt-2 text-sm text-slate-400">
                                    Prepare with clarity. Practice with confidence.
                                </p>
                            </div>
                        </div>
                    </div>
                    {/* RIGHT FORM */}
                    <div className="flex flex-col rounded-2xl border border-white/10 bg-[#131722] p-6 shadow-2xl shadow-black/20 sm:p-8 lg:p-10">
                        <div className="mb-7">
                            <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.2em] text-indigo-400">
                                01 — YOUR BRIEF
                            </p>
                            <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
                                Let's get started<span className="text-indigo-400">.</span>
                            </h2>
                            <p className="mt-2 text-xs text-slate-400">
                                Tell us about the role you're preparing for.
                            </p>
                        </div>
                        <div className="space-y-6">
                            {/* JOB DESCRIPTION */}
                            <div>
                                <div className="mb-2 flex items-center justify-between">
                                    <label htmlFor="jobDescription" className="text-xs font-semibold text-slate-300">
                                        Job description
                                    </label>
                                    <span className="text-[10px] font-medium text-indigo-400">
                                        Required
                                    </span>
                                </div>
                                <textarea
                                    id="jobDescription"
                                    value={jobDescription}
                                    onChange={(event) => setJobDescription(event.target.value)}
                                    placeholder={"Paste the job description here...\n\nInclude responsibilities, qualifications and requirements."}
                                    maxLength={5000}
                                    required
                                    className="h-36 w-full resize-y rounded-xl border border-white/10 bg-[#090B14] p-4 text-sm leading-6 text-white outline-none transition placeholder:text-slate-600 hover:border-white/20 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/10 sm:h-40"
                                />
                                <p className="mt-1 text-right text-[10px] text-slate-600">
                                    {jobDescription.length} / 5,000
                                </p>
                            </div>
                            {/* RESUME */}
                            <div>
                                <div className="mb-2 flex items-center justify-between">
                                    <label className="text-xs font-semibold text-slate-300">
                                        Upload resume
                                    </label>
                                    <span className="text-[10px] text-slate-500">
                                        Optional
                                    </span>
                                </div>
                                <input
                                    ref={resumeInputRef}
                                    onChange={(event) => setResumeFile(event.target.files?.[0] || null)}
                                    hidden
                                    type="file"
                                    id="resume"
                                    name="resume"
                                    accept=".pdf,application/pdf"
                                />
                                <button
                                    type="button"
                                    onClick={() => resumeInputRef.current?.click()}
                                    className={`group flex min-h-[65px] w-full items-center gap-3 rounded-xl border border-dashed px-4 py-3 text-left transition ${
                                        resumeFile
                                            ? "border-indigo-400/40 bg-indigo-500/[0.07]"
                                            : "border-white/15 bg-[#090B14] hover:border-indigo-400/40"
                                    }`}
                                >
                                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-indigo-500/10 text-indigo-300">
                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
                                            <path d="M12 16V4m0 0L8 8m4-4 4 4" />
                                            <path d="M20 16.5v2A1.5 1.5 0 0 1 18.5 20h-13A1.5 1.5 0 0 1 4 18.5v-2" />
                                        </svg>
                                    </span>
                                    <span className="min-w-0 flex-1">
                                        <strong className="block truncate text-xs font-semibold text-white">
                                            {resumeFile?.name || "Add your resume"}
                                        </strong>
                                        <small className="mt-1 block text-[10px] text-slate-500">
                                            {resumeFile ? "Click to change file" : "PDF format · Maximum 3 MB"}
                                        </small>
                                    </span>
                                    <span className="rounded-lg border border-white/10 px-3 py-2 text-[10px] font-semibold text-indigo-300 group-hover:border-indigo-400/30">
                                        {resumeFile ? "Change" : "Browse"}
                                    </span>
                                </button>
                            </div>
                            {/* SELF DESCRIPTION */}
                            <div>
                                <div className="mb-2 flex items-center justify-between">
                                    <label htmlFor="selfDescription" className="text-xs font-semibold text-slate-300">
                                        About yourself
                                    </label>
                                    <span className="text-[10px] text-slate-500">
                                        Optional
                                    </span>
                                </div>
                                <textarea
                                    id="selfDescription"
                                    value={selfDescription}
                                    onChange={(event) => setSelfDescription(event.target.value)}
                                    placeholder="Your experience, strengths, skills or career goals..."
                                    rows={3}
                                    className="h-28 w-full resize-y rounded-xl border border-white/10 bg-[#090B14] p-4 text-sm leading-6 text-white outline-none transition placeholder:text-slate-600 hover:border-white/20 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/10"
                                />
                            </div>
                            {/* PRIVACY */}
                            <div className="flex items-start gap-2 text-[10px] leading-5 text-slate-500">
                                <span className="text-indigo-400">🔒</span>
                                Your information stays private and is only used to build your plan.
                            </div>
                            {/* ERROR */}
                            {generationError && (
                                <p role="alert" className="rounded-lg border border-rose-400/20 bg-rose-400/10 px-3 py-2 text-xs leading-5 text-rose-300">
                                    {generationError}
                                </p>
                            )}

                            {/* BUTTON */}
                            <div className="flex flex-col gap-3 border-t border-white/10 pt-4 sm:flex-row sm:items-center sm:justify-between">
                                <span className="flex items-center gap-2 text-[10px] text-slate-500">
                                    <span className="h-2 w-2 rounded-full bg-emerald-400" />
                                    Usually ready in under a minute
                                </span>
                                <button
                                    className="group flex h-12 w-full items-center justify-center gap-3 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 px-5 text-xs font-bold text-white shadow-lg shadow-indigo-950/30 transition hover:-translate-y-0.5 hover:brightness-110 active:translate-y-0 disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto"
                                    onClick={handleGenerateReport}
                                    disabled={
                                        loading ||
                                        !jobDescription.trim() ||
                                        (!resumeFile && !selfDescription.trim())
                                    }
                                >
                                    {loading ? "Preparing your plan..." : "Build preparation plan"}

                                    {!loading && <ArrowIcon />}
                                </button>
                            </div>
                        </div>
                    </div>
                </section>
                {/* RECENT REPORTS */}
                {reports.length > 0 && (
                    <section className="mt-4 border-t border-white/10 py-6">
                        <div className="mb-3 flex items-center justify-between">
                            <div>
                                <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-indigo-400">
                                    Your workspace
                                </p>
                                <h2 className="mt-1 text-sm font-semibold text-white">
                                    Recent interview plans
                                </h2>
                            </div>
                            <span className="rounded-lg border border-white/10 bg-white/[0.03] px-3 py-1.5 text-[10px] text-slate-400">
                                {reports.length} {reports.length === 1 ? "plan" : "plans"}
                            </span>
                        </div>
                        <div className="flex gap-3 overflow-x-auto pb-1">
                            {reports.map((report) => (
                                <Link
                                    key={report._id}
                                    to={`/interview/${report._id}`}
                                    className="group relative min-w-[220px] flex-1 rounded-xl border border-white/10 bg-[#151925] p-3 transition hover:border-indigo-400/30 hover:bg-[#191E2C]"
                                >
                                    <div className="flex items-center justify-between">
                                        <span className="text-[10px] text-slate-500">
                                            {formatReportDate(report.createdAt)}
                                        </span>
                                        <span className="text-indigo-400 transition group-hover:translate-x-1">
                                            <ArrowIcon diagonal />
                                        </span>
                                    </div>
                                    <strong className="mt-2 block truncate text-xs font-semibold text-white">
                                        {report.title || "Untitled position"}
                                    </strong>
                                    <div className="mt-2 flex items-center justify-between text-[10px] text-slate-500">
                                        Role alignment

                                        <span className="font-bold text-emerald-400">
                                            {report.matchScore}%
                                        </span>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </section>
                )}

                {/* FOOTER */}
                <footer className="mt-8 flex flex-wrap items-center justify-between gap-3 border-t border-white/[0.07] py-6 text-[10px] text-slate-600">
                    <Link to="/" className="font-bold text-slate-400">
                        forme<span className="text-indigo-400">.</span>
                    </Link>
                    <span className="hidden sm:block">
                        Make your next move a considered one.
                    </span>
                    <span>© {CURRENT_YEAR} Forme</span>
                </footer>
            </div>
        </main>
    );
};

export default Home;
