import { Chip, type SxProps, type Theme } from "@mui/material"
import { SITUACAO_MAPEADA } from "./ChipSituacao.utils"
import type { ChipSituacaoProps } from "./ChipSituacao.types"

export const ChipSituacao = ({ situacao, quantidade, selecionado, sx, ...props }: ChipSituacaoProps) => {
    const estilo = SITUACAO_MAPEADA[situacao]
    const label = quantidade === undefined
        ? estilo.descricao
        : `${estilo.descricao} (${quantidade})`

    return (
        <Chip
            label={label}
            sx={[
                {
                    backgroundColor: estilo.corFundo,
                    color: estilo.cor,
                    border: "1px solid",
                    borderColor: selecionado ? estilo.cor : "transparent",
                    fontWeight: selecionado ? 700 : 500,
                },
                sx
            ] as SxProps<Theme>}
            {...props}
        />
    )
}
