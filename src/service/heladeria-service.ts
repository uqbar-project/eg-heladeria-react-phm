import { Duenio } from '@/model/duenio'
import { Heladeria, HeladeriaBase, HeladeriaJSON } from '@/model/heladeria'
import { BACKEND_URL } from './constants'

async function httpRequest<T>(request: RequestInfo): Promise<T> {
  const response = await fetch(request)
  const responseJson = await response.json()

  if (!response.ok) {
    throw responseJson
  }

  return responseJson
}

async function customRequest<T>(route: string, body: Partial<T>, method = 'POST') {
  return httpRequest<T>(
    new Request(`${BACKEND_URL}${route}`, {
      method,
      body: JSON.stringify(body),
      headers: { 'Content-Type': 'application/json' },
    })
  )
}

async function buscarHeladerias(nombre: string = ''): Promise<HeladeriaBase[]> {
  const params = new URLSearchParams({
    nombre,
  })
  return httpRequest<HeladeriaBase[]>(`${BACKEND_URL}/heladerias/buscar?${params}`)
}

async function fetchById(heladeriaId: number): Promise<Heladeria> {
  const heladeriaJson = await httpRequest<HeladeriaJSON>(`${BACKEND_URL}/heladerias/id/${heladeriaId}`)
  return { ...heladeriaJson, gustos: new Map(Object.entries(heladeriaJson.gustos)) }
}

async function fetchDuenios(): Promise<Duenio[]> {
  return httpRequest<Duenio[]>(`${BACKEND_URL}/duenios`)
}

async function crearDuenio(nombreCompleto: string): Promise<Duenio> {
  return customRequest<Duenio>('/duenios', { nombreCompleto })
}

async function actualizar(heladeria: Heladeria): Promise<Heladeria> {
  return customRequest<Heladeria>(`/heladerias/${heladeria.id}`, heladeria, 'PUT')
}

export default { buscarHeladerias, fetchById, fetchDuenios, crearDuenio, actualizar }
