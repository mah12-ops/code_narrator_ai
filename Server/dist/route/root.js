"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.rootRouter = void 0;
const express_1 = require("express");
const explain_1 = __importDefault(require("./explain"));
const user_1 = __importDefault(require("./user"));
exports.rootRouter = (0, express_1.Router)();
exports.rootRouter.use("/", explain_1.default);
exports.rootRouter.use("/auth", user_1.default);
