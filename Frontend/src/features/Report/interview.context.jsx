import { createContext, useState } from 'react';

export const InterviewContext = createContext();

export const InterviewProvider = ({ children }) => {
    const [loading, setLoading] = useState(false);
    const [report, setReport] = useState(null);
    const [reports, setReports] = useState([]);
    const [resumeFile, setResumeFile] = useState(null);
    const [resumeName, setResumeName] = useState(null);
    const [jobDescription, setJobDescription] = useState('');
    const [selfDescription, setSelfDescription] = useState('');

    return (
        <InterviewContext.Provider
            value={{
                loading,
                setLoading,
                report,
                setReport,
                reports,
                setReports,
                resumeFile,
                setResumeFile,
                resumeName,
                setResumeName,
                jobDescription,
                setJobDescription,
                selfDescription,
                setSelfDescription,
            }}
        >
            {children}
        </InterviewContext.Provider>
    );
};
