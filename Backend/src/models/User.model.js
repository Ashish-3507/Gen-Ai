import mongoose from "mongoose";
import jwt from 'jsonwebtoken';
import bcryptjs from 'bcryptjs';

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique:true
    },
    email:{
        type:String,
        required:true,
        lowercase:true,
        trim:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
    },
    refreshToken:{
        type:String
    }
},
    {
        timestamps:true,
    }
)

userSchema.pre("save", async function(){

    if(!this.isModified("password")){
        return ;
    }

    this.password = await bcryptjs.hash(this.password, 10);
});


userSchema.methods.isPasswordCorrect = async function(password){
    return await bcryptjs.compare(password,this.password);
};

userSchema.methods.generateAccessToken = function(){
    return jwt.sign(
        {
        id:this._id,
        email:this.email,
        username:this.username,
        },
            process.env.ACCESS_TOKEN_SECRET,
            {
                expiresIn:process.env.ACCESS_TOKEN_EXPIRY
            }
    );
};

userSchema.methods.generateRefreshToken = function(){
    return jwt.sign(
        {
        id:this._id
        },
            process.env.REFRESH_TOKEN_SECRET,
            {
                expiresIn:process.env.REFRESH_TOKEN_EXPIRY
            }
    );
};

const User =mongoose.model("User", userSchema);

export {User};