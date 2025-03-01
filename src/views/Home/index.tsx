import Card from '@/components/Card'
import { useLoaderData, useNavigate, useSearch } from '@tanstack/react-router'
import BuscarHeladerias from './components/BuscarHeladerias'
import TablaHeladerias from './components/TablaHeladerias'
import Icon from '@/components/Icon'
import { TOKEN_KEY } from '@/service/constants'

const Home = () => {
  const heladerias = useLoaderData({ from: '/' })
  const { busqueda } = useSearch({ from: '/' })
  const navigate = useNavigate()

  const onSearch = async (busqueda: string) => {
    navigate({ search: busqueda ? { busqueda } : {} })
  }

  const logout = () => {
    localStorage.removeItem(TOKEN_KEY)
    navigate({ to: '/login' })
  }

  return (
    <>
      <div className='flex flex-col items-center w-full' title='Salir de la aplicación'>
        <Icon name={'Power'} onClick={logout} className='mt-5 flex w-full justify-right' />
      </div>
      <section className='flex items-center justify-center mt-6 container text-[14px]'>
        <Card>
          <div className='flex flex-col pt-4 gap-4'>
            <BuscarHeladerias valorInicial={busqueda} onSearch={onSearch} />
            <TablaHeladerias heladerias={heladerias} />
          </div>
        </Card>
      </section>
    </>
  )
}

export default Home
