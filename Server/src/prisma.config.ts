// prisma.config.ts
import { PrismaClient } from "@prisma/client";

export const prisma = new PrismaClient({
  datasources: {
    db: {
      // You can either pass DATABASE_URL directly here
      url: process.env.DATABASE_URL,
    },
  },
});
