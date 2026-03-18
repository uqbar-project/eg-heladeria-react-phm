import Icon from '@/components/Icon'
import Tooltip from '@/components/Tooltip'

type Props = {
  token: string
}

const JwtLink = ({ token }: Props) => {
  const jwtDebuggerUrl = `https://jwt.io/#debugger-io?token=${encodeURIComponent(token)}`

  return (
    <Tooltip content='Ver en jwt.io' position='top'>
      <a
        href={jwtDebuggerUrl}
        target='_blank'
        rel='noopener noreferrer'
        className='rounded p-1 hover:bg-gray-200'
        aria-label='Ver en jwt.io'
      >
        <Icon name='Jwt' className='h-4 w-4' />
      </a>
    </Tooltip>
  )
}

export default JwtLink
