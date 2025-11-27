import { PrismaClient } from "@prisma/client";
import { config } from "dotenv";


export const prisma = new PrismaClient();
if (process.env.NODE_ENV === "test") {
  config({ path: ".env.test" });
} else {
  config();
}
