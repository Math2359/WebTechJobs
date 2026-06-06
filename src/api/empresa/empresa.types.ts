export const EmpresaQueryKeys = {
    ObterInformacoes: "obterInformacoesEmpresa"
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