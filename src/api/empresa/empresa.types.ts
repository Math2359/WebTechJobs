import type { Experiencia, InformacoesCandidato } from "@/api/candidato/candidato.types"
import type { Situacao } from "@/lib/dominios/situacao"

export const EmpresaQueryKeys = {
    ObterInformacoes: "obterInformacoesEmpresa",
    ObterInformacoesPorId: "obterInformacoesEmpresaPorId",
    ObterFotoPerfil: "obterFotoPerfil",
    ObterAplicacaoVaga: "obterAplicacaoVagaEmpresa"
} as const

type InformacoesEmpresa = {
    setor: string | undefined
    tecnologias: string | undefined
    descricao: string | undefined
    linkSite: string | undefined
}

type DadosVagas = {
    vagasDisponiveis: number
    candidatos: number
}

export type ObterInformacoesResponse = InformacoesEmpresa & DadosVagas

export type ObterInformacoesEmpresaPorIdResponse = InformacoesEmpresa & DadosVagas & {
    nome?: string
}

export type AtualizarInformacoesRequest = InformacoesEmpresa

export type AtualizarSituacaoAplicacaoVagaRequest = {
    idAplicacao: number
    situacao: number
}

export type InformacaoCandidatoAplicacao = InformacoesCandidato & {
    id?: number
    nome?: string
}

export type ObterAplicacaoVagaEmpresaResponse = {
    informacaoCandidato: InformacaoCandidatoAplicacao | undefined
    experiencias: Experiencia[]
    situacao: Situacao
    dataCadastroAplicacao: Date
    urlCv: string | undefined
}
