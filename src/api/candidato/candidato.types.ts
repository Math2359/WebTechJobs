import type { TipoExperiencia } from "@/lib/dominios/tipoExperiencia"

export const CandidatoQueryKeys = {
    ObterExperiencias: "obterExperiencias",
    ObterInformacoes: "obterInformacoes"
} as const

export type ObterExperienciasResponse = {
    tipoExperiencia: TipoExperiencia
    instituicao: string
    descricao: string
    dataInicio: Date
    dataFim: Date | undefined
}[]

export type ObterInformacoesResponse = {
    id: number;
    idCandidato: number;
    descricao: string | undefined;
    habilidades: string | undefined;
    emailPessoal: string | undefined;
    emailCorporativo: string | undefined;
    telefone: string | undefined;
    linkedin: string | undefined;
    github: string | undefined;
}