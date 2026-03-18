import Card from '@/components/Card'
import Icon from '@/components/Icon'
import { useLoaderData, useNavigate, useSearch } from '@tanstack/react-router'
import BuscarHeladerias from './components/BuscarHeladerias'
import TablaHeladerias from './components/TablaHeladerias'
import { clearTokens, getPrimaryRole } from '@/service/token-service'

const Home = () => {
  const heladerias = useLoaderData({ from: '/_authenticated/home' })
  const { busqueda } = useSearch({ from: '/_authenticated/home' })
  const navigate = useNavigate()
  const primaryRole = getPrimaryRole()

  const onSearch = async (busqueda: string) => {
    navigate({ to: '/home', search: busqueda ? { busqueda } : {} })
  }

  const logout = () => {
    clearTokens()
    navigate({
      to: '/login',
      search: {
        redirect: '/',
      },
    })
  }

  return (
    <section className='page-container'>
      <div className='mb-6 flex items-start justify-between gap-5 flex-wrap'>
        <div>
          <div className='flex items-center gap-3'>
            <div className='flex h-9 w-9 items-center justify-center rounded-xl bg-accent-50 ring-1 ring-accent-100'>
              <Icon name='Icecream' className='h-5 fill-accent-600' />
            </div>
            <h1 className='text-2xl font-bold text-primary-950'>Heladerías</h1>
          </div>
          {primaryRole && (
            <span className='mt-3 inline-flex rounded-full border border-accent-100 bg-accent-50/80 px-3 py-1 text-xs font-semibold text-accent-700'>
              Rol: {primaryRole}
            </span>
          )}
        </div>
        <button
          type='button'
          onClick={logout}
          className='group inline-flex items-center gap-2 self-start rounded-lg border border-primary-200 bg-white/85 px-3 py-2 text-sm text-primary-600 transition-colors hover:border-error-200 hover:bg-error-50 hover:text-error-600'
        >
          <Icon name='Power' className='h-4 fill-primary-500 group-hover:fill-error-600' />
          <span>Cerrar sesión</span>
        </button>
      </div>

      <Card className='flex flex-col gap-6'>
        <BuscarHeladerias valorInicial={busqueda} onSearch={onSearch} />
        <TablaHeladerias heladerias={heladerias} />
      </Card>
    </section>
  )
}

export default Home
