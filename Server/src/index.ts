import express from "express";
import cors from 'cors';
import dotenv from 'dotenv';
import { rootRouter } from "./route/root";
import path from "path";

dotenv.config();                         // ✅ Load .env first

const app = express();
const PORT = process.env.PORT || 8080;  // ✅ Safe fallback


app.use((req, res, next) => {
  const origin = req.headers.origin;

  const allowedOrigins = [
    "http://localhost:5173",
    "https://code-narrator-ai.vercel.app"
  ];

  if (origin && allowedOrigins.includes(origin)) {
    res.setHeader("Access-Control-Allow-Origin", origin);
  }

  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );

  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, PATCH, DELETE, OPTIONS"
  );

  res.setHeader("Access-Control-Allow-Credentials", "true");

  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }

  next();
});


app.use(express.json());

// ✅ Serve uploads
app.use("/uploads", express.static(path.join(__dirname, "../uploads")));

app.use("/api", rootRouter);

app.listen(PORT, () => {
    console.log(`running in ${PORT}`);
});
