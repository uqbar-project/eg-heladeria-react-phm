import { BACKEND_URL, TOKEN_KEY } from './constants'

export async function httpRequest<T>(request: RequestInfo): Promise<T> {
  const okRequest = (typeof request === 'string') ? new Request(request) : request
  const token = localStorage.getItem(TOKEN_KEY) ?? ''
  okRequest.headers.append('Authorization', `Bearer ${token}`);
  const response = await fetch(okRequest)
  const finalResponse = response.headers.get("Content-Type") === 'application/json' ?  await response.json() : await response.text()

  if (!response.ok) {
    throw finalResponse // ???
  }

  return finalResponse
}

export async function customRequest<T>(route: string, body: Partial<T>, method = 'POST') {
  return httpRequest<T>(
    new Request(`${BACKEND_URL}${route}`, {
      method,
      body: JSON.stringify(body),
      headers: { 'Content-Type': 'application/json' },
    })
  )
}
