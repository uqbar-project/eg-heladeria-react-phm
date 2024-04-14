import { Heladeria } from '@/model/heladeria'

export const getGustoError = (gusto: { nombre?: string; dificultad?: number }, heladeria: Heladeria) => {
  if (!gusto.nombre) return 'Falta ingresar el nombre'
  if (!gusto.dificultad) return 'Falta ingresar la dificultad'
  if (!!gusto.nombre && !!heladeria.gustos[gusto.nombre]) return 'Ya existe un gusto con ese nombre'
  if (!!gusto.dificultad && (gusto.dificultad < 1 || gusto.dificultad > 10))
    return 'La dificultad debe ser un número entre 1 y 10'

  return undefined
}
