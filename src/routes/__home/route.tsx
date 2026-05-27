import { createFileRoute, Outlet } from '@tanstack/react-router'
import { Logo } from '../../assets'
import { NavLink } from '../../components/NavLink/NavLink'
import { Botao } from '../../components/Botao/Botao'
import { Box, Grid } from '@mui/material'

export const Route = createFileRoute('/__home')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <>
      <Box sx={(theme) => ({ justifyContent: "space-between", display: "flex", padding: theme.spacing(2, 4), alignItems: "center" })}>
        <Logo />
        <Grid container spacing={3} sx={{ alignItems: "center" }}>
          <Grid container spacing={3}>
            <NavLink to="/">Página Inicial</NavLink>
            <NavLink to="/app/cliente">Sobre nós</NavLink>
            <NavLink to="/app">Fale conosco</NavLink>
          </Grid>
          <Botao cor='secondary' to="/login">Login</Botao>
        </Grid>
      </Box>
      <Outlet />
    </>
  )
}
