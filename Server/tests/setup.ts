import dotenv from "dotenv";
import { PrismaClient } from "@prisma/client";

dotenv.config({ path: ".env.test" });

export const prisma = new PrismaClient();
beforeEach(async () => {
  // ensure a clean database before each test
  await prisma.user.deleteMany();
  await prisma.explanation.deleteMany();
});

afterAll(async () => {
  await prisma.$disconnect();
});
