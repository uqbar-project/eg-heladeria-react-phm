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
    <div className='flex flex-col gap-2'>
      {label && <Label>{label}</Label>}
      <div className='flex gap-4'>
        {options.map((option) => {
          const { value: optionValue, label } = option

          return (
            <div key={optionValue} className='flex align-center justify-center gap-2'>
              <Label htmlFor={optionValue} className='text-[12px] text-gray-400 '>
                {label}
              </Label>
              <input
                type='radio'
                id={optionValue}
                className=' border-gray-200 border rounded text-[1em] p-2 outline-none'
                checked={optionValue === value}
                value={optionValue}
                onChange={onChange}
              />
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default RadioGroup
