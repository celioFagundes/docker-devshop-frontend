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
        Change password :{' '}
        {data && data.panelGetUserById && data.panelGetUserById.name}
      </Title>
      <div className='mt-5'>
        <Button.LinkBack href='/users'>Back</Button.LinkBack>
      </div>
      <div className='flex flex-col'>
        <div className='align-middle inline-block min-w-full shadow overflow-hidden rounded-sm bg-darkBlack p-12'>
          <form onSubmit={form.handleSubmit}>
            <Input
              label='User password'
              placeholder='Enter user password'
              onChange={form.handleChange}
              onBlur={form.handleBlur}
              value={form.values.password}
              name='password'
              errorMessage={form.errors.password}
            />
            <Button type='button' onClick={checkForErrors}>Save changes</Button> 
              <Modal type = {'edit'}  visible = {modalVisible} closeFunction = {() => setModalVisible(false)}/>
          </form>
          {updatedData && !!updatedData.errors && (
            <p className='bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mt-2'>
              Error while trying to save
            </p>
          )}
        </div>
      </div>
    </Layout>
  )
}
export default AlterarSenha
