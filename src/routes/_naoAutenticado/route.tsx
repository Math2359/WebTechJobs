import { Logo } from '@/assets'
import { RotasPerfil } from '@/lib/dominios/perfil'
import { store } from '@/lib/reducers'
import { Box } from '@mui/material'
import { createFileRoute, Outlet, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/_naoAutenticado')({
  component: RouteComponent,
  beforeLoad: () => {
    const auth = store.getState().credencial

    if (auth) {
      throw redirect({
        to: RotasPerfil[auth.perfil]
      })
    }
  }
})

function RouteComponent() {
  return (
    <>
      <Box sx={(theme) => ({ position: "fixed", justifyContent: "space-between", display: "flex", padding: theme.spacing(2, 4), alignItems: "center" })}>
        <Logo />
      </Box>

      <Outlet />
    </>
  )
}
