const express = require("express");
const cors = require("cors");
require("dotenv").config();
const connectDB = require('./config/mongodb');


const cookieParser = require("cookie-parser");

const app=express();
const port=process.env.PORT||4000

connectDB();

app.use(express.json());
app.use(cookieParser());
app.use(cors({
    credentials:true
}))

app.get("/",(req,res)=>{
res.send("API Working fine")
})

app.listen(port,()=>{
    console.log(`Server started on PORT:${port}`)
});

