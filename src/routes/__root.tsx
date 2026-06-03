
import { Stack } from '@mui/material'
import { createRootRoute, Outlet } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'

const RootLayout = () => {
  return (
    <Stack sx={{ flexGrow: 1, height: '100dvh', padding: (theme) => theme.spacing(2, 4) }}>
      <Outlet />
      <TanStackRouterDevtools />
    </Stack>
  )
}

export const Route = createRootRoute({
  component: RootLayout,
})