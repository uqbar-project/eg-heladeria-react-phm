import { TOKEN_KEY } from '@/service/constants'
import { redirect } from '@tanstack/react-router'

export const SESSION_EXPIRED_ERROR = 'Sesión vencida'

export const onErrorRoute = (error: Error) => {
  if (error.message === SESSION_EXPIRED_ERROR) {
    localStorage.removeItem(TOKEN_KEY)
    throw redirect({
      to: '/login',
      search: {
        redirect: location.pathname,
      },
    })
  }
}

export const onBeforeLoad = () => {
  const isLoggedIn = localStorage.getItem(TOKEN_KEY) !== null
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
