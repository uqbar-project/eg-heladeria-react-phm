import Button from '@/components/Button'
import Icon from '@/components/Icon'
import Input from '@/components/Input'
import { useState } from 'react'

type Props = {
  valorInicial?: string
  onSearch: (busqueda: string) => void
}

const BuscarHeladerias = ({ valorInicial = '', onSearch }: Props) => {
  const [busqueda, setBusqueda] = useState<string>(valorInicial)
  const [busquedaPrevia, setBusquedaPrevia] = useState<string>(valorInicial)

  const handleSearch = async () => {
    onSearch(busqueda)
    setBusquedaPrevia(busqueda)
  }

  const handleKeyUp: React.KeyboardEventHandler<HTMLInputElement> = async (event) => {
    if (event.code === 'Enter') {
      handleSearch()
    }
  }

  return (
    <section className='flex flex-col gap-4 sm:flex-row sm:items-center'>
      <Input
        id='input-buscar'
        value={busqueda}
        className='w-full'
        type='search'
        name='input-buscar'
        placeholder='Buscar heladerías...'
        autoComplete='off'
        onChange={(e) => setBusqueda(e.target.value)}
        onKeyUp={handleKeyUp}
      />
      <Button
        className='button-primary min-w-[10rem]'
        title='Buscar heladerías'
        label={
          <>
            <Icon className='h-5 fill-white' name={'Search'} />
            <span>Buscar</span>
          </>
        }
        onClick={handleSearch}
        disabled={busqueda === busquedaPrevia}
      />
    </section>
  )
}

export default BuscarHeladerias
