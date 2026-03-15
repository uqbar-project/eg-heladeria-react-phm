import { getProgressStatus, ProgressStatus } from '../utils'

type Props = {
  progress: number
}

const bgColorMap: Record<ProgressStatus, string> = {
  ok: 'bg-green-500',
  warning: 'bg-yellow-500',
  danger: 'bg-red-500',
}

const ProgressBar = ({ progress }: Props) => {
  const color = bgColorMap[getProgressStatus(progress)]
  return (
    <div className='h-1 w-full bg-gray-200'>
      <div className={`h-full transition-all duration-1000 ${color}`} style={{ width: `${progress}%` }} />
    </div>
  )
}

export default ProgressBar
