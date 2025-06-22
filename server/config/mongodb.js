const mongoose = require("mongoose");

const connectDB=async ()=>{
    mongoose.connection.on("connected",()=>{
        console.log("Database connected");
    })
    await mongoose.connect(`${process.env.MONGODB_URI}/mern-auth`);
}

module.exports = connectDB;