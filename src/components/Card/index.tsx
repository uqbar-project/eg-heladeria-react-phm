import { twMerge } from 'tailwind-merge'
import Icon from '../Icon'
import './style.css'

type Props = {
  children: React.ReactNode
} & React.HTMLAttributes<HTMLDivElement>

const Card = ({ children, className }: Props) => {
  return (
    <div className={twMerge('card shadow-light', className)}>
      <div className="w-full flex justify-center items-center gap-10 pb-4 border-gray-300 border-b">
        <div className="relative w-4 h-full">
          <Icon name="Icecream" className="absolute h-[68px] -top-[52px]" />
        </div>
        <h1 className="text-2xl font-bold">Heladerias</h1>
      </div>
      {children}
    </div>
  )
}

export default Card
