export const formatTimeRemaining = (secondsRemaining: number | null): string => {
  if (secondsRemaining == null || isNaN(secondsRemaining)) return 'N/A'
  if (secondsRemaining <= 0) return 'Expirado'

  const hours = Math.floor(secondsRemaining / 3600)
  const mins = Math.floor((secondsRemaining % 3600) / 60)
  const secs = Math.floor(secondsRemaining % 60)

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

export const statusBgColor: Record<ProgressStatus, string> = {
  ok: 'bg-green-500',
  warning: 'bg-yellow-500',
  danger: 'bg-red-500',
}

export const statusTextColor: Record<ProgressStatus, string> = {
  ok: 'text-green-600',
  warning: 'text-yellow-600',
  danger: 'text-red-600',
}

export const statusButtonColor: Record<ProgressStatus, string> = {
  ok: `${statusBgColor.ok} hover:bg-green-600`,
  warning: `${statusBgColor.warning} hover:bg-yellow-600`,
  danger: `${statusBgColor.danger} hover:bg-red-600`,
}

export const getProgressStatus = (progress: number): ProgressStatus => {
  if (progress > 50) return 'ok'
  if (progress > 20) return 'warning'
  return 'danger'
}
