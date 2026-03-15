export type JwtHeader = {
  alg?: string
  typ?: string
}

export type JwtPayload = {
  sub?: string
  roles?: string[]
  exp?: number
  iat?: number
} & Record<string, unknown>

const textDecoder = new TextDecoder()

const decodeBase64Url = (value: string): string => {
  const normalized = value.replace(/-/g, '+').replace(/_/g, '/')
  const padding = (4 - (normalized.length % 4)) % 4
  const binary = atob(normalized.padEnd(normalized.length + padding, '='))
  const bytes = Uint8Array.from(binary, (char) => char.charCodeAt(0))
  return textDecoder.decode(bytes)
}

const parseJwtPayload = (token: string): JwtPayload | null => {
  try {
    const [, payload] = token.split('.')
    if (!payload) return null
    const parsed: unknown = JSON.parse(decodeBase64Url(payload))
    if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed)) return null
    return parsed as JwtPayload
  } catch {
    return null
  }
}

export const getTokenPayload = (token: string | null): JwtPayload | null => {
  if (!token) return null
  return parseJwtPayload(token)
}

export const getTokenHeader = (token: string | null): JwtHeader | null => {
  if (!token) return null
  try {
    const [header] = token.split('.')
    if (!header) return null
    const parsed: unknown = JSON.parse(decodeBase64Url(header))
    if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed)) return null
    return parsed as JwtHeader
  } catch {
    return null
  }
}
