import axios, { AxiosError, AxiosHeaders, AxiosRequestConfig, InternalAxiosRequestConfig } from 'axios'
import { clearTokens, getAccessToken, refreshAccessToken } from './token-service'

// Create axios instance with interceptors
const axiosInstance = axios.create()

let isRefreshing = false
let failedQueue: Array<{
  resolve: (token: string) => void
  reject: (error: unknown) => void
}> = []

type QueueResult = { type: 'success'; token: string } | { type: 'error'; error: unknown }

const retryRequest = (originalRequest: InternalAxiosRequestConfig, token: string) => {
  if (originalRequest.headers) {
    originalRequest.headers.Authorization = `Bearer ${token}`
  }
  return axiosInstance(originalRequest)
}

const queueRequest = (originalRequest: InternalAxiosRequestConfig) => {
  return new Promise<string>((resolve, reject) => {
    failedQueue.push({ resolve, reject })
  }).then((token) => retryRequest(originalRequest, token))
}

const processQueue = (result: QueueResult) => {
  failedQueue.forEach((promise) => {
    if (result.type === 'error') {
      promise.reject(result.error)
    } else {
      promise.resolve(result.token)
    }
  })
  failedQueue = []
}

// Request interceptor to add auth header
axiosInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = getAccessToken()
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error: AxiosError) => Promise.reject(error)
)

// Response interceptor to handle 401 and refresh token
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & { _retry?: boolean }

    // If error is not 401 or request has already been retried, reject
    if (error.response?.status !== 401 || originalRequest._retry) {
      return Promise.reject(error)
    }

    // Check WWW-Authenticate header to determine if it's token expiration
    const wwwAuthenticate = error.response.headers['www-authenticate']
    const isTokenExpired = wwwAuthenticate?.includes('error="invalid_token"')

    // Only attempt refresh if token is expired
    if (!isTokenExpired) {
      return Promise.reject(error)
    }

    // If already refreshing, queue this request
    if (isRefreshing) {
      return queueRequest(originalRequest)
    }

    originalRequest._retry = true
    isRefreshing = true

    try {
      const newToken = await refreshAccessToken()
      processQueue({ type: 'success', token: newToken })
      return retryRequest(originalRequest, newToken)
    } catch (refreshError) {
      processQueue({ type: 'error', error: refreshError })
      clearTokens()
      // Force full page reload to login
      window.location.href = '/login'
      return Promise.reject(refreshError)
    } finally {
      isRefreshing = false
    }
  }
)

export { axiosInstance }

export async function httpRequest<T>(request: AxiosRequestConfig): Promise<T> {
  const headers = (request.headers as AxiosHeaders) ?? new AxiosHeaders()

  const okRequest: AxiosRequestConfig = {
    ...request,
    headers,
    withXSRFToken: true,
    withCredentials: true,
    xsrfHeaderName: 'X-XSRF-TOKEN',
    xsrfCookieName: 'XSRF-TOKEN',
  }

  const response = await axiosInstance(okRequest)
  return response.data
}
