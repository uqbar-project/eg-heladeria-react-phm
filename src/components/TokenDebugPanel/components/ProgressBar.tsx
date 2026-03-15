type Props = {
  progress: number
}

const ProgressBar = ({ progress }: Props) => {
  const color = progress > 50 ? 'bg-green-500' : progress > 20 ? 'bg-yellow-500' : 'bg-red-500'
  return (
    <div className='h-1 w-full bg-gray-200'>
      <div className={`h-full transition-all duration-1000 ${color}`} style={{ width: `${progress}%` }} />
    </div>
  )
}

export default ProgressBar
