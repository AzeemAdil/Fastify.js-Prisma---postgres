import type { FastifyInstance , FastifyPluginOptions , FastifyRequest , FastifyReply  } from "fastify";


const authRoutes = async (app: FastifyInstance , options: FastifyPluginOptions) => {

    app.post('/register' , async (request: FastifyRequest , reply: FastifyReply) => {
        return reply.send({ message: "User registered successfully | Register route" })
    })
}

export default authRoutes;