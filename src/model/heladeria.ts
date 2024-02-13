import { Duenio } from './duenio'

export type HeladeriaBase = {
  id: number
  nombre: string
  tipoHeladeria: TipoHeladeria
  duenio: Duenio
}

export type HeladeriaJSON = HeladeriaBase & {
  gustos: { [nombre: string]: number }
}

export type Heladeria = HeladeriaBase & {
  gustos: Map<string, number>
}

export const tiposHeladeria = ['ECONOMICA', 'ARTESANAL', 'INDUSTRIAL'] as const

type TipoHeladeria = (typeof tiposHeladeria)[number]
