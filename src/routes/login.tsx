import { TOKEN_KEY } from '@/service/constants'
import { Login } from '@/views/Login'
import { createFileRoute, redirect } from '@tanstack/react-router'

export const Route = createFileRoute(`/login`)({
  component: Login,
  validateSearch: (search) => {
    return search as {
      redirect: string
    }
  },
  beforeLoad: () => {
    const isLoggedIn = localStorage.getItem(TOKEN_KEY) !== null
    if (isLoggedIn) {
      throw redirect({
        to: '/',
      })
    }
  },
})
