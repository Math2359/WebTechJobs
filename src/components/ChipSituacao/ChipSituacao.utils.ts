import { Dominios } from "@/lib/dominios"
import type { Situacao } from "@/lib/dominios/situacao"
import type { SituacaoMapeada } from "./ChipSituacao.types"

export const SITUACAO_MAPEADA: Record<Situacao, SituacaoMapeada> = {
    [Dominios.Situacao.EmAnalise]: { corFundo: "#FFF4E5", cor: "#FF9900", descricao: "Em análise" },
    [Dominios.Situacao.Entrevista]: { corFundo: "#E8F1FF", cor: "#4B8BFF", descricao: "Entrevista marcada" },
    [Dominios.Situacao.Aprovado]: { corFundo: "#EAF7E6", cor: "#63A300", descricao: "Aprovado" },
    [Dominios.Situacao.Reprovado]: { corFundo: "#F2F2F2", cor: "#8E8E8E", descricao: "Reprovado" },
}

export const situacoes = Object.keys(SITUACAO_MAPEADA).map(Number) as Situacao[]