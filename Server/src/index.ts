import express from "express";
import cors from 'cors';
import dotenv from 'dotenv';
import router from "./route/explain";

const app = express();


dotenv.config();

const PORT = process.env.PORT;

app.use(cors({
    origin : `localhost://3000`,
    credentials : true
}))
app.use(express.json())
app.use("/api",router)


app.listen(PORT , () => {
    console.log("running in port")
})