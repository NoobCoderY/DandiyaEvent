import express, { Request, Response, NextFunction } from "express";
import ErrorHandler from "../utils/errorHandler";
import UserModel from "../model/userModel";
import { instance } from "..";
import { Payment } from "../model/payment";
import crypto from "crypto";

//**********************************Create User*********************************/

export const UserCreate = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { totalAmount } = req.body;


    const options = {
      amount: Number(totalAmount) * 100,
      currency: "INR",
    };

    const order = await instance.orders.create(options);
    console.log(order);

    res.status(200).json({
      success: true,
      order,
    });
  } catch (error: any) {
    return next(new ErrorHandler(error, 401));
  }
};

export const paymentVerification = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const {
    razorpay_payment_id,
    razorpay_order_id,
    razorpay_signature,
    userDetails,
  } = req.body;
 

  const body = razorpay_order_id + "|" + razorpay_payment_id;

  const expectedSignature = crypto
    .createHmac("sha256", process.env.RAZORPAY_API_SECRET)
    .update(body)
    .digest("hex");

  const isAuthentic = expectedSignature === razorpay_signature;

  if (isAuthentic) {
    const payment = await Payment.create({
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
    });

    const user = await UserModel.create({
      ...userDetails,
      paidAt: new Date(Date.now()),
      paymentInfo: payment._id,
    });

    res.status(201).json({
      success: true,
      message: `User Created Successfully. Payment ID: ${payment._id}`,
      user,
    });
  } else {
    return next(new ErrorHandler("Payment Failed", 400));
  }
};

// **********************************Get All Users*********************************/

export const getAllUsers = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const users = await UserModel.find({});

    res.status(200).json({
      message: "success",
      users,
    });
  } catch (error: any) {
    return next(new ErrorHandler(error, 401));
  }
};

//**********************************update User  *********************************/

export const updateUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = req.params.id;
    const { Name, Contact, Address } = req.body;
    const user = await UserModel.findOneAndUpdate(
      { _id: id },
      {
        Name: Name,
        Address: Address,
        Contact: Contact,
      },
      {
        new: true,
      }
    );

    res.status(200).json({
      message: "success",
      user,
    });
  } catch (error: any) {
    return next(new ErrorHandler(error, 401));
  }
};

//**********************************Delete By Id*********************************/

export const deleteUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = req.params.id;
    const user = await UserModel.findOneAndDelete({ _id: id });
    res.status(200).json({
      message: "successfully deleted",
      user,
    });
  } catch (error: any) {
    return next(new ErrorHandler(error, 401));
  }
};
