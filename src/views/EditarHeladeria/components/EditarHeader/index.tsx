import Icon from '@/components/Icon'
import { Link } from '@tanstack/react-router'

const EditarHeader = () => {
  return (
    <div className='relative mb-5 flex items-center justify-center border-b border-cream-200 pb-4'>
      <Link
        to='/home'
        aria-label='Volver al listado'
        className='absolute left-0 top-1 inline-flex h-8 w-8 items-center justify-center rounded-full text-primary-500 transition-colors hover:bg-accent-50 hover:text-accent-600'
      >
        <Icon name='ArrowBack' className='h-5' />
      </Link>
      <div className='flex items-center gap-3'>
        <div className='flex h-9 w-9 items-center justify-center rounded-xl bg-accent-50'>
          <Icon name='Icecream' className='h-5 fill-accent-600' />
        </div>
        <div>
          <p className='text-[10px] uppercase tracking-widest text-primary-400'>Edición</p>
          <h1 className='text-xl font-bold text-primary-950'>Editar heladería</h1>
        </div>
      </div>
    </div>
  )
}

export default EditarHeader
