import React, { useState } from 'react'
import Layout from '../../components/Layout'
import Title from '../../components/Title'
import { useMutation, useQuery, fetcher } from '../../lib/graphql'
import { useFormik, FieldArray, FormikProvider } from 'formik'
import { useRouter } from 'next/router'
import Button from '../../components/Button'
import Input from '../../components/Input'
import Select from '../../components/Select'
import * as Yup from 'yup'
import Modal from '../../components/Modal'
const clothesSizes = ['PP', 'P', 'M', 'G', 'GG', 'XG', 'XGG', 'EG', 'EGG']
const shoesSizes = [
  '31',
  '32',
  '33',
  '34',
  '35',
  '36',
  '37',
  '38',
  '39',
  '40',
  '41',
  '42',
  '43',
  '44',
  '45',
  '46',
]

const validaSizeTypes = [
  { label: 'Roupas', id: 'clothes' },
  { label: 'Calçados', id: 'shoes' },
  { label: 'Medidas', id: 'measures' },
]
const CREATE_PRODUCT = `
  mutation createProduct($name: String!, $slug: String!, $description : String!,
    $category: String!, $brand: String!,$sizeType: String!,$voltage: [String!]!, $variations: [VariationInput!]!) {
    panelCreateProduct (input: {
      name: $name, 
      slug: $slug,
      description : $description,
      category: $category,
      brand: $brand,
      sizeType: $sizeType,
      voltage: $voltage,
      variations: $variations
     }) {
      id
    }
  }
`
const GET_ALL_CATEGORIES = `
  query{
  getAllCategories{
    id
    name
  }
}`
const GET_ALL_BRANDS = `
  query{
  getAllBrands{
    id
    name
  }
}`
const ProductSchema = Yup.object().shape({
  name: Yup.string()
    .min(3, 'Por favor, informe um nome com pelo menos 3 caracteres')
    .required('Por favor, informe um nome'),
  description: Yup.string()
    .min(20, 'Por favor, informe uma descrição com pelo menos 20 caracteres')
    .required('Por favor, informe uma descrição'),
  category: Yup.string()
    .min(1, 'Por favor selecione uma categoria')
    .required('Por favor selecione uma categoria'),
  brand: Yup.string()
    .min(1, 'Por favor selecione uma marca')
    .required('Por favor selecione uma marca'),
  sizeType: Yup.string()
    .min(1, 'Por favor selecione um tipo de medida')
    .required('Por favor selecioneum tipo de medida'),
  slug: Yup.string()
    .min(3, 'Por favor, informe um slug com pelo menos 3 caracteres')
    .required('Por favor, informe um slug')
    .test('is-unique', 'Este slug ja esta em uso', async value => {
      const ret = await fetcher(
        JSON.stringify({
          query: `
        query{
          getProductBySlug(slug:"${value}"){
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
  variations: Yup.array().of(
    Yup.object().shape({
      color: Yup.object().shape({
        colorName: Yup.string()
          .min(3, 'Minimo 3 Caracteres')
          .required('Por favor, informe o nome da cor da cor'),
        colorCode: Yup.string()
          .min(
            3,
            'Por favor, informe o nome da cor com pelo menos 3 caracteres',
          )
          .required('Por favor, informe o nome da cor da cor'),
      }),
      size: Yup.string().required('Por favor informe o tamanho ou medida'),
      sku: Yup.string()
        .min(3, 'Minimo 3 Caracteres')
        .required('Informe um sku valido'),
      price: Yup.number()
        .moreThan(0, 'Precisa ser maior que 0')
        .required('Informe o preço'),
      weight: Yup.number()
        .moreThan(0, 'Precisa ser maior que 0')
        .required('Informe o  peso'),
      stock: Yup.number()
        .moreThan(0, 'Precisa ser maior que 0')
        .required('Informe a quantidade de estoque'),
    }),
  ),
})
const CreateProduct = () => {
  const { data: categories } = useQuery(GET_ALL_CATEGORIES)
  const { data: brands } = useQuery(GET_ALL_BRANDS)
  const [modalVisible, setModalVisible] = useState(false)
  const [data, createProduct] = useMutation(CREATE_PRODUCT)
  const router = useRouter()
  const form = useFormik({
    validateOnChange: false,
    validateOnMount: true,
    validateOnBlur: true,
    initialValues: {
      name: '',
      slug: '',
      description: '',
      category: '',
      brand: '',
      sizeType: '',
      voltage: [],
      variations: [
        {
          color: {
            colorName: '',
            colorCode: '#000',
          },
          size: '',
          sku: '',
          price: 0,
          weight: 0,
          stock: 0,
        },
      ],
    },
    validationSchema: ProductSchema,
    onSubmit: async values => {
      const newValues = {
        ...values,
        variations: values.variations.map(variation => ({
          ...variation,
          price: Number(variation.price),
          weight: Number(variation.weight),
          stock: Number(variation.stock),
        })),
      }
      const data = await createProduct(newValues)
      if (data && !data.errors) {
        router.push('/products')
      }
    },
  })
  let categoriesOptions = []
  if (categories && categories.getAllCategories) {
    categoriesOptions = categories.getAllCategories.map(item => {
      return {
        id: item.id,
        label: item.name,
      }
    })
  }
  let brandsOptions = []
  if (brands && brands.getAllBrands) {
    brandsOptions = brands.getAllBrands.map(item => {
      return {
        id: item.id,
        label: item.name,
      }
    })
  }
  const checkForErrors = async () => {
    if (JSON.stringify(form.errors) === '{}') {
      setModalVisible(true)
    }
  }
  return (
    <Layout>
      <Title>Criar Produtos</Title>
      <div className='mt-5'>
        <Button.LinkOutline href='/products'>Voltar</Button.LinkOutline>
      </div>
      <div className='flex flex-col mt-5'>
        <div className='-my-2 py-2 overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8'>
          <div className='align-middle inline-block min-w-full shadow overflow-hidden sm:rounded-lg border border-gray-600 bg-gray-800 p-12'>
            <form onSubmit={form.handleSubmit}>
              <div className='flex flex-row flex-wrap items-start justify-start'>
                <Input
                  label='Nome do produto'
                  placeholder='Preencha o nome do produto'
                  onChange={form.handleChange}
                  value={form.values.name}
                  name='name'
                  errorMessage={form.errors.name}
                  onBlur={form.handleBlur}
                />
                <Input
                  label='Slug do produto'
                  placeholder='Preencha o slug do produto'
                  onChange={form.handleChange}
                  onBlur={form.handleBlur}
                  value={form.values.slug}
                  name='slug'
                  errorMessage={form.errors.slug}
                  helpText='Slug é utilizado para criar URLs amigaveis'
                />
              </div>
              <div className='my-2 relative'>
                <Input.TextArea
                  label='Descrição do produto'
                  placeholder='Preencha a descrição do produto'
                  onChange={form.handleChange}
                  onBlur={form.handleBlur}
                  value={form.values.description}
                  name='description'
                  errorMessage={form.errors.description}
                  textLength={form.values.description.length}
                />
              </div>
              <div className='flex flex-row flex-wrap items center justify-start my-2'>
                <Select
                  label={'Selecione a categoria do produto'}
                  onChange={form.handleChange}
                  onBlur={form.handleBlur}
                  name='category'
                  value={form.values.category}
                  options={categoriesOptions}
                  errorMessage={form.errors.category}
                />
                <Select
                  label={'Selecione a marca do produto'}
                  onChange={form.handleChange}
                  onBlur={form.handleBlur}
                  name='brand'
                  value={form.values.brand}
                  options={brandsOptions}
                  errorMessage={form.errors.brand}
                />
                <Select
                  label={'Selecione o tipo de medida do  produto'}
                  onChange={form.handleChange}
                  onBlur={form.handleBlur}
                  name='sizeType'
                  value={form.values.sizeType}
                  options={validaSizeTypes}
                  errorMessage={form.errors.sizeType}
                />
              </div>
              <div>
                <label className='block uppercase text-gray-100 text-xs font-bold mb-2'>
                  Voltagem
                </label>
                <div className='flex flex-row  w-52  items-center justify-start my-2'>
                  <Input.Checkbox
                    label={'120V'}
                    type='checkbox'
                    checked={form.values.voltage.indexOf('Bivolt') >= 0}
                    onChange={form.handleChange}
                    onBlur={form.handleBlur}
                    name='voltage'
                    value='120V'
                  />
                  <Input.Checkbox
                    label={'220V'}
                    type='checkbox'
                    checked={form.values.voltage.indexOf('Bivolt') >= 0}
                    onChange={form.handleChange}
                    onBlur={form.handleBlur}
                    name='voltage'
                    value='220V'
                  />
                  <Input.Checkbox
                    label={'Bivolt'}
                    type='checkbox'
                    checked={form.values.voltage.indexOf('Bivolt') >= 0}
                    onChange={form.handleChange}
                    onBlur={form.handleBlur}
                    name='voltage'
                    value='Bivolt'
                  />
                </div>
              </div>
              <FormikProvider value={form}>
                <FieldArray
                  name='variations'
                  render={arrayHelpers => {
                    return (
                      <div>
                        <div className='my-6'>
                          <Button
                            type='button'
                            onClick={() =>
                              arrayHelpers.push({
                                color: {
                                  colorName: '',
                                  colorCode: '#000',
                                },
                                size: '',
                                sku: '',
                                price: 0,
                                weight: 0,
                                stock: 0,
                              })
                            }
                          >
                            Adicionar variação
                          </Button>
                        </div>
                        {form.values.variations.map((variation, index) => (
                          <div
                            className='flex flex-row flex-wrap my-2 p-5 border border-gray-600 bg-gray-800 rounded relative'
                            key={index}
                          >
                            <div className='flex flex-row flex-wrap items-start justify-between h'>
                              <Input
                                label='SKU'
                                placeholder='Preencha o SKU da variação'
                                onChange={form.handleChange}
                                onBlur={form.handleBlur}
                                value={form.values.variations[index].sku}
                                name={`variations.${index}.sku`}
                                errorMessage={
                                  form.errors?.variations &&
                                  form.errors.variations[index]?.sku &&
                                  form.errors.variations[index].sku
                                }
                              />

                              <Input
                                label='Preço'
                                placeholder='Preencha o preço da variação'
                                onChange={form.handleChange}
                                onBlur={form.handleBlur}
                                value={form.values.variations[index].price}
                                name={`variations.${index}.price`}
                                errorMessage={
                                  form.errors?.variations &&
                                  form.errors.variations[index]?.price &&
                                  form.errors.variations[index].price
                                }
                              />

                              <Input
                                label='Peso'
                                placeholder='Preencha o peso da variação'
                                onChange={form.handleChange}
                                onBlur={form.handleBlur}
                                value={form.values.variations[index].weight}
                                name={`variations.${index}.weight`}
                                errorMessage={
                                  form.errors?.variations &&
                                  form.errors.variations[index]?.weight &&
                                  form.errors.variations[index].weight
                                }
                              />

                              <Input
                                label='Estoque'
                                placeholder='Preencha o estoque da variação'
                                onChange={form.handleChange}
                                onBlur={form.handleBlur}
                                value={form.values.variations[index].stock}
                                name={`variations.${index}.stock`}
                                errorMessage={
                                  form.errors?.variations &&
                                  form.errors.variations[index]?.stock &&
                                  form.errors.variations[index].stock
                                }
                              />
                            </div>
                            <div className=' flex  flex-row items-start justify-center mr-2 mb-4 relative h-16 '>
                              <Input
                                label='Nome e codigo da Cor'
                                placeholder='Nome da cor'
                                onChange={form.handleChange}
                                onBlur={form.handleBlur}
                                value={
                                  form.values.variations[index].color.colorName
                                }
                                name={`variations.${index}.color.colorName`}
                                errorMessage={
                                  form.errors?.variations &&
                                  form.errors.variations[index]?.color
                                    ?.colorName &&
                                  form.errors.variations[index].color.colorName
                                }
                              />
                              <Input.Color
                                label='Codigo da Cor'
                                bgColor={
                                  form.values.variations[index].color.colorCode
                                }
                                placeholder='Preencha a cor'
                                onChange={form.handleChange}
                                onBlur={form.handleBlur}
                                value={
                                  form.values.variations[index].color.colorCode
                                }
                                name={`variations.${index}.color.colorCode`}
                              />
                            </div>
                            <>
                              {form.values.sizeType === 'measures' && (
                                <Input
                                  label='Tamanho'
                                  placeholder='Preencha o tamanho'
                                  onChange={form.handleChange}
                                  onBlur={form.handleBlur}
                                  value={form.values.variations[index].size}
                                  name={`variations.${index}.size`}
                                  errorMessage={
                                    form.errors?.variations &&
                                    form.errors.variations[index]?.size &&
                                    form.errors.variations[index].size
                                  }
                                />
                              )}
                              
                              {form.values.sizeType === 'clothes' && (
                                <Select.SingleValues
                                  label={
                                    'Tamanho'
                                  }
                                  onChange={form.handleChange}
                                  onBlur={form.handleBlur}
                                  name={`variations.${index}.size`}
                                  value={form.values.variations[index].size}
                                  options={clothesSizes}
                                  errorMessage={
                                    form.errors?.variations &&
                                    form.errors.variations[index]?.size &&
                                    form.errors.variations[index].size
                                  }
                                />
                              )}
                              {form.values.sizeType === 'shoes' && (
                                <Select.SingleValues
                                  label={
                                    'Tamanho'
                                  }
                                  onChange={form.handleChange}
                                  onBlur={form.handleBlur}
                                  name={`variations.${index}.size`}
                                  value={form.values.variations[index].size}
                                  options={shoesSizes}
                                  errorMessage={
                                    form.errors?.variations &&
                                    form.errors.variations[index]?.size &&
                                    form.errors.variations[index].size
                                  }
                                />
                              )}
                            </>

                            
                            {index > 0 && (
                              <button
                                type='button'
                                className='px-2 py-1 bg-red-500 text-white text-xs rounded-full hover:bg-red-400 absolute right-2 top-3'
                                onClick={() => arrayHelpers.remove(index)}
                              >
                                X
                              </button>
                            )}
                          </div>
                        ))}
                      </div>
                    )
                  }}
                />
              </FormikProvider>
              <Button type='button' onClick={checkForErrors}>
                Criar produto
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
export default CreateProduct
