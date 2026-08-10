import { useState } from 'react';
import { getInterviewReportById } from '../services/report.api.js';

export function useInterview() {
    const [report, setReport] = useState(null);
    const [loading, setLoading] = useState(false);

    const getReportById = async (interviewId) => {
        setLoading(true);
        try {
            const normalizedReport = await getInterviewReportById(interviewId);
            setReport(normalizedReport);
        } catch (error) {
            console.error(error);
            setReport(null);
        } finally {
            setLoading(false);
        }
    };

    const getResumePdf = () => {
        const content = 'Resume download is not implemented in this demo. Please connect your backend resume storage to enable downloads.';
        const blob = new Blob([content], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'resume.txt';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    };

    return {
        report,
        getReportById,
        loading,
        getResumePdf,
    };
}
