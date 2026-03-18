import Icon, { IconsNames } from '@/components/Icon'
import { useState } from 'react'

type Props = {
  text: string
}

type CopyStatus = 'idle' | 'copied' | 'error'

const statusStyles: Record<CopyStatus, { icon: IconsNames; color: string; title: string }> = {
  idle: { icon: 'Copy', color: 'fill-primary-500', title: 'Copiar' },
  copied: { icon: 'CheckOutlineThin', color: 'fill-green-500', title: 'Copiado' },
  error: { icon: 'ErrorOutlineThin', color: 'fill-red-500', title: 'Error al copiar' },
}

const CopyButton = ({ text }: Props) => {
  const [status, setStatus] = useState<CopyStatus>('idle')

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text)
      setStatus('copied')
    } catch {
      setStatus('error')
    } finally {
      setTimeout(() => setStatus('idle'), 1500)
    }
  }

  const { icon, color, title } = statusStyles[status]

  return (
    <button type='button' onClick={handleCopy} className='rounded p-1 hover:bg-gray-200' title={title} aria-label={title}>
      <Icon name={icon} className={`h-4 w-4 ${color}`} />
    </button>
  )
}

export default CopyButton
