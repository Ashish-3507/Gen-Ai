import dotenv from 'dotenv'
dotenv.config({path:"./.env"})
import express, { json } from 'express';





const app = express();

app.use(express.json({limit:"16kb"}));
app.use(express.urlencoded({extended:true}));

//import routes
import authroute from './src/routes/auth.Route.js';



//routes
app.use("/api/auth" ,authroute);


export default app;