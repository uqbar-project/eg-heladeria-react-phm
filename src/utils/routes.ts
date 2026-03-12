import { isAuthenticated, clearTokens } from '@/service/token-service'
import { redirect } from '@tanstack/react-router'
import { AxiosError } from 'axios'

export const onErrorRoute = (error: AxiosError) => {
  // Handle 401 errors that are not token expiration
  if (error.response?.status === 401) {
    const wwwAuthenticate = error.response.headers['www-authenticate']
    const isTokenExpired = wwwAuthenticate?.includes('error="invalid_token"')
    
    // Only redirect if it's not a token expiration (those are handled by interceptor)
    if (!isTokenExpired) {
      clearTokens()
      throw redirect({
        to: '/login',
        search: {
          redirect: location.pathname,
        },
      })
    }
  } else {
    // Handle other errors
    clearTokens()
    throw redirect({
      to: '/login',
      search: {
        redirect: location.pathname,
      },
    })
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
