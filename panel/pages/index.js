import React, { useEffect, useState } from 'react'
import Input from '../components/Input'
import { useFormik } from 'formik'
import Button from '../components/Button'
import { useMutation } from '../lib/graphql'
import { useRouter } from 'next/router'

const AUTH = `
  mutation auth($email: String!, $password: String!) {
    auth (input: {
    email:$email, 
    password:$password
     }){
    refreshToken
    accessToken
    }
  }
`
const Index = () => {
  const [authData, auth] = useMutation(AUTH)
  const [signError, setSignError] = useState(false)
  const router = useRouter()
  const form = useFormik({
    validateOnChange:false,
    initialValues: {
      email: '',
      password: '',
    },
    onSubmit: async values => {
      const data = await auth(values)
      if (data && !data.errors) {
        localStorage.setItem('refreshToken', data.data.auth.refreshToken)
        localStorage.setItem('accessToken', data.data.auth.accessToken)
        router.push('/dashboard')
      } else {
        setSignError(true)
      }
    },
  })
  useEffect(() => {
    let timer = setInterval(() => {
      console.log('running timer')
      if (
        localStorage.getItem('refreshToken') &&
        localStorage.getItem('accessToken')
      ) {
        router.push('/dashboard')
      }
    }, 1000)
    return () => {
      clearInterval(timer)
    }
  }, [])
  return (
    <div className='min-h-screen flex flex-col w-full bg-slate-900'>
      <div className='container bg-slate-max-w-xs flex-1 mx-auto flex flex-col items-center justify-center px-2 '>
        <h1 className ='text-white font-medium my-4'>Digite suas credenciais para acessar o painel administrativo</h1>
        <form
          onSubmit={form.handleSubmit}
          className='bg-slate-700 shadow-md rounded px-8 pt-6 pb-8 mb-4'
        >
          <Input
            label='Email'
            placeholder='Preencha seu email'
            onChange={form.handleChange}
            value={form.values.email}
            name='email'
            errorMessage={form.errors.email}
          />
          <Input
            label='Password'
            placeholder='Preencha sua senha'
            onChange={form.handleChange}
            value={form.values.password}
            name='password'
            type ='password'
            errorMessage={form.errors.password}
          />
          {signError && (
            <p className='text-red-500 text-xs italic'>
              Email e/ou senha inválidos
            </p>
          )}
          <div className='flex items-center justify-center mt-2'>
            <Button type='submit'>Entrar</Button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Index
