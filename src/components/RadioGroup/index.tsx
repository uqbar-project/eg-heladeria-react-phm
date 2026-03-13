import { twMerge } from 'tailwind-merge'
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
  className?: string
}

const RadioGroup = ({ value, options, onChange, label, className }: Props) => {
  return (
    <div className={twMerge('flex flex-col gap-4', className)}>
      {label && <Label>{label}</Label>}
      <div className='flex gap-4 flex-wrap'>
        {options.map((option) => {
          const { value: optionValue, label } = option

          const isChecked = optionValue === value

          return (
            <label
              key={optionValue}
              htmlFor={optionValue}
              className={`flex items-center gap-2.5 px-3 py-2 rounded-lg border cursor-pointer transition-all duration-200 ${
                isChecked
                  ? 'border-accent-500 bg-accent-500/10 text-accent-700'
                  : 'border-primary-200 hover:border-accent-300 hover:bg-accent-50'
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
              <span className='text-sm'>{label}</span>
            </label>
          )
        })}
      </div>
    </div>
  )
}

export default RadioGroup
