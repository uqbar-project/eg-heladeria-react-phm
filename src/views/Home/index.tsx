import { Heladeria } from '@/model/heladeria'
import heladeriaService from '@/service/heladeria-service'
import { useCallback, useEffect, useState } from 'react'
import BuscarHeladerias from './components/BuscarHeladerias'
import TablaHeladerias from './components/TablaHeladerias'
import Card from '@/components/Card'

const Home = () => {
  const [heladerias, setHeladerias] = useState<Heladeria[]>([])
  const [loading, setLoading] = useState(false)

  const getHeladerias = useCallback(async (nombreABuscar = '') => {
    try {
      setLoading(true)
      const heladerias = await heladeriaService.buscarHeladerias(nombreABuscar)
      setHeladerias(heladerias)
    } catch (error) {
      // toast.error(error)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    getHeladerias()
  }, [getHeladerias])

  const onSearch = async (busqueda: string) => {
    getHeladerias(busqueda)
  }

  return (
    <section className='flex items-center justify-center mt-6 container text-[14px]'>
      <Card>
        <div className='flex flex-col pt-4 gap-4'>
          <BuscarHeladerias onSearch={onSearch} />
          <TablaHeladerias heladerias={heladerias} loading={loading} />
        </div>
      </Card>
    </section>
  )
}

export default Home
