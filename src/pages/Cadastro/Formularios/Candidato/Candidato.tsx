import { Grid, Stack } from "@mui/material"
import { candidatoSchema } from "./Candidato.schema"
import { useNavigate } from "@tanstack/react-router"
import { useCriarUsuario } from "@/api/usuario/usuario"
import { useFormCustomizado } from "@/components/Formulario"
import { DEFAULT_VALUES } from "./Candidato.utils"
import type { CriarUsuarioRequest } from "@/api/usuario/usuario.types"
import { Dominios } from "@/lib/dominios"
import { MASCARA_CPF } from "@/lib/mascaras"
import { Botao } from "@/components/Botao/Botao"

export const CandidatoForm = () => {
    const { mutateAsync } = useCriarUsuario()

    const navigate = useNavigate()

    const { AppForm, AppField, Subscribe, handleSubmit } = useFormCustomizado({
        defaultValues: DEFAULT_VALUES,
        validators: {
            onChange: candidatoSchema
        },
        onSubmit: async ({ value }) => {
            const request: CriarUsuarioRequest = {
                documento: value.cpf,
                login: value.email,
                nome: value.nome,
                perfil: Dominios.Perfil.Candidato,
                senha: value.senha
            }

            await mutateAsync(request)

            navigate({
                to: "/login",
                viewTransition: true
            })
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
                        name="cpf"
                        children={(field) => <field.InputForm mask={MASCARA_CPF} placeholder="Ex.: 000.000.000-00" variante="mascara" label="CPF:" />}
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