import { TOKEN_KEY, REFRESH_TOKEN_KEY, BACKEND_URL } from './constants'
import axios from 'axios'

export type RefreshTokenResponse = {
  accessToken: string
  refreshToken: string
}

const decodeBase64Url = (value: string): string => {
  const normalized = value.replace(/-/g, '+').replace(/_/g, '/')
  const padding = (4 - (normalized.length % 4)) % 4
  return atob(normalized.padEnd(normalized.length + padding, '='))
}

const parseJwtPayload = (token: string): Record<string, unknown> | null => {
  try {
    const [, payload] = token.split('.')
    if (!payload) return null
    return JSON.parse(decodeBase64Url(payload)) as Record<string, unknown>
  } catch {
    return null
  }
}

export function getAccessToken(): string | null {
  return localStorage.getItem(TOKEN_KEY)
}

export function getRefreshToken(): string | null {
  return localStorage.getItem(REFRESH_TOKEN_KEY)
}

export function setTokens(accessToken: string, refreshToken: string): void {
  localStorage.setItem(TOKEN_KEY, accessToken)
  localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken)
}

export function clearTokens(): void {
  localStorage.removeItem(TOKEN_KEY)
  localStorage.removeItem(REFRESH_TOKEN_KEY)
}

export function isAuthenticated(): boolean {
  return getAccessToken() !== null
}

export function getPrimaryRole(): string | null {
  const token = getAccessToken()
  if (!token) return null

  const payload = parseJwtPayload(token)
  const rawRoles = payload?.roles
  if (Array.isArray(rawRoles)) {
    const first = rawRoles.find((role): role is string => typeof role === 'string')
    return first ?? null
  }
  return null
}

export async function refreshAccessToken(): Promise<string> {
  const refreshToken = getRefreshToken()

  if (!refreshToken) {
    throw new Error('No refresh token available')
  }

  try {
    const response = await axios.post<RefreshTokenResponse>(
      `${BACKEND_URL}/refresh`,
      { refreshToken },
      {
        withXSRFToken: true,
        withCredentials: true,
        xsrfHeaderName: 'X-XSRF-TOKEN',
        xsrfCookieName: 'XSRF-TOKEN',
      }
    )

    const { accessToken, refreshToken: newRefreshToken } = response.data
    setTokens(accessToken, newRefreshToken)
    return accessToken
  } catch (error) {
    clearTokens()
    throw error
  }
}
