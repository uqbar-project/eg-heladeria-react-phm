import { Heladeria } from '@/model/heladeria'

export const sonHeladeriasDistintas = ({
  heladeriaOriginal,
  heladeriaActualizada,
}: {
  heladeriaOriginal: Heladeria
  heladeriaActualizada: Heladeria
}) => {
  const gustosOriginal = Object.entries(heladeriaOriginal.gustos)
  const gustosActualizada = Object.entries(heladeriaActualizada.gustos)

  return (
    heladeriaOriginal.nombre != heladeriaActualizada.nombre ||
    heladeriaOriginal.tipoHeladeria != heladeriaActualizada.tipoHeladeria ||
    heladeriaOriginal.duenio.id != heladeriaActualizada.duenio.id ||
    gustosOriginal.length !== gustosActualizada.length ||
    gustosOriginal.some(([gusto, dificultad]) => heladeriaActualizada.gustos[gusto] != dificultad)
  )
}
