import Button from '@/components/Button'
import Card from '@/components/Card'
import Icon from '@/components/Icon'
import Input from '@/components/Input'
import { TOKEN_KEY } from '@/service/constants'
import { loginUser } from '@/service/usuario-service'
import { useRouter } from '@tanstack/react-router'
import { useState } from 'react'

export const Login = () => {
  const [usuario, setUsuario] = useState('')
  const [password, setPassword] = useState('')
  const { navigate } = useRouter()

  const login = async (event: InputEvent) => {
    event.preventDefault()
    const token = await loginUser(usuario, password)
    localStorage.setItem(TOKEN_KEY, token)
    navigate({ to: '/' })
  }

  return (
    <section className='flex items-center justify-center mt-6 container text-[14px]'>
      <Card title='Login'>
        <form className='mt-5 mb-5'>
          <Input
            className="mt-2 mb-5"
            type='text'
            autoComplete='off'
            label='Usuario'
            value={usuario}
            onChange={(e) => setUsuario(e.target.value)}
          ></Input>
          <Input 
            className="mt-2 mb-8"
            type='password'
            autoComplete='off'
            label='Password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></Input>
          <Button
            className='button-primary'
            title='Ingresar al sistema'
            label={<Icon className='fill-white' name={'User'} />}
            onClick={(e) => login(e)}
          />
        </form>
      </Card>
    </section>
  )
}