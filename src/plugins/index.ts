import type { FastifyInstance } from "fastify";
import utilsPlugin from "./utils.ts";
import prismaPlugin from "./prisma.ts";

export const setupPlugins = async (app: FastifyInstance) => {
    await app.register(utilsPlugin);
    await app.register(prismaPlugin);
}