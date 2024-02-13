import EditarHeladeria from '@/views/EditarHeladeria'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute(`/editar-heladeria/$id`)({
  component: EditarHeladeria,
})
