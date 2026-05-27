
import { Box, Stack } from '@mui/material'
import { createRootRoute, Outlet } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'
import { Logo } from '../assets'

const RootLayout = () => {
  return (
    <Stack sx={{ flexGrow: 1, height: '100vh' }}>
      <Box sx={(theme) => ({ justifyContent: "space-between", display: "flex", padding: theme.spacing(2, 4), alignItems: "center" })}>
        <Logo />
      </Box>
      <Outlet />
      <TanStackRouterDevtools />
    </Stack>
  )
}

export const Route = createRootRoute({ component: RootLayout })