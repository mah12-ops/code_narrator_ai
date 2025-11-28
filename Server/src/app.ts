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

 // Build a flexible origin checker so the same code works locally and on Render / Vercel
 const allowedEnv = process.env.ALLOWED_ORIGINS || ""; // comma-separated list of allowed origins
 const allowedList = allowedEnv.split(",").map(s => s.trim()).filter(Boolean);

 function isAllowedOrigin(origin: string | undefined) {
  if (!origin) return false; // treat missing origin (e.g. server-to-server or curl) as not allowed here

  // Exact match from env list
  if (allowedList.includes(origin)) return true;

  // Allow local dev origin
  if (origin === "http://localhost:5173" ) return true;

  // Allow any Vercel app domain (subdomains ending with .vercel.app)
  if (origin.endsWith(".vercel.app")) return true;

  // Allow Render hostnames and known Vercel domains used in production
  if (origin.includes("onrender.com") || origin.includes("vercel.app")) return true;

  return false;
 }

 app.use(cors({
  origin: (incomingOrigin, callback) => {
    // Allow undefined origin for same-site tools (Postman, server-to-server) - treat as allowed
    if (!incomingOrigin) return callback(null, true);

    if (isAllowedOrigin(incomingOrigin as string)) return callback(null, true);
    // otherwise reject
    return callback(new Error(`Origin ${incomingOrigin} not allowed by CORS`));
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

 // Note: cors() middleware above will handle preflight (OPTIONS) requests; explicit app.options caused
 // a path parsing error in tests because certain environments can produce unexpected path strings.


  app.use(express.json());
  app.use("/uploads", express.static(path.join(__dirname, "../uploads")));
  app.use("/api", rootRouter);

  return app;
};
