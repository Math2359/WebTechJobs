import z from "zod";

export const baseSchema = z
    .object({
        nome: z
            .string()
            .min(3, "O nome deve ter pelo menos 3 caracteres"),

        email: z
            .email("E-mail inválido"),

        senha: z
            .string()
            .min(6, "A senha deve ter pelo menos 6 caracteres"),

        confirmarSenha: z.string(),
    })
    .refine((data) => data.senha === data.confirmarSenha, {
        message: "As senhas não coincidem",
        path: ["confirmarSenha"],
    })