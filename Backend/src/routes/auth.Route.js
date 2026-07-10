import { RegisterUser, loginUser, logoutUser, refreshAccessToken } from "../controllers/auth.controller.js";
import express from 'express';
import verifyToken from "../middlewares/verifyToken-middleware.js";


const router = express.Router();



router.route("/register").post(RegisterUser);
router.route("/loginUser").post(loginUser);
router.route("/logoutUser").get(verifyToken, logoutUser);
router.route("/refreshToken").get(verifyToken, refreshAccessToken)


export default router;