import { twMerge } from 'tailwind-merge'
import Label from '../Label'
import { ReactNode, isValidElement } from 'react'

type Props = {
  label?: ReactNode
  type?: 'text' | 'number' | 'password' | 'search'
} & React.InputHTMLAttributes<HTMLInputElement>

const Input = ({ label, ...props }: Props) => {
  const { id, type = 'text', className } = props

  return (
    <div className={twMerge('flex flex-col gap-2', className)}>
      {!!label && (isValidElement(label) ? label : <Label htmlFor={id}>{label}</Label>)}
      <input
        {...props}
        className='border-gray-200 border rounded text-[1em] text-primary-600 p-2 outline-none'
        type={type}
      ></input>
    </div>
  )
}

export default Input
