import { useFieldContext } from "@/lib/formulario"
import Typography from "@mui/material/Typography"

export const TextoErro = () => {
    const { state: { meta: { errors, isTouched } } } = useFieldContext<string>()
    const errosLimpos = [... new Set(errors.map(x => x.message))]
    
    return (
        <>
            {isTouched && errosLimpos.map((erro, index) => <Typography variant="caption" color="error" key={index}>{erro}</Typography>)}
        </>

    )
}