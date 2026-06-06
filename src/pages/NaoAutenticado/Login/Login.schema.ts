import { z } from "zod";

export const loginSchema = z.object({
    login: z
        .email("E-mail inválido"),
    senha: z
        .string()
        .min(1, "Senha é obrigatória"),
})