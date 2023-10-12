"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = exports.updateUser = exports.getAllUsers = exports.paymentVerification = exports.UserCreate = void 0;
const errorHandler_1 = __importDefault(require("../utils/errorHandler"));
const userModel_1 = __importDefault(require("../model/userModel"));
const __1 = require("..");
const payment_1 = require("../model/payment");
const crypto_1 = __importDefault(require("crypto"));
//**********************************Create User*********************************/
const UserCreate = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { totalAmount } = req.body;
        const options = {
            amount: Number(totalAmount) * 100,
            currency: "INR",
        };
        const order = yield __1.instance.orders.create(options);
        console.log(order);
        res.status(200).json({
            success: true,
            order,
        });
    }
    catch (error) {
        return next(new errorHandler_1.default(error, 401));
    }
});
exports.UserCreate = UserCreate;
const paymentVerification = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { razorpay_payment_id, razorpay_order_id, razorpay_signature, userDetails, } = req.body;
    const body = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSignature = crypto_1.default
        .createHmac("sha256", process.env.RAZORPAY_API_SECRET)
        .update(body)
        .digest("hex");
    const isAuthentic = expectedSignature === razorpay_signature;
    if (isAuthentic) {
        const payment = yield payment_1.Payment.create({
            razorpay_order_id,
            razorpay_payment_id,
            razorpay_signature,
        });
        const user = yield userModel_1.default.create(Object.assign(Object.assign({}, userDetails), { paidAt: new Date(Date.now()), paymentInfo: payment._id }));
        res.status(201).json({
            success: true,
            message: `User Created Successfully. Payment ID: ${payment._id}`,
            user,
        });
    }
    else {
        return next(new errorHandler_1.default("Payment Failed", 400));
    }
});
exports.paymentVerification = paymentVerification;
// **********************************Get All Users*********************************/
const getAllUsers = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield userModel_1.default.find({});
        res.status(200).json({
            message: "success",
            users,
        });
    }
    catch (error) {
        return next(new errorHandler_1.default(error, 401));
    }
});
exports.getAllUsers = getAllUsers;
//**********************************update User  *********************************/
const updateUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const { Name, Contact, Address } = req.body;
        const user = yield userModel_1.default.findOneAndUpdate({ _id: id }, {
            Name: Name,
            Address: Address,
            Contact: Contact,
        }, {
            new: true,
        });
        res.status(200).json({
            message: "success",
            user,
        });
    }
    catch (error) {
        return next(new errorHandler_1.default(error, 401));
    }
});
exports.updateUser = updateUser;
//**********************************Delete By Id*********************************/
const deleteUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const user = yield userModel_1.default.findOneAndDelete({ _id: id });
        res.status(200).json({
            message: "successfully deleted",
            user,
        });
    }
    catch (error) {
        return next(new errorHandler_1.default(error, 401));
    }
});
exports.deleteUser = deleteUser;
//# sourceMappingURL=UserController.js.map