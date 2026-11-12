import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useInterview } from "../hooks/useInterview";

// Navigation Items
const NAV_ITEMS = [
    {
        id: "technical",
        label: "Technical",
        icon: (
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
            >
                <polyline points="16 18 22 12 16 6" />
                <polyline points="8 6 2 12 8 18" />
            </svg>
        )
    },
    {
        id: "behavioral",
        label: "Behavioral",
        icon: (
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
            >
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
            </svg>
        )
    },
    {
        id: "roadmap",
        label: "Road map",
        icon: (
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
            >
                <polygon points="3 11 22 2 13 21 11 13 3 11" />
            </svg>
        )
    }
];

// Question Card Component
const QuestionCard = ({ item, index }) => {
    const [open, setOpen] = useState(false);

    return (
        <article className="group overflow-hidden rounded-xl border border-[#303443] bg-[#171B27] transition-all duration-200 hover:border-indigo-500/40 hover:bg-[#1A1F2D]">

            {/* Question Header */}
            <button
                type="button"
                className="flex w-full items-start gap-4 p-5 text-left sm:p-6"
                onClick={() => setOpen(value => !value)}
                aria-expanded={open}
            >
                <span className="mt-0.5 flex h-8 min-w-8 items-center justify-center rounded-lg border border-indigo-400/20 bg-indigo-500/10 px-2 text-[10px] font-bold text-indigo-300">
                    Q{index + 1}
                </span>

                <span className="flex-1 text-sm font-medium leading-7 text-slate-200 sm:text-base">
                    {item.question}
                </span>

                <svg
                    className={`mt-1 shrink-0 text-slate-500 transition-transform duration-300 ${
                        open ? "rotate-180 text-indigo-400" : ""
                    }`}
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                >
                    <polyline points="6 9 12 15 18 9" />
                </svg>
            </button>

            {/* Expanded Answer */}
            {open && (
                <div className="grid gap-6 border-t border-[#303443] bg-[#121621] px-5 py-6 sm:grid-cols-2 sm:px-6">

                    {/* Intention */}
                    <div className="space-y-3">
                        <div className="flex items-center gap-2">
                            <span className="h-2 w-2 rounded-full bg-violet-400" />

                            <span className="text-[10px] font-bold uppercase tracking-wider text-violet-300">
                                What they want to know
                            </span>
                        </div>

                        <p className="m-0 text-sm leading-7 text-slate-400">
                            {item.intention}
                        </p>
                    </div>

                    {/* Answer Framework */}
                    <div className="space-y-3">
                        <div className="flex items-center gap-2">
                            <span className="h-2 w-2 rounded-full bg-emerald-400" />

                            <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-300">
                                Answer framework
                            </span>
                        </div>

                        <p className="m-0 text-sm leading-7 text-slate-400">
                            {item.answer}
                        </p>
                    </div>

                </div>
            )}

        </article>
    );
};

// Roadmap Day Component
const RoadMapDay = ({ day }) => (
    <article className="relative flex gap-4 pb-8 last:pb-0">

        {/* Timeline */}
        <div className="relative flex w-9 shrink-0 justify-center">
            <span className="absolute bottom-0 top-8 w-px bg-[#34394B]" />

            <span className="relative z-10 mt-1 flex h-8 w-8 items-center justify-center rounded-full border border-indigo-400/30 bg-indigo-500/10 text-xs font-bold text-indigo-300">
                {day.day}
            </span>
        </div>

        {/* Day Content */}
        <div className="min-w-0 flex-1 pt-1">

            <div className="flex flex-wrap items-center gap-3">
                <span className="rounded-md bg-indigo-500/10 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-indigo-300">
                    Day {day.day}
                </span>

                <h3 className="m-0 text-sm font-semibold text-white">
                    {day.focus}
                </h3>
            </div>

            {/* Tasks */}
            <ul className="mt-4 flex list-none flex-col gap-3 p-0">
                {day.tasks.map((task, index) => (
                    <li
                        key={index}
                        className="flex items-start gap-3 text-sm leading-7 text-slate-400"
                    >
                        <span className="mt-3 h-1.5 w-1.5 shrink-0 rounded-full bg-indigo-400" />

                        {task}
                    </li>
                ))}
            </ul>

        </div>
    </article>
);

