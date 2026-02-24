import fastify from "fastify";

import cors from "@fastify/cors";
import helmet from "@fastify/helmet";
import jwt from "@fastify/jwt";

import authRoutes from "./routes/auth-routes.ts";

const app = fastify({
    logger: true
})

app.register(cors)
app.register(helmet)


app.register(authRoutes , { prefix: "/api/auth" })


app.get('/', async (request, reply) => {
    return { hello: "World" }
})

export default app;