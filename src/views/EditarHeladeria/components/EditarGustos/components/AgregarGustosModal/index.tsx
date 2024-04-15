import Button from '@/components/Button'
import Input from '@/components/Input'
import Label from '@/components/Label'
import Modal from '@/components/Modal'
import ModalTitle from '@/components/Modal/components/ModalTitle'
import { Heladeria } from '@/model/heladeria'
import { useState } from 'react'
import { getGustoError } from './utils'

const NUEVO_GUSTO_DEFAULT = { nombre: '', dificultad: undefined }

type Props = {
  isOpened: boolean
  heladeria: Heladeria
  setHeladeria: React.Dispatch<React.SetStateAction<Heladeria>>
  close: () => void
}

const AgregarGustoModal = ({ isOpened, heladeria, setHeladeria, close }: Props) => {
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

  const error = getGustoError(nuevoGusto, heladeria)

  return (
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
            type='number'
            min={1}
            max={10}
            step={1}
            label={
              <Label title='Un número entre 1 y 10' className='flex items-center gap-1' htmlFor='dificultadGusto'>
                Dificultad
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
          <Button type='button' className='button-outlined' label='Cancelar' onClick={onClose} />
          <Button
            type='button'
            label='Agregar'
            title={error}
            className='button-primary'
            onClick={agregarGusto}
            disabled={!!error}
          />
        </section>
      </div>
    </Modal>
  )
}

export default AgregarGustoModal
