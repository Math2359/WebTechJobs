import { z } from "zod";

export const recuperarSenhaSchema = z.object({
    login: z.email("E-mail inválido"),
})
