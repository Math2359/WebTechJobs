import InputBase from "@mui/material/InputBase";
import SelectMui from "@mui/material/Select"
import type { InputPadraoProps } from "../../InputForm.types";
import * as styles from "../../InputForm.styles"
import { useFieldContext } from "@/lib/formulario";
import { MenuItem } from "@mui/material";

export const Select = ({ placeholder, children, error, cor = "primary", disabled, ...props }: InputPadraoProps) => {
    const field = useFieldContext<string | number | boolean>()

    return (
        <SelectMui
            disabled={disabled}
            sx={styles.GerarEstuloInputForm(cor, error)}
            variant="standard"
            label={placeholder}
            input={<InputBase
                sx={styles.GerarEstuloInputForm(cor, error)}
                value={field.state.value}
                placeholder={placeholder}
                disabled={disabled}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(e.target.value)}
                {...props}
            />}
        >
            <MenuItem disabled value="default" selected>Selecione uma opção</MenuItem>
            {children}
        </SelectMui>

    )
}
