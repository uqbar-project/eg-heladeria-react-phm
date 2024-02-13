import { Duenio } from '@/model/duenio'
import { Heladeria } from '@/model/heladeria'
import heladeriaService from '@/service/heladeria-service'
import { useParams } from '@tanstack/react-router'
import { useCallback, useEffect, useState } from 'react'

const EditarHeladeria = () => {
  const [heladeria, setHeladeria] = useState<Heladeria | undefined>()
  const [heladeriaOriginal, setHeladeriaOriginal] = useState<Heladeria | undefined>()
  const [duenios, setDuenios] = useState<Duenio[]>([])
  const [nombreNuevoDuenio, setNombreNuevoDuenio] = useState('')
  const [nuevoGusto, setNuevoGusto] = useState<{ nombre?: string; dificultad?: number }>({})

  const { id } = useParams({ from: '/editar-heladeria/$id' })

  const getHeladeria = useCallback(async () => {
    try {
      const heladeriaBackend = await heladeriaService.fetchById(+id)
      setHeladeria(heladeriaBackend)
      setHeladeriaOriginal({ ...heladeriaBackend })
    } catch (error) {
      // toast.error(error)
    }
  }, [id])

  useEffect(() => {
    getHeladeria()
  }, [getHeladeria])

  useEffect(() => {
    const getDuenios = async () => {
      try {
        const duenios = await heladeriaService.fetchDuenios()
        setDuenios(duenios)
      } catch (error) {
        // toast.error(error)
      }
    }

    getDuenios()
  }, [])

  if (!heladeria) return null

  const agregarDuenio = async () => {
    try {
      const nuevoDuenio = await heladeriaService.crearDuenio(nombreNuevoDuenio)
      setDuenios([...duenios, nuevoDuenio])
      setNombreNuevoDuenio('')
      setHeladeria((currHeladeria) => (currHeladeria ? { ...currHeladeria, duenio: nuevoDuenio } : undefined))
      // toast.push(`Duenio creado!`)
    } catch (error) {
      // toast.error(error)
    }
  }

  const eliminarGusto = async (gusto: string) => {
    heladeria.gustos.delete(gusto)
    setHeladeria({ ...heladeria })
  }

  const agregarGusto = async () => {
    if (!nuevoGusto.nombre || !nuevoGusto.dificultad) return
    heladeria.gustos.set(nuevoGusto.nombre, nuevoGusto.dificultad)
    setHeladeria({ ...heladeria })
    setNuevoGusto({})
  }

  return <main>{heladeria?.nombre}</main>
}

export default EditarHeladeria
