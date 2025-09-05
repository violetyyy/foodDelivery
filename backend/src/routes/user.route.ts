import { Router } from "express";
import { signIn, signUp } from "../controllers/user.controller.js";

export const userRouter = Router();

userRouter.post("/sign-up", signUp);
userRouter.post("/sign-in", signIn);
