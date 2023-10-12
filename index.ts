import Razorpay from "razorpay";
import app from "./app";
import { dbConnection } from "./config/dbConnection";

//**********************************DataBase Connect*********************************/
dbConnection()

export const instance = new Razorpay({
  key_id: process.env.RAZORPAY_API_KEY,
  key_secret: process.env.RAZORPAY_API_SECRET,
});

app.listen(process.env.PORT, () => {
    return console.log(`Express is listening at http://localhost:${process.env.PORT}}`);
  });
