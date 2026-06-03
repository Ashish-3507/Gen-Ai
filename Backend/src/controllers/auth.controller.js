import {User} from  '../models/User.model.js';
import AsyncHandler from '../util/AsyncHandler.js';
import {ApiError} from '../util/ErrorHandler.js';
import ResponseHandler from "../util/ResponseHandler.js";

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

const RegisterUser = AsyncHandler(async(req,res)=>{
    const {username, email, password} = req.body;

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

const loginUser = AsyncHandler(async(req,res)=>{
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
    }

    return res.status(200)
    .cookie("accessToken" , accessToken, option)
    .cookie("refreshToken", refreshToken, option)
    .json(new ResponseHandler 
        ( 
            200, 
            {
                user:user, accessToken, refreshToken,
            },
        "login succesfully")
    )
})


export {RegisterUser,
    loginUser,
}