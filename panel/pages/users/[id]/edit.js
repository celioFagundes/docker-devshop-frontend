import React, { useEffect , useState} from 'react'
import Layout from '../../../components/Layout'
import Title from '../../../components/Title'
import { useMutation, useQuery, fetcher } from '../../../lib/graphql'
import { useRouter } from 'next/router'
import { useFormik } from 'formik'
import Input from '../../../components/Input'
import Button from '../../../components/Button'
import * as Yup from 'yup'
import Select from '../../../components/Select'
import Modal from '../../../components/Modal'
const roleOptions = [
  {id: 'ADMIN', label: 'Administrador'},
  {id: 'USER', label: 'Usuario'}
]
let id = ''
const UPDATE_USER = `
    mutation updateUser($id: String!, $name: String!, $email: String!, $role: UserRole!) {
        panelUpdateUser (input: {
        id:$id,
        name:$name, 
        email:$email,
        role:$role
        }) {
        id
        name
        email
        }
    }
`
const UserSchema = Yup.object().shape({
  name: Yup.string()
    .min(3, 'Por favor, informe um nome com pelo menos 3 caracteres')
    .required('Por favor, informe um nome'),
  role: Yup.string()
    .required('Por favor, informe uma role'),
  email: Yup.string()
    .min(3, 'Por favor, informe um email com pelo menos 3 caracteres')
    .email()
    .required('Por favor, informe um email')
    .test('is-unique', 'Este email ja esta em uso', async value => {
      const ret = await fetcher(
        JSON.stringify({
          query: `
        query{
          panelGetUserByEmail(email:"${value}"){
            id
          }
        }`,
        }),
      )
      if (ret.errors) {
        return true
      }
      if(ret.data.panelGetUserByEmail.id === id){
        return true
      }
      return false
    }),
})
const EditUser = () => {
  const router = useRouter()
  const [modalVisible, setModalVisible] = useState(false)
  id = router.query.id
  const { data } = useQuery(`
  query{
    panelGetUserById(id: "${router.query.id}"){
        name
        email
        role
      }
}`)
  const [updatedData, updateUser] = useMutation(UPDATE_USER)
  const form = useFormik({
    validateOnChange:false,
    validateOnMount:true,
    validateOnBlur:true,
    initialValues: {
      name: '',
      email: '',
      role: '',
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
  useEffect(() => {
    if (data && data.panelGetUserById) {
      form.setFieldValue('name', data.panelGetUserById.name)
      form.setFieldValue('email', data.panelGetUserById.email)
      
    }
  }, [data])
  const checkForErrors = async() =>{
    if(JSON.stringify(form.errors) === '{}'){
      setModalVisible(true)
    }
  }
  return (
    <Layout>
      <Title>Edit user</Title>
      <div className='mt-5'>
        <Button.LinkBack href='/users'>Back</Button.LinkBack>
      </div>
      <div className='flex flex-col'>
        <div className='align-middle inline-block min-w-full shadow overflow-hidden rounded-sm  bg-darkBlack p-12'>
          <form onSubmit={form.handleSubmit}>
          <Input
                label='User name'
                placeholder='Enter user name'
                onChange={form.handleChange}
                value={form.values.name}
                name='name'
                errorMessage={form.errors.name}
                onBlur={form.handleBlur}
              />

              <Input
                label='User email'
                placeholder='Enter  user email'
                onChange={form.handleChange}
                value={form.values.email}
                name='email'
                errorMessage={form.errors.email}
                onBlur={form.handleBlur}
              />
              <Select
                label='User role'
                onChange={form.handleChange}
                name='role'
                value={form.values.role}
                options={roleOptions}
                errorMessage={form.errors.role}
                onBlur={form.handleBlur}
              />
              <Button type='button' onClick={checkForErrors}>
                Finish
              </Button>
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
export default EditUser
