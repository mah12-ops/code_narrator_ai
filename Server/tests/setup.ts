import dotenv from "dotenv";
dotenv.config({ path: ".env.test" });
console.log("TEST DB:", process.env.DATABASE_URL);
