import express from "express";
import cors from 'cors';
import dotenv from 'dotenv';
import { rootRouter } from "./route/root";
import path from "path";

const app = express();


dotenv.config();

const PORT = process.env.PORT;

app.use(cors({
    origin : `http://localhost:5173`,
    credentials : true
}))
app.use(express.json())
// Serve uploads folder publicly
app.use("/uploads", express.static(path.join(__dirname, "../uploads")));
app.use("/api",rootRouter)


app.listen(PORT , () => {
    console.log("running in port")
})