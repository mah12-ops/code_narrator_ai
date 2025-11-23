import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { rootRouter } from "./route/root";
import path from "path";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8080;

// Build allowed origins from environment or defaults. In production we allow any Vercel app subdomain
const envAllowed = (process.env.ALLOWED_ORIGINS || "").split(",").map(s => s.trim()).filter(Boolean);
const defaultAllowed = ["http://localhost:5173", "https://code-narrator-ai.vercel.app"];

app.use(cors({
  origin: function (origin, callback) {
    // allow requests with no origin (curl, mobile apps, server-to-server)
    if (!origin) return callback(null, true);

    // allow explicit env-configured origins
    if (envAllowed.includes(origin)) return callback(null, true);

    // allow default list
    if (defaultAllowed.includes(origin)) return callback(null, true);

    // allow Vercel frontends (any project deployed to *.vercel.app)
    try {
      const u = new URL(origin);
      if (u.hostname.endsWith(".vercel.app")) return callback(null, true);
    } catch (e) {
      // ignore parse errors
    }

    return callback(new Error("Not allowed by CORS"));
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization", "Accept"]
}));

// Ensure preflight responses are handled using the same CORS settings
app.options("*", cors());

app.use(express.json());

// serve uploads
app.use("/uploads", express.static(path.join(__dirname, "../uploads")));

app.use("/api", rootRouter);

app.listen(PORT, () => {
  console.log(`running on port ${PORT}`);
});
