import Icon from '@/components/Icon'
import Table, { Column } from '@/components/Table'
import { Heladeria } from '@/model/heladeria'
import { Gusto } from '../../types'
import { tablaGustosColumnsBase } from './config'

type Props = {
  heladeria: Heladeria
  setHeladeria: React.Dispatch<React.SetStateAction<Heladeria>>
}

const TablaGustos = ({ heladeria, setHeladeria }: Props) => {
  const eliminarGusto = async (gusto: string) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { [gusto]: _, ...gustos } = heladeria.gustos
    setHeladeria({ ...heladeria, gustos })
  }

  const gustosColumns: Column<Gusto>[] = [
    ...tablaGustosColumnsBase,
    {
      key: 'actions',
      headerName: 'Eliminar',
      className: 'text-center',
      render: (gusto) => (
        <Icon name='Trash' onClick={() => eliminarGusto(gusto.nombre)} className='flex w-full justify-center' />
      ),
    },
  ]

  const data = Object.entries(heladeria.gustos)
    .map(([nombre, dificultad]) => ({
      id: nombre,
      nombre,
      dificultad,
    }))
    .sort((a, b) => a.nombre.localeCompare(b.nombre))

  return <Table className='h-[220px]' data={data} columns={gustosColumns} />
}

export default TablaGustos
