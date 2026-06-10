import { useRecuperarSenha } from '@/api/usuario/usuario'
import { LoginIlustration } from '@/assets'
import { Botao } from '@/components/Botao/Botao'
import { useFormCustomizado } from '@/components/Formulario'
import { LinkCustomizado } from '@/components/LinkCustomizado/LinkCustomizado'
import { Divider, Grid, Stack, Typography } from '@mui/material'
import { useNavigate } from '@tanstack/react-router'
import { recuperarSenhaSchema } from './RecuperarSenha.schema'

export const RecuperarSenha = () => {
    const { mutateAsync } = useRecuperarSenha()
    const navigate = useNavigate()

    const { AppForm, AppField, Subscribe, handleSubmit } = useFormCustomizado({
        defaultValues: {
            login: ""
        },
        validators: {
            onBlur: recuperarSenhaSchema,
            onSubmit: recuperarSenhaSchema,
        },
        onSubmit: async ({ value }) => {
            await mutateAsync(value)

            navigate({
                to: "/login",
                viewTransition: true
            })
        }
    })

    return (
        <Grid
            container
            sx={{
                flexGrow: 1,
                justifyContent: "space-evenly",
                alignItems: "center",
            }}
        >
            <Grid size={3.5}>
                <LoginIlustration width="100%" />
            </Grid>

            <Grid sx={{ height: "100%", justifyContent: "center", display: "flex" }}>
                <Divider
                    orientation="vertical"
                    variant="fullWidth"
                />
            </Grid>

            <Grid size={3.5}>
                <AppForm>
                    <Stack sx={{ width: "100%" }} spacing={4}>
                        <Stack spacing={1}>
                            <Typography variant="h4">
                                Recupere sua senha
                            </Typography>
                            <Typography color="text.secondary">
                                Informe seu e-mail de cadastro para receber o link de recuperação.
                            </Typography>
                        </Stack>

                        <AppField
                            name="login"
                            children={(field) => <field.InputForm variante="normal" label="E-mail" placeholder="Digite seu e-mail" />}
                        />

                        <Stack spacing={2} sx={{ alignItems: "center" }}>
                            <Grid size={9} sx={{ width: "100%" }}>
                                <Subscribe
                                    selector={selector => [selector.isSubmitting]}
                                    children={([isSubmitting]) => (
                                        <Botao loading={isSubmitting} fullWidth type="submit" onClick={handleSubmit}>
                                            Enviar link de recuperação
                                        </Botao>
                                    )}
                                />
                            </Grid>

                            <Typography variant="subtitle2">
                                Lembrou sua senha? <LinkCustomizado to="/login" cor="secondary">Voltar para o login</LinkCustomizado>
                            </Typography>
                        </Stack>
                    </Stack>
                </AppForm>
            </Grid>
        </Grid>
    )
}
