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
exports.explainCode = explainCode;
// src/services/codeNarrator.ts
const axios_1 = __importDefault(require("axios"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY;
const API_URL = 'https://openrouter.ai/api/v1/chat/completions';
if (!OPENROUTER_API_KEY) {
    console.error('❌ OPENROUTER_API_KEY is not defined in environment variables.');
    process.exit(1);
}
function explainCode(code, language) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a;
        try {
            const messages = [
                {
                    role: 'system',
                    content: `You are CodeNarrator, an expert AI that explains ${language} code clearly and line by line.`,
                },
                {
                    role: 'user',
                    content: `Explain this ${language} code:\n\n${code}`,
                },
            ];
            const response = yield axios_1.default.post(API_URL, {
                model: 'mistralai/mistral-7b-instruct', // Or try 'openai/gpt-3.5-turbo' if allowed on OpenRouter
                messages,
                temperature: 0.4,
            }, {
                headers: {
                    Authorization: `Bearer ${OPENROUTER_API_KEY}`,
                    'Content-Type': 'application/json',
                    'HTTP-Referer': 'http://localhost:5173', // Optional: your site or localhost
                    'X-Title': 'CodeNarratorAI', // Optional: a name for the app
                },
            });
            return response.data.choices[0].message.content;
        }
        catch (error) {
            console.error('🛑 Error explaining code:', ((_a = error.response) === null || _a === void 0 ? void 0 : _a.data) || error.message);
            throw new Error('Failed to explain code');
        }
    });
}
