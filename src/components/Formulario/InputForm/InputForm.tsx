import { Stack, Typography } from "@mui/material"
import type { ErroInput, InputFormProps } from "./InputForm.types"
import { Variantes } from "./variantes"
import { useFieldContext } from "@/lib/formulario"
import { retornarTipoErro } from "./InputForm.utils"

export const InputForm = ({ label, variante, ...props }: InputFormProps) => {
    const { state: { meta: { errorMap, isBlurred } } } = useFieldContext<string>()

    const Input = Variantes[variante];

    const errors = errorMap[retornarTipoErro(isBlurred)] as ErroInput[] ?? []

    return (
        <Stack spacing={1}>
            <Typography variant="body2">{label}</Typography>
            <Input error={errors.length > 0} {...props} />
            {errors.map((erro, index) => <Typography variant="caption" color="error" key={index}>{erro.message}</Typography>)}
        </Stack>
    )
}