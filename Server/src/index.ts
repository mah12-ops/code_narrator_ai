import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { rootRouter } from "./route/root";
import path from "path";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8080;

const allowedOrigins = [
  "http://localhost:5173",
  "https://code-narrator-ai.vercel.app"
];

app.use(cors({
  origin: function (origin, callback) {
    // allow requests with no origin like mobile apps or curl
    if (!origin) return callback(null, true);

    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

// ✅ IMPORTANT: Handle preflight properly
app.options("*", cors());

app.use(express.json());

// serve uploads
app.use("/uploads", express.static(path.join(__dirname, "../uploads")));

app.use("/api", rootRouter);

app.listen(PORT, () => {
  console.log(`running on port ${PORT}`);
});
