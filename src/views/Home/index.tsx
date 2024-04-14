import Card from '@/components/Card'
import { useLoaderData, useNavigate, useSearch } from '@tanstack/react-router'
import BuscarHeladerias from './components/BuscarHeladerias'
import TablaHeladerias from './components/TablaHeladerias'

const Home = () => {
  const heladerias = useLoaderData({ from: '/' })
  const { busqueda } = useSearch({ from: '/' })
  const navigate = useNavigate()

  const onSearch = async (busqueda: string) => {
    navigate({ search: busqueda ? { busqueda } : {} })
  }

  return (
    <section className='flex items-center justify-center mt-6 container text-[14px]'>
      <Card>
        <div className='flex flex-col pt-4 gap-4'>
          <BuscarHeladerias valorInicial={busqueda} onSearch={onSearch} />
          <TablaHeladerias heladerias={heladerias} />
        </div>
      </Card>
    </section>
  )
}

export default Home
