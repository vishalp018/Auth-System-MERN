const bcrypt=require("bcryptjs")
const jwt=require("jsonwebtoken")
const userModel =require("../models/userModel.js")

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
            hashedPassword
        })
        await user.save();
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

module.exports = {
    register,
    login
};