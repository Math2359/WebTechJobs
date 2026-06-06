import z from "zod"

export const editarSchema = z.object({
    sobreEmpresa: z.object({
        descricao: z.string().or(z.undefined()),
        setor: z.string().max(250, "Máximo de 250 caracteres").or(z.undefined()),
        tecnologias: z.array(z.string()).max(20, "Máximo de 20 tecnologias"),
    }),
    contato: z.object({
        linkSite: z.url("URL do site inválida").or(z.undefined()),
    }),
})