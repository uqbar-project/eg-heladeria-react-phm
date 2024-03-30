import Select from '@/components/Select'
import { Duenio } from '@/model/duenio'
import { Heladeria } from '@/model/heladeria'
import heladeriaService from '@/service/heladeria-service'
import { useState, useEffect } from 'react'

type Props = {
  heladeria: Heladeria
  setHeladeria: React.Dispatch<React.SetStateAction<Heladeria | undefined>>
}

const EditarDuenio = ({ heladeria, setHeladeria }: Props) => {
  const [duenios, setDuenios] = useState<Duenio[]>([])

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

  const actualizarDuenio = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const duenio = duenios.find((duenio) => duenio.id === +e.target.value)
    if (duenio) {
      setHeladeria((currHeladeria) => {
        if (!currHeladeria) return currHeladeria
        return { ...currHeladeria, duenio }
      })
    }
  }

  const dueñoOptions = duenios.map((duenio) => ({ value: duenio.id, label: duenio.nombreCompleto }))

  return (
    <Select id="dueño" label="Dueño" onChange={actualizarDuenio} value={heladeria.duenio.id} options={dueñoOptions} />
  )
}

export default EditarDuenio
