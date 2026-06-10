import type { Experiencia, InformacoesCandidato } from "@/api/candidato/candidato.types"
import type { VagaVisualizacaoCandidato } from "@/api/vaga/vaga.types"
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
    vagas: VagaVisualizacaoCandidato[]
}

type InformacoesEmpresaResponse = InformacoesEmpresa & DadosVagas & {
    id: number
    nome: string
    emailValidado: boolean
}

export type ObterInformacoesResponse = InformacoesEmpresaResponse

export type ObterInformacoesEmpresaPorIdResponse = InformacoesEmpresaResponse

export type AtualizarInformacoesRequest = InformacoesEmpresa

export type AtualizarSituacaoAplicacaoVagaRequest = {
    idAplicacao: number
    situacao: number
}

export type InformacaoCandidatoAplicacao = InformacoesCandidato & {
    id: number
    idCandidato: number
    nome?: string
    emailValidado: boolean
}

export type ObterAplicacaoVagaEmpresaResponse = {
    informacaoCandidato: InformacaoCandidatoAplicacao | undefined
    experiencias: Experiencia[]
    situacao: Situacao
    dataCadastroAplicacao: Date
    urlCv: string | undefined
}
