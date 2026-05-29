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
            <NavLink underLineColor='secondary' to="/">Página Inicial</NavLink>
            <NavLink underLineColor='secondary' to="/app/cliente">Sobre nós</NavLink>
            <NavLink underLineColor='secondary' to="/app">Fale conosco</NavLink>
          </Grid>
          <Botao variante='outlined' cor='secondary' to="/login">Login</Botao>
        </Grid>
      </Box>
      <Outlet />
    </>
  )
}
