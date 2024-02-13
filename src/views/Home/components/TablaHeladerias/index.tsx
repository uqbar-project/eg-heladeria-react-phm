import { HeladeriaBase } from '@/model/heladeria'
import { useNavigate } from '@tanstack/react-router'

type Props = {
  heladerias: HeladeriaBase[]
  loading?: boolean
}

const TablaHeladerias = ({ heladerias, loading = false }: Props) => {
  const navigate = useNavigate({ from: '/home' })

  if (!heladerias.length && !loading) return <>No se encontraron heladerias</>

  const editarHeladeria = (heladeria: HeladeriaBase) => {
    navigate({ to: '/editar-heladeria/$id', params: { id: heladeria.id.toString() } })
  }

  return (
    <section>
      <table>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Dueño</th>
            <th />
          </tr>
        </thead>
        <tbody>
          {heladerias.map((heladeria) => (
            <tr key={heladeria.id}>
              <td title={heladeria.nombre}>{heladeria.nombre}</td>
              <td title={heladeria.duenio.nombreCompleto}>{heladeria.duenio.nombreCompleto}</td>
              <td>
                <img
                  height="24px"
                  width="24px"
                  alt="editar-heladeria"
                  src="src/assets/edit-icon.svg"
                  onClick={() => editarHeladeria(heladeria)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  )
}

export default TablaHeladerias
