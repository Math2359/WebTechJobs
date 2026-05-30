import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createRouter, RouterProvider } from '@tanstack/react-router'
import { routeTree } from './routeTree.gen'
import { CssBaseline, ThemeProvider } from '@mui/material'
import { theme } from './lib/theme'
import { Toaster } from 'sonner';
import { Provider } from 'react-redux'
import { store } from './lib/reducers'
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClient } from './lib/queryClient'

const router = createRouter({ routeTree })

// Register the router instance for type safety
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <Toaster richColors position='top-right' />
          <CssBaseline />
          <RouterProvider router={router} />
        </ThemeProvider>
      </Provider>
    </QueryClientProvider>
  </StrictMode>,
)
