import { Grid, Stack } from "@mui/material"
import { useFormCustomizado } from "../../../../components/Formulario"
import { DEFAULT_VALUES } from "./Candidato.utils"
import { Botao } from "../../../../components/Botao/Botao"
import { baseSchema } from "../schema"

export const CandidatoForm = () => {
    const { AppForm, AppField, Subscribe, handleSubmit } = useFormCustomizado({
        defaultValues: DEFAULT_VALUES,
        validators: {
            onChange: baseSchema
        },
        onSubmit: ({ value }) => {
            console.log(value)
        }
    })

    return (
        <AppForm>
            <Stack spacing={4}>
                <Stack spacing={2}>
                    <AppField
                        name="nome"
                        children={(field) => <field.InputForm placeholder="Digite seu nome" cor="primary" variante="normal" label="Nome:" />}
                    />
                    <AppField
                        name="email"
                        children={(field) => <field.InputForm placeholder="E-mail" cor="primary" variante="normal" label="Email:" />}
                    />
                    <AppField
                        name="senha"
                        children={(field) => <field.InputForm placeholder="Crie uma senha" cor="primary" variante="senha" label="Senha:" />}
                    />
                    <AppField
                        name="confirmarSenha"
                        children={(field) => <field.InputForm placeholder="Confirme sua senha" cor="primary" variante="senha" label="Confirme sua senha:" />}
                    />
                </Stack>
                <Grid container sx={{ justifyContent: "center" }}>
                    <Subscribe
                        children={() => <Botao onClick={handleSubmit} type="submit">Finalizar cadastro</Botao>}
                    />
                </Grid>
            </Stack>
        </AppForm>
    )
}