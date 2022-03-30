import React, {  useState } from 'react'
import Layout from '../../../components/Layout'
import Title from '../../../components/Title'
import { useMutation, useQuery, fetcher } from '../../../lib/graphql'
import { useRouter } from 'next/router'
import { useFormik } from 'formik'
import Input from '../../../components/Input'
import Button from '../../../components/Button'
import * as Yup from 'yup'
import Modal from '../../../components/Modal'

let id = ''
const UPDATE_USER = `
    mutation changePassword($id: String!, $password: String!) {
        panelChangeUserPassword (input: {
        id:$id,
        password: $password
        })
    }
`
const UserSchema = Yup.object().shape({
  password: Yup.string()
    .min(3, 'Por favor, informe uma senha com pelo menos 3 caracteres')
    .required('Por favor, informe uma senha'),
})
const AlterarSenha = () => {
  const router = useRouter()
  const [modalVisible, setModalVisible] = useState(false)
  id = router.query.id
  const { data } = useQuery(`
  query{
    panelGetUserById(id: "${router.query.id}"){
      name
      }
}`)
  const [updatedData, updateUser] = useMutation(UPDATE_USER)
  const form = useFormik({
    validateOnChange:false,
    validateOnMount:true,
    validateOnBlur:true,
    initialValues: {
      password: ''
    },
    validationSchema: UserSchema,
    onSubmit: async values => {
      const user = {
        ...values,
        id: router.query.id,
      }
      const data = await updateUser(user)

      if (data && !data.errors) {
        router.push('/users')
      }
    },
  })
  const checkForErrors = async() =>{
    if(JSON.stringify(form.errors) === '{}'){
      setModalVisible(true)
    }
  }
  return (
    <Layout>
      <Title>
        Alterar senha de :{' '}
        {data && data.panelGetUserById && data.panelGetUserById.name}
      </Title>
      <div className='mt-5'>
        <Button.LinkOutline href='/users'>Voltar</Button.LinkOutline>
      </div>
      <div className='flex flex-col mt-5'>
        <div className='align-middle inline-block min-w-full shadow overflow-hidden sm:rounded-lg border border-gray-600 bg-gray-800 p-12'>
          <form onSubmit={form.handleSubmit}>
            <Input
              label='Senha do usuario'
              placeholder='Preencha a senha do usuario'
              onChange={form.handleChange}
              onBlur={form.handleBlur}
              value={form.values.password}
              name='password'
              errorMessage={form.errors.password}
            />
            <Button type='button' onClick={checkForErrors}>Salvar alterações</Button> 
              <Modal type = {'edit'}  visible = {modalVisible} closeFunction = {() => setModalVisible(false)}/>
          </form>
          {updatedData && !!updatedData.errors && (
            <p className='bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mt-2'>
              Ocorreu um erro ao salvar os dados
            </p>
          )}
        </div>
      </div>
    </Layout>
  )
}
export default AlterarSenha
