"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const UserController_1 = require("../controllers/UserController");
const router = express_1.default.Router();
router.post("/create", UserController_1.UserCreate);
router.post("/paymentverification", UserController_1.paymentVerification);
router.get("/getallusers", UserController_1.getAllUsers);
router.put("/updateuser/:id", UserController_1.updateUser);
router.delete("/deletetodo/:id", UserController_1.deleteUser);
exports.default = router;
//# sourceMappingURL=userRouter.js.map