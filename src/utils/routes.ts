import { isAuthenticated, clearTokens, isTokenExpiredError } from '@/service/token-service'
import { redirect } from '@tanstack/react-router'
import { AxiosError } from 'axios'

export const onErrorRoute = (error: AxiosError) => {
  // Para errores que no son 401, propagamos el error para que se maneje en la UI
  if (error.response?.status !== 401) {
    console.error('Error en la ruta:', error.response?.status, error.message)
    throw error
  }

  // 401 sin token expirado - credenciales inválidas
  if (!isTokenExpiredError(error.response.headers as Record<string, string>)) {
    clearTokens()
    throw redirect({
      to: '/login',
      search: {
        redirect: location.pathname,
      },
    })
  }

  // Token expirado: el interceptor de axios maneja el refresh (acá no hacemos nada)
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
