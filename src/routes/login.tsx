import { createFileRoute } from '@tanstack/react-router'
import { LoginIlustration } from '../assets'
import { Divider, Grid, Link, Stack, Typography } from '@mui/material'
import { Botao } from '../components/Botao/Botao'
import { useFormCustomizado } from '../components/Formulario/Formulario.utils'

export const Route = createFileRoute('/login')({
  component: RouteComponent
})

function RouteComponent() {
  const { AppField, Subscribe } = useFormCustomizado({
    defaultValues: {
      email: "",
      senha: ""
    }
  })

  return (
    <Grid
      container
      sx={{
        flexGrow: 1,
        justifyContent: 'space-evenly',
        alignItems: 'center',
      }}
    >
      <Grid size={3}>
        <LoginIlustration width="100%" />
      </Grid>

      <Grid size={1} sx={{ height: "100%", justifyContent: "center", display: "flex" }}>
        <Divider
          orientation="vertical"
          variant='fullWidth'
        />
      </Grid>
      <Grid size={3}>
        <Stack sx={{ width: "100%" }} spacing={4}>
          <Typography variant='h4'>
            Faça seu login aqui
          </Typography>
          <Stack spacing={3}>
            <Stack spacing={4}>
              <AppField
                name="email"
                children={(field) => <field.InputForm label="E-mail" placeholder='Digite seu e-mail' />}
              />
              <AppField
                name="senha"
                children={(field) => <field.InputForm label="Senha" placeholder='Digite sua senha' />}
              />
            </Stack>
            <Link color='secondary' variant='subtitle2'>Esqueci minha senha</Link>
            <Subscribe children={() => <Botao type="submit">Entrar</Botao>} />
            <Typography variant='subtitle2'>
              Não possui conta? <Link color='secondary'>Cadastre-se aqui</Link>
            </Typography>
          </Stack>
        </Stack>
      </Grid>
    </Grid>
  )
}