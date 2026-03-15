import Icon from '@/components/Icon'
import { useState } from 'react'

type Props = {
  text: string
}

const CopyButton = ({ text }: Props) => {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    await navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 1500)
  }

  return (
    <button
      type='button'
      onClick={handleCopy}
      className='rounded p-1 hover:bg-gray-200'
      title={copied ? 'Copiado' : 'Copiar'}
    >
      <Icon
        name={copied ? 'CheckOutlineThin' : 'Copy'}
        className={`h-4 w-4 ${copied ? 'fill-green-500' : 'fill-primary-500'}`}
      />
    </button>
  )
}

export default CopyButton
