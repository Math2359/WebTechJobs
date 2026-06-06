# WebTechJobs - Guia para Agentes

Este arquivo orienta agentes de codigo trabalhando neste repositorio. Use-o como fonte rapida de contexto antes de alterar funcionalidades, rotas, APIs ou componentes.

## Visao Geral

WebTechJobs e um frontend React + TypeScript + Vite para uma plataforma de vagas de tecnologia, com fluxos para candidatos e empresas.

Stack principal:

- React 19 com TypeScript.
- Vite com porta local `5001`.
- TanStack Router para roteamento file-based.
- TanStack Query para cache e chamadas assíncronas.
- TanStack Form + Zod para formularios e validacao.
- Material UI para UI e tema.
- MUI X Data Grid para tabelas.
- Redux Toolkit para estado global de credenciais.
- Axios para HTTP.
- Sonner para toasts.
- Motion para animacoes pontuais.

## Comandos

Use estes comandos a partir da raiz do projeto:

- `npm run dev`: inicia o Vite em `http://localhost:5001`.
- `npm run build`: roda `tsc -b` e gera build Vite.
- `npm run lint`: executa ESLint.
- `npm run preview`: serve o build localmente.

Nao ha suite de testes configurada no `package.json` no momento. Para validacao, priorize `npm run build` e `npm run lint`.

## Estrutura

- `src/main.tsx`: registra providers globais (`QueryClientProvider`, Redux `Provider`, `ThemeProvider`, `Toaster`, `CssBaseline`) e renderiza `App`.
- `src/App.tsx`: monta o `RouterProvider`.
- `src/lib`: infraestrutura compartilhada.
- `src/api`: hooks de API por dominio.
- `src/components`: componentes reutilizaveis.
- `src/pages`: telas por area funcional.
- `src/routes`: rotas file-based do TanStack Router.
- `src/assets`: SVGs e exports de assets.
- `src/routeTree.gen.ts`: arquivo gerado pelo TanStack Router. Evite editar manualmente.

## Aliases e Imports

Use preferencialmente o alias `@` para imports de `src`:

```ts
import { api } from "@/lib/axios"
import { Botao } from "@/components/Botao/Botao"
```

Tambem existe `@components/*`, mas o padrao predominante e `@/*`.

## Roteamento

O projeto usa TanStack Router com arquivos em `src/routes`.

Padroes observados:

- Rotas autenticadas ficam em `src/routes/_autenticado`.
- Rotas nao autenticadas ficam em `src/routes/_naoAutenticado`.
- Agrupamentos visuais usam pastas entre parenteses, como `(rotas)`.
- Arquivos de rota usam `createFileRoute`.
- Rotas normalmente delegam renderizacao para `Pages`.

Exemplo:

```tsx
export const Route = createFileRoute('/_autenticado/empresa/(rotas)/vaga/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <Pages.Empresa.Vaga.Busca />
}
```

Ao criar ou mover rotas, mantenha a convencao file-based e deixe o plugin atualizar `src/routeTree.gen.ts`.

## Autenticacao

- O estado global de credenciais fica em `src/lib/reducers/credencial.ts`.
- A store fica em `src/lib/reducers/index.ts`.
- Cookies sao manipulados por `src/lib/cookies.ts`.
- `src/lib/axios.ts` injeta `Authorization: Bearer <token>` a partir do cookie de credenciais.
- Respostas `401` chamam `deslogarUsuarioTotal()` uma unica vez para limpar store, cookie, cache e navegar para `/login`.
- Rotas autenticadas validam credencial no `beforeLoad` usando a store.

Evite duplicar logica de logout ou leitura de token. Reuse `deslogarUsuarioTotal`, `obterCookie` e o cliente `api`.

## API e TanStack Query

Cada dominio de API segue o padrao:

- `src/api/<dominio>/<dominio>.ts`: hooks `useQuery` e `useMutation`.
- `src/api/<dominio>/<dominio>.types.ts`: request/response types e query keys.
- `src/api/types.ts`: tipos compartilhados de erro.

Padroes:

- Query keys sao objetos `as const`, por exemplo `EmpresaQueryKeys`.
- Hooks usam nomes descritivos em portugues: `useObterInformacoesEmpresa`, `useCadastrarVagaEmpresa`.
- Mutations exibem feedback com `toast.success` ou `toast.error`.
- Ao alterar dados, invalide queries relacionadas com `queryClient.invalidateQueries`.
- Erros de API usam `ErroResponse` e costumam ler `erro.response?.data.mensagem`.

Ao adicionar uma chamada:

1. Crie ou atualize o arquivo `.types.ts`.
2. Crie o hook em `.ts`.
3. Use o cliente `api` de `@/lib/axios`.
4. Invalide queries afetadas no `onSuccess`.
5. Mostre feedback com `sonner` quando for acao do usuario.

## Formularios

O projeto padroniza formularios com `useFormCustomizado` em `src/components/Formulario`.

Padroes:

