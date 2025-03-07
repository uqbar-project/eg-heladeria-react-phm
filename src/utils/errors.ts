import { HttpStatusCodes } from '@/constants/http'
import { AxiosError } from 'axios'

export const isSessionExpired = (error: AxiosError) => error.status === HttpStatusCodes.UNAUTHORIZED // TODO: use another way to check if the session has expired

export const getErrorMessage = (error: AxiosError) => {
  const status = error?.response?.status

  if (!status) {
    return 'Falló la conexión con el servidor'
  }

  if (status === HttpStatusCodes.BAD_REQUEST || status === HttpStatusCodes.UNAUTHORIZED) {
    return (error.response?.data as Error).message ?? error.message
  }

  if (status === HttpStatusCodes.FORBIDDEN) {
    return 'Tu cuenta no tiene los permisos necesarios para realizar esta acción'
  }

  return 'Ocurrió un error inesperado. Por favor, intenta nuevamente.'
}
