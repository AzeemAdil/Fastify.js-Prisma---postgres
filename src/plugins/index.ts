import type { FastifyInstance } from "fastify";
import utilsPlugin from "./utils.ts";

export const setupPlugins = async (app: FastifyInstance) => {
    await app.register(utilsPlugin);
}