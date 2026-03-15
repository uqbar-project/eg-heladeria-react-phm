import { isAuthenticated, clearTokens, isTokenExpiredError } from '@/service/token-service'
import { redirect } from '@tanstack/react-router'
import { AxiosError } from 'axios'

export const onErrorRoute = (error: AxiosError) => {
  // Handle 401 errors that are not token expiration
  if (error.response?.status === 401) {
    // Only redirect if it's not a token expiration (those are handled by interceptor)
    if (!isTokenExpiredError(error.response.headers as Record<string, string>)) {
      clearTokens()
      throw redirect({
        to: '/login',
        search: {
          redirect: location.pathname,
        },
      })
    }
  } else {
    // Para otros errores (500, 404, red), no deslogueamos al usuario
    // Solo propagamos el error para que se maneje en la UI
    console.error('Error en la ruta:', error.response?.status, error.message)
    throw error
  }
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
