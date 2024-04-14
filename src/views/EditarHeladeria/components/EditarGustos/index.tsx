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
        <Icon name='PlusCircle' className='cursor-pointer' onClick={open} />
      </div>
      <TablaGustos heladeria={heladeria} setHeladeria={setHeladeria} />
      <AgregarGustoModal isOpened={isOpened} heladeria={heladeria} setHeladeria={setHeladeria} close={close} />
    </div>
  )
}

export default EditarGustos
