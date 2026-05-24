import { Stack } from '@mui/material'
import { createFileRoute } from '@tanstack/react-router'
import { Logo } from '../assets'

export const Route = createFileRoute('/about')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <Stack>
        <Logo />
    </Stack>
  )
}
