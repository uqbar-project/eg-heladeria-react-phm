import { getProgressStatus, statusBgColor } from '../utils'

type Props = {
  progress: number
}

const ProgressBar = ({ progress }: Props) => {
  const color = statusBgColor[getProgressStatus(progress)]
  return (
    <div className='h-1 w-full bg-gray-200'>
      <div className={`h-full transition-all duration-1000 ${color}`} style={{ width: `${progress}%` }} />
    </div>
  )
}

export default ProgressBar
