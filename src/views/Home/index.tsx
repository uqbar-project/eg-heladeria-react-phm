import { HeladeriaBase } from '@/model/heladeria'
import heladeriaService from '@/service/heladeria-service'
import { useCallback, useEffect, useState } from 'react'
import BuscarHeladerias from './components/BuscarHeladerias'
import TablaHeladerias from './components/TablaHeladerias'

const Home = () => {
  const [heladerias, setHeladerias] = useState<HeladeriaBase[]>([])

  const getHeladerias = useCallback(async (nombreABuscar = '') => {
    try {
      const heladerias = await heladeriaService.buscarHeladerias(nombreABuscar)
      setHeladerias(heladerias)
    } catch (error) {
      // toast.error(error)
    }
  }, [])

  useEffect(() => {
    getHeladerias()
  }, [getHeladerias])

  const onSearch = async (busqueda: string) => {
    getHeladerias(busqueda)
  }

  return (
    <section className="flex items-center justify-center mt-6 container">
      <div className="card">
        <h1>Heladerias</h1>
        <>
          <BuscarHeladerias onSearch={onSearch} />
          <TablaHeladerias heladerias={heladerias} />
        </>
      </div>
    </section>
  )
}

export default Home
