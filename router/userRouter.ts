import express from "express"
import {UserCreate, deleteUser, getAllUsers, paymentVerification, updateUser} from "../controllers/UserController";

const router = express.Router();


router.post("/create", UserCreate)
router.post("/paymentverification", paymentVerification);
router.get("/getallusers", getAllUsers)
router.put("/updateuser/:id", updateUser)
router.delete("/deletetodo/:id",deleteUser)

export  default router