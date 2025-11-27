// src/app.ts
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { rootRouter } from "./route/root";
import path from "path";

const envFile =
  process.env.NODE_ENV === "test" ? ".env.test" : ".env";

dotenv.config({ path: envFile });

export const createApp = () => {
  const app = express();

 app.use(cors({
  origin: [
    "http://localhost:5173",
    "https://code-narrator-ai.vercel.app"
  ],
  credentials: true,
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));


  app.use(express.json());
  app.use("/uploads", express.static(path.join(__dirname, "../uploads")));
  app.use("/api", rootRouter);

  return app;
};
