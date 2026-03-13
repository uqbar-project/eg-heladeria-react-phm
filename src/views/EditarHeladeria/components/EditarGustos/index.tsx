import Button from '@/components/Button'
import Icon from '@/components/Icon'
import Label from '@/components/Label'
import { useModal } from '@/hooks/useModal'
import { Heladeria } from '@/model/heladeria'
import { twMerge } from 'tailwind-merge'
import AgregarGustoModal from './components/AgregarGustosModal'
import TablaGustos from './components/TablaGustos'

type Props = {
  className?: string
  heladeria: Heladeria
  setHeladeria: React.Dispatch<React.SetStateAction<Heladeria>>
}

const EditarGustos = ({ className, heladeria, setHeladeria }: Props) => {
  const { isOpened, open, close } = useModal()

  return (
    <div className={twMerge('flex flex-col gap-3.5', className)}>
      <div className='flex w-full items-center justify-between'>
        <Label>Gustos</Label>
        <Button
          type='button'
          className='button-primary button-sm'
          onClick={open}
          label={
            <div className='flex items-center gap-1.5'>
              <span>Agregar Gusto</span>
              <Icon name='PlusCircle' className='h-4 fill-white' />
            </div>
          }
        />
      </div>
      <TablaGustos heladeria={heladeria} setHeladeria={setHeladeria} />
      <AgregarGustoModal isOpened={isOpened} heladeria={heladeria} setHeladeria={setHeladeria} close={close} />
    </div>
  )
}

export default EditarGustos
