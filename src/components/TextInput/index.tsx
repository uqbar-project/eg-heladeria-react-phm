import { twMerge } from 'tailwind-merge'
import Label from '../Label'

type Props = {
  label?: string
} & React.InputHTMLAttributes<HTMLInputElement>

const TextInput = ({ label, ...props }: Props) => {
  const { id, type = 'text', className } = props

  return (
    <div className={twMerge('flex flex-col gap-2', className)}>
      {label && <Label htmlFor={id}>{label}</Label>}
      <input {...props} className='border-gray-200 border rounded text-[1em] p-2 outline-none' type={type}></input>
    </div>
  )
}

export default TextInput
