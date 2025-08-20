import { Router } from "express";
import { signup, login, me } from "../controller/user";

const userRouter = Router();

userRouter .post("/signup", signup);
userRouter .post("/login", login);
userRouter .get("/me", me);

export default userRouter ;
