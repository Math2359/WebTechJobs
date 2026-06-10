import { Pages } from '@/pages'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_naoAutenticado/(rotas)/redefinir-senha')({
  validateSearch: (search: Record<string, unknown>) => ({
    codigo: typeof search.codigo === 'string' ? search.codigo : '',
  }),
  component: RouteComponent,
})

function RouteComponent() {
  const { codigo } = Route.useSearch()

  return <Pages.NaoAutenticado.RedefinirSenha codigo={codigo} />
}
