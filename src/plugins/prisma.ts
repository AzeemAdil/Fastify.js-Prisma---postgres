import fp from "fastify-plugin";
import type { FastifyPluginAsync } from "fastify";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@prisma/client";
import Env from "../config/env.ts";

// 1. Extend Fastify's types so TypeScript knows about 'app.prisma'
declare module "fastify" {
  interface FastifyInstance {
    prisma: PrismaClient;
  }
}

const prismaPlugin: FastifyPluginAsync = fp(async (fastify, opts) => {
  // 2. Instantiate the Prisma Client

  const adapter = new PrismaPg({
    connectionString: Env.DATABASE_URL,
  });
  const prisma = new PrismaClient({adapter});

  // 3. Connect to the database
  await prisma.$connect();

  // 4. "Decorate" Fastify: This makes 'prisma' available globally on the 'app' object
  fastify.decorate("prisma", prisma);

  // 5. Clean up: Disconnect when the server shuts down
  fastify.addHook("onClose", async (instance) => {
    await instance.prisma.$disconnect();
    instance.log.info("Prisma disconnected");
  });
  
  fastify.log.info("Prisma plugin registered and connected");
});

export default prismaPlugin;
