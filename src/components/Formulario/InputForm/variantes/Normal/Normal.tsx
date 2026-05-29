import InputBase from "@mui/material/InputBase";
import { useFieldContext } from "../../../../../lib/formulario";
import type { InputPadraoProps } from "../../InputForm.types";
import * as styles from "../../InputForm.styles"

export const Normal = ({ placeholder, error, cor = "primary" }: InputPadraoProps) => {
    const field = useFieldContext<string>()

    return (
        <InputBase
            sx={styles.GerarEstuloInputForm(cor, error)}
            value={field.state.value}
            placeholder={placeholder}

            onBlur={field.handleBlur}
            onChange={(e) => field.handleChange(e.target.value)}
        />
    )
}