import { createFileRoute } from '@tanstack/react-router'
import { Pages } from '@/pages'

export const Route = createFileRoute('/login')({
  component: RouteComponent
})

function RouteComponent() {
  return <Pages.Login />
}