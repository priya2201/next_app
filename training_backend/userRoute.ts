import express from "express";
import { loginHandler, userLogin, userLogin1, userLogout, userSignup } from "./userController";
const router = express.Router();
router.post("/", userSignup);
router.post("/login", userLogin)
router.post("/logout",userLogout)
router.post('/validate',userLogin1,loginHandler)
export { router as userRoute };
