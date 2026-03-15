export const formatTimeRemaining = (secondsRemaining: number | null): string => {
  if (secondsRemaining == null || isNaN(secondsRemaining)) return 'N/A'
  if (secondsRemaining <= 0) return 'Expirado'

  const hours = Math.floor(secondsRemaining / 3600)
  const mins = Math.floor((secondsRemaining % 3600) / 60)
  const secs = secondsRemaining % 60

  if (hours > 0) {
    return `${hours}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }
  return `${mins}:${secs.toString().padStart(2, '0')}`
}

export const formatDate = (timestamp?: number | null): string => {
  if (timestamp == null) return 'N/A'
  return new Date(timestamp * 1000).toLocaleString()
}

export type ProgressStatus = 'ok' | 'warning' | 'danger'

export const getProgressStatus = (progress: number): ProgressStatus => {
  if (progress > 50) return 'ok'
  if (progress > 20) return 'warning'
  return 'danger'
}
