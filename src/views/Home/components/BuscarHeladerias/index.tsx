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
    <section>
      <input
        type="search"
        name="input-buscar"
        placeholder="Buscar por nombre"
        id="input-buscar"
        onChange={(e) => setBusqueda(e.target.value)}
        onKeyUp={handleKeyUp}
      />
      <button onClick={handleSearch} disabled={busqueda === busquedaPrevia}>
        Buscar
      </button>
    </section>
  )
}

export default BuscarHeladerias
