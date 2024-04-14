import heladeriaService from '@/service/heladeria-service'
import EditarHeladeria from '@/views/EditarHeladeria'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute(`/editar-heladeria/$id`)({
  component: EditarHeladeria,
  loader: async (params) => heladeriaService.fetchById(+params.params.id),
})
