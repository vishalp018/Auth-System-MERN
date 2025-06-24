const express=require("express");
const { register, login, logout, verifyEmail, sendVerifyOtp, isAuthenticated, sendResetOtp, resetPassword } = require("../controllers/authController.js");
const { userAuth } = require("../middleware/userAuth.js");
const appRouter=express.Router();

appRouter.post("/register",register);
appRouter.post("/login",login);
appRouter.post("/logout",logout);
appRouter.post("/send-verify-otp",userAuth,sendVerifyOtp);
appRouter.post("/verify-account",userAuth ,verifyEmail);
appRouter.post("/is-auth",userAuth ,isAuthenticated);
appRouter.post("/send-reset-otp",sendResetOtp);
appRouter.post("/reset-password",resetPassword);


module.exports = appRouter;