import { comFormulario } from "@/components/Formulario";
import { editarFormOptions } from "../FormularioEditar.utils";
import { Grid, Stack, Typography } from "@mui/material";

export const Contato = comFormulario({
    ...editarFormOptions,
    render: ({ form: { AppField } }) => {
        return (
            <Stack spacing={2}>

                <Typography variant="overline">Contato</Typography>
                <Grid container spacing={2}>
                    <Grid size={4}>
                        <AppField
                            name="contato.linkSite"
                            children={(field) => <field.InputForm cor="secondary" variante="normal" label="Link do site" placeholder="Digite o link do site da empresa" />}
                        />
                    </Grid>
                </Grid>
            </Stack>
        )
    }
})