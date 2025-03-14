import Button from '@/components/Button'
import ErrorModal from '@/components/Modal/ErrorModal'
import SuccessModal from '@/components/Modal/SuccessModal'
import { Heladeria } from '@/model/heladeria'
import heladeriaService from '@/service/heladeria-service'
import { useRouter } from '@tanstack/react-router'
import { useState } from 'react'
import { sonHeladeriasDistintas } from './utils'
import { AxiosError } from 'axios'

type Props = {
  heladeria: Heladeria
  heladeriaOriginal: Heladeria
  onAccept?: (heladeria: Heladeria) => void
}

const EditarBotones = ({ heladeria, heladeriaOriginal, onAccept }: Props) => {
  const { navigate } = useRouter()
  const [error, setError] = useState<AxiosError>()
  const [isSuccess, setIsSuccess] = useState(false)

  const onCancel = () => navigate({ to: '/home' })

  const onModalClose = () => {
    setError(undefined)
    setIsSuccess(false)
  }

  async function actualizarHeladeria() {
    try {
      setIsSuccess(false)
      setError(undefined)
      const heladeriaActualizada = await heladeriaService.actualizar(heladeria)
      setIsSuccess(true)
      onAccept?.(heladeriaActualizada)
    } catch (error) {
      console.info(error)
      setError(error as AxiosError)
    }
  }

  const hayCambiosPendientes = sonHeladeriasDistintas({
    heladeriaOriginal: heladeriaOriginal,
    heladeriaActualizada: heladeria,
  })

  return (
    <section className='w-full flex gap-4 justify-center mt-8'>
      <Button type='button' className='button-outlined' label='Cancelar' onClick={onCancel} />
      <Button
        type='button'
        label='Actualizar'
        className='button-primary'
        onClick={actualizarHeladeria}
        disabled={!hayCambiosPendientes || !heladeria.id}
      />

      <SuccessModal
        isOpened={!!isSuccess && !error}
        title='Heladería actualizada exitosamente'
        content={
          <>
            Se han guardado los cambios en <strong>{heladeriaOriginal.nombre}</strong>
          </>
        }
        onClose={onModalClose}
      />

      <ErrorModal error={error} title={'Hubo un problema actualizando la heladería'} onClose={onModalClose} />
    </section>
  )
}

export default EditarBotones
