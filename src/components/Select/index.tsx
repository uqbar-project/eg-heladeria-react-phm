import Label from '../Label'

export type SelectOption = {
  value: string | number
  label: string
}

type Props = {
  options: SelectOption[]
  label?: string
} & React.SelectHTMLAttributes<HTMLSelectElement>

const Select = ({ label, options, ...props }: Props) => {
  const { id } = props

  return (
    <div className='flex flex-col gap-2'>
      {label && <Label htmlFor={id}>{label}</Label>}
      <select
        {...props}
        className='select rounded-lg border border-primary-200 bg-white px-3 py-2.5 text-[1em] text-primary-700 outline-none transition-all focus:border-accent-500 focus:ring-2 focus:ring-accent-500/15'
      >
        {options.map((option) => {
          return (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          )
        })}
      </select>
    </div>
  )
}

export default Select
