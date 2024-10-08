import express from "express";
import { userLogin, userLogout, userSignup } from "./userController";
const router = express.Router();
router.post("/", userSignup);
router.post("/login", userLogin)
router.post("/logout",userLogout)

export { router as userRoute };
