import InputBase from "@mui/material/InputBase";
import type { InputPadraoProps } from "../../InputForm.types";
import * as styles from "../../InputForm.styles"
import { useFieldContext } from "@/lib/formulario";
import type { SxProps } from "@mui/material";

export const Normal = ({ placeholder, error, cor = "primary", ...props }: InputPadraoProps) => {
    const field = useFieldContext<string | number>()

    return (
        <InputBase
            sx={styles.GerarEstuloInputForm(cor, error)}
            value={field.state.value}
            placeholder={placeholder}

            onBlur={field.handleBlur}
            onChange={(e) => field.handleChange(props.type === "number" ? Number(e.target.value) : e.target.value)}
            {...props}
        />
    )
}

export const InputNormal = ({ placeholder, error, cor = "primary", sx, ...props }: InputPadraoProps) => {
    return (
        <InputBase
            sx={[styles.GerarEstuloInputForm(cor, error), sx] as SxProps}
            placeholder={placeholder}
            {...props}
        />
    )
}