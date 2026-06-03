import {
  QueryCache,
  QueryClient,
} from '@tanstack/react-query'

export const queryClient = new QueryClient({
  queryCache: new QueryCache({
    onError: (_, query) => {
      queryClient.removeQueries({ queryKey: query.queryKey, exact: true })
    }
  }),
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 10, // 10 minutos
      retry: 1,
      retryOnMount: false,
      refetchOnWindowFocus: false,
    },
  }
})