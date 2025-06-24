const userModel=require("../models/userModel.js")


const getUserData=async(req,res)=>{
    try{
        const {userID}=req.body;
        const user=await userModel.findById(userID);
        if(!user){
            return res.json({
                success:false,message:"User not found"
            })
        }
        res.json({
            success:true,
            userData:{
                name:user.name,
                isAccountVerified:user.isAccountVerified
            }
        })

    }
    catch(e){
         return res.json({
                success:false,message:error.message
            })
    }
}
module.exports={
    getUserData
}