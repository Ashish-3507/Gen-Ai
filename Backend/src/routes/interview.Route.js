import express from 'express';
import verifyToken from "../middlewares/verifyToken-middleware.js";
import upload from '../middlewares/file.middlewares.js';
import generateInterviewReportController, { getInterviewReportByIdController } from "../controllers/report.controller.js";

const interviewRouter = express.Router();

interviewRouter.post("/report", verifyToken, upload.single("resume"), generateInterviewReportController);
interviewRouter.get("/report/:reportId", verifyToken, getInterviewReportByIdController);

export default interviewRouter;