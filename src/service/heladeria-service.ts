import { Duenio } from '@/model/duenio'
import { Heladeria } from '@/model/heladeria'
import { BACKEND_URL } from './constants'
import { httpRequest } from './common'

async function buscarHeladerias(nombre: string = ''): Promise<Heladeria[]> {
  const params = new URLSearchParams({
    nombre,
  })
  return httpRequest<Heladeria[]>({
    url: `${BACKEND_URL}/heladerias/buscar?${params}`,
  })
}

async function fetchById(heladeriaId: number): Promise<Heladeria> {
  return httpRequest<Heladeria>({
    url: `${BACKEND_URL}/heladerias/${heladeriaId}`,
  })
}

async function fetchDuenios(): Promise<Duenio[]> {
  return httpRequest<Duenio[]>({
    url: `${BACKEND_URL}/duenios`,
  })
}

async function crearDuenio(nombreCompleto: string): Promise<Duenio> {
  return httpRequest<Duenio>({
    url: `${BACKEND_URL}/duenios`, 
    data: { nombreCompleto },
  })
}

async function actualizar(heladeria: Heladeria): Promise<Heladeria> {
  return httpRequest<Heladeria>({
    url: `${BACKEND_URL}/heladerias/${heladeria.id}`, 
    data: heladeria, 
    method: 'PUT',
  })
}

export default { buscarHeladerias, fetchById, fetchDuenios, crearDuenio, actualizar }
