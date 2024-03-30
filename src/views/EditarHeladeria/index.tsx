import Card from '@/components/Card'
import RadioGroup from '@/components/RadioGroup'
import TextInput from '@/components/TextInput'
import { Heladeria, TipoHeladeria, tiposHeladeria } from '@/model/heladeria'
import heladeriaService from '@/service/heladeria-service'
import { useParams } from '@tanstack/react-router'
import { useCallback, useEffect, useState } from 'react'
import EditarBotones from './components/EditarBotones'
import EditarGustos from './components/EditarGustos'
import EditarDuenio from './components/EditarDuenio'

const EditarHeladeria = () => {
  const [loading, setLoading] = useState(false)
  const [heladeria, setHeladeria] = useState<Heladeria | undefined>()
  const [heladeriaOriginal, setHeladeriaOriginal] = useState<Heladeria | undefined>()

  const { id } = useParams({ from: '/editar-heladeria/$id' })

  const getHeladeria = useCallback(async () => {
    try {
      setLoading(true)
      const heladeriaBackend = await heladeriaService.fetchById(+id)
      setHeladeria(heladeriaBackend)
      setHeladeriaOriginal(structuredClone(heladeriaBackend))
    } catch (error) {
      // toast.error(error)
    } finally {
      setLoading(false)
    }
  }, [id])

  useEffect(() => {
    getHeladeria()
  }, [getHeladeria])

  if (!heladeria) return null

  const tipoHeladeriaOptions = tiposHeladeria.map((tipo) => ({ value: tipo, label: tipo }))

  return (
    <section className="flex items-center justify-center mt-6 container text-[14px]">
      <Card showBack>
        <form className="mt-4">
          <div className="flex flex-col gap-y-4">
            <TextInput
              id="nombreHeladeria"
              autoComplete="off"
              label="Nombre"
              value={heladeria.nombre}
              onChange={(e) => setHeladeria({ ...heladeria, nombre: e.target.value })}
            />
            <RadioGroup
              label="Tipo de heladeria"
              value={heladeria.tipoHeladeria}
              options={tipoHeladeriaOptions}
              onChange={(e) => setHeladeria({ ...heladeria, tipoHeladeria: e.target.value as TipoHeladeria })}
            />
            <EditarDuenio heladeria={heladeria} setHeladeria={setHeladeria} />
            <EditarGustos heladeria={heladeria} setHeladeria={setHeladeria} loading={loading} />
          </div>
          <EditarBotones
            heladeria={heladeria}
            heladeriaOriginal={heladeriaOriginal}
            onAccept={() => setHeladeriaOriginal(structuredClone(heladeria))}
          />
        </form>
      </Card>
    </section>
  )
}

export default EditarHeladeria
