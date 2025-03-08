import { ErrorComponentProps, useRouter } from '@tanstack/react-router'
import { AxiosError } from 'axios'
import ErrorModal from '../Modal/ErrorModal'

const RouteErrorComponent = ({ error, reset }: ErrorComponentProps) => {
  const router = useRouter()

  const onRetry = async () => {
    await router.invalidate()
    reset()
  }

  return <ErrorModal error={error as AxiosError} title={'Ups! Hubo un problema'} onRetry={onRetry} />
}

export default RouteErrorComponent
