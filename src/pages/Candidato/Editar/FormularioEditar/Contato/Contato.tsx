import { comFormulario } from "@/components/Formulario";
import { editarFormOptions } from "../FormularioEditar.utils";
import { Grid, Stack, Typography } from "@mui/material";
import { MASCARA_TELEFONE } from "@/lib/mascaras";

export const Contato = comFormulario({
    ...editarFormOptions,
    render: ({ form: { AppField } }) => {
        return (
            <Stack spacing={2}>
                <Typography variant="overline">Contato</Typography>
                <Grid container spacing={2}>
                    <Grid size={4}>
                        <AppField
                            name="contato.emailPessoal"
                            children={(field) => <field.InputForm variante="normal" label="E-mail pessoal" placeholder="Digite seu e-mail pessoal" />}
                        />
                    </Grid>
                    <Grid size={4}>
                        <AppField
                            name="contato.emailCorporativo"
                            children={(field) => <field.InputForm variante="normal" label="E-mail corporativo" placeholder="Digite seu e-mail corporativo" />}
                        />
                    </Grid>
                    <Grid size={4}>
                        <AppField
                            name="contato.telefone"
                            children={(field) => <field.InputForm variante="mascara" label="Telefone" mask={MASCARA_TELEFONE} placeholder="Digite seu telefone" />}
                        />
                    </Grid>
                    <Grid size={4}>
                        <AppField
                            name="contato.linkedin"
                            children={(field) => <field.InputForm variante="normal" label="LinkedIn" placeholder="Digite sua URL do LinkedIn" />}
                        />
                    </Grid>
                    <Grid size={4}>
                        <AppField
                            name="contato.github"
                            children={(field) => <field.InputForm variante="normal" label="GitHub" placeholder="Digite sua URL do GitHub" />}
                        />
                    </Grid>
                </Grid>
            </Stack>
        )
    }
})