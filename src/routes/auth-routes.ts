import type { FastifyInstance, FastifyPluginOptions, FastifyRequest, FastifyReply } from "fastify";
import { registerSchema, updateUserSchema } from "../validations/auth-validation.ts";

const authRoutes = async (app: FastifyInstance, options: FastifyPluginOptions) => {

    // 1. REGISTER (CREATE): Add a new user
    app.post('/register', {
        schema: {
            body: registerSchema
        }
    }, async (request: FastifyRequest, reply: FastifyReply) => {
        const { username, email } = request.body as any;
        
        const user = await app.prisma.user.create({
            data: { username, email }
        });

        return reply.status(201).send({ 
            message: "User registered successfully",
            user 
        });
    });

    // 2. READ: Get all users
    app.get("/users", async (request, reply) => {
        const users = await app.prisma.user.findMany();
        return users;
    });

    // 3. READ: Get one user by ID
    app.get("/users/:id", async (request : FastifyRequest, reply : FastifyReply) => {
        const { id } = request.params as { id: string };
        
        const user = await app.prisma.user.findUnique({
            where: { id: Number(id) }
        });

        if (!user) {
            return reply.status(404).send({ error: "User not found" });
        }

        return user;
    });

    // 4. UPDATE: Modify a user
    app.put("/users/:id", {
        schema: {
            body: updateUserSchema
        }
    }, async (request : FastifyRequest, reply : FastifyReply) => {
        const { id } = request.params as { id: string };
        const data = request.body as any;

        const user = await app.prisma.user.update({
            where: { id: Number(id) },
            data
        });

        return user;
    });

    // 5. DELETE: Remove a user
    app.delete("/users/:id", async (request : FastifyRequest, reply : FastifyReply) => {
        const { id } = request.params as { id: string };

        await app.prisma.user.delete({
            where: { id: Number(id) }
        });

        return reply.status(204).send();
    });
}

export default authRoutes;