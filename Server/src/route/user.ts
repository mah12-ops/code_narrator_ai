import { Router } from "express";
import { signup, login, me, updateProfile, upload } from "../controller/user";
import { authMiddleware } from "../middleware/auth";

const userRouter = Router();

userRouter .post("/signup", signup);
userRouter .post("/login", login);
userRouter .get("/me", authMiddleware, me);
userRouter.put("/me",authMiddleware, upload.single("profileImage"), updateProfile);

export default userRouter ;
