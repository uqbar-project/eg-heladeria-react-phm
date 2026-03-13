import Icon from '@/components/Icon'
import Table, { Column } from '@/components/Table'
import { Heladeria } from '@/model/heladeria'
import { Link } from '@tanstack/react-router'
import { tablaHeladeriasColumnsBase } from './config'

type Props = {
  heladerias: Heladeria[]
}

const TablaHeladerias = ({ heladerias }: Props) => {
  const columns: Column<Heladeria>[] = [
    ...tablaHeladeriasColumnsBase,
    {
      key: 'editar',
      headerName: 'Editar',
      className: 'flex justify-center',
      render: (heladeria) => (
        <div className='flex justify-center'>
          <Link
            to='/editar-heladeria/$id'
            params={{ id: heladeria.id.toString() }}
            aria-label={`Editar ${heladeria.nombre}`}
            className='inline-flex h-10 w-10 items-center justify-center rounded-full transition-all hover:bg-accent-50'
          >
            <Icon name='Edit' className='h-5 fill-accent-700' />
          </Link>
        </div>
      ),
    },
  ]

  return <Table data={heladerias} columns={columns} />
}

export default TablaHeladerias