- Schemas Zod ficam em arquivos `.schema.ts`.
- Valores iniciais e helpers ficam em `.utils.ts`.
- Tipos locais ficam em `.types.ts`.
- Formulario usa `AppField` e `field.InputForm`.
- Validadores normalmente usam `onSubmit` e `onBlur`.
- Submissao usa `mutateAsync` quando ha chamada de API.

Exemplo de uso:

```tsx
const { AppField, Subscribe, handleSubmit, reset } = useFormCustomizado({
  defaultValues,
  validators: {
    onSubmit: schema,
    onBlur: schema,
  },
  onSubmit: async ({ value }) => {
    await mutateAsync(value)
  },
})
```

`InputForm` possui variantes em `src/components/Formulario/InputForm/variantes`, como `normal`, `mascara`, `select`, `senha` e campos similares usados no projeto.

## Componentes

Convencoes comuns:

- Componentes ficam em pastas proprias: `Componente/Componente.tsx`.
- Tipos ficam em `Componente.types.ts`.
- Estilos complexos ficam em `Componente.styles.ts`.
- Helpers ficam em `Componente.utils.ts`.
- Componentes visuais usam MUI (`Stack`, `Grid`, `Typography`, `Box`, `IconButton`, etc.).
- Estilos locais usam `sx` ou funcoes `SxProps<Theme>`.
- Botoes devem usar o componente `Botao` quando fizer sentido, para preservar variantes, cores e loading.
- Modais devem usar `ModalBase`.
- Listagens tabulares devem preferir `GridDados` e `useGerarDadosGrid`.
- Estados vazios devem usar `SemDados` quando aplicavel.

## Tema e UI

Tema em `src/lib/theme.ts`:

- Cor primaria: `#5E93AD`.
- Cor secundaria: `#FF9900`.
- Fonte: `Montserrat, sans-serif`.
- Existe paleta customizada `cinza`.

Ao criar UI:

- Prefira componentes MUI e o tema em vez de cores soltas.
- Use `theme.spacing(...)` para espacamentos quando estiver em `sx` funcional.
- Mantenha telas internas objetivas, densas e funcionais.
- Use icones de `@mui/icons-material` quando houver uma opcao adequada.

## Mascaras, Datas e Dominio

- Mascaras ficam em `src/lib/mascaras.ts`.
- Formatacao de datas usa `date-fns`.
- Dominios/listas auxiliares ficam em `src/lib/dominios`.

Antes de criar uma mascara, enum ou helper, verifique se ja existe algo em `src/lib`.

## Estado Global

Redux hoje e usado principalmente para credenciais.

- Store: `src/lib/reducers/index.ts`.
- Hook tipado: `useAppSelector`.
- Reducers ficam em `src/lib/reducers`.

Nao adicione estado global sem necessidade. Para dados vindos da API, prefira TanStack Query.

## Arquivos Gerados e Build

- `src/routeTree.gen.ts` e gerado pelo TanStack Router. Nao edite manualmente salvo emergencia.
- `dist/` e saida de build.
- `node_modules/` nao deve ser alterado manualmente.
- `package-lock.json` deve acompanhar mudancas reais em dependencias.

## Cuidados no Repositorio

- O working tree pode ter alteracoes em andamento. Antes de editar, confira `git status --short`.
- Nao reverta alteracoes existentes sem pedido explicito.
- Mantenha alteracoes pequenas e alinhadas ao padrao local.
- O projeto esta em portugues; preserve nomes, textos e padroes de dominio em portugues.
- Ha alguns textos existentes com caracteres acentuados possivelmente exibidos com encoding incorreto no terminal. Ao editar arquivos, salve como UTF-8 e evite introduzir mojibake.
- TypeScript esta com `noUnusedLocals` e `noUnusedParameters`; remova imports e variaveis nao usados.

## Checklist para Novas Features

Ao implementar uma feature:

1. Identifique se pertence a `Candidato`, `Empresa`, `NaoAutenticado` ou componente compartilhado.
2. Crie/atualize tipos de API em `src/api/<dominio>/<dominio>.types.ts`.
3. Crie hooks de API com TanStack Query em `src/api/<dominio>/<dominio>.ts`.
4. Crie tela em `src/pages/<Area>/<Feature>`.
5. Se houver formulario, use `useFormCustomizado`, schema Zod e arquivos `.schema.ts`, `.types.ts`, `.utils.ts`.
6. Se houver rota, adicione em `src/routes` seguindo o file-based router.
7. Reuse componentes existentes (`Botao`, `ModalBase`, `GridDados`, `InputForm`, `SemDados`).
8. Rode `npm run build` e, se possivel, `npm run lint`.

## Pontos Atuais Observados

- Ha uma area de vagas da empresa em desenvolvimento:
  - API em `src/api/vaga`.
  - Paginas em `src/pages/Empresa/Vaga`.
  - Rotas em `src/routes/_autenticado/empresa/(rotas)/vaga`.
- A rota de detalhe de vaga ainda parece estar em estado inicial e deve ser conectada a `Pages.Empresa.Vaga.Detalhes` quando for implementada.
- `src/pages/Empresa/Vaga/Detalhes/Detalhes.tsx` parece conter placeholder.
- `src/components/GridDados` foi adicionado para padronizar DataGrid.

