import { TOKEN_KEY } from '@/service/constants'
import { AppError } from '@/types'
import { redirect } from '@tanstack/react-router'
import { isSessionExpired } from './errors'

export const onErrorRoute = (error: AppError) => {
  if (isSessionExpired(error)) {
    localStorage.removeItem(TOKEN_KEY)
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
