import { twMerge } from 'tailwind-merge'
import Label from '../Label'
import { ReactNode, isValidElement, useId } from 'react'

type Props = {
  label?: ReactNode
  type?: 'text' | 'number' | 'password' | 'search'
} & React.InputHTMLAttributes<HTMLInputElement>

const Input = ({ label, type = 'text', className, ...props }: Props) => {
  const generatedId = useId()
  const id = props.id || generatedId

  return (
    <div className={twMerge('flex flex-col gap-2', className)}>
      {!!label && (isValidElement(label) ? label : <Label htmlFor={id}>{label}</Label>)}
      <input
        {...props}
        id={id}
        className='rounded-lg border border-primary-200 bg-white px-3 py-2 text-sm text-primary-700 outline-none transition-all placeholder:text-primary-400 focus:border-accent-500 focus:ring-2 focus:ring-accent-500/15'
        type={type}
      />
    </div>
  )
}

export default Input
