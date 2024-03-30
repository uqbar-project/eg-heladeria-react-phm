import Icon from '@/components/Icon'
import Table, { Column } from '@/components/Table'
import { Heladeria } from '@/model/heladeria'
import { useNavigate } from '@tanstack/react-router'
import { tablaHeladeriasColumnsBase } from './config'

type Props = {
  heladerias: Heladeria[]
  loading?: boolean
}

const TablaHeladerias = ({ heladerias, loading = false }: Props) => {
  const navigate = useNavigate({ from: '/home' })

  const editarHeladeria = (heladeria: Heladeria) => {
    navigate({ to: '/editar-heladeria/$id', params: { id: heladeria.id.toString() } })
  }

  const columns: Column<Heladeria>[] = [
    ...tablaHeladeriasColumnsBase,
    {
      key: 'editar',
      headerName: 'Editar',
      render: (heladeria) => <Icon name={'Edit'} className="w-[24px]" onClick={() => editarHeladeria(heladeria)} />,
    },
  ]

  return <Table data={heladerias} columns={columns} loading={loading} />
}

export default TablaHeladerias
