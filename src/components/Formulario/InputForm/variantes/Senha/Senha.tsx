import type { InputPadraoProps } from "../../InputForm.types";
import * as styles from "../../InputForm.styles"
import { IconButton, InputBase } from "@mui/material";
import { useState } from "react";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Visibility from "@mui/icons-material/Visibility";
import { useFieldContext } from "@/lib/formulario";

export const Senha = ({ placeholder, error, cor = "primary" }: InputPadraoProps) => {
    const field = useFieldContext<string>()

    const [verSenha, setVerSenha] = useState(false)

    const handleVerSenha = () => setVerSenha(valor => !valor)

    return (
        <InputBase
            sx={styles.GerarEstuloInputForm(cor, error)}
            value={field.state.value}
            placeholder={placeholder}
            type={verSenha ? "text" : "password"}
            endAdornment={
                <IconButton sx={{ cursor: "pointer" }} onClick={handleVerSenha} >
                    {verSenha ? <VisibilityOff /> :
                        <Visibility />}
                </IconButton>
            }

            onBlur={field.handleBlur}
            onChange={(e) => field.handleChange(e.target.value)}
        />
    )
}