import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import authRoute from "./routes/auth.js";
import hotelsRoute from "./routes/hotels.js";
import usersRoute from "./routes/users.js";
import roomsRoute from "./routes/rooms.js";
import cookieParser from "cookie-parser";

const app = express();
dotenv.config()


const handleError = (err) => {
  console.error("MongoDB error:", err);
};

const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO);
    console.log("connected to mongodb");
  } catch (error) {
    handleError(error);
  }
};
mongoose.connection.on("disconnected", ()=>{
    console.log("mongodb is disconnected");
    
})


//middlewares

app.use(cookieParser())
//1st check this
app.use(express.json())


//then check all routers one by one
app.use("/api/auth",authRoute);
app.use("/api/users",usersRoute);
app.use("/api/hotels" , hotelsRoute);
//while checking hotelrouter its says next(), then it goes inside the next middleware
app.use("/api/rooms",roomsRoute);

  app.use((err,req,res,next)=>{
    const errorStatus = err.status || 500
    const errorMessage = err.message || "something went wrong"
    return res.status(errorStatus).json({
      success:false,
      status:errorStatus,
      message:errorMessage,
      stack:err.stack
    });
});


app.listen(9000 ,()=>{
    connect()
    console.log("backend connected")
});