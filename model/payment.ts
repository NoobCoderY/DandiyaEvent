import mongoose from "mongoose";

export interface Payment{
    razorpay_order_id: string,
    razorpay_payment_id: string,
    razorpay_signature: string
    createdAt:Date
}

const schema = new mongoose.Schema<Payment>({
  razorpay_order_id: {
    type: String,
    required: true,
  },
  razorpay_payment_id: {
    type: String,
    required: true,
  },
  razorpay_signature: {
    type: String,
    required: true,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export const Payment = mongoose.model("Payment", schema);