import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";
// import { generateResetToken } from "../utils/generateResetToken"; // Must implement
// import { sendResetEmail } from "../utils/sendResetEmail"; // Must implement
import multer from "multer";
import path from "path";
import fs from "fs";



const prisma = new PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET || "supersecret";

// Signup
export const signup = async (req: Request, res: Response) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password)
    return res.status(400).json({ message: "All fields are required" });

  try {
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser)
      return res.status(400).json({ message: "Email already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: { name, email, password: hashedPassword },
    });

    const token = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: "7d" });
    res.json({ user: { id: user.id, name: user.name, email: user.email }, token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// Login
export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  if (!email || !password)
    return res.status(400).json({ message: "Email and password are required" });

  try {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: "7d" });
    res.json({ user: { id: user.id, name: user.name, email: user.email }, token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

const storage = multer.diskStorage({
  destination: (req: Request, file: Express.Multer.File, cb: (error: Error | null, destination: string) => void) => {
    const uploadPath = path.join(__dirname, "../../uploads");
    if (!fs.existsSync(uploadPath)) fs.mkdirSync(uploadPath, { recursive: true });
    cb(null, uploadPath);
  },
  filename: (req: Request, file: Express.Multer.File, cb: (error: Error | null, filename: string) => void) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

export const upload = multer({ storage });

// GET current user
export const me = async (req: Request, res: Response) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer "))
    return res.status(401).json({ message: "Unauthorized" });

  const token = authHeader.split(" ")[1];
    try {
    const userId = (req as any).user.id;

    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) return res.status(404).json({ message: "User not found" });

    res.json({
      ...user,
      profileImage: user.profileImage
        ? `http://localhost:8080/uploads/${user.profileImage}`
        : null,
    });
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch user" });
  }
};

// PUT update profile
export const updateProfile = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.id;

    let profileImagePath: string | undefined;
    if ((req as any).file) {
      // ✅ store only the filename
      profileImagePath = (req as any).file.filename;
    }

    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: {
        name: req.body.name,
        ...(profileImagePath && { profileImage: profileImagePath }),
      },
    });

    res.json({
      ...updatedUser,
      profileImage: updatedUser.profileImage
        ? `http://localhost:8080/uploads/${updatedUser.profileImage}`
        : null,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to update profile" });
  }
};

// Forgot Password
// export const forgotPassword = async (req: Request, res: Response) => {
//   const { email } = req.body;
//   const user = await prisma.user.findUnique({ where: { email } });
//   if (!user) return res.status(404).json({ message: "User not found" });

//   const resetToken = generateResetToken();

//   await prisma.user.update({
//     where: { email },
//     data: {
//       resetToken,
//       resetTokenExpiry: new Date(Date.now() + 1000 * 60 * 60), // 1 hour expiry
//     },
//   });

//   await sendResetEmail(email, resetToken);
//   res.json({ message: "Password reset link sent to your email." });
// };

// Reset Password
export const resetPassword = async (req: Request, res: Response) => {
  const { token, newPassword } = req.body;
  if (!token || !newPassword)
    return res.status(400).json({ message: "Missing token or password" });

  const user = await prisma.user.findFirst({
    where: {
      resetToken: token,
      resetTokenExpiry: { gte: new Date() }, // valid token
    },
  });

  if (!user) return res.status(400).json({ message: "Invalid or expired token" });

  const hashedPassword = await bcrypt.hash(newPassword, 10);

  await prisma.user.update({
    where: { id: user.id },
    data: { password: hashedPassword, resetToken: null, resetTokenExpiry: null },
  });

  res.json({ message: "Password reset successfully!" });
};
