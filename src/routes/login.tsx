import { Login } from '@/views/Login'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute(`/login`)({
  component: Login,
  validateSearch: (search) => {
    return search as {
      redirect: string
    }
  },
})
