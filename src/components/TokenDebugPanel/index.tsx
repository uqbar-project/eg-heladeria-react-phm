import Button from '@/components/Button'
import Icon from '@/components/Icon'
import { getTokens, subscribeToTokens, refreshAccessToken } from '@/service/token-service'
import { getTokenPayload } from '@/utils/jwt'
import { useEffect, useRef, useState, useSyncExternalStore } from 'react'
import TokenInfo from './components/TokenInfo'
import { useTokenExpiration } from './hooks/useTokenExpiration'
import tokenExpiredSound from '@/assets/sounds/token-expired.mp3'

const playExpirationSound = () => {
  new Audio(tokenExpiredSound).play()
}

const TokenDebugPanel = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const { accessToken, refreshToken, isRefreshing } = useSyncExternalStore(subscribeToTokens, getTokens)
  const { expired, timeRemaining } = useTokenExpiration(getTokenPayload(accessToken))
  const prevExpiredRef = useRef(expired)

  useEffect(() => {
    if (expired && !prevExpiredRef.current) {
      playExpirationSound()
    }
    prevExpiredRef.current = expired
  }, [expired])

  const handleRefresh = async () => {
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
      <button
        type='button'
        onClick={() => setIsOpen(!isOpen)}
        className={`flex h-12 cursor-pointer items-center justify-center gap-2 rounded-full px-4 text-white shadow-lg transition-all duration-300 ease-in-out hover:scale-105 ${
          expired ? 'bg-red-500 hover:bg-red-600' : 'bg-accent-500 hover:bg-accent-600'
        }`}
        style={expired ? { animation: 'soft-pulse 1.8s ease-out infinite' } : undefined}
        title='Token Debug Panel'
      >
        <Icon name='InfoCircle' className='h-6 w-6 fill-white' />
        <span className='whitespace-nowrap font-mono text-sm font-medium'>{expired ? '0:00' : timeRemaining}</span>
      </button>

      {/* Panel */}
      {isOpen && (
        <div className='absolute bottom-16 left-0 w-80 overflow-hidden rounded-lg border border-gray-200 bg-white shadow-xl'>
          {/* Header */}
          <div className='flex items-center justify-between bg-primary-700 px-4 py-3'>
            <span className='text-sm font-semibold text-white'>Token Debug</span>
            <button
              type='button'
              onClick={() => setIsOpen(false)}
              className='flex h-5 w-5 items-center justify-center text-xl font-bold leading-none text-white/80 hover:text-white'
              title='Minimizar'
            >
              −
            </button>
          </div>

          {/* Content */}
          <div className='max-h-80 overflow-y-auto'>
            {/* Refresh token status */}
            {refreshToken && (
              <div className='flex items-center justify-between border-b border-gray-200 px-4 py-3'>
                <span className='text-sm font-medium text-primary-700'>Refresh Token</span>
                <Icon name='CheckOutlineThin' className='h-5 w-5 fill-green-500' />
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
