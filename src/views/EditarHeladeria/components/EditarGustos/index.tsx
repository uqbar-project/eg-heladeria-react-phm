import Label from '@/components/Label'
import Table, { Column } from '@/components/Table'
import { Heladeria } from '@/model/heladeria'
import { tablaGustosColumnsBase } from './config'
import { Gusto } from './types'
import Icon from '@/components/Icon'

type Props = {
  heladeria: Heladeria
  setHeladeria: (heladeria: Heladeria) => void
  loading?: boolean
}

const EditarGustos = ({ heladeria, setHeladeria, loading }: Props) => {
  // const [nuevoGusto, setNuevoGusto] = useState<{ nombre?: string; dificultad?: number }>({})

  // const agregarGusto = async () => {
  //   if (!nuevoGusto.nombre || !nuevoGusto.dificultad) return
  //   heladeria.gustos.set(nuevoGusto.nombre, nuevoGusto.dificultad)
  //   setHeladeria({ ...heladeria })
  //   setNuevoGusto({})
  // }

  const eliminarGusto = async (gusto: string) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { [gusto]: _, ...gustos } = heladeria.gustos
    setHeladeria({ ...heladeria, gustos })
  }

  const gustosColumns: Column<Gusto>[] = [
    ...tablaGustosColumnsBase,
    {
      key: 'actions',
      headerName: 'Accion',
      className: 'text-center',
      render: (gusto) => (
        <Icon name='Trash' onClick={() => eliminarGusto(gusto.nombre)} className='flex w-full justify-center' />
      ),
    },
  ]

  const gustosTabla = Object.entries(heladeria.gustos).map(([nombre, dificultad]) => ({
    id: nombre,
    nombre,
    dificultad,
  }))

  return (
    <div className='flex flex-col gap-2'>
      <Label>Gustos</Label>
      <Table data={gustosTabla} columns={gustosColumns} loading={loading} />
    </div>
  )
}

export default EditarGustos
