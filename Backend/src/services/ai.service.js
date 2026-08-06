import { GoogleGenAI } from "@google/genai";
import * as z from "zod";

const ai = new GoogleGenAI({
    apiKey: process.env.GOOGLE_GENAI_KEY
});

async function generateInterviewReoport(resume,selfDescription,jobDescription){

}

export default invokeGeminAI;