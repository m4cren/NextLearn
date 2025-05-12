import { z } from "zod";

export const RegisterFormSchema = z
    .object({
        email: z.string().email({ message: "Please use a valid email" }).trim(),
        password: z
            .string()
            .min(7, { message: "Use more than 7 characters" })
            .trim(),
        confirmPassword: z.string().trim(),
    })
    .superRefine(({ confirmPassword, password }, ctx) => {
        if (confirmPassword !== password) {
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: "Password do not match",
                path: ["confirmPassword"],
            });
        }
    });

export const LoginFormSchema = z.object({
    email: z.string().email({ message: "Please use a valid email" }).trim(),
    password: z.string().min(1, { message: "Password required" }).trim(),
});
