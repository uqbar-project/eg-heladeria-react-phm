import Card from '@/components/Card'
import Input from '@/components/Input'
import RadioGroup from '@/components/RadioGroup'
import { Heladeria, TipoHeladeria, tiposHeladeria } from '@/model/heladeria'
import { useLoaderData, useRouter } from '@tanstack/react-router'
import { useState } from 'react'
import EditarBotones from './components/EditarBotones'
import EditarDuenio from './components/EditarDuenio'
import EditarGustos from './components/EditarGustos'

const EditarHeladeria = () => {
  const { invalidate } = useRouter()
  const heladeriaBackend = useLoaderData({ from: '/_authenticated/editar-heladeria/$id' })
  const [heladeria, setHeladeria] = useState<Heladeria>(heladeriaBackend)

  const tipoHeladeriaOptions = tiposHeladeria.map((tipo) => ({ value: tipo, label: tipo }))

  const onAccept = (heladeriaActualizada: Heladeria) => {
    setHeladeria(heladeriaActualizada)
    invalidate()
  }

  return (
    <section className='flex items-center justify-center mt-6 mb-6 container text-[14px]'>
      <Card showBack>
        <form className='mt-4'>
          <div className='flex flex-col gap-y-6'>
            <Input
              id='nombreHeladeria'
              autoComplete='off'
              label='Nombre'
              value={heladeria.nombre}
              onChange={(e) => setHeladeria({ ...heladeria, nombre: e.target.value })}
            />
            <RadioGroup
              label='Tipo de heladería'
              value={heladeria.id ? heladeria.tipoHeladeria : ''}
              options={tipoHeladeriaOptions}
              onChange={(e) => setHeladeria({ ...heladeria, tipoHeladeria: e.target.value as TipoHeladeria })}
            />
            <EditarDuenio heladeria={heladeria} setHeladeria={setHeladeria} />
            <EditarGustos heladeria={heladeria} setHeladeria={setHeladeria} />
          </div>
          <EditarBotones heladeria={heladeria} heladeriaOriginal={heladeriaBackend} onAccept={onAccept} />
        </form>
      </Card>
    </section>
  )
}

export default EditarHeladeria
