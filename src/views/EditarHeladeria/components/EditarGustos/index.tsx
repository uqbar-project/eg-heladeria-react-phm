import Button from '@/components/Button'
import Icon from '@/components/Icon'
import Label from '@/components/Label'
import { useModal } from '@/hooks/useModal'
import { Heladeria } from '@/model/heladeria'
import AgregarGustoModal from './components/AgregarGustosModal'
import TablaGustos from './components/TablaGustos'

type Props = {
  heladeria: Heladeria
  setHeladeria: React.Dispatch<React.SetStateAction<Heladeria>>
}

const EditarGustos = ({ heladeria, setHeladeria }: Props) => {
  const { isOpened, open, close } = useModal()

  return (
    <div className='flex flex-col gap-2'>
      <div className='flex justify-between items-center w-full'>
        <Label>Gustos</Label>
        <div className='flex items-center gap-2'>
          <Button
            type='button'
            className='button-primary text-xs max-h-8'
            onClick={open}
            label={
              <div className='flex items-center gap-2'>
                <span>Agregar Gusto</span>
                <Icon name='PlusCircle' className='fill-white' />
              </div>
            }
          />
        </div>
      </div>
      <TablaGustos heladeria={heladeria} setHeladeria={setHeladeria} />
      <AgregarGustoModal isOpened={isOpened} heladeria={heladeria} setHeladeria={setHeladeria} close={close} />
    </div>
  )
}

export default EditarGustos
