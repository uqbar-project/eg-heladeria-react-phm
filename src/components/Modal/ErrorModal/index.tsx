import Button from '@/components/Button'
import { ReactNode } from 'react'
import Modal from '..'
import ModalResponseContent from '../components/ModalResponseContent'
import RenderErrorList from '../components/ModalResponseContent/components/RenderErrorList'

type Error = {
  status?: number
  message: string
}

type Props = {
  error?: Error
  onClose?: () => void
  onRetry?: () => void
  title?: ReactNode
}

const ErrorModal = ({ error, title, onClose, onRetry }: Props) => {
  if (!error) return null

  console.log(error)

  return (
    <Modal className='h-fit p-6' isOpened={!!error} close={onClose}>
      <ModalResponseContent
        title={title}
        type='error'
        content={
          <div className='flex flex-col gap-4 mt-4'>
            {error.status ? (
              <>
                <p className='text-[12px]'>Por favor revisá los siguientes errores:</p>
                <RenderErrorList errors={error.message} />
              </>
            ) : (
              <p className='text-[12px] text-center'>Falló la conexión con el servidor.</p>
            )}
          </div>
        }
        actions={[
          onClose && (
            <Button
              className='bg-secondary-light enabled:hover:bg-secondary-default'
              label='Cerrar'
              key='close'
              type='button'
              onClick={onClose}
            />
          ),
          onRetry && (
            <Button
              className='bg-primary-default enabled:hover:bg-primary-light text-secondary-light'
              label='Reintentar'
              key='retry'
              type='button'
              onClick={onRetry}
            />
          ),
        ]}
      />
    </Modal>
  )
}

export default ErrorModal
