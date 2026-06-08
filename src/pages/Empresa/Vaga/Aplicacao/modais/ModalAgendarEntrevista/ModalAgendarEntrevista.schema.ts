import z from "zod"

export const agendarEntrevistaSchema = z.object({
    data: z.date().or(z.undefined()).refine(Boolean, "Data da entrevista é obrigatória"),
    hora: z.string().regex(/^([01]\d|2[0-3]):[0-5]\d$/, "Informe um horário válido"),
    local: z.string().min(1, "Local ou link da entrevista é obrigatório"),
    observacao: z.string()
})
