import Button from '@/components/Button'
import { ReactNode } from 'react'
import Modal from '..'
import ModalResponseContent from '../components/ModalResponseContent'
import RenderErrorList from '../components/ModalResponseContent/components/RenderErrorList'
import { getErrorMessage, isSessionExpired } from '@/utils/errors'
import { HttpStatusCodes } from '@/constants/http'
import { TOKEN_KEY } from '@/service/constants'
import { useRouter } from '@tanstack/react-router'
import { AxiosError } from 'axios'

type Props = {
  error?: AxiosError
  onClose?: () => void
  onRetry?: () => void
  title?: ReactNode
}

const ErrorModal = ({ error, title, onClose, onRetry }: Props) => {
  const { navigate } = useRouter()
  if (!error) return null

  const logout = () => {
    localStorage.removeItem(TOKEN_KEY)
    navigate({ to: '/login', search: { redirect: '/' } })
  }

  const sessionExpired = isSessionExpired(error)

  const errorMessage = sessionExpired
    ? 'La sesión ha expirado. Por favor, inicie sesión nuevamente.'
    : getErrorMessage(error)

  return (
    <Modal className='h-fit p-6' isOpened={!!error} close={onClose}>
      <ModalResponseContent
        title={title}
        type='error'
        content={
          <div className='flex flex-col gap-4 mt-4'>
            {error.status === HttpStatusCodes.BAD_REQUEST ? (
              <>
                <p className='text-[12px]'>Por favor revisá los siguientes errores:</p>
                <RenderErrorList errors={errorMessage} />
              </>
            ) : (
              <p className='text-[12px] text-center'>{errorMessage}</p>
            )}
          </div>
        }
        actions={[
          sessionExpired && (
            <Button
              className='button-outlined'
              label='Navegar a login'
              key='goToLogin'
              type='button'
              onClick={logout}
            />
          ),
          !sessionExpired && onClose && (
            <Button className='button-outlined' label='Cerrar' key='close' type='button' onClick={onClose} />
          ),
          !sessionExpired && onRetry && (
            <Button className='button-outlined' label='Reintentar' key='retry' type='button' onClick={onRetry} />
          ),
        ]}
      />
    </Modal>
  )
}

export default ErrorModal
