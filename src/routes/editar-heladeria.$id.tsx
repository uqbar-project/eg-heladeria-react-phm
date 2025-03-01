import heladeriaService from '@/service/heladeria-service'
import { onBeforeLoad, onErrorRoute } from '@/utils/routes'
import EditarHeladeria from '@/views/EditarHeladeria'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute(`/editar-heladeria/$id`)({
  component: EditarHeladeria,
  loader: async (params) => heladeriaService.fetchById(+params.params.id),
  beforeLoad: onBeforeLoad,
  onError: onErrorRoute,
})
