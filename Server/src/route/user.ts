import { Router } from "express";
import { signup, login, me, updateProfile } from "../controller/user";

const userRouter = Router();

userRouter .post("/signup", signup);
userRouter .post("/login", login);
userRouter .get("/me", me);
userRouter.put("/me",updateProfile)

export default userRouter ;
