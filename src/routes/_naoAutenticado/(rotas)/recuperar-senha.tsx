import { Pages } from '@/pages'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_naoAutenticado/(rotas)/recuperar-senha')({
  component: RouteComponent,
})

function RouteComponent() {
  return <Pages.NaoAutenticado.RecuperarSenha />
}
