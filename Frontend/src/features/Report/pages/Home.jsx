import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { InterviewContext } from "../interview.context.jsx";
import { generateInterviewReport } from "../services/report.api.js";
import "../style/Home.style.scss";

const Home = () => {
    const navigate = useNavigate();
    const {
        resumeFile,
        setResumeFile,
        resumeName,
        setResumeName,
        jobDescription,
        setJobDescription,
        selfDescription,
        setSelfDescription,
        setReport,
    } = useContext(InterviewContext);

    const handleResumeChange = (event) => {
        const file = event.target.files?.[0];
        if (file) {
            setResumeFile(file);
            setResumeName(file.name);
        } else {
            setResumeFile(null);
            setResumeName(null);
        }
    };

    const handleGenerate = async () => {
        if (!resumeFile) {
            alert('Please upload your resume.');
            return;
        }

        if (!jobDescription.trim()) {
            alert('Please paste the job description.');
            return;
        }

        try {
            const response = await generateInterviewReport({
                jobDescription,
                selfDescription,
                resumeFile,
            });
            const reportData = response.interviewReport || response;
            setReport(reportData);
            navigate(`/report/${reportData._id || reportData.id}`);
        } catch (error) {
            alert(error.message || 'Unable to generate report.');
        }
    };

    return (
        <main className="home">
            <div className="home-container">

                <div className="home-header">
                    <span className="eyebrow">
                        AI INTERVIEW PREPARATION
                    </span>

                    <h1>
                        Prepare smarter.
                        <span> Interview better.</span>
                    </h1>

                    <p>
                        Upload your resume and job description to generate
                        a personalized interview report.
                    </p>
                </div>

                <div className="interview-form">

                    <div className="form-card job-card">
                        <div className="form-heading">
                            <span className="step">01</span>

                            <div>
                                <h2>Job Description</h2>
                                <p>
                                    Paste the job description you're applying for.
                                </p>
                            </div>
                        </div>

                        <textarea
                            name="jobDescription"
                            id="jobDescription"
                            placeholder="Paste the job description here..."
                            value={jobDescription}
                            onChange={(e) => setJobDescription(e.target.value)}
                        />
                    </div>

                    <div className="right-column">

                        <div className="form-card">
                            <div className="form-heading">
                                <span className="step">02</span>

                                <div>
                                    <h2>Upload Resume</h2>
                                    <p>
                                        Upload your resume in PDF format.
                                    </p>
                                </div>
                            </div>

                            <label
                                className="file-upload"
                                htmlFor="resume"
                            >
                                <div className="upload-icon">
                                    ↑
                                </div>

                                <div className="upload-content">
                                    <strong>
                                        {resumeName || "Choose your resume"}
                                    </strong>

                                    <span>
                                        {resumeName ? "PDF selected" : "PDF files only"}
                                    </span>
                                </div>

                                <span className="browse-btn">
                                    Browse
                                </span>
                            </label>

                            <input
                                type="file"
                                name="resume"
                                id="resume"
                                accept=".pdf"
                                hidden
                                onChange={handleResumeChange}
                            />
                        </div>

                        <div className="form-card">

                            <div className="form-heading">
                                <span className="step">03</span>

                                <div>
                                    <h2>Self Description</h2>
                                    <p>
                                        Tell us a little about yourself.
                                    </p>
                                </div>
                            </div>

                            <textarea
                                name="selfDescription"
                                id="selfDescription"
                                placeholder="Tell us about your skills, experience, goals..."
                                value={selfDescription}
                                onChange={(e) => setSelfDescription(e.target.value)}
                            />

                        </div>

                    </div>

                </div>

                <button className="generate-btn" type="button" onClick={handleGenerate}>
                    Generate Interview Report
                    <span>→</span>
                </button>

            </div>
        </main>
    );
};

export default Home;