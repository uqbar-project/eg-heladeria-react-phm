type Props = {
  label: string
  value: string
  highlight?: boolean
}

const Claim = ({ label, value, highlight }: Props) => (
  <div className='flex gap-2 py-1'>
    <span className='min-w-15 text-primary-500'>{label}:</span>
    <span
      className={`break-all rounded px-1 font-mono transition-colors duration-1000 ${highlight ? 'bg-green-100 text-green-700' : 'text-primary-700'}`}
    >
      {value}
    </span>
  </div>
)

export default Claim
