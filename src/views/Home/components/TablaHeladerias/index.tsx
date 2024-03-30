import Table from '@/components/Table'
import { HeladeriaBase } from '@/model/heladeria'
import { useNavigate } from '@tanstack/react-router'
import Icon from '@/components/Icon'
import { tablaHeladeriasColumnsBase } from './config'

type Props = {
  heladerias: HeladeriaBase[]
  loading?: boolean
}

const TablaHeladerias = ({ heladerias, loading = false }: Props) => {
  const navigate = useNavigate({ from: '/home' })

  const editarHeladeria = (heladeria: HeladeriaBase) => {
    navigate({ to: '/editar-heladeria/$id', params: { id: heladeria.id.toString() } })
  }

  const columns = [
    ...tablaHeladeriasColumnsBase,
    {
      headerName: 'Editar',
      render: (heladeria: HeladeriaBase) => (
        <Icon name={'Edit'} className="w-[24px]" onClick={() => editarHeladeria(heladeria)} />
      ),
    },
  ]

  return <Table data={heladerias} columns={columns} loading={loading} />
}

export default TablaHeladerias
