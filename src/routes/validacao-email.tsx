import { Pages } from '@/pages'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/validacao-email')({
  validateSearch: (search: Record<string, unknown>) => ({
    codigo: typeof search.codigo === 'string' ? search.codigo : '',
  }),
  component: RouteComponent,
})

function RouteComponent() {
  const { codigo } = Route.useSearch()

  return <Pages.NaoAutenticado.ValidacaoEmail codigo={codigo} />
}