// Main Interview Component
const Interview = () => {
    // State Variables
    const [activeNav, setActiveNav] = useState("technical");
    const [downloading, setDownloading] = useState(false);
    const [downloadError, setDownloadError] = useState("");

    // Custom Hook
    const { report, loading, getResumePdf } = useInterview();

    // URL Parameters
    const { interviewId } = useParams();

    // Download Resume
    const handleResumeDownload = async () => {
        setDownloading(true);
        setDownloadError("");

        try {
            await getResumePdf(interviewId);
        } catch (error) {
            setDownloadError(
                error.message ||
                "Could not prepare your resume. Please try again."
            );
        } finally {
            setDownloading(false);
        }
    };

    // Loading Screen
    if (loading || !report) {
        return (
            <main className="flex min-h-screen items-center justify-center bg-[#090B14] px-6 text-center text-white">
                <div>
                    <span className="mx-auto mb-5 block h-10 w-10 animate-spin rounded-full border-2 border-indigo-400/20 border-t-indigo-400" />

                    <h1 className="text-lg font-semibold">
                        Loading your interview plan...
                    </h1>

                    <p className="mt-2 text-sm text-slate-500">
                        Preparing your personalized experience
                    </p>
                </div>
            </main>
        );
    }

    // Score Colors
    const scoreColor =
        report.matchScore >= 80
            ? "border-emerald-400 text-emerald-400"
            : report.matchScore >= 60
                ? "border-amber-400 text-amber-400"
                : "border-rose-400 text-rose-400";

    // Skill Colors
    const skillColors = {
        high: "border-rose-400/20 bg-rose-400/10 text-rose-300",
        medium: "border-amber-400/20 bg-amber-400/10 text-amber-300",
        low: "border-emerald-400/20 bg-emerald-400/10 text-emerald-300"
    };

    return (
        <main className="relative min-h-screen bg-[#090B14] p-4 text-white sm:p-6 lg:p-8">

            {/* Background */}
            <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_10%_10%,rgba(79,70,229,0.13),transparent_35%),radial-gradient(circle_at_90%_90%,rgba(124,58,237,0.08),transparent_35%)]" />

            {/* Dashboard Container */}
            <div className="relative mx-auto flex w-full max-w-[1500px] flex-col overflow-hidden rounded-2xl border border-[#292E3C] bg-[#11141F] shadow-2xl shadow-black/40 xl:flex-row">

                {/* ================= LEFT SIDEBAR ================= */}
                <aside className="flex shrink-0 flex-col justify-between gap-8 border-b border-[#292E3C] bg-[#151925] p-5 sm:p-6 xl:w-[240px] xl:border-b-0 xl:border-r">

                    <div>

                        {/* Logo */}
                        <Link
                            to="/"
                            className="mb-8 flex items-center gap-3 px-2"
                        >
                            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 text-lg font-bold text-white shadow-lg shadow-indigo-950/40">
                                f.
                            </span>

                            <span className="text-xl font-bold tracking-tight">
                                forme<span className="text-indigo-400">.</span>
                            </span>
                        </Link>

                        {/* Navigation */}
                        <div>
                            <p className="mb-3 px-3 text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500">
                                Workspace
                            </p>

                            <p className="mb-4 px-3 text-xs font-semibold text-slate-400">
                                Interview preparation
                            </p>

                            <nav
                                aria-label="Interview plan sections"
                                className="flex gap-2 overflow-x-auto xl:flex-col"
                            >
                                {NAV_ITEMS.map(item => (
                                    <button
                                        key={item.id}
                                        type="button"
                                        aria-current={
                                            activeNav === item.id
                                                ? "page"
                                                : undefined
                                        }
                                        className={`flex shrink-0 items-center gap-3 rounded-xl px-3 py-3 text-left text-sm font-medium transition-all duration-200 ${
                                            activeNav === item.id
                                                ? "border border-indigo-400/20 bg-indigo-500/10 text-indigo-300 shadow-sm shadow-indigo-950/20"
                                                : "border border-transparent text-slate-400 hover:bg-white/[0.04] hover:text-white"
                                        }`}
                                        onClick={() => setActiveNav(item.id)}
                                    >
                                        <span className="flex shrink-0 items-center">
                                            {item.icon}
                                        </span>

                                        {item.label}

                                        {activeNav === item.id && (
                                            <span className="ml-auto hidden h-1.5 w-1.5 rounded-full bg-indigo-400 xl:block" />
                                        )}
                                    </button>
                                ))}
                            </nav>
                        </div>

                    </div>

                    {/* Download Section */}
                    <div className="space-y-3">

                        <button
                            type="button"
                            onClick={handleResumeDownload}
                            disabled={downloading}
                            className="flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 px-4 py-3 text-xs font-semibold text-white shadow-lg shadow-indigo-950/30 transition-all duration-200 hover:bg-indigo-500 hover:shadow-indigo-900/30 disabled:cursor-wait disabled:opacity-60 sm:text-sm"
                        >
                            {downloading ? (
                                <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                            ) : (
                                <svg
                                    width="17"
                                    height="17"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                >
                                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                                    <polyline points="7 10 12 15 17 10" />
                                    <line x1="12" y1="15" x2="12" y2="3" />
                                </svg>
                            )}

                            {downloading
                                ? "Preparing resume..."
                                : "Download resume"
                            }
                        </button>

                        {downloadError && (
                            <p
                                role="alert"
                                className="m-0 text-xs leading-5 text-rose-300"
                            >
                                {downloadError}
                            </p>
                        )}

                    </div>

                </aside>

                {/* ================= CENTER CONTENT ================= */}
                <section className="min-w-0 flex-1 p-5 sm:p-7 lg:p-8">

                    {/* Header */}
                    <header className="mb-8 flex flex-wrap items-center justify-between gap-4 border-b border-[#292E3C] pb-6">

                        <div>
                            <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.2em] text-indigo-400">
                                Personalized interview preparation
                            </p>

                            <h1 className="text-xl font-bold tracking-tight text-white sm:text-2xl">
                                {activeNav === "technical"
                                    ? "Technical questions"
                                    : activeNav === "behavioral"
                                        ? "Behavioral questions"
                                        : "Preparation roadmap"
                                }
                            </h1>

                            <p className="mt-2 text-xs leading-6 text-slate-500">
                                Prepare better. Practice smarter. Perform confidently.
                            </p>
                        </div>

                        {/* Question Count */}
                        <span className="rounded-lg border border-[#34394B] bg-[#191E2B] px-3 py-2 text-xs font-medium text-slate-300">
                            {activeNav === "technical"
                                ? `${report.technicalQuestions.length} questions`
                                : activeNav === "behavioral"
                                    ? `${report.behavioralQuestions.length} questions`
                                    : `${report.preparationPlan.length}-day plan`
                            }
                        </span>

                    </header>

                    {/* Technical Questions */}
                    {activeNav === "technical" && (
                        <div className="flex flex-col gap-4">
                            {report.technicalQuestions.map((question, index) => (
                                <QuestionCard
                                    key={index}
                                    item={question}
                                    index={index}
                                />
                            ))}
                        </div>
                    )}

                    {/* Behavioral Questions */}
                    {activeNav === "behavioral" && (
                        <div className="flex flex-col gap-4">
                            {report.behavioralQuestions.map((question, index) => (
                                <QuestionCard
                                    key={index}
                                    item={question}
                                    index={index}
                                />
                            ))}
                        </div>
                    )}

                    {/* Preparation Roadmap */}
                    {activeNav === "roadmap" && (
                        <div className="flex flex-col">
                            {report.preparationPlan.map(day => (
                                <RoadMapDay
                                    key={day.day}
                                    day={day}
                                />
                            ))}
                        </div>
                    )}

                </section>

                {/* ================= RIGHT SIDEBAR ================= */}
                <aside className="flex shrink-0 flex-col gap-7 border-t border-[#292E3C] bg-[#151925]/80 p-5 sm:p-6 lg:p-7 xl:w-[270px] xl:border-l xl:border-t-0">

                    {/* Role Alignment */}
                    <div>

                        <div className="mb-5 flex items-center justify-between">
                            <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-slate-500">
                                Role alignment
                            </p>

                            <span className="rounded-md bg-indigo-500/10 px-2 py-1 text-[9px] font-bold text-indigo-300">
                                MATCH
                            </span>
                        </div>

                        <div className="flex items-center gap-5 xl:flex-col xl:items-center xl:gap-4">

                            {/* Score Circle */}
                            <div
                                className={`relative flex h-28 w-28 shrink-0 flex-col items-center justify-center rounded-full border-[4px] bg-[#10131D] ${scoreColor}`}
                            >
                                <span className="text-3xl font-bold leading-none text-white">
                                    {report.matchScore}
                                </span>

                                <span className="mt-2 text-[10px] text-slate-500">
                                    OUT OF 100
                                </span>
                            </div>

                            {/* Score Description */}
                            <div className="xl:text-center">
                                <p className="text-sm font-semibold text-white">
                                    Your match score
                                </p>

                                <p className="mt-2 text-xs leading-6 text-slate-400">
                                    Your experience alignment with this role.
                                </p>
                            </div>

                        </div>

                    </div>

                    {/* Divider */}
                    <div className="h-px bg-[#292E3C]" />

                    {/* Skills Section */}
                    <div>

                        <div className="mb-4 flex items-center justify-between">
                            <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-slate-500">
                                Skills to strengthen
                            </p>

                            <span className="text-xs text-slate-500">
                                {report.skillGaps.length}
                            </span>
                        </div>

                        <div className="flex flex-wrap gap-2">
                            {report.skillGaps.map((gap, index) => (
                                <span
                                    key={index}
                                    className={`rounded-lg border px-3 py-2 text-[11px] font-medium ${
                                        skillColors[gap.severity] ||
                                        "border-white/10 bg-white/[0.04] text-slate-300"
                                    }`}
                                >
                                    {gap.skill}
                                </span>
                            ))}
                        </div>

                    </div>

                    {/* Bottom Note */}
                    <div className="rounded-xl border border-indigo-400/15 bg-indigo-500/[0.06] p-4">
                        <p className="text-xs font-semibold text-indigo-300">
                            Keep improving!
                        </p>

                        <p className="mt-2 text-[11px] leading-5 text-slate-400">
                            Consistent practice is the key to better interview performance.
                        </p>
                    </div>

                </aside>

            </div>

            {/* ================= FOOTER ================= */}
            <footer className="relative mx-auto mt-6 flex w-full max-w-[1500px] flex-wrap items-center justify-between gap-3 border-t border-white/[0.07] py-5 text-[10px] text-slate-600">

                <Link to="/" className="font-bold text-slate-400">
                    forme<span className="text-indigo-400">.</span>
                </Link>

                <span className="hidden sm:block">
                    Make your next move a considered one.
                </span>

                <span>
                    © {new Date().getFullYear()} Forme
                </span>

            </footer>

        </main>
    );
};

export default Interview;