import Label from '../Label'

type RadioGroupOption = {
  value: string
  label: string
}

type Props = {
  value: string
  options: RadioGroupOption[]
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  label?: string
}

const RadioGroup = ({ value, options, onChange, label }: Props) => {
  return (
    <div className='flex flex-col gap-4'>
      {label && <Label>{label}</Label>}
      <div className='flex gap-4'>
        {options.map((option) => {
          const { value: optionValue, label } = option

          const isChecked = optionValue === value

          return (
            <label
              key={optionValue}
              htmlFor={optionValue}
              className={`flex items-center gap-3 px-4 py-2.5 rounded-lg border cursor-pointer transition-all duration-200 ${
                isChecked
                  ? 'border-accent-500 bg-accent-500/10 text-accent-700'
                  : 'border-gray-200 hover:border-accent-300 hover:bg-accent-50'
              }`}
            >
              <input
                type='radio'
                id={optionValue}
                className='w-4 h-4 accent-accent-600'
                checked={isChecked}
                value={optionValue}
                onChange={onChange}
              />
              <span className='text-sm font-medium'>{label}</span>
            </label>
          )
        })}
      </div>
    </div>
  )
}

export default RadioGroup
