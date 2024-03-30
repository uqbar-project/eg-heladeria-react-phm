import { Column } from '@/components/Table'
import { HeladeriaBase } from '@/model/heladeria'

export const tablaHeladeriasColumnsBase: Column<HeladeriaBase>[] = [
  {
    key: 'nombre',
    headerName: 'Nombre',
    className: 'w-[30%]',
    render: (heladeria) => <span className="line-clamp-1">{heladeria.nombre}</span>,
  },
  {
    key: 'dueño',
    headerName: 'Dueño',
    className: 'w-[60%]',
    render: (heladeria) => <span className="line-clamp-1">{heladeria.duenio.nombreCompleto}</span>,
  },
]
