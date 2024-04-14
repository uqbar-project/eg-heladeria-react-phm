import { ErrorComponentProps, useRouter } from '@tanstack/react-router'
import ErrorModal from '../Modal/ErrorModal'
import { AppError } from '@/types'

const RouteErrorComponent = ({ error, reset }: ErrorComponentProps) => {
  const router = useRouter()

  const onRetry = async () => {
    await router.invalidate()
    reset()
  }

  return <ErrorModal error={error as AppError} title={'Ups! Hubo un problema'} onRetry={onRetry} />
}

export default RouteErrorComponent
