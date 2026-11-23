import "dotenv/config";
import { prisma } from "../lib/prisma";

async function main() {
  const result = await prisma.$queryRaw`SELECT 1 AS ok`;
  console.log("Database connected:", result);
}

main()
  .catch((e) => {
    console.error("Connection failed:", e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());