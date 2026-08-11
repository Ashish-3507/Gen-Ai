import { asyncHandler } from "../util/AsyncHandler.js";
import { ApiError } from "../util/ErrorHandler.js";
import ResponseHandler from "../util/ResponseHandler.js";
import generateInterviewReport from "../services/ai.service.js";
import InterviewReport from "../models/interview-report.model.js";


const generateInterviewReportController = asyncHandler(async (req, res) => {

    const { PDFParse } = await import("pdf-parse");
    // Check if resume was uploaded
    if (!req.file) {
        throw new ApiError(400, "Resume file is required");
    }

    // Get data from request body
    const { selfDescription, jobDescription } = req.body;

    if (!selfDescription || !jobDescription) {
        throw new ApiError(
            400,
            "Self description and job description are required"
        );
    }

    // Parse the uploaded PDF
    const parser = new PDFParse({
        data: req.file.buffer,
    });

    const result = await parser.getText();

    const resumeContent = result.text;

    // Generate interview report using AI
    const interviewReportByAi = await generateInterviewReport(
        resumeContent,
        selfDescription,
        jobDescription
    );

    // Save interview report to database
    const interviewReportAI = await InterviewReport.create({
        user: req.user._id,
        resume: resumeContent,
        selfDescription,
        jobDescription,
        ...interviewReportByAi,
    });

    // Send response
    return res.status(201).json(
        new ResponseHandler(
            201,
            {
                interviewReport: interviewReportAI,
            },
            "Report generated successfully"
        )
    );
});


const getInterviewReportByIdController = asyncHandler(async (req, res) => {

    const { reportId } = req.params;

    const interviewReport = await InterviewReport.findById(reportId);

    if (!interviewReport) {
        throw new ApiError(404, "Interview report not found");
    }

    return res.status(200).json(
        new ResponseHandler(
            200,
            {
                interviewReport,
            },
            "Report fetched successfully"
        )
    );
});


export default generateInterviewReportController;

export {
    getInterviewReportByIdController
};