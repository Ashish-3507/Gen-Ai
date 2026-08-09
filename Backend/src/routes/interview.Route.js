import express from 'express';
import verifyToken from "../middlewares/verifyToken-middleware.js";
import upload from '../middlewares/file.middlewares.js';
import generateInterviewReportController from "../controllers/report.controller.js"

const interviewRouter = express.Router();

interviewRouter.post("/report", verifyToken , upload.single("resume"),  generateInterviewReportController);



export default interviewRouter;