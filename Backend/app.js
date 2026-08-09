
import express, { json } from 'express';
import cors from 'cors';


const app = express();

app.use(express.json({limit:"16kb"}));
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}))

//import routes
import authroute from './src/routes/auth.Route.js';
import interviewRouter from './src/routes/interview.Route.js';
import cookieParser from 'cookie-parser';



//routes
app.use("/api/auth" ,authroute);
app.use("/api/report", interviewRouter);



app.use((err, req, res, next) => {
    return res.status(err.statuscode || 500).json({
        statuscode: err.statuscode || 500,
        success: false,
        message: err.message || "Internal Server Error",
        errors: err.error || [],
    });
});


export default app;