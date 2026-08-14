import React, {
    useContext,
    useState,
    useEffect,
} from "react";

import "../style/report.style.scss";

import { useInterview } from "../hooks/useInterview.js";
import { InterviewContext } from "../interview.context.jsx";
import { useParams } from "react-router-dom";


// ============================================================
// NAVIGATION
// ============================================================

const NAV_ITEMS = [
    {
        id: "overview",
        label: "Overview",
    },
    {
        id: "technical",
        label: "Technical",
    },
    {
        id: "behavioral",
        label: "Behavioral",
    },
    {
        id: "roadmap",
        label: "Roadmap",
    },
];


// ============================================================
// QUESTION CARD
// ============================================================

const QuestionCard = ({ item, index }) => {
    const [open, setOpen] = useState(false);

    return (
        <article className={`q-card ${open ? "q-card--open" : ""}`}>

            <div
                className="q-card__header"
                onClick={() => setOpen((previous) => !previous)}
            >

                <div className="q-card__number">
                    {String(index + 1).padStart(2, "0")}
                </div>

                <div className="q-card__question">

                    <span className="q-card__label">
                        Interview Question
                    </span>

                    <div>
                        {item.question}
                    </div>

                </div>

                <span
                    className={`q-card__chevron ${
                        open ? "q-card__chevron--open" : ""
                    }`}
                >
                    ↓
                </span>

            </div>


            {open && (
                <div className="q-card__body">

                    <div className="q-card__section">

                        <span className="q-card__section-label">
                            Interviewer's Intention
                        </span>

                        <p>
                            {item.intention}
                        </p>

                    </div>


                    <div className="q-card__section">

                        <span className="q-card__section-label">
                            How To Answer
                        </span>

                        <p>
                            {item.answer}
                        </p>

                    </div>

                </div>
            )}

        </article>
    );
};


// ============================================================
// ROADMAP DAY
// ============================================================

const RoadMapDay = ({ day }) => {
    return (
        <article className="roadmap-day">

            <div className="roadmap-day__number">
                {String(day.day).padStart(2, "0")}
            </div>

            <div className="roadmap-day__content">

                <h3>
                    {day.focus}
                </h3>

                <ul>
                    {(day.tasks || []).map((task, index) => (
                        <li key={index}>
                            {task}
                        </li>
                    ))}
                </ul>

            </div>

        </article>
    );
};


// ============================================================
// OVERVIEW
// ============================================================

const Overview = ({ report }) => {

    const score = Number(report.matchScore || 0);

    const scoreLevel =
        score >= 80
            ? "high"
            : score >= 60
                ? "medium"
                : "low";

    return (
        <section>

            <div className="content-header">

                <div>

                    <span className="section-eyebrow">
                        REPORT OVERVIEW
                    </span>

                    <h2>
                        Your interview readiness
                    </h2>

                </div>

            </div>


            <div className="overview-grid">

                {/* MATCH SCORE */}

                <div className="score-card">

                    <div className="score-card__top">

                        <div>

                            <span className="card-label">
                                MATCH SCORE
                            </span>

                            <h3>
                                Profile alignment
                            </h3>

                        </div>

                        <span
                            className={`score-status score-status--${scoreLevel}`}
                        >
                            {scoreLevel}
                        </span>

                    </div>


                    <div className="score-display">

                        <div
                            className="match-score__ring"
                            style={{
                                "--score": score,
                            }}
                        >

                            <span className="match-score__value">
                                {score}
                            </span>

                            <span className="match-score__pct">
                                %
                            </span>

                        </div>


                        <div className="score-description">

                            <p>
                                {score >= 80
                                    ? "Your profile shows a strong alignment with this role."
                                    : score >= 60
                                        ? "Your profile shows a reasonable alignment with this role, with some areas to improve."
                                        : "There are several areas you should strengthen before interviewing for this role."
                                }
                            </p>

                        </div>

                    </div>

                </div>


                {/* SKILL GAPS */}

                <div className="skill-card">

                    <div className="skill-card__header">

                        <div>

                            <span className="card-label">
                                SKILL ANALYSIS
                            </span>

                            <h3>
                                Areas to improve
                            </h3>

                        </div>

                        <div className="skill-count">
                            {report.skillGaps?.length || 0}
                        </div>

                    </div>


                    <div className="skill-list">

                        {(report.skillGaps || []).length > 0 ? (

                            report.skillGaps.map((gap, index) => (

                                <div
                                    className="skill-item"
                                    key={index}
                                >

                                    <span className="skill-item__name">
                                        {gap.skill}
                                    </span>

                                    <span
                                        className={`skill-item__severity skill-item__severity--${gap.severity}`}
                                    >
                                        {gap.severity}
                                    </span>

                                </div>

                            ))

                        ) : (

                            <div className="empty-state">
                                No major skill gaps detected.
                            </div>

                        )}

                    </div>

                </div>

            </div>


            {/* ROLE INFORMATION */}

            <div className="role-context">

                <div className="role-context__item">

                    <span>
                        TARGET ROLE
                    </span>

                    <strong>
                        {report.jobDescription
                            ? report.jobDescription.slice(0, 90) + "..."
                            : "Not provided"
                        }
                    </strong>

                </div>


                <div className="role-context__item">

                    <span>
                        TECHNICAL
                    </span>

                    <strong>
                        {report.technicalQuestions?.length || 0}
                    </strong>

                </div>


                <div className="role-context__item">

                    <span>
                        BEHAVIORAL
                    </span>

                    <strong>
                        {report.behavioralQuestions?.length || 0}
                    </strong>

                </div>


                <div className="role-context__item">

                    <span>
                        PREPARATION
                    </span>

                    <strong>
                        {report.preparationPlan?.length || 0} days
                    </strong>

                </div>

            </div>

        </section>
    );
};


