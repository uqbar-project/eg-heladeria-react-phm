import axios, { AxiosError, AxiosHeaders, AxiosRequestConfig } from 'axios'
import { BACKEND_URL, TOKEN_KEY } from './constants'

const getCookie = (name: string): string => {
  const nameLenPlus = (name.length + 1)
  console.info('document.cookie', document.cookie)
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

export async function httpRequest<T>(request: AxiosRequestConfig): Promise<T> {
  const token = localStorage.getItem(TOKEN_KEY) ?? ''
  const okRequest = {
    ...request,
    method: request.method ?? 'GET',
    headers: request.headers ?? new AxiosHeaders().setAuthorization(`Bearer ${token}`),
  }
  okRequest.withCredentials = true
  // if (['POST', 'PUT'].includes(request.method!)) {
  //   const csrfToken = getCookie('XSRF-TOKEN')
  //   okRequest.headers!.append('X-XSRF-TOKEN', csrfToken)
  // }
  const response = await axios(okRequest)
  return response.data
}
