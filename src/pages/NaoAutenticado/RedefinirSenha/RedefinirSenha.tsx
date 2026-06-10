import { useRedefinirSenha } from '@/api/usuario/usuario'
import { LoginIlustration } from '@/assets'
import { Botao } from '@/components/Botao/Botao'
import { useFormCustomizado } from '@/components/Formulario'
import { LinkCustomizado } from '@/components/LinkCustomizado/LinkCustomizado'
import { Divider, Grid, Stack, Typography } from '@mui/material'
import { useNavigate } from '@tanstack/react-router'
import { redefinirSenhaSchema } from './RedefinirSenha.schema'
import type { RedefinirSenhaProps } from './RedefinirSenha.types'

export const RedefinirSenha = ({ codigo }: RedefinirSenhaProps) => {
    const { mutateAsync } = useRedefinirSenha()
    const navigate = useNavigate()

    const { AppForm, AppField, Subscribe, handleSubmit } = useFormCustomizado({
        defaultValues: {
            novaSenha: "",
            confirmarSenha: ""
        },
        validators: {
            onBlur: redefinirSenhaSchema,
            onSubmit: redefinirSenhaSchema,
        },
        onSubmit: async ({ value }) => {
            await mutateAsync({
                codigo,
                novaSenha: value.novaSenha
            })

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
                {!codigo ? (
                    <Stack spacing={2}>
                        <Typography variant="h4">
                            Link de recuperação inválido
                        </Typography>
                        <Typography color="text.secondary">
                            O código de redefinição não foi informado. Solicite um novo link de recuperação.
                        </Typography>
                        <LinkCustomizado to="/recuperar-senha" cor="secondary">
                            Solicitar novo link
                        </LinkCustomizado>
                    </Stack>
                ) : (
                    <AppForm>
                        <Stack sx={{ width: "100%" }} spacing={4}>
                            <Stack spacing={1}>
                                <Typography variant="h4">
                                    Defina sua nova senha
                                </Typography>
                                <Typography color="text.secondary">
                                    Crie uma nova senha para acessar sua conta.
                                </Typography>
                            </Stack>

                            <Stack spacing={3}>
                                <AppField
                                    name="novaSenha"
                                    children={(field) => <field.InputForm variante="senha" label="Nova senha" placeholder="Digite sua nova senha" />}
                                />
                                <AppField
                                    name="confirmarSenha"
                                    children={(field) => <field.InputForm variante="senha" label="Confirme a nova senha" placeholder="Digite a senha novamente" />}
                                />
                            </Stack>

                            <Subscribe
                                selector={selector => [selector.isSubmitting]}
                                children={([isSubmitting]) => (
                                    <Botao loading={isSubmitting} fullWidth type="submit" onClick={handleSubmit}>
                                        Redefinir senha
                                    </Botao>
                                )}
                            />
                        </Stack>
                    </AppForm>
                )}
            </Grid>
        </Grid>
    )
}
