export const EmpresaQueryKeys = {
    ObterInformacoes: "obterInformacoesEmpresa",
    ObterFotoPerfil: "obterFotoPerfil"
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

export type AtualizarInformacoesRequest = InformacoesEmpresa

export type AtualizarSituacaoAplicacaoVagaRequest = {
    idAplicacao: number
    situacao: number
}
