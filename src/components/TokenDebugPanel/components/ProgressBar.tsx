import { getProgressStatus, statusBgColor } from '../utils'

type Props = {
  progress: number
}

const ProgressBar = ({ progress }: Props) => {
  const clampedProgress = Math.max(0, Math.min(100, progress))
  const color = statusBgColor[getProgressStatus(clampedProgress)]
  return (
    <div className='h-1 w-full bg-gray-200'>
      <div className={`h-full transition-all duration-1000 ${color}`} style={{ width: `${clampedProgress}%` }} />
    </div>
  )
}

export default ProgressBar
