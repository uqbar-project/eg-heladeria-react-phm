import Button from '@/components/Button'
import ErrorModal from '@/components/Modal/ErrorModal'
import SuccessModal from '@/components/Modal/SuccessModal'
import { Heladeria } from '@/model/heladeria'
import heladeriaService from '@/service/heladeria-service'
import { AppError } from '@/types'
import { useRouter } from '@tanstack/react-router'
import { useState } from 'react'

type Props = {
  heladeria: Heladeria
  heladeriaOriginal?: Heladeria
  onAccept?: (heladeria: Heladeria) => void
}

const EditarBotones = ({ heladeria, heladeriaOriginal, onAccept }: Props) => {
  const router = useRouter()
  const [error, setError] = useState<AppError>()
  const [isSuccess, setIsSuccess] = useState(false)

  const onCancel = () => router.history.back()

  const onModalClose = () => {
    setError(undefined)
    setIsSuccess(false)
  }

  async function actualizarHeladeria() {
    if (!heladeria) return
    try {
      setIsSuccess(false)
      setError(undefined)
      const heladeriaActualizada = await heladeriaService.actualizar(heladeria)
      setIsSuccess(true)
      onAccept?.(heladeriaActualizada)
    } catch (error) {
      setError(error as AppError)
    }
  }

  const hayCambiosPendientes =
    heladeria &&
    (heladeriaOriginal?.nombre != heladeria.nombre ||
      heladeriaOriginal?.tipoHeladeria != heladeria.tipoHeladeria ||
      heladeriaOriginal?.duenio.id != heladeria.duenio.id ||
      heladeriaOriginal.gustos.size !== heladeria.gustos.size ||
      Object.entries(heladeriaOriginal.gustos).some(([gusto, dificultad]) => heladeria.gustos[gusto] != dificultad))

  return (
    <section className='w-full flex gap-4 justify-center mt-8'>
      <Button
        type='button'
        className='bg-secondary-light enabled:hover:bg-secondary-default'
        label='Cancelar'
        onClick={onCancel}
      />
      <Button
        type='button'
        label='Actualizar'
        className='boton-actualizar bg-primary-default enabled:hover:bg-primary-light text-white'
        onClick={actualizarHeladeria}
        disabled={!hayCambiosPendientes || !heladeria.id}
      />

      <SuccessModal
        isOpened={!!isSuccess && !error}
        title='Heladería actualizada exitosamente'
        content={
          <>
            <strong>{heladeria.nombre}</strong> ha sido actualizada.
          </>
        }
        onClose={onModalClose}
      />

      <ErrorModal error={error} title={'Hubo un problema actualizando la heladería'} onClose={onModalClose} />
    </section>
  )
}

export default EditarBotones
