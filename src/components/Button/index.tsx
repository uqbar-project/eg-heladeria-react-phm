import { ReactNode } from 'react'
import './button.css'
import { twMerge } from 'tailwind-merge'

type Props = {
  label: ReactNode
} & React.ButtonHTMLAttributes<HTMLButtonElement>

const Button = ({ label, className, ...props }: Props) => {
  return (
    <button className={twMerge('button', className)} {...props}>
      {typeof label === 'string' ? <span className='text-[1em]'>{label}</span> : label}
    </button>
  )
}

export default Button
