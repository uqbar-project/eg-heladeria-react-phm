import Icon from '@/components/Icon'

type Props = {
  token: string
}

const JwtLink = ({ token }: Props) => {
  const jwtDebuggerUrl = `https://jwt.io/#debugger-io?token=${token}`

  return (
    <a
      href={jwtDebuggerUrl}
      target='_blank'
      rel='noopener noreferrer'
      className='rounded p-1 hover:bg-gray-200'
      title='Ver en jwt.io'
    >
      <Icon name='Jwt' className='h-4 w-4' />
    </a>
  )
}

export default JwtLink
