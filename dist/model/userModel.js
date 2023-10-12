"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const UserSchema = new mongoose_1.default.Schema({
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
        type: mongoose_1.default.Schema.ObjectId,
        ref: "Payment",
    },
    paidAt: {
        type: Date,
    },
});
exports.default = mongoose_1.default.model("User", UserSchema);
//# sourceMappingURL=userModel.js.map