import z from "zod";

export const registerSchema = z.object({
    username: z.string().min(3).max(100 , "Username must be between 3 and 100 characters"),
    email: z.string().email( "Invalid email address"),
})

// Schema for updating - both fields are optional()
export const updateUserSchema = registerSchema.partial();

export type RegisterInput = z.infer<typeof registerSchema>
export type UpdateUserInput = z.infer<typeof updateUserSchema>