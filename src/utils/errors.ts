import { HttpStatusCodes } from '@/constants/http'
import { AppError } from '@/types'

export const isSessionExpired = (error: AppError) => error.status === HttpStatusCodes.UNAUTHORIZED // TODO: use another way to check if the session has expired

export const getErrorMessage = (error: AppError) => {
  if (!error.status) {
    return 'Falló la conexión con el servidor'
  }

  if (error.status === HttpStatusCodes.BAD_REQUEST || error.status === HttpStatusCodes.UNAUTHORIZED) {
    return error.message
  }

  if (error.status === HttpStatusCodes.FORBIDDEN) {
    return 'Tu cuenta no tiene los permisos necesarios para realizar esta acción'
  }

  return 'Ocurrió un error inesperado. Por favor, intenta nuevamente.'
}
