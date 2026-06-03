import type { InputBaseProps } from "@mui/material"
import type { MaskedInputBaseProps } from "./variantes/Mascara/Mascara.types"

export type InputFormProps = {
    label: string
    variante: TiposVariantes
} & InputPadraoProps

export type InputPadraoProps = {
    cor?: CorInput
    mask?: MaskedInputBaseProps["mask"]
} & InputBaseProps

export type CorInput = "primary" | "secondary";

export type ErroInput = {
    message?: string
}

export type TiposVariantes = "senha" | "normal" | "mascara"