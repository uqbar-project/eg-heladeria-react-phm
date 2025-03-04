import { BACKEND_URL, TOKEN_KEY } from './constants'

type RequestBody = string | number | boolean | null | { [key: string]: RequestBody } | RequestBody[]

const getCookie = (name: string): string => {
  const nameLenPlus = (name.length + 1)
  return document.cookie
    .split(';')
    .map(cookie => cookie.trim())
    .filter(cookie => {
      return cookie.substring(0, nameLenPlus) === `${name}=`
    })
    .map(cookie => {
      return decodeURIComponent(cookie.substring(nameLenPlus))
    })[0] || ''
}

export async function httpRequest<T>(request: RequestInfo): Promise<T> {
  const okRequest = (typeof request === 'string') ? new Request(request) : request
  if (okRequest.url !== '/login') {
    const token = localStorage.getItem(TOKEN_KEY) ?? ''
    okRequest.headers.append('Authorization', `Bearer ${token}`);
  }
  if (['POST', 'PUT'].includes(okRequest.method)) {
    const csrfToken = getCookie('XSRF-TOKEN')
    okRequest.headers.append('X-XSRF-TOKEN', csrfToken)
  }
  const response = await fetch(okRequest)
  const finalResponse = response.headers.get("Content-Type") === 'application/json' ?  await response.json() : await response.text()

  if (!response.ok) {
    throw finalResponse
  }

  return finalResponse
}

export async function customRequest<T>(route: string, body: RequestBody, method = 'POST') {
  return httpRequest<T>(
    new Request(`${BACKEND_URL}${route}`, {
      method,
      body: JSON.stringify(body),
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
    })
  )
}

