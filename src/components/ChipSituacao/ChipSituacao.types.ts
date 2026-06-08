import type { ChipProps } from "@mui/material"
import type { Situacao } from "@/lib/dominios/situacao"

export type ChipSituacaoProps = Omit<ChipProps, "label" | "color"> & {
    situacao: Situacao
    quantidade?: number
    selecionado?: boolean
}

export type SituacaoMapeada = {
    corFundo: string
    cor: string
    descricao: string
}
