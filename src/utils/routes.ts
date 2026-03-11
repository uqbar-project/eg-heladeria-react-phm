import { isAuthenticated, clearTokens } from '@/service/token-service'
import { redirect } from '@tanstack/react-router'
import { AxiosError } from 'axios'

export const onErrorRoute = (error: AxiosError) => {
  console.error('Error en ruta:', error.response?.status, error.message)
}

export const onBeforeLoad = () => {
  const isLoggedIn = isAuthenticated()
  if (!isLoggedIn) {
    throw redirect({
      to: '/login',
      search: {
        // Use the current location to power a redirect after login
        // (Do not use `router.state.resolvedLocation` as it can
        // potentially lag behind the actual current location)
        redirect: location.pathname,
      },
    })
  }
}
