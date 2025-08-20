import express from "express";
import cors from 'cors';
import dotenv from 'dotenv';
import { rootRouter } from "./route/root";

const app = express();


dotenv.config();

const PORT = process.env.PORT;

app.use(cors({
    origin : `http://localhost:5173`,
    credentials : true
}))
app.use(express.json())
app.use("/api",rootRouter)


app.listen(PORT , () => {
    console.log("running in port")
})