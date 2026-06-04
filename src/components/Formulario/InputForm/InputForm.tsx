import { Stack, Typography } from "@mui/material"
import type { InputFormProps } from "./InputForm.types"
import { Variantes } from "./variantes"
import { useFieldContext } from "@/lib/formulario"
import { TextoErro } from "../TextoErro/TextoErro"

export const InputForm = <T,>({ label, variante, ...props }: InputFormProps) => {
    const { state: { meta: { errors, isTouched } } } = useFieldContext<T>()

    const Input = Variantes[variante];

    const errosLimpos = [... new Set(errors.map(x => x.message))]

    return (
        <Stack spacing={0.5}>
            <Typography variant="body2">{label}:</Typography>
            <Input error={isTouched && errosLimpos.length > 0} {...props} />
            <TextoErro />
        </Stack>
    )
}