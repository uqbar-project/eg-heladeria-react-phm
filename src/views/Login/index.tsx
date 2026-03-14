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

  const login = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setErrorMessage('')
    try {
      await loginUser(usuario, password)
      router.history.push(search.redirect ?? '/')
    } catch (e: unknown) {
      const errorMessage = getErrorMessage(e as AxiosError)
      setErrorMessage(errorMessage)
      console.error(e)
    }
  }

  return (
    <section className='flex min-h-screen items-center justify-center px-4 py-8 text-[14px] min-w-[350px]'>
      <div className='flex w-full max-w-md flex-col gap-4'>
        <Card>
          <div className='flex items-center gap-3'>
            <div className='flex h-10 w-10 items-center justify-center rounded-xl bg-accent-50'>
              <Icon name='Icecream' className='h-6 fill-accent-600' />
            </div>
            <div>
              <p className='text-[10px] uppercase tracking-widest text-primary-400'>Demo JWT</p>
              <h1 className='text-2xl font-bold text-primary-950'>Iniciar sesión</h1>
            </div>
          </div>

          <form className='mt-6 flex flex-col gap-4' onSubmit={login}>
            <Input
              type='text'
              autoComplete='off'
              label='Usuario'
              value={usuario}
              onChange={(e) => setUsuario(e.target.value)}
            />
            <Input
              type='password'
              autoComplete='off'
              label='Password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button
              type='submit'
              className='button-primary mt-2 w-full'
              title='Ingresar al sistema'
              label='Ingresar'
              disabled={!usuario || !password}
            />
          </form>
        </Card>

        <div className={`error min-h-[44px] transition-opacity ${errorMessage ? 'opacity-100' : 'opacity-0'}`}>
          <Icon name='ErrorOutlineThin' className='h-5 w-5 fill-error-600' />
          <span>{errorMessage}</span>
        </div>
      </div>
    </section>
  )
}
