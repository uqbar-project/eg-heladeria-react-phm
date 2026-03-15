import { getTokenHeader, getTokenPayload } from '@/utils/jwt'
import { useEffect, useRef, useState } from 'react'
import { useTokenExpiration } from '../hooks/useTokenExpiration'
import { formatDate, getProgressStatus, ProgressStatus } from '../utils'
import Claim from './Claim'
import CopyButton from './CopyButton'
import JwtLink from './JwtLink'
import ProgressBar from './ProgressBar'

const textColorMap: Record<ProgressStatus, string> = {
  ok: 'text-green-600',
  warning: 'text-yellow-600',
  danger: 'text-red-600',
}

type Props = {
  label: string
  token: string | null
  defaultExpanded?: boolean
}

const TokenInfo = ({ label, token, defaultExpanded = true }: Props) => {
  const [expanded, setExpanded] = useState(defaultExpanded)
  const [highlight, setHighlight] = useState(false)
  const prevTokenRef = useRef<string | null>(null)
  const header = getTokenHeader(token)
  const payload = getTokenPayload(token)

  const { timeRemaining, progress } = useTokenExpiration(payload)

  useEffect(() => {
    if (prevTokenRef.current !== null && token !== prevTokenRef.current) {
      const startTimeout = setTimeout(() => setHighlight(true), 0)
      const endTimeout = setTimeout(() => setHighlight(false), 1500)
      prevTokenRef.current = token
      return () => {
        clearTimeout(startTimeout)
        clearTimeout(endTimeout)
      }
    }
    prevTokenRef.current = token
  }, [token])

  return (
    <div className='border-b border-gray-200 last:border-b-0'>
      <div className='flex w-full items-center justify-between px-4 py-3 hover:bg-gray-50'>
        <div className='flex items-center gap-1'>
          <button type='button' onClick={() => setExpanded(!expanded)} className='text-left'>
            <span className='text-sm font-medium text-primary-700'>{label}</span>
          </button>
          {token && <CopyButton text={token} />}
          {token && <JwtLink token={token} />}
        </div>
        <span
          className={`rounded px-1 font-mono text-sm transition-colors duration-1000 ${highlight ? 'bg-green-100 text-green-700' : textColorMap[getProgressStatus(progress)]}`}
        >
          {timeRemaining}
        </span>
      </div>
      <ProgressBar progress={progress} />
      {expanded && payload && (
        <div className='bg-gray-50 px-4 py-2 text-xs'>
          <Claim label='alg' value={header?.alg ?? 'N/A'} />
          <Claim label='sub' value={payload.sub ?? 'N/A'} />
          <Claim label='iat' value={formatDate(payload.iat)} highlight={highlight} />
          <Claim label='exp' value={formatDate(payload.exp)} highlight={highlight} />
          <Claim label='roles' value={payload.roles?.join(', ') ?? ''} />
        </div>
      )}
      {expanded && !payload && <div className='bg-gray-50 px-4 py-2 text-xs text-primary-400'>Token no disponible</div>}
    </div>
  )
}

export default TokenInfo
