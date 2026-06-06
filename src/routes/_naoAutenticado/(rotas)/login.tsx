import { createFileRoute } from '@tanstack/react-router'
import { Pages } from '@/pages'

export const Route = createFileRoute('/_naoAutenticado/(rotas)/login')({
  component: RouteComponent
})

function RouteComponent() {
  return <Pages.NaoAutenticado.Login />
}