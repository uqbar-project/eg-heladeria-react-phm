import { onBeforeLoad } from '@/utils/routes'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_authenticated')({
  beforeLoad: onBeforeLoad,
})
