import fastify from "fastify";

import type { ZodTypeProvider } from "fastify-type-provider-zod";

import cors from "@fastify/cors";
import helmet from "@fastify/helmet";
import jwt from "@fastify/jwt";
import Env from "./utils/env.ts";

import {
  validatorCompiler,
  serializerCompiler,
} from "fastify-type-provider-zod";

import authRoutes from "./routes/auth-routes.ts";

const Fastify = fastify({
    logger: true,
})

const app = Fastify.withTypeProvider<ZodTypeProvider>();

app.register(cors);
app.register(helmet);

app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);

app.register(authRoutes, { prefix: "/api/auth" });

app.get("/", async (request, reply) => {
    return { hello: "World" };
});

app.setErrorHandler((error, request, reply) => {
    console.error(error);
    reply.status(500).send({ error: `Internal Server Error: ${(error as any).message}` });
});

const start = async () => {
    await app.listen({ port: Number(Env.APP_PORT) });
    console.log(`Server started at http://localhost:${Env.APP_PORT} .... `);
};

start();