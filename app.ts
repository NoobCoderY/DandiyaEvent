//All imports
import express from "express";
import dotenv from "dotenv";
import { error } from "./middleware/errorMiddleWare";
import todoRouter from "./router/userRouter"
import cookieParser from "cookie-parser"
import cors from "cors";

//  env file import 

dotenv.config({
    path: "./config/config.env",
  });

const app = express();

 //**********************************Cross Origin*********************************/

 app.use(cors({
    credentials: true,
    origin:"http://localhost:3000",
  }))
  app.use(express.json());
  app.use(express.urlencoded({
    extended: true
  }))
  
app.use(cookieParser())
  


//**********************************REST API Routes**********************************/
  
app.get("/api/getkey", (req, res) =>
  res.status(200).json({ key: process.env.RAZORPAY_API_KEY})
);

 app.use("/api/v1",todoRouter)

 //**********************************error middleware**********************************/

  app.use(error)



export default app;
