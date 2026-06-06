import InputBase from "@mui/material/InputBase";
import type { InputPadraoProps } from "../../InputForm.types";
import * as styles from "../../InputForm.styles"
import { IMaskInput } from 'react-imask'
import { forwardRef } from "react";
import type { MaskedInputBaseProps } from "./Mascara.types";
import { useFieldContext } from "@/lib/formulario";

const InputMask = forwardRef<HTMLInputElement, MaskedInputBaseProps>(({ onChange, ...props }, ref) => {
    return (
        <IMaskInput
            {...props}
            value={String(props.value)}
            overwrite={false}
            lazy={false}
            inputRef={ref}
            onAccept={(value) => {
                if (onChange) onChange({ target: { name: props.name ?? "", value } } as any)
            }}
        />
    )
})

export const Mascara = ({ placeholder, mask, error, cor = "primary", ...props }: InputPadraoProps) => {
    const field = useFieldContext<string>()

    return (
        <InputBase
            sx={styles.GerarEstuloInputForm(cor, error)}
            value={field.state.value}
            placeholder={placeholder}
            inputComponent={InputMask}
            inputProps={{ mask, unmask: true }}

            onBlur={field.handleBlur}
            onChange={(e) => field.handleChange(e.target.value)}
            {...props}
        />
    )
}
