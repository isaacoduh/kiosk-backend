import { PrismaClient } from "@prisma/client";

declare global {
  namespace globalThis {
    var primsadb: PrismaClient;
  }
}

const prisma = new PrismaClient();

if (process.env.NODE_ENV === "production") global.primsadb = prisma;
export default prisma;
