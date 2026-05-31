import { useGerarToken } from '@/api/usuario/usuario'
import { Botao } from '@/components/Botao/Botao'
import { useFormCustomizado } from '@/components/Formulario'
import { LinkCustomizado } from '@/components/LinkCustomizado/LinkCustomizado'
import { credencialActions } from '@/lib/reducers/credencial'
import { LoginIlustration } from '../../assets'
import { Divider, Grid, Stack, Typography } from '@mui/material'
import { useNavigate } from '@tanstack/react-router'
import { useDispatch } from 'react-redux'
import { loginSchema } from './Login.schema'
import { Dominios } from '@/lib/dominios'

export const Login = () => {
    const { mutateAsync } = useGerarToken()
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const { AppField, Subscribe, handleSubmit } = useFormCustomizado({
        defaultValues: {
            login: "",
            senha: ""
        },
        validators: {
            onBlur: loginSchema,
            onSubmit: loginSchema,
        },
        onSubmit: async ({ value }) => {
            const data = await mutateAsync(value)
            
            
            dispatch(credencialActions.definirCredenciais(data))

            navigate({
                to: data.perfil === Dominios.Perfil.Candidato ? "/candidato" : "/",
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
                alignItems: 'center',
            }}
        >
            <Grid size={3.5}>
                <LoginIlustration width="100%" />
            </Grid>

            <Grid sx={{ height: "100%", justifyContent: "center", display: "flex" }}>
                <Divider
                    orientation="vertical"
                    variant='fullWidth'
                />
            </Grid>

            <Grid size={3.5}>
                <Stack sx={{ width: "100%" }} spacing={4}>
                    <Typography variant='h4'>
                        Faça seu login aqui
                    </Typography>
                    <Stack spacing={4}>
                        <Stack spacing={4}>
                            <AppField
                                name="login"
                                children={(field) => <field.InputForm variante='normal' label="E-mail" placeholder='Digite seu e-mail' />}
                            />
                            <Stack spacing={1}>
                                <AppField
                                    name="senha"
                                    children={(field) => <field.InputForm variante='senha' label="Senha" placeholder='Digite sua senha' />}
                                />
                                <LinkCustomizado to='/esqueci-minha-senha' cor='secondary'>Esqueci minha senha</LinkCustomizado>
                            </Stack>
                        </Stack>
                        <Stack sx={{ alignItems: "center" }}>
                            <Grid size={9}>
                                <Subscribe selector={selector => [selector.isSubmitting]} children={([isSubmitting]) => <Botao loading={isSubmitting} fullWidth type="submit" onClick={handleSubmit}>Entrar</Botao>} />
                            </Grid>
                        </Stack>
                        <Typography variant='subtitle2'>
                            Não possui conta? <LinkCustomizado to="/cadastro" cor='secondary'>Cadastre-se aqui</LinkCustomizado>
                        </Typography>
                    </Stack>
                </Stack>
            </Grid>
        </Grid>
    )
}