import { twMerge } from 'tailwind-merge'

type Props = {
  children: React.ReactNode
} & React.LabelHTMLAttributes<HTMLLabelElement>

const Label = ({ children, ...props }: Props) => {
  const { className } = props
  return (
    <label {...props} className={twMerge('text-[1em] text-primary-800 font-semibold	', className)}>
      {children}
    </label>
  )
}

export default Label
