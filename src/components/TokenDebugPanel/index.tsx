import Button from '@/components/Button'
import Icon from '@/components/Icon'
import { getTokens, subscribeToTokens, refreshAccessToken } from '@/service/token-service'
import { useState, useSyncExternalStore } from 'react'
import TokenInfo from './components/TokenInfo'

const TokenDebugPanel = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const { accessToken, refreshToken, isRefreshing } = useSyncExternalStore(subscribeToTokens, getTokens)

  const handleRefresh = async () => {
    setError(null)
    try {
      await refreshAccessToken()
    } catch {
      setError('Error al refrescar token')
    }
  }

  return (
    <>
      {/* FAB Button */}
      <button
        type='button'
        onClick={() => setIsOpen(!isOpen)}
        className='fixed bottom-4 right-4 z-50 flex h-12 w-12 items-center justify-center rounded-full bg-accent-500 text-white shadow-lg transition-all hover:scale-105 hover:bg-accent-600'
        title='Token Debug Panel'
      >
        <Icon name='InfoCircle' className='h-6 w-6 fill-white' />
      </button>

      {/* Panel */}
      {isOpen && (
        <div className='fixed bottom-20 right-4 z-50 w-80 overflow-hidden rounded-lg border border-gray-200 bg-white shadow-xl'>
          {/* Header */}
          <div className='flex items-center justify-between bg-primary-700 px-4 py-3'>
            <span className='text-sm font-semibold text-white'>Token Debug</span>
            <button
              type='button'
              onClick={() => setIsOpen(false)}
              className='text-white/80 hover:text-white'
              title='Cerrar'
            >
              <Icon name='Close' className='h-4 w-4 fill-white' />
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
            {error && <p className='mt-2 text-center text-xs text-error-600'>{error}</p>}
          </div>
        </div>
      )}
    </>
  )
}

export default TokenDebugPanel
