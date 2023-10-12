"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.instance = void 0;
const razorpay_1 = __importDefault(require("razorpay"));
const app_1 = __importDefault(require("./app"));
const dbConnection_1 = require("./config/dbConnection");
//**********************************DataBase Connect*********************************/
(0, dbConnection_1.dbConnection)();
exports.instance = new razorpay_1.default({
    key_id: process.env.RAZORPAY_API_KEY,
    key_secret: process.env.RAZORPAY_API_SECRET,
});
app_1.default.listen(process.env.PORT, () => {
    return console.log(`Express is listening at http://localhost:${process.env.PORT}}`);
});
//# sourceMappingURL=index.js.map