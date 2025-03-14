import Button from '@/components/Button'
import Card from '@/components/Card'
import Icon from '@/components/Icon'
import Input from '@/components/Input'
import { loginUser } from '@/service/usuario-service'
import { getErrorMessage } from '@/utils/errors'
import { useRouter, useSearch } from '@tanstack/react-router'
import { AxiosError } from 'axios'
import { useState } from 'react'

export const Login = () => {
  const [usuario, setUsuario] = useState('')
  const [password, setPassword] = useState('')
  const router = useRouter()
  const search = useSearch({ from: '/login' })
  const [errorMessage, setErrorMessage] = useState('')

  const login = async (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    try {
      event.preventDefault()
      await loginUser(usuario, password)
      router.history.push(search.redirect ?? '/')
    } catch (e: unknown) {
      const errorMessage = getErrorMessage(e as AxiosError)
      setErrorMessage(errorMessage)
      console.error(e)
    }
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
          />
          <Input 
            className="mt-2 mb-8"
            type='password'
            autoComplete='off'
            label='Password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            className='button-primary'
            title='Ingresar al sistema'
            label={<Icon className='fill-white' name={'User'} />}
            onClick={login}
          />
        </form>
        {errorMessage && <div className="error">{errorMessage}</div>}
      </Card>
    </section>
  )
}