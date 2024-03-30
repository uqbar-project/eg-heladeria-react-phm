import Button from '@/components/Button'
import { Heladeria } from '@/model/heladeria'
import heladeriaService from '@/service/heladeria-service'
import { useRouter } from '@tanstack/react-router'

type Props = {
  heladeria: Heladeria
  heladeriaOriginal?: Heladeria
  onAccept?: () => void
}

const EditarBotones = ({ heladeria, heladeriaOriginal, onAccept }: Props) => {
  const router = useRouter()

  const onCancel = () => router.history.back()

  async function actualizarHeladeria() {
    try {
      if (!heladeria) return
      await heladeriaService.actualizar(heladeria)
      onAccept?.()
      // toast.push(`Heladería actualizada!`)
    } catch (error) {
      // toast.error(error)
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
    <section className="w-full flex gap-4 justify-center mt-8">
      <Button
        type="button"
        className="bg-secondary-default enabled:hover:bg-secondary-light text-white"
        label="Cancelar"
        onClick={onCancel}
      />
      <Button
        type="button"
        label="Actualizar"
        className="boton-actualizar bg-primary-default enabled:hover:bg-primary-light text-white"
        onClick={actualizarHeladeria}
        disabled={!hayCambiosPendientes}
      />
    </section>
  )
}

export default EditarBotones
