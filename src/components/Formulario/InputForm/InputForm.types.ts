import type { InputBaseProps } from "@mui/material"
import type { TiposVariantes } from "./variantes"
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