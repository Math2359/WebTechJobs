import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/candidato/(rotas)/candidaturas')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/candidato/(rotas)/candidaturas"!</div>
}
