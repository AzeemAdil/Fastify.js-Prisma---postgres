import z from "zod";

export const registerSchema = z.object({
    username: z.string().min(3).max(100 , "Username must be between 3 and 100 characters"),
    email: z.email( "Invalid email address"),
})

export type RegisterInput = z.infer<typeof registerSchema>