import { useEffect, useReducer } from 'react'
import { JwtPayload } from '@/utils/jwt'
import { formatTimeRemaining } from '../utils'

const calcSecondsRemaining = (exp?: number): number => {
  if (exp === undefined) return NaN
  return exp - Math.floor(Date.now() / 1000)
}

type Options = {
  onExpire?: () => void
}

export const useTokenExpiration = (payload: JwtPayload | null, options?: Options) => {
  const expiration = payload?.exp ?? NaN
  const issuedAt = payload?.iat ?? NaN
  const totalDuration = expiration - issuedAt

  const [, tick] = useReducer((x) => x + 1, 0)

  const secondsRemaining = calcSecondsRemaining(expiration)
  const expired = secondsRemaining <= 0

  useEffect(() => {
    if (expired) {
      options?.onExpire?.()
      return
    }
    const interval = setInterval(tick, 1000)
    return () => clearInterval(interval)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [expired])

  return {
    timeRemaining: formatTimeRemaining(secondsRemaining),
    progress: totalDuration > 0 ? Math.max(0, (secondsRemaining / totalDuration) * 100) : 0,
    expired,
  }
}
