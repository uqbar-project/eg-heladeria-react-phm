import { TOKEN_KEY } from '@/service/constants'
import heladeriaService from '@/service/heladeria-service'
import Home from '@/views/Home'
import { createFileRoute, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
  component: Home,
  beforeLoad: () => {
    const isLoggedIn = localStorage.getItem(TOKEN_KEY) !== null
    if (!isLoggedIn) {
      throw redirect({
        to: '/login',
        search: {
          // Use the current location to power a redirect after login
          // (Do not use `router.state.resolvedLocation` as it can
          // potentially lag behind the actual current location)
          redirect: location.href,
        },
      })
    }
  },
  validateSearch: (search) => {
    return search as {
      busqueda?: string
    }
  },
  loaderDeps: (params) => {
    return { busqueda: params.search.busqueda }
  },
  loader: async (params) => heladeriaService.buscarHeladerias(params.deps.busqueda),
})
