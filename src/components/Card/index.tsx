import { twMerge } from 'tailwind-merge'
import './style.css'

type Props = {
  children: React.ReactNode
} & React.HTMLAttributes<HTMLDivElement>

const Card = ({ children, className, ...props }: Props) => {
  return (
    <div className={twMerge('card shadow-light', className)} {...props}>
      {children}
    </div>
  )
}

export default Card
