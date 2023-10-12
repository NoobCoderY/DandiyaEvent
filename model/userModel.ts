import mongoose from "mongoose";

export interface User {
  Name: string;
  Contact: number;
  Address: string;
  paymentInfo: any;
  paidAt: Date;
}

const UserSchema = new mongoose.Schema<User>({
  Name: {
    type: String,
    required: true,
  },
  Address: {
    type: String,
    required: true,
  },
  Contact: {
    type: Number,
  },
  paymentInfo: {
    type: mongoose.Schema.ObjectId,
    ref: "Payment",
  },
  paidAt: {
    type: Date,
  },
});

export default mongoose.model("User", UserSchema);
