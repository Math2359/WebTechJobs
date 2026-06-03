import z from "zod"

export const editarSchema = z.object({
    sobreMim: z.object({
        descricao: z.string().or(z.undefined()),
        preferencias: z.array(z.string()).max(4, "Máximo de 4 preferências"),
        area: z.string().or(z.undefined()),
        estado: z.string().max(2, "Digite apenas a UF").or(z.undefined()),
        cidade: z.string().or(z.undefined()),
        anosExperiencia: z.number().or(z.undefined()),
    }),
    contato: z.object({
        emailPessoal: z
            .email("E-mail pessoal inválido").or(z.undefined()),
        emailCorporativo: z
            .email("E-mail corporativo inválido").or(z.undefined()),
        telefone: z.string().or(z.undefined()),
        linkedin: z.url("URL do LinkedIn inválida").or(z.undefined()),
        github: z.url("URL do GitHub inválida").or(z.undefined()),
    }),
    habilidade: z.object({
        habilidades: z.array(z.string()).max(7, "Máximo de 7 habilidades"),
    })
})