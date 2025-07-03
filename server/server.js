const express = require("express");
const cors = require("cors");
require("dotenv").config();
const connectDB = require('./config/mongodb');
const authRouter =require("./routes/authRoutes")


const cookieParser = require("cookie-parser");
const { userRouter } = require("./routes/userRoutes");
const app=express();
const port=process.env.PORT||4000

//Database connection
connectDB();

//Middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    credentials:true
}))

//API Endpoints for testing
app.get("/",(req,res)=>{
res.send("API Working fine")
})
app.use('/api/auth',authRouter)
app.use('/api/user',userRouter)

app.listen(port,()=>{
    console.log(`Server started on PORT:${port}`)
});

