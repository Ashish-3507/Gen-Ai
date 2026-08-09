import "dotenv/config";
import { GoogleGenAI } from "@google/genai";
import * as z from "zod";


const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
});

const interviewReportSchema = z.object({
    matchScore: z.number().describe("A score between 0 and 100 indicating how well the candidate's profile matches the job.describe"),
    technicalQuestions: z.array(z.object({
        question:z.string().describe("The technical Question can be asked in interview"),
        intention:z.string().describe("The intention of interviewer behind asking this question"),
        answer:z.string().describe("How to answer this question, what points to cover,what approach to take ect.."),
    })).describe("Technical question that can be asked in the interview along with their intention and how to answer them"),
    behavioralQuestions: z.array(z.object({
        question:z.string().describe("The technical Question can be asked in interview"),
        intention:z.string().describe("The intention of interviewer behind asking this question"),
        answer:z.string().describe("How to answer this question, what points to cover,what approach to take ect.."),
    })).describe("Behavioral question that can be asked in the interview along with their intention and how to answer them"),
    skillGap:z.array(z.object({
        skill: z.string().describe("The skill which the candidate is lacking"),
        severity:z.enum(["low", "medium", "high"]).describe("The severity of this skill gap, i.e."),
    })).describe("List of skill gaps in the candidate's profile along with their severity"),
    preparationPlan:z.array(z.object({
        day: z.number().describe("The day number in the preperationplan, start from 1 "),
        focus:z.string().describe("The main focus of this day in the preparation plan, e.g. data structure, system design, mock interviews"),
        tasks:z.array(z.string()).describe("List of tasks to be done on this day to follow the preparation plan e.g. read specific book or video solve these or learn this topic ect.."),
    })),
})

async function generateInterviewReport(resume,selfDescription,jobDescription){
    const prompt =  `Generate an interview report for a candidate with the following details :
                        Resume: ${resume}
                        self Description: ${selfDescription}
                        job Description ${jobDescription}
                        `;

    const response = await ai.models.generateContent({
        model: "gemini-3.6-flash",
        contents:prompt,
        config:{
            responseMimeType:"application/json",
            responseSchema: z.toJSONSchema(interviewReportSchema),
        },
    })
    return JSON.parse(response.text);
}

export default generateInterviewReport;