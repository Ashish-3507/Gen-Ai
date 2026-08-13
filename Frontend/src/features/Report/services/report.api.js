import axios from 'axios';

const api = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
    withCredentials: true,
});

const normalizeReport = (rawReport) => {
    const report = rawReport?.data?.interviewReport || rawReport?.interviewReport || rawReport || {};

    return {
        ...report,
        technicalQuestions: report.technicalQuestions || report.technicalQuestion || [],
        behavioralQuestions: report.behavioralQuestions || report.behavioralQuestion || [],
        skillGaps: report.skillGaps || report.skillGap || [],
        preparationPlan: report.preparationPlan || report.preparationPlan || [],
    };
};

export async function generateInterviewReport({ jobDescription, selfDescription, resumeFile }) {
    try {
        const formData = new FormData();
        formData.append('jobDescription', jobDescription);
        formData.append('selfDescription', selfDescription);
        formData.append('resume', resumeFile);

        const response = await api.post('/api/interview/report', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });

        return normalizeReport(response.data);
    } catch (error) {
        const message = error.response?.data?.message || error.message || 'Failed to generate interview report';
        console.error(message);
        throw new Error(message);
    }
}

export async function getInterviewReportById(interviewId) {
    try {
        const response = await api.get(`/api/interview/report/${interviewId}`);
        return normalizeReport(response.data);
    } catch (error) {
        const message = error.response?.data?.message || error.message || 'Failed to load interview report';
        console.error(message);
        throw new Error(message);
    }
}

export async function getAllInterviewReports() {
    try {
        const response = await api.get('/api/interview/');
        return response.data;
    } catch (error) {
        const message = error.response?.data?.message || error.message || 'Failed to load interview reports';
        console.error(message);
        throw new Error(message);
    }
}

export async function generateResumePdf({ interviewReportId }) {
    try {
        const response = await api.post(`/api/interview/resume/pdf/${interviewReportId}`, null, {
            responseType: 'blob',
        });
        return response.data;
    } catch (error) {
        const message = error.response?.data?.message || error.message || 'Failed to generate resume PDF';
        console.error(message);
        throw new Error(message);
    }
}
