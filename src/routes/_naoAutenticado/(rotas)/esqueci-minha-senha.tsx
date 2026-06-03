import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_naoAutenticado/(rotas)/esqueci-minha-senha')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/esqueci-minha-senha"!</div>
}
