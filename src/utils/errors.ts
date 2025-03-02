import { HttpStatusCodes } from '@/constants/http'
import { AppError } from '@/types'

export const getErrorMessageByStatusCode = (error: AppError): string => {
  if (!error.status) {
    return 'Falló la conexión con el servidor.'
  }

  if (error.status === HttpStatusCodes.FORBIDDEN) {
    return 'Tu cuenta no tiene los permisos necesarios para realizar esta acción.'
  }

  return 'Ocurrió un error inesperado. Por favor, intenta nuevamente.'
}
