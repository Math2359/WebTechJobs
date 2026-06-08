import { TipoExperiencia } from "@/lib/dominios/tipoExperiencia"
import z from "zod"

export const experienciaSchema = z
    .object({
        instituicao: z
            .string()
            .min(1, "Instituição é obrigatória"),
        descricao: z
            .string()
            .min(1, "Descrição é obrigatória"),
        dataInicio: z
            .date("Data de início é obrigatória")
            .max(new Date(), "A data de início não pode ser futura"),
        dataFim: z
            .date().or(z.undefined()),
        tipoExperiencia: z.enum(TipoExperiencia),
    })
    .superRefine((data, ctx) => {
        if (
            data.dataFim &&
            data.dataFim < data.dataInicio
        ) {
            ctx.addIssue({
                code: "custom",
                path: ["dataFim"],
                message: "A data de término não pode ser anterior à data de início",
            })
        }
    })

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
    }),
    experiencia: z.object({
        profissional: z.array(experienciaSchema),
        formacao: z.array(experienciaSchema)
    })
})