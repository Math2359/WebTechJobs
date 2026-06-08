import type { Situacao } from "@/lib/dominios/situacao"
import type { VagaVisualizacaoCandidato } from "@/api/vaga/vaga.types"
import type { TipoExperiencia } from "@/lib/dominios/tipoExperiencia"

export const CandidatoQueryKeys = {
    ObterInformacoes: "obterInformacoesCandidato",
    ObterFotoPerfil: "obterFotoPerfilCandidato",
    ObterAplicacoes: "obterAplicacoesCandidato",
    ObterAplicacaoVaga: "obterAplicacaoVaga"
} as const

export type Experiencia = {
    tipoExperiencia: TipoExperiencia
    instituicao: string
    descricao: string
    dataInicio: Date
    dataFim: Date | undefined
}

export type InformacoesCandidato = {
    descricao: string | undefined
    habilidades: string | undefined
    preferencias: string | undefined
    emailPessoal: string | undefined
    emailCorporativo: string | undefined
    telefone: string | undefined
    linkedin: string | undefined
    github: string | undefined
    area: string | undefined
    anosExperiencia: number | undefined
    estado: string | undefined
    cidade: string | undefined
}

type DadosVagas = {
    vagasAplicadas: number
    processosAtivos: number
}

export type ObterInformacoesResponse = DadosVagas & InformacoesCandidato & {
    experiencias: Experiencia[]
}

export type AtualizarInformacoesRequest = InformacoesCandidato & {
    experiencias: Experiencia[]
}

export type AplicarVagaRequest = {
    idVaga: number
    arquivo: File
}

export type AplicacaoVagaCandidato = VagaVisualizacaoCandidato & {
    situacao: Situacao | undefined
    dataAtualizacaoAplicacao: Date | undefined
}

export type ObterAplicacoesResponse = AplicacaoVagaCandidato[]

export type ObterAplicacaoResponse = AplicacaoVagaCandidato
