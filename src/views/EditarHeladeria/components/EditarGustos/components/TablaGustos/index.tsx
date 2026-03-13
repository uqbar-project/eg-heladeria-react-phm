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
        <div className='flex justify-center'>
          <button
            type='button'
            onClick={() => eliminarGusto(gusto.nombre)}
            aria-label={`Eliminar ${gusto.nombre}`}
            className='group inline-flex h-9 w-9 items-center justify-center rounded-full transition-colors hover:bg-accent-50'
          >
            <Icon name='Trash' className='h-4 fill-primary-500 transition-colors group-hover:fill-error-600' />
          </button>
        </div>
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

  return (
    <Table
      className='min-h-[11rem]'
      data={data}
      columns={gustosColumns}
      emptyState={{
        icon: 'Icecream',
        title: 'No hay gustos',
        description: 'Agregá gustos con el botón +',
      }}
    />
  )
}

export default TablaGustos
