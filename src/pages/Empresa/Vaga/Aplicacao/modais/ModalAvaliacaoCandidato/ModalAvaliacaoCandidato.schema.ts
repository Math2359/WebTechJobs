import z from "zod"

export const avaliacaoCandidatoSchema = z.object({
    observacao: z.string()
})
