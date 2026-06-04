import {ApiError} from "../util/ErrorHandler.js";
import {User} from "../models/User.model.js";
import jwt from "jsonwebtoken";
import { asyncHandler } from "../util/AsyncHandler.js";


const verifyToken = asyncHandler(async(req,res,next)=>{
    try
    {
        const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "");
        
        console.log("Authorization:", req.header("Authorization"));
        console.log("Token:", token);
        if(!token){
            throw new ApiError(400, "Unathorized reqest")
        }
    
        const decodeToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    
        const user = await User.findById(decodeToken?.id).select("-password -refreshToken");
        if(!user){
            throw new ApiError(400,"Accessd denied Unathorized Access")
        }
    
        req.user = user;
        next();
} catch (error) {
    throw new ApiError(400,error?.message || "Invalid Access token")
}
})

export default verifyToken;