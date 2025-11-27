import { PrismaClient } from "@prisma/client";
import { config } from "dotenv";

if (process.env.NODE_ENV === "test") {
  config({ path: ".env.test" });
} else {
  config();
}

export const prisma = new PrismaClient({
  datasourceUrl: process.env.DATABASE_URL
});
