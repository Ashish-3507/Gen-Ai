import { RegisterUser, loginUser } from "../controllers/auth.controller.js";
import express from 'express';


const router = express.Router();



router.route("/register").post(RegisterUser);
router.route("/loginUser").post(loginUser);


export default router;