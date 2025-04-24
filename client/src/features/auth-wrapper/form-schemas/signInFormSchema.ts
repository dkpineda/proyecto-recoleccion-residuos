import { z } from "zod";

export const SignInFormSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
});

export type SignInFormSchema = z.infer<typeof SignInFormSchema>;
