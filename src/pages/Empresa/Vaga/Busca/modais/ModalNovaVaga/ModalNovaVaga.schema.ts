import z from "zod";

export const cadastrarVagaSchema = z.object({
    nome: z.string().min(1, "Nome da vaga é obrigatório"),
    cargo: z.string().min(1, "Cargo é obrigatório"),
    modelo: z.string().min(1, "Modelo é obrigatório"),
    nivelExperiencia: z.string().min(1, "Nível de experiência é obrigatório"),
    tecnologias: z.array(z.string()).min(1, "Adicione pelo menos uma tecnologia").max(7, "Máximo de 7 tecnologias"),
    requisitos: z.string().min(1, "Requisitos são obrigatórios"),
    beneficios: z.string().min(1, "Benefícios são obrigatórios"),
    descricao: z.string().min(1, "Descrição é obrigatória"),
    cep: z.string().optional(),
    numero: z.string().optional(),
    salarioPrevisto: z.string(),
    interna: z.boolean(),
    dataFimInscricoes: z.date().or(z.undefined())
})
