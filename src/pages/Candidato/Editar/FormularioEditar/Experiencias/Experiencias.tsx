import { comFormulario } from "@/components/Formulario";
import { editarFormOptions } from "../FormularioEditar.utils";
import { Stack, Typography } from "@mui/material";

export const Experiencias = comFormulario({
    ...editarFormOptions,
    render: () => {
        return (
            <Stack>
                <Typography variant="overline">Experiências</Typography>
            </Stack>
        )
    }
})