import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_autenticado/candidato/(rotas)/vagas')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/candidato/(rotas)/vagas"!</div>
}
