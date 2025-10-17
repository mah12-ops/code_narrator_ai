"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.resetPassword = exports.updateProfile = exports.me = exports.upload = exports.login = exports.signup = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const client_1 = require("@prisma/client");
// import { generateResetToken } from "../utils/generateResetToken"; // Must implement
// import { sendResetEmail } from "../utils/sendResetEmail"; // Must implement
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const prisma = new client_1.PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET || "supersecret";
// Signup
const signup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, password } = req.body;
    if (!name || !email || !password)
        return res.status(400).json({ message: "All fields are required" });
    try {
        const existingUser = yield prisma.user.findUnique({ where: { email } });
        if (existingUser)
            return res.status(400).json({ message: "Email already exists" });
        const hashedPassword = yield bcryptjs_1.default.hash(password, 10);
        const user = yield prisma.user.create({
            data: { name, email, password: hashedPassword },
        });
        const token = jsonwebtoken_1.default.sign({ id: user.id }, JWT_SECRET, { expiresIn: "7d" });
        res.json({ user: { id: user.id, name: user.name, email: user.email }, token });
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
});
exports.signup = signup;
// Login
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    if (!email || !password)
        return res.status(400).json({ message: "Email and password are required" });
    try {
        const user = yield prisma.user.findUnique({ where: { email } });
        if (!user)
            return res.status(400).json({ message: "Invalid credentials" });
        const isMatch = yield bcryptjs_1.default.compare(password, user.password);
        if (!isMatch)
            return res.status(400).json({ message: "Invalid credentials" });
        const token = jsonwebtoken_1.default.sign({ id: user.id }, JWT_SECRET, { expiresIn: "7d" });
        res.json({ user: { id: user.id, name: user.name, email: user.email }, token });
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
});
exports.login = login;
const storage = multer_1.default.diskStorage({
    destination: (req, file, cb) => {
        const uploadPath = path_1.default.join(__dirname, "../../uploads");
        if (!fs_1.default.existsSync(uploadPath))
            fs_1.default.mkdirSync(uploadPath, { recursive: true });
        cb(null, uploadPath);
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + "-" + file.originalname);
    },
});
exports.upload = (0, multer_1.default)({ storage });
// GET current user
const me = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.user.id; // ✅ Now this will exist
        const user = yield prisma.user.findUnique({
            where: { id: userId },
        });
        if (!user)
            return res.status(404).json({ message: "User not found" });
        res.json(Object.assign(Object.assign({}, user), { profileImage: user.profileImage
                ? `http://localhost:8080/uploads/${user.profileImage}`
                : null }));
    }
    catch (err) {
        res.status(500).json({ message: "Failed to fetch user" });
    }
});
exports.me = me;
// PUT update profile
const updateProfile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.user.id;
        let profileImagePath;
        if (req.file) {
            // ✅ store only the filename
            profileImagePath = req.file.filename;
        }
        const updatedUser = yield prisma.user.update({
            where: { id: userId },
            data: Object.assign({ name: req.body.name, email: req.body.email }, (profileImagePath && { profileImage: profileImagePath })),
        });
        res.json(Object.assign(Object.assign({}, updatedUser), { profileImage: updatedUser.profileImage
                ? `http://localhost:8080/uploads/${updatedUser.profileImage}`
                : null }));
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Failed to update profile" });
    }
});
exports.updateProfile = updateProfile;
// Reset Password
const resetPassword = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { token, newPassword } = req.body;
    if (!token || !newPassword)
        return res.status(400).json({ message: "Missing token or password" });
    const user = yield prisma.user.findFirst({
        where: {
            resetToken: token,
            resetTokenExpiry: { gte: new Date() }, // valid token
        },
    });
    if (!user)
        return res.status(400).json({ message: "Invalid or expired token" });
    const hashedPassword = yield bcryptjs_1.default.hash(newPassword, 10);
    yield prisma.user.update({
        where: { id: user.id },
        data: { password: hashedPassword, resetToken: null, resetTokenExpiry: null },
    });
    res.json({ message: "Password reset successfully!" });
});
exports.resetPassword = resetPassword;
