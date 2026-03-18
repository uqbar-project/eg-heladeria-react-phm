import Button from '@/components/Button'
import Icon from '@/components/Icon'
import Tooltip from '@/components/Tooltip'
import { getTokens, subscribeToTokens, refreshAccessToken } from '@/service/token-service'
import { getTokenPayload } from '@/utils/jwt'
import { useState, useSyncExternalStore } from 'react'
import TokenInfo from './components/TokenInfo'
import { useTokenExpiration } from './hooks/useTokenExpiration'
import { getProgressStatus, statusButtonColor } from './utils'
import tokenExpiredSound from '@/assets/sounds/token-expired.mp3'

const playExpirationSound = () => {
  new Audio(tokenExpiredSound).play().catch(() => {
    // Browser may block autoplay - ignore silently
  })
}

const TokenDebugPanel = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const { accessToken, refreshToken, isRefreshing, refreshCount } = useSyncExternalStore(subscribeToTokens, getTokens)
  const { expired, timeRemaining, progress } = useTokenExpiration(getTokenPayload(accessToken), {
    onExpire: playExpirationSound,
  })

  const handleRefresh = async () => {
    if (getTokens().isRefreshing) return
    setError(null)
    try {
      await refreshAccessToken()
    } catch {
      setError('Error al refrescar token')
    }
  }

  return (
    <div className='fixed bottom-4 left-4 z-50'>
      {/* FAB Button */}
      <Tooltip content='Token Debug Panel' position='right'>
        <button
          type='button'
          onClick={() => setIsOpen(!isOpen)}
          className={`flex h-12 cursor-pointer items-center justify-center gap-2 rounded-full px-4 text-white shadow-lg transition-all duration-300 ease-in-out hover:scale-105 ${statusButtonColor[getProgressStatus(progress)]}`}
          style={expired ? { animation: 'soft-pulse 1.8s ease-out infinite' } : undefined}
        >
          <Icon name='InfoCircle' className='h-6 w-6 fill-white' />
          <span className='whitespace-nowrap font-mono text-sm font-medium'>{expired ? '0:00' : timeRemaining}</span>
        </button>
      </Tooltip>

      {/* Panel */}
      {isOpen && (
        <div className='absolute bottom-16 left-0 w-80 overflow-hidden rounded-lg border border-gray-200 bg-white shadow-xl'>
          {/* Header */}
          <div className='flex items-center justify-between bg-primary-700 px-4 py-3'>
            <span className='text-sm font-semibold text-white'>Token Debug</span>
            <Tooltip content='Minimizar' position='left'>
              <button
                type='button'
                onClick={() => setIsOpen(false)}
                className='flex h-5 w-5 items-center justify-center text-xl font-bold leading-none text-white/80 hover:text-white'
                aria-label='Minimizar panel de debug'
              >
                −
              </button>
            </Tooltip>
          </div>

          {/* Content */}
          <div className='max-h-80 overflow-y-auto'>
            {/* Refresh token status */}
            {refreshToken && (
              <div className='flex items-center justify-between border-b border-gray-200 px-4 py-3'>
                <span className='text-sm font-medium text-primary-700'>Refresh Token</span>
                <div className='flex items-center gap-2'>
                  {refreshCount > 0 && (
                    <Tooltip
                      content={`Token refrescado ${refreshCount} ${refreshCount === 1 ? 'vez' : 'veces'} en esta sesión`}
                      position='left'
                    >
                      <span className='rounded-full bg-accent-100 px-2 py-0.5 text-xs text-accent-700'>
                        {refreshCount}x
                      </span>
                    </Tooltip>
                  )}
                  <Icon name='CheckOutlineThin' className='h-5 w-5 fill-green-500' />
                </div>
              </div>
            )}
            <TokenInfo label='Access Token' token={accessToken} />
          </div>

          {/* Actions */}
          <div className='border-t border-gray-200 p-3'>
            <Button
              type='button'
              label={isRefreshing ? 'Refrescando...' : 'Forzar Refresh'}
              className='button-outlined w-full text-sm'
              onClick={handleRefresh}
              disabled={isRefreshing || !refreshToken}
            />
          </div>
          {error && <p className='px-3 pb-3 text-center text-xs text-error-600'>{error}</p>}
        </div>
      )}
    </div>
  )
}

export default TokenDebugPanel
