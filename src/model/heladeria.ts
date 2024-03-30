import { Duenio } from './duenio'

export type Heladeria = {
  id: number
  nombre: string
  tipoHeladeria: TipoHeladeria
  duenio: Duenio
  gustos: { [nombre: string]: number }
}

export const tiposHeladeria = ['ECONOMICA', 'ARTESANAL', 'INDUSTRIAL'] as const

export type TipoHeladeria = (typeof tiposHeladeria)[number]
