"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const root_1 = require("./route/root");
const path_1 = __importDefault(require("path"));
dotenv_1.default.config(); // ✅ Load .env first
const app = (0, express_1.default)();
const PORT = process.env.PORT || 8080; // ✅ Safe fallback
app.use((0, cors_1.default)({
    origin: ["http://localhost:5173", "https://code-narrator-ai.vercel.app"],
    credentials: true
}));
app.use(express_1.default.json());
// ✅ Serve uploads
app.use("/uploads", express_1.default.static(path_1.default.join(__dirname, "../uploads")));
app.use("/api", root_1.rootRouter);
app.listen(PORT, () => {
    console.log(`running in ${PORT}`);
});
