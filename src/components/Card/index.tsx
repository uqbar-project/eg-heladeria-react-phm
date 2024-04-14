import { useRouter } from '@tanstack/react-router'
import { twMerge } from 'tailwind-merge'
import Icon from '../Icon'
import './style.css'

type Props = {
  showBack?: boolean
  children: React.ReactNode
} & React.HTMLAttributes<HTMLDivElement>

const Card = ({ children, showBack = false, className }: Props) => {
  const { navigate } = useRouter()
  const onBack = () => navigate({ to: '/' })

  return (
    <div className={twMerge('card shadow-light', className)}>
      <div className='w-full flex justify-center items-center gap-10 pb-4 border-gray-300 border-b relative'>
        {showBack && <Icon name={'ArrowBack'} className='absolute left-0  h-5' onClick={onBack} />}
        <div className='relative w-4 h-full'>
          <Icon name='Icecream' className='absolute h-[68px] -top-[52px] fill-primary-dark' />
        </div>
        <h1 className='text-2xl font-bold text-primary-dark'>Heladerías</h1>
      </div>
      {children}
    </div>
  )
}

export default Card
