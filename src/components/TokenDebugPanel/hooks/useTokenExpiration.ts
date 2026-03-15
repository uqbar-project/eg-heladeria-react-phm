import { useEffect, useState } from 'react'
import { JwtPayload } from '@/utils/jwt'
import { formatTimeRemaining } from '../utils'

const calcSecondsRemaining = (exp?: number): number => {
  if (exp == undefined) return NaN
  return exp - Math.floor(Date.now() / 1000)
}

export const useTokenExpiration = (payload: JwtPayload | null) => {
  const expiration = payload?.exp ?? NaN
  const issuedAt = payload?.iat ?? NaN

  const totalDuration = expiration - issuedAt

  const [secondsRemaining, setSecondsRemaining] = useState(() => calcSecondsRemaining(expiration))

  useEffect(() => {
    const interval = setInterval(() => {
      const remaining = calcSecondsRemaining(expiration)
      setSecondsRemaining(remaining)
      if (remaining <= 0) clearInterval(interval)
    }, 1000)
    return () => clearInterval(interval)
  }, [expiration])

  return {
    timeRemaining: formatTimeRemaining(secondsRemaining),
    progress: totalDuration > 0 ? Math.max(0, (secondsRemaining / totalDuration) * 100) : 0,
    expired: secondsRemaining <= 0,
  }
}
