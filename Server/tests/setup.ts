import dotenv from "dotenv";
import { PrismaClient } from "@prisma/client";

dotenv.config({ path: ".env.test" });

export const prisma = new PrismaClient();

afterAll(async () => {
  await prisma.$disconnect();
});
