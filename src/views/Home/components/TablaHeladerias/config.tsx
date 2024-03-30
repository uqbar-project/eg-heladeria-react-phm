import { HeladeriaBase } from '@/model/heladeria'

export const tablaHeladeriasColumnsBase = [
  {
    headerName: 'Nombre',
    className: 'w-[30%]',
    render: (heladeria: HeladeriaBase) => <span className="line-clamp-1">{heladeria.nombre}</span>,
  },
  {
    headerName: 'Dueño',
    className: 'w-[60%]',
    render: (heladeria: HeladeriaBase) => <span className="line-clamp-1">{heladeria.duenio.nombreCompleto}</span>,
  },
]
