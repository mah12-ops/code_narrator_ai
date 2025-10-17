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
const app = (0, express_1.default)();
app.use(express_1.default.json());
dotenv_1.default.config();
const PORT = process.env.PORT;
app.use((0, cors_1.default)({
    origin: `http://localhost:5173`,
    credentials: true
}));
app.use(express_1.default.json());
// Serve uploads folder publicly
app.use("/uploads", express_1.default.static(path_1.default.join(__dirname, "../uploads")));
app.use("/api", root_1.rootRouter);
app.listen(PORT, () => {
    console.log("running in port");
});
