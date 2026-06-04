import { RegisterUser, loginUser, logoutUser } from "../controllers/auth.controller.js";
import express from 'express';
import verifyToken from "../middlewares/verifyToken-middleware.js";


const router = express.Router();



router.route("/register").post(RegisterUser);
router.route("/loginUser").post(loginUser);
router.route("/logoutUser").get(verifyToken, logoutUser);


export default router;