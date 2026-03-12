import Card from '@/components/Card'
import { useLoaderData, useNavigate, useSearch } from '@tanstack/react-router'
import BuscarHeladerias from './components/BuscarHeladerias'
import TablaHeladerias from './components/TablaHeladerias'
import Icon from '@/components/Icon'
import { TOKEN_KEY } from '@/service/constants'

const Home = () => {
  const heladerias = useLoaderData({ from: '/_authenticated/home' })
  const { busqueda } = useSearch({ from: '/_authenticated/home' })
  const navigate = useNavigate()

  const onSearch = async (busqueda: string) => {
    navigate({ to: '/home', search: busqueda ? { busqueda } : {} })
  }

  const logout = () => {
    localStorage.removeItem(TOKEN_KEY)
    navigate({
      to: '/login',
      search: {
        redirect: '/',
      },
    })
  }

  return (
    <>
      <div className='container flex justify-end mt-4'>
        <button
          onClick={logout}
          title='Salir de la aplicación'
          className='flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-primary-600 bg-primary-100 transition-colors hover:bg-red-50 hover:text-red-600 group'
        >
          <Icon name={'Power'} className='h-4 group-hover:fill-red-500' />
          <span>Cerrar sesión</span>
        </button>
      </div>
      <section className='flex items-center justify-center mt-2 container text-[14px]'>
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
