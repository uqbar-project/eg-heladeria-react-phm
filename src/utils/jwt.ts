export type JwtPayload = {
  sub?: string
  roles?: string[]
  exp?: number
  iat?: number
} & Record<string, unknown>

const decodeBase64Url = (value: string): string => {
  const normalized = value.replace(/-/g, '+').replace(/_/g, '/')
  const padding = (4 - (normalized.length % 4)) % 4
  return atob(normalized.padEnd(normalized.length + padding, '='))
}

const parseJwtPayload = (token: string): JwtPayload | null => {
  try {
    const [, payload] = token.split('.')
    if (!payload) return null
    return JSON.parse(decodeBase64Url(payload))
  } catch {
    return null
  }
}

export const getTokenPayload = (token: string | null): JwtPayload | null => {
  if (!token) return null
  return parseJwtPayload(token)
}
