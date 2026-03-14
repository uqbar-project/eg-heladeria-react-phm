import Card from '@/components/Card'
import Input from '@/components/Input'
import RadioGroup from '@/components/RadioGroup'
import { Heladeria, TipoHeladeria, tiposHeladeria } from '@/model/heladeria'
import { useLoaderData, useRouter } from '@tanstack/react-router'
import { useState } from 'react'
import EditarBotones from './components/EditarBotones'
import EditarDuenio from './components/EditarDuenio'
import EditarGustos from './components/EditarGustos'
import EditarHeader from './components/EditarHeader'

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
    <section className='page-container'>
      <Card className='mx-auto max-w-6xl'>
        <EditarHeader />
        <form className='space-y-6' onSubmit={(e) => e.preventDefault()}>
          <div className='grid gap-x-6 gap-y-5 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]'>
            <Input
              id='nombreHeladeria'
              autoComplete='off'
              label='Nombre'
              value={heladeria.nombre}
              onChange={(e) => setHeladeria({ ...heladeria, nombre: e.target.value })}
            />
            <EditarDuenio heladeria={heladeria} setHeladeria={setHeladeria} />
            <RadioGroup
              className='lg:col-span-2'
              label='Tipo de heladería'
              value={heladeria.id ? heladeria.tipoHeladeria : ''}
              options={tipoHeladeriaOptions}
              onChange={(e) => setHeladeria({ ...heladeria, tipoHeladeria: e.target.value as TipoHeladeria })}
            />
            <EditarGustos className='lg:col-span-2' heladeria={heladeria} setHeladeria={setHeladeria} />
          </div>
          <EditarBotones heladeria={heladeria} heladeriaOriginal={heladeriaBackend} onAccept={onAccept} />
        </form>
      </Card>
    </section>
  )
}

export default EditarHeladeria
