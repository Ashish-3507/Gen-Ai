import {User} from  '../models/User.model.js';
import {asyncHandler} from '../util/AsyncHandler.js';
import {ApiError} from '../util/ErrorHandler.js';
import ResponseHandler from "../util/ResponseHandler.js";
import jwt from 'jsonwebtoken';

const generateAccessTokenRefreshToken=async (userid)=>{
    try{
        const user =await User.findById(userid);

        if (!user) {
            throw new ApiError(404, "User not found");
            }
        const accessToken = await user.generateAccessToken();
        const refreshToken = await user.generateRefreshToken();


        user.refreshToken = refreshToken;
        await user.save({validateBeforeSave:false});


        return {accessToken,refreshToken}

    }catch(error){
        throw new ApiError(500, error?.message || "Something went wrong while generating refresh and access token ")
    }
}

const RegisterUser = asyncHandler(async(req,res)=>{
    const {username,email, password} = req.body; 

    if(!email||!password||!username){
        throw new ApiError(400 , "Invalid or empty input field");
    }

    const userExist = await User.findOne({
        $or:[{email},{username}],
        });

    if(userExist){
        throw new ApiError(400, "User already exist");
    }

    const user = await User.create({
        username,
        email,
        password,
    });

    const createdUser = await User.findById(user._id);
    if(!createdUser){
        throw new ApiError(400, "Something wend wrong while creating the user");
    }

    return res.status(200).json(
        new ResponseHandler(200, {}, "Registered user successfully")
    )
});

const loginUser = asyncHandler(async(req,res)=>{
    const {username, email, password} = req.body;

    if(!email || !password){
        throw new ApiError(400, "Empty input field");
    }

    const userExist = await User.findOne({email})

    if(!userExist){
        throw new ApiError(400, "No user found with the given credentials");
    }

    const passwordCheck = await userExist.isPasswordCorrect(password);

    if(!passwordCheck){
        throw new ApiError(400, "The entered Password is incorrect");
    }



    const {accessToken,  refreshToken} = await generateAccessTokenRefreshToken(userExist._id);

    const user = await User.findById(userExist._id).select("-password -refreshToken");

    const option={
        httpOnly: true,
        secure: true,
        sameSite: "none",
    }

    return res.status(200)
    .cookie("accessToken" , accessToken, option)
    .cookie("refreshToken", refreshToken, option)
    .json(new ResponseHandler 
        ( 
            200, 
            {
                user:user , accessToken
            },
        "login succesfully")
    )
})


const refreshAccessToken = asyncHandler(async (req, res) => {
    const incomingRefreshToken =
        req.cookies?.refreshToken || req.body?.refreshToken;

    if (!incomingRefreshToken) {
        throw new ApiError(401, "Refresh token is required");
    }

    let decodedToken;

    try {
        decodedToken = jwt.verify(
            incomingRefreshToken,
            process.env.REFRESH_TOKEN_SECRET
        );
    } catch (error) {
        throw new ApiError(401, "Invalid or expired refresh token");
    }

    const user = await User.findById(decodedToken?.id);

    if (!user) {
        throw new ApiError(401, "Invalid refresh token");
    }

    if (incomingRefreshToken !== user.refreshToken) {
        throw new ApiError(401, "Refresh token does not match");
    }

    const { accessToken, refreshToken } =
        await generateAccessTokenRefreshToken(user._id);

    const option = {
        httpOnly: true,
        secure: true,
        sameSite: "none",
    };

    return res
        .status(200)
        .cookie("accessToken", accessToken, option)
        .cookie("refreshToken", refreshToken, option)
        .json(
            new ResponseHandler(
                200,
                { accessToken },
                "Token generated successfully"
            )
        );
});

const getMe = asyncHandler(async (req, res) => {
    return res.status(200).json(
        new ResponseHandler(
            200,
            {
                user: req.user
            },
            "User fetched successfully"
        )
    );
});


export {RegisterUser,
    loginUser,
    refreshAccessToken,
    getMe,
}