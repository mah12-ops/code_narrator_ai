import { Router } from "express";
import { signup, login, me, updateProfile, upload } from "../controller/user";

const userRouter = Router();

userRouter .post("/signup", signup);
userRouter .post("/login", login);
userRouter .get("/me", me);
userRouter.put("/me", upload.single("profileImage"), updateProfile);

export default userRouter ;
