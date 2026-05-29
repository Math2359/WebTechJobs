import { Stack, Typography } from "@mui/material"
import type { InputFormProps } from "./InputForm.types"
import { Variantes } from "./variantes"
import { useFieldContext } from "../../../lib/formulario"

export const InputForm = ({ label, variante, ...props }: InputFormProps) => {
    const { state: { meta: { errors } } } = useFieldContext<string>()
    const Input = Variantes[variante];

    return (
        <Stack spacing={1}>
            <Typography variant="body2">{label}</Typography>
            <Input error={errors.length > 0} {...props} />
            {errors && errors.map((erro, index) => <Typography variant="caption" color="error" key={index}>{erro.message}</Typography>)}
        </Stack>
    )
}