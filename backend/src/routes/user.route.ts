import { Router } from "express";
import { signIn, signUp } from "../controllers/user.controller.js";

export const userRouter = Router();

userRouter.post("/signup", signUp);
userRouter.post("/signin", signIn);
