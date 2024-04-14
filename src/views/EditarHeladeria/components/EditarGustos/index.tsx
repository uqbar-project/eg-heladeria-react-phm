import Icon from '@/components/Icon'
import Label from '@/components/Label'
import Modal from '@/components/Modal'
import Table, { Column } from '@/components/Table'
import { useModal } from '@/hooks/useModal'
import { Heladeria } from '@/model/heladeria'
import { tablaGustosColumnsBase } from './config'
import { Gusto } from './types'
import ModalTitle from '@/components/Modal/components/ModalTitle'
import Input from '@/components/Input'
import Button from '@/components/Button'
import { useState } from 'react'

type Props = {
  heladeria: Heladeria
  setHeladeria: (heladeria: Heladeria) => void
}

const NUEVO_GUSTO_DEFAULT = { nombre: '', dificultad: undefined }

const EditarGustos = ({ heladeria, setHeladeria }: Props) => {
  const { isOpened, open, close } = useModal()
  const [nuevoGusto, setNuevoGusto] = useState<{ nombre?: string; dificultad?: number }>(NUEVO_GUSTO_DEFAULT)

  const onClose = () => {
    setNuevoGusto(NUEVO_GUSTO_DEFAULT)
    close()
  }

  const agregarGusto = async () => {
    if (!nuevoGusto.nombre || nuevoGusto.dificultad == undefined) return
    setHeladeria({ ...heladeria, gustos: { ...heladeria.gustos, [nuevoGusto.nombre]: nuevoGusto.dificultad } })
    onClose()
  }

  const eliminarGusto = async (gusto: string) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { [gusto]: _, ...gustos } = heladeria.gustos
    setHeladeria({ ...heladeria, gustos })
  }

  const gustosColumns: Column<Gusto>[] = [
    ...tablaGustosColumnsBase,
    {
      key: 'actions',
      headerName: 'Acción',
      className: 'text-center',
      render: (gusto) => (
        <Icon name='Trash' onClick={() => eliminarGusto(gusto.nombre)} className='flex w-full justify-center' />
      ),
    },
  ]

  const gustosTabla = Object.entries(heladeria.gustos).map(([nombre, dificultad]) => ({
    id: nombre,
    nombre,
    dificultad,
  }))

  const camposIncompletos = !nuevoGusto.nombre || !nuevoGusto.dificultad

  const dificultadInvalida = !!nuevoGusto.dificultad && (nuevoGusto.dificultad < 1 || nuevoGusto.dificultad > 10)

  const gustoYaExiste = !!nuevoGusto.nombre && !!heladeria.gustos[nuevoGusto.nombre]

  const botonAgregarDeshabilitado = camposIncompletos || dificultadInvalida || gustoYaExiste

  const mensajeError = camposIncompletos
    ? 'Hay campos incompletos'
    : dificultadInvalida
      ? 'La dificultad debe ser un número entre 1 y 10'
      : gustoYaExiste
        ? 'El gusto a agregar ya existe'
        : ''

  return (
    <div className='flex flex-col gap-2'>
      <div className='flex justify-between items-center w-full'>
        <Label>Gustos</Label>
        <Icon name='PlusCircle' className='cursor-pointer' onClick={open} />
      </div>
      <Table className='h-[220px]' data={gustosTabla} columns={gustosColumns} />
      <Modal id='agregar-gustos' className='w-[300px] h-fit' isOpened={isOpened} close={onClose}>
        <div className='p-6 flex flex-col gap-4'>
          <ModalTitle title='Agregar Gusto' close={onClose} />
          <div className='flex flex-col gap-4'>
            <Input
              id='nombreGusto'
              label='Nombre'
              value={nuevoGusto.nombre}
              onChange={(e) => setNuevoGusto((currentGusto) => ({ ...currentGusto, nombre: e.target.value }))}
            />
            <Input
              id='dificultadGusto'
              title=''
              type='number'
              min={1}
              max={10}
              step={1}
              label={
                <Label className='flex items-center gap-1' htmlFor='dificultadGusto'>
                  Dificultad
                  <div title='Un número entre 1 y 10'>
                    <Icon name='InfoCircle' className='w-4 h-4' />
                  </div>
                </Label>
              }
              value={nuevoGusto.dificultad || ''}
              onChange={(e) =>
                setNuevoGusto((currentGusto) => {
                  return { ...currentGusto, dificultad: +e.target.value }
                })
              }
            />
          </div>

          <section className='w-full flex gap-4 justify-center mt-4'>
            <Button
              type='button'
              className='bg-secondary-light enabled:hover:bg-secondary-default'
              label='Cancelar'
              onClick={onClose}
            />
            <Button
              type='button'
              label='Agregar'
              title={mensajeError}
              className='boton-actualizar bg-primary-default enabled:hover:bg-primary-light text-white'
              onClick={agregarGusto}
              disabled={botonAgregarDeshabilitado}
            />
          </section>
        </div>
      </Modal>
    </div>
  )
}

export default EditarGustos
