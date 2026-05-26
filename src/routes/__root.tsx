import { Box, Grid } from '@mui/material'
import { createRootRoute, Outlet } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'
import { Logo } from '../assets'
import { NavLink } from '../components/NavLink/NavLink'
import { Botao } from '../components/Button/Button'

const RootLayout = () => {
  return (
    <>
      <Box sx={(theme) => ({ justifyContent: "space-between", display: "flex", padding: theme.spacing(2, 4), alignItems: "center" })}>
        <Logo />
        <Grid container spacing={3} sx={{ alignItems: "center" }}>
          <Grid container spacing={3}>
            <NavLink to="/">Home</NavLink>
            <NavLink to="/about">About</NavLink>
            <NavLink to="/app">App</NavLink>
          </Grid>
          <Botao>Login</Botao>
        </Grid>
      </Box>
      <Outlet />
      <TanStackRouterDevtools />
    </>
  )
}

export const Route = createRootRoute({ component: RootLayout })