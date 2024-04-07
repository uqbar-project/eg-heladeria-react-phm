import Button from '@/components/Button'
import Icon from '@/components/Icon'
import Input from '@/components/Input'
import { useState } from 'react'

type Props = {
  onSearch: (busqueda: string) => void
}

const BuscarHeladerias = ({ onSearch }: Props) => {
  const [busqueda, setBusqueda] = useState<string>('')
  const [busquedaPrevia, setBusquedaPrevia] = useState<string>('')

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
    <section className='flex flex-row items-center gap-2'>
      <Input
        id='input-buscar'
        className='w-full'
        type='search'
        name='input-buscar'
        placeholder='Buscar heladerías...'
        autoComplete='off'
        onChange={(e) => setBusqueda(e.target.value)}
        onKeyUp={handleKeyUp}
      />
      <Button
        className='border-none'
        label={<Icon className='w-5 fill-none' name={'Search'} />}
        onClick={handleSearch}
        disabled={busqueda === busquedaPrevia}
      />
    </section>
  )
}

export default BuscarHeladerias
