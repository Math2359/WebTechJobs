import { InputBase, Stack, Typography } from "@mui/material"
import type { InputFormProps } from "./InputForm.types"
import { useFieldContext } from "../../../lib/formulario"
import * as styles from "./InputForm.styles"

export const InputForm = ({ label, placeholder }: InputFormProps) => {
    const field = useFieldContext<string>()

    return (
        <Stack spacing={1}>
            <Typography variant="body1">{label}</Typography>
            <InputBase
                sx={styles.EstuloInputForm}
                value={field.state.value}
                placeholder={placeholder}
                
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(e.target.value)}
            />
        </Stack>
    )
}