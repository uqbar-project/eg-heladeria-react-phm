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
    <div className="flex flex-col gap-2">
      {label && <Label htmlFor={id}>{label}</Label>}
      <select {...props} className=" border-gray-200 border rounded text-[1em] p-2 outline-none select">
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
