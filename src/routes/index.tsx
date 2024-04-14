import heladeriaService from '@/service/heladeria-service'
import Home from '@/views/Home'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
  component: Home,
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
