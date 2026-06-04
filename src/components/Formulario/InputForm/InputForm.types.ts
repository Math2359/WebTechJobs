import type { InputBaseProps } from "@mui/material"
import type { MaskedInputBaseProps } from "./variantes/Mascara/Mascara.types"
import type { PropsWithChildren } from "react"

export type InputFormProps = {
    label: string
    variante: TiposVariantes
} & InputPadraoProps

export type InputPadraoProps = PropsWithChildren<{
    cor?: CorInput
    mask?: MaskedInputBaseProps["mask"]
} & InputBaseProps>

export type CorInput = "primary" | "secondary";

export type ErroInput = {
    message?: string
}

export type TiposVariantes = "senha" | "normal" | "mascara" | "data" | "select"