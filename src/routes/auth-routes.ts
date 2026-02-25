import type { FastifyInstance , FastifyPluginOptions , FastifyRequest , FastifyReply  } from "fastify";
import { registerSchema } from "../validations/auth-validation.ts";


const authRoutes = async (app: FastifyInstance , options: FastifyPluginOptions) => {

    app.post('/register', {
        schema: {
            body: registerSchema
        }
    } , async (request: FastifyRequest , reply: FastifyReply) => {
        return reply.send({ message: "User registered successfully | Register route" })
    })
}

export default authRoutes;