// ============================================================
// TECHNICAL QUESTIONS
// ============================================================

const TechnicalQuestions = ({ report }) => {

    const questions = report.technicalQuestions || [];

    return (
        <section>

            <div className="content-header">

                <div>

                    <span className="section-eyebrow">
                        SECTION 01
                    </span>

                    <h2>
                        Technical Questions
                    </h2>

                    <p>
                        Questions designed around the technical
                        requirements of this role.
                    </p>

                </div>

                <span className="content-header__count">
                    {questions.length} questions
                </span>

            </div>


            <div className="q-list">

                {questions.length > 0 ? (

                    questions.map((question, index) => (

                        <QuestionCard
                            key={index}
                            item={question}
                            index={index}
                        />

                    ))

                ) : (

                    <div className="empty-state">
                        No technical questions available.
                    </div>

                )}

            </div>

        </section>
    );
};


// ============================================================
// BEHAVIORAL QUESTIONS
// ============================================================

const BehavioralQuestions = ({ report }) => {

    const questions = report.behavioralQuestions || [];

    return (
        <section>

            <div className="content-header">

                <div>

                    <span className="section-eyebrow">
                        SECTION 02
                    </span>

                    <h2>
                        Behavioral Questions
                    </h2>

                    <p>
                        Questions designed to evaluate your
                        communication, experience and mindset.
                    </p>

                </div>

                <span className="content-header__count">
                    {questions.length} questions
                </span>

            </div>


            <div className="q-list">

                {questions.length > 0 ? (

                    questions.map((question, index) => (

                        <QuestionCard
                            key={index}
                            item={question}
                            index={index}
                        />

                    ))

                ) : (

                    <div className="empty-state">
                        No behavioral questions available.
                    </div>

                )}

            </div>

        </section>
    );
};


// ============================================================
// ROADMAP
// ============================================================

const PreparationRoadmap = ({ report }) => {

    const roadmap = report.preparationPlan || [];

    return (
        <section>

            <div className="content-header">

                <div>

                    <span className="section-eyebrow">
                        SECTION 03
                    </span>

                    <h2>
                        Preparation Roadmap
                    </h2>

                    <p>
                        A focused preparation plan based on
                        the gaps identified in your profile.
                    </p>

                </div>

                <span className="content-header__count">
                    {roadmap.length}-day plan
                </span>

            </div>


            <div className="roadmap-list">

                {roadmap.length > 0 ? (

                    roadmap.map((day) => (

                        <RoadMapDay
                            key={day.day}
                            day={day}
                        />

                    ))

                ) : (

                    <div className="empty-state">
                        No preparation roadmap available.
                    </div>

                )}

            </div>

        </section>
    );
};


// ============================================================
// MAIN COMPONENT
// ============================================================

const Interview = () => {

    const [activeNav, setActiveNav] = useState("overview");


    const {
        report,
        getReportById,
        loading,
        getResumePdf,
    } = useInterview();

    const { interviewId } = useParams();

    // Keeping this because your existing application
    // already uses the InterviewContext.
    useContext(InterviewContext);


    // ========================================================
    // LOAD REPORT
    // ========================================================

    useEffect(() => {

        if (interviewId) {
            getReportById(interviewId);
        }

    }, [interviewId]);

    // ========================================================
    // LOADING
    // ========================================================

    if (loading || !report) {

        return (
            <main className="loading-screen">

                <div className="loading-spinner" />

                <p>
                    Loading your interview report...
                </p>

            </main>
        );
    }


    // ========================================================
    // RENDER
    // ========================================================

    return (

        <div className="interview-page">


            {/* =================================================
                HEADER
            ================================================= */}

            <header className="report-header">

                <div className="report-header__inner">

                    <div className="report-header__info">

                        <span className="report-header__eyebrow">
                            AI INTERVIEW REPORT
                        </span>

                        <h1>
                            Interview Preparation{" "}
                            <span>
                                Report
                            </span>
                        </h1>

                        <p>
                            Personalized interview preparation
                            based on your resume and target role.
                        </p>

                    </div>


                    <div className="report-header__meta">

                        <span>
                            REPORT GENERATED
                        </span>

                        <strong>
                            {new Date(
                                report.createdAt || Date.now()
                            ).toLocaleDateString()}
                        </strong>

                    </div>

                </div>

            </header>


            {/* =================================================
                MAIN LAYOUT
            ================================================= */}

            <div className="interview-layout">


                {/* =================================================
                    LEFT NAVIGATION
                ================================================= */}

                <nav className="interview-nav">

                    <div className="nav-content">

                        <p className="interview-nav__label">
                            Sections
                        </p>


                        {NAV_ITEMS.map((item) => (

                            <button
                                key={item.id}
                                className={`interview-nav__item ${
                                    activeNav === item.id
                                        ? "interview-nav__item--active"
                                        : ""
                                }`}
                                onClick={() =>
                                    setActiveNav(item.id)
                                }
                            >
                                {item.label}
                            </button>

                        ))}

                    </div>


                    {/* <button
                        onClick={() =>
                            getResumePdf(interviewId)
                        }
                        className="button primary-button"
                    >
                        ↓ Download Resume
                    </button> */}

                </nav>


                {/* =================================================
                    CENTER CONTENT

                    ONLY ONE SECTION IS RENDERED AT A TIME.
                    The ref allows the center panel to have its
                    own scroll position.
                ================================================= */}

                <main
                    className="interview-content"
                >

                    {activeNav === "overview" && (
                        <Overview
                            report={report}
                        />
                    )}


                    {activeNav === "technical" && (
                        <TechnicalQuestions
                            report={report}
                        />
                    )}


                    {activeNav === "behavioral" && (
                        <BehavioralQuestions
                            report={report}
                        />
                    )}


                    {activeNav === "roadmap" && (
                        <PreparationRoadmap
                            report={report}
                        />
                    )}

                </main>


                {/* =================================================
                    RIGHT SIDEBAR
                ================================================= */}

                <aside className="interview-sidebar">

                    <div className="match-score">

                        <p className="match-score__label">
                            MATCH SCORE
                        </p>


                        <div
                            className="match-score__ring"
                            style={{
                                "--score": Number(
                                    report.matchScore || 0
                                ),
                            }}
                        >

                            <span className="match-score__value">
                                {report.matchScore || 0}
                            </span>

                            <span className="match-score__pct">
                                %
                            </span>

                        </div>


                        <p className="match-score__sub">

                            {report.matchScore >= 80
                                ? "Strong match for this role."
                                : report.matchScore >= 60
                                    ? "Good match with some areas to improve."
                                    : "Several areas need improvement."
                            }

                        </p>

                    </div>


                    <div className="sidebar-divider" />


                    <div className="skill-gaps">

                        <p className="skill-gaps__label">
                            SKILL GAPS
                        </p>


                        <div className="skill-gaps__list">

                            {(report.skillGaps || []).length > 0 ? (

                                report.skillGaps.map(
                                    (gap, index) => (

                                        <span
                                            key={index}
                                            className={`skill-tag skill-tag--${gap.severity}`}
                                        >
                                            {gap.skill}
                                        </span>

                                    )
                                )

                            ) : (

                                <span className="skill-tag skill-tag--low">
                                    No major gaps
                                </span>

                            )}

                        </div>

                    </div>

                </aside>

            </div>

        </div>
    );
};


export default Interview;