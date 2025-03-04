import { HttpStatusCodes } from '@/constants/http'
import { AppError } from '@/types'
import { SESSION_EXPIRED_ERROR } from './routes'

export const getErrorMessage = (error: AppError) => {
  const sessionExpired = error.message === SESSION_EXPIRED_ERROR

  // No se usa error.status porque del backend está devolviendo un 500.
  if (sessionExpired) {
    return 'Se venció la sesión. Por favor, inicie sesión nuevamente.'
  }

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
