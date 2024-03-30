import { Column } from '@/components/Table'
import { Gusto } from './types'

export const tablaGustosColumnsBase: Column<Gusto>[] = [
  {
    key: 'gusto',
    headerName: 'Gusto',
    className: 'w-[50%]',
    render: (gusto) => <span className='line-clamp-1'>{gusto.nombre}</span>,
  },
  {
    key: 'dificultad',
    field: 'dificultad',
    className: 'text-center',
    headerName: 'Dificultad',
  },
]
