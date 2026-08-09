import { asyncHandler } from "../util/AsyncHandler.js";
import { ApiError } from "../util/ErrorHandler.js";
import ResponseHandler from "../util/ResponseHandler.js";
import generateInterviewReport from "../services/ai.service.js";
import InterviewReport from "../models/InterviewReport.model.js";
import {PDFParse} from "pdf-parse";
import interviewReport from "../models/InterviewReport.model.js";



async function generateInterviewReportController(req,res){
    const parser = new PDFParse({ data: req.file.buffer });
    const result = await parser.getText();
    const resumeContent = result.text;
    const {selfDescription, jobDescription}  = req.file  

    const interviewReportByAi = await generateInterviewReport({
        resume:resumeContent,
        selfDescription,
        jobDescription,
    });

    const interviewReportAI = await interviewReport.create({
        user: req.user.id,
        resume: resumeContent,
        selfDescription,
        jobDescription,
        ...interviewReportByAi,
    })

    res.status(201).json(
        new ResponseHandler(201,{
            interviewReportAI,
        },
    "Report generated succesfully")
    )
}

export default generateInterviewReportController;

