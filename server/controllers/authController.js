const bcrypt=require("bcryptjs")
const jwt=require("jsonwebtoken")
const userModel =require("../models/userModel.js")
const transporter=require("../config/nodemailer.js")

const register=async(req,res)=>{
    const {name,email,password}=req.body;
    if(!name||!email||!password){
        return res.json({
            success:false,message:"Missing Details"
        })
    }
    try{
        const existingUser=await userModel.findOne({email})
        if(existingUser){
            return res.json({success:false,message:"User already exists"});
        }
        const hashedPassword=await bcrypt.hash(password,10);
        const user=new userModel({
            email,
            name,
            password:hashedPassword
        })
        await user.save();
        const token=jwt.sign({id:user._id},process.env.JWT_SECRET,{expiresIn:'7d'})
        res.cookie('token',token,{
            httpOnly:true,
            secure:process.env.NODE_ENV==='production',
            sameSite:process.env.NODE_ENV==='production'? 'none':'strict',
            maxAge:7*24*60*60*1000,
        })
 
        //sending email
        const mailOptions={
            from: process.env.SENDER_EMAIL,
            to: email,
            subject:"Welcome To Auth-app",
            text:`Welcome to Auth-app website. Your account has been created with email id:${email}`
        }
        await transporter.sendMail(mailOptions);

        return res.json({
            success:true
        })
    }
    catch(error){
        return res.json({
            success:false,message:error.message
        })
    }
}
const login =async(req,res)=>{
    const {email,password}=req.body;
    if(!email||!password){
        return res.json({
            success:false,message:"Email are password are required"
        })
    }
    try{
        const user=await userModel.findOne({
            email
        })
        if(!user){
            return res.json({
                success:false,message:"Invalid email"
            })
        }
        const isMatch=await bcrypt.compare(password,user.password)
        if(!isMatch){
            return res.json({
                success:false,message:"Invalid password"
            })
        }
        const token=jwt.sign({id:user._id},process.env.JWT_SECRET,{expiresIn:'7d'})
        res.cookie('token',token,{
            httpOnly:true,
            secure:process.env.NODE_ENV==='production',
            sameSite:process.env.NODE_ENV==='production'? 'none':'strict',
            maxAge:7*24*60*60*1000,
        })
        return res.json({
            success:true
        })

    }
    catch(error){
       return res.json({
            success:false,message:error.message
        })
    }
}
const logout=async (req,res)=>{
    try{
        res.clearCookie('token',{
             httpOnly:true,
            secure:process.env.NODE_ENV==='production',
            sameSite:process.env.NODE_ENV==='production'? 'none':'strict',
            maxAge:7*24*60*60*1000,
        })
        return res.json({
            success:true,message:"Logged Out"
        })
    }
    catch(error){
        return res.json({success:false,message:error.message})
    }
}
const sendVerifyOtp=async(req,res)=>{
    try{
        const {userID}=req.body;
        const user=await userModel.findById(userID);
        if(user.isAccountVerified){
            return res.json({
                success:false,message:"Account already verified"
            })
        }
       const otp=String(Math.floor( 100000+ Math.random()*900000));
       user.verifyOtp=otp;
       user.verifyOtpExpireAt=Date.now()+24*60*60*1000
       await user.save();
       const mailOption={
         from: process.env.SENDER_EMAIL,
            to: user.email,
            subject:"Account Verification OTP",
            subject:"Account Verification OTP",
            text:`Your OTP is ${otp}. Verify your account usiong this OTP.`
       }
       await transporter.sendMail(mailOption);
       res.json({
        success:true,message:"verification message to email"
       })
    }
    catch(error){
        res.json({
            success:false,message:error.message
        })
    }
}
const verifyEmail=async(req,res)=>{
    const {userID,otp}=req.body;

    if(!userID||!otp){
        return res.json({
            success:false,message:"Missing Details"
        })
    }
    try{
        const user=await userModel.findById(userID);
        if(!user){
            return res.json({
                success:false,message:"User not found"
            })
        }
        if(user.verifyOtp===''||user.verifyOtp!==otp){
             return res.json({
                success:false,message:"Invalid OTP"
            })
        }
        if(user.verifyOtpExpireAt<Date.now()){
            return res.json({
                success:false,message:"OTP expired"
            })
        }
        user.isAccountVerified=true;
        user.verifyOtp='';
        user.verifyOtpExpireAt=0;
        await user.save();
         return res.json({
                success:true,message:"Email verified successfully"
            })
    }
    catch(error){
        return res.json({
            success:false,message:error.message
        })
    }

}
const isAuthenticated=async(req,res)=>{
    try{
        return res.json({
            success:true
        })
    }
    catch(error){
        return res.json({
            success:false,message:error.message
        })
    }
}
const sendResetOtp=async(req,res)=>{
    const {email}=req.body;
    if(!email){
        return res.json({
            success:false,message:"Email is required"
        })
    }
    try{
        const user=await userModel.findOne({email});
        if(!user){
            return res.json({
            success:false,message:"user not found"
        })
        }
        const otp=String(Math.floor( 100000+ Math.random()*900000));
       user.resetOtp=otp;
       user.resetOtpExpireAt=Date.now()+15*60*1000;
       await user.save();
       const mailOption={
         from: process.env.SENDER_EMAIL,
            to: user.email,
            subject:"Password Reset OTP",
            subject:"Account Verification OTP",
            text:`Your OTP for resetting the password is ${otp}.use this otp for restting yout password.`
       }
       await transporter.sendMail(mailOption);
       return res.json({
            success:true,message:"OTP send to email"
        })

    }
    catch(error){
                return res.json({
            success:false,message:error.message
        })
    }

}
const resetPassword=async (req,res)=>{
    const {email ,otp,newPassword}=req.body;
    if(!email||!otp||!newPassword){
        return res.json({
            success:false,message:"Email, otp, new password are required"
        })
    }
    try{
        const user=await userModel.findOne({email});
        if(!user){
            return res.json({
            success:false,message:"user not found!"
        })
        }
        if(user.resetOtp===""||user.resetOtp!==otp){
            return res.json({
            success:false,message:"invalid OTP"
        })
        }
        if(user.resetOtpExpireAt<Date.now()){
            return res.json({
            success:false,message:"otp expired"
        })
        }
        const hashedPassword=await bcrypt.hash(newPassword,10);
        user.password=hashedPassword;
        user.resetOtp='';
        user.resetOtpExpireAt=0;
        await user.save();
        return res.json({
            success:true,message:"password reset successfully"
        })
    }
    catch(error){
        return res.json({
            success:false,message:error.message
        })
    }
}

module.exports = {
    resetPassword,
    sendResetOtp,
    isAuthenticated,
    verifyEmail,
    sendVerifyOtp,
    logout,
    register,
    login
};