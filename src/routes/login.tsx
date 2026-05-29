import { createFileRoute } from '@tanstack/react-router'
import { LoginIlustration } from '../assets'
import { Divider, Grid, Stack, Typography } from '@mui/material'
import { Botao } from '../components/Botao/Botao'
import { useFormCustomizado } from '../components/Formulario'
import { LinkCustomizado } from '../components/LinkCustomizado/LinkCustomizado'

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
                name="email"
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
                <Subscribe children={() => <Botao fullWidth type="submit">Entrar</Botao>} />
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