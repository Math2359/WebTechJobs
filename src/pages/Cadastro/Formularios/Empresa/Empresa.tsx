import { Grid, Stack } from "@mui/material"
import { useFormCustomizado } from "../../../../components/Formulario"
import { Botao } from "../../../../components/Botao/Botao"
import { DEFAULT_VALUES } from "./Empresa.utils"
import { empresaSchema } from "./Empresa.schema"
import { MASCARA_CNPJ } from "../../../../lib/mascaras"

export const EmpresaForm = () => {
    const { AppForm, AppField, Subscribe, handleSubmit } = useFormCustomizado({
        defaultValues: DEFAULT_VALUES,
        validators: {
            onChange: empresaSchema
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
                        children={(field) => <field.InputForm placeholder="Digite seu nome" cor="secondary" variante="normal" label="Nome:" />}
                    />
                    <AppField
                        name="email"
                        children={(field) => <field.InputForm placeholder="E-mail" cor="secondary" variante="normal" label="Email:" />}
                    />
                    <AppField
                        name="cnpj"
                        children={(field) => <field.InputForm mask={MASCARA_CNPJ} placeholder="Ex.: 00.000.000/0001-00" cor="secondary" variante="mascara" label="CNPJ:" />}
                    />
                    <AppField
                        name="senha"
                        children={(field) => <field.InputForm placeholder="Crie uma senha" cor="secondary" variante="senha" label="Senha:" />}
                    />
                    <AppField
                        name="confirmarSenha"
                        children={(field) => <field.InputForm placeholder="Confirme sua senha" cor="secondary" variante="senha" label="Confirme sua senha:" />}
                    />
                </Stack>
                <Grid container sx={{ justifyContent: "center" }}>
                    <Subscribe
                        children={() => <Botao cor="secondary" onClick={handleSubmit} type="submit">Finalizar cadastro</Botao>}
                    />
                </Grid>
            </Stack>
        </AppForm>
    )
}