import React ,{useState} from 'react'
import Layout from '../../components/Layout'
import Title from '../../components/Title'
import { useMutation, fetcher } from '../../lib/graphql'
import { useFormik } from 'formik'
import { useRouter } from 'next/router'
import Button from '../../components/Button'
import Input from '../../components/Input'
import * as Yup from 'yup'
import Modal from '../../components/Modal'

const CREATE_BRAND = `
  mutation createBrand($name: String!, $slug: String!) {
    panelCreateBrand (input: {
      name:$name, 
      slug:$slug
     }) {
      id
      name
      slug
    }
  }
`
const BrandSchema = Yup.object().shape({
  name: Yup.string()
    .min(3, 'Por favor, informe um nome com pelo menos 3 caracteres')
    .required('Por favor, informe um nome'),
  slug: Yup.string()
    .min(3, 'Por favor, informe um slug com pelo menos 3 caracteres')
    .required('Por favor, informe um slug')
    .test('is-unique', 'Este slug ja esta em uso', async value => {
      const ret = await fetcher(
        JSON.stringify({
          query: `
        query{
          getBrandBySlug(slug:"${value}"){
            id
          }
        }`,
        }),
      )
      if (ret.errors) {
        return true
      }
      return false
    }),
})
const CreateBrand = () => {
  const [data, createBrand] = useMutation(CREATE_BRAND)
  const [modalVisible, setModalVisible] = useState(false)
  const router = useRouter()
  const form = useFormik({
    validateOnChange:false,
    validateOnMount:true,
    validateOnBlur:true,
    initialValues: {
      name: '',
      slug: '',
    },
    validationSchema: BrandSchema,
    onSubmit: async values => {
      const data = await createBrand(values)
      if (data && !data.errors) {
        router.push('/brands')
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
      <Title>Criar uma nova marca</Title>
      <div className='mt-5'>
        <Button.LinkOutline href='/brands'>Voltar</Button.LinkOutline>
      </div>
      <div className='flex flex-col mt-5'>
        <div className='-my-2 py-2 overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8'>
          <div className='align-middle inline-block min-w-full shadow overflow-hidden sm:rounded-lg border border-gray-600 bg-gray-800 p-12'>
            <form onSubmit={form.handleSubmit}>
              <Input
                label='Nome da marca'
                placeholder='Preencha o nome da marca'
                onChange={form.handleChange}
                value={form.values.name}
                name='name'
                errorMessage={form.errors.name}
                onBlur={form.handleBlur}
              />

              <Input
                label='Slug da marca'
                placeholder='Preencha o slug da marca'
                onChange={form.handleChange}
                value={form.values.slug}
                name='slug'
                errorMessage={form.errors.slug}
                onBlur={form.handleBlur}
                helpText='Slug é utilizado para criar URLs amigaveis'
              />

              <Button type='button' onClick={checkForErrors}>
                Criar marca
              </Button>
              <Modal
                type={'create'}
                visible={modalVisible}
                closeFunction={() => setModalVisible(false)}
              />
            </form>
            {data && !!data.errors && (
              <p className='bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mt-2'>
                Ocorreu um erro ao salvar os dados
              </p>
            )}
          </div>
        </div>
      </div>
    </Layout>
  )
}
export default CreateBrand
