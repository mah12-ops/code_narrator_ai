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
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const openaiservice_1 = require("../controller/openaiservice");
const ExplainRouter = (0, express_1.Router)();
ExplainRouter.post('/explain', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { code, language } = req.body;
    if (!code || !language) {
        return res.status(400).json({ error: 'Code and language are required.' });
    }
    try {
        const explanation = yield (0, openaiservice_1.explainCode)(code, language);
        res.json({ explanation });
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ error: 'AI failed to generate explanation.' });
    }
}));
exports.default = ExplainRouter;
