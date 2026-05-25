import { z } from "zod"; 

export const registerSchema = z.object({
    name: z.string().min(1, "Name is required"),
    email: z.string().email("Please provide a valid email"),
    password: z.string().min(8, "Password must be at least 8 characters").max(32, "Password must be at most 32 characters"),
}); 


export type RegisterInput = z.infer<typeof registerSchema>
