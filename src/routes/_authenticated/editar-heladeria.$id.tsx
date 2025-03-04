import heladeriaService from '@/service/heladeria-service'
import { onErrorRoute } from '@/utils/routes'
import EditarHeladeria from '@/views/EditarHeladeria'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute(`/_authenticated/editar-heladeria/$id`)({
  component: EditarHeladeria,
  loader: async (params) => heladeriaService.fetchById(+params.params.id),
  onError: onErrorRoute,
})
