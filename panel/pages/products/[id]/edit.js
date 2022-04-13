import React, { useEffect, useState } from 'react'
import Layout from '../../../components/Layout'
import Title from '../../../components/Title'
import { useMutation, useQuery, fetcher } from '../../../lib/graphql'
import { useRouter } from 'next/router'
import { FieldArray, FormikProvider, useFormik } from 'formik'
import Input from '../../../components/Input'
import Button from '../../../components/Button'
import Select from '../../../components/Select'
import * as Yup from 'yup'
import Modal from '../../../components/Modal'

const genderOptions = [
  { id: 'MEN', label: 'Men' },
  { id: 'WOMEN', label: 'Women' },
  { id: 'UNISEX', label: 'Unisex' },
]
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

let id = ''
const UPDATE_PRODUCT = `
    mutation updateProduct(
      $id: String!, 
      $category: String!, 
      $brand: String!,
      $name: String!, 
      $description: String!,
      $price: Float!,
      $gender: ProductGender!,
    $material: String!,
      $slug: String!, 
      $color: ColorInput!,
      $variations: [VariationInput!]!) {
        panelUpdateProduct (input: {
        id:$id,
        category: $category,
      brand: $brand,
      name: $name, 
      description : $description,
      price:$price,
      gender: $gender,
      material: $material,
      slug: $slug,
      color:$color,
      variations: $variations
        }) {
        id
        name
        slug
        }
    }
`
const GET_ALL_CATEGORIES = `
  query{
  getAllCategories{
    id
    name
    slug
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
    .max(250, 'Por favor, informe uma descrição com no máximo 250 caracteres')
    .required('Por favor, informe uma descrição'),
  category: Yup.string()
    .min(1, 'Por favor selecione uma categoria')
    .required('Por favor selecione uma categoria'),
  brand: Yup.string()
    .min(1, 'Por favor selecione uma marca')
    .required('Por favor selecione uma marca'),
  price: Yup.number()
    .moreThan(0, 'Precisa ser maior que 0')
    .required('Informe o preço'),
  gender: Yup.string().required('Por favor, informe o genero do produto'),
  material: Yup.string()
    .min(3, 'Por favor, informe um material com pelo menos 3 caracteres')
    .required('Por favor, informe o material'),
  color: Yup.object().shape({
    colorName: Yup.string()
      .min(3, 'Minimo 3 Caracteres')
      .required('Por favor, informe o nome da cor da cor'),
    colorCode: Yup.string()
      .min(3, 'Por favor, informe o nome da cor com pelo menos 3 caracteres')
      .required('Por favor, informe o nome da cor da cor'),
  }),
  slug: Yup.string()
    .min(3, 'Por favor, informe um slug com pelo menos 3 caracteres')
    .required('Por favor, informe um slug')
    .test('is-unique', 'Este slug ja esta em uso', async value => {
      if (value !== '') {
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
        if (ret.data.getProductBySlug.id === id) {
          return true
        }
      }
      return false
    }),
  variations: Yup.array().of(
    Yup.object().shape({
      size: Yup.string().required('Por favor informe o tamanho ou medida'),
      sku: Yup.string()
        .min(3, 'Minimo 3 Caracteres')
        .required('Informe um sku valido'),
      weight: Yup.number()
        .moreThan(0, 'Precisa ser maior que 0')
        .required('Informe o  peso'),
      stock: Yup.number()
        .moreThan(0, 'Precisa ser maior que 0')
        .required('Informe a quantidade de estoque'),
    }),
  ),
})
const EditProduct = () => {
  const router = useRouter()
  const [modalVisible, setModalVisible] = useState(false)
  id = router.query.id
  const { data: categories, error } = useQuery(GET_ALL_CATEGORIES)
  const { data: brands } = useQuery(GET_ALL_BRANDS)
  const { data } = useQuery(`
  query{
    getProductById(id: "${router.query.id}"){
        name
        slug
        description
        category{
          id
          name
        }
        brand{
          id
          name
        }
        price
        gender
        material
        color{
          colorName
          colorCode
        }
        variations{
          size
          sku
          weight
          stock
        }
      }
}`)
  const [updatedData, updateProduct] = useMutation(UPDATE_PRODUCT)
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
      price: 0,
      gender: '',
      material: '',
      color: {
        colorName: '',
        colorCode: '#00000',
      },
      variations: [
        {
          size: '',
          sku: '',
          weight: 0,
          stock: 0,
        },
      ],
    },
    validationSchema: ProductSchema,
    onSubmit: async values => {
      const product = {
        ...values,
        id: router.query.id,
        price: Number(values.price),
        variations: values.variations.map(variation => ({
          ...variation,
          weight: Number(variation.weight),
          stock: Number(variation.stock),
        })),
      }
      const data = await updateProduct(product)

      if (data && !data.errors) {
        router.push('/products')
      }
    },
  })
  useEffect(() => {
    if (data && data.getProductById) {
      form.setFieldValue('name', data.getProductById.name)
      form.setFieldValue('slug', data.getProductById.slug)
      form.setFieldValue('description', data.getProductById.description)
      form.setFieldValue('category', data.getProductById.category.id)
      form.setFieldValue('brand', data.getProductById.brand.id)
      form.setFieldValue('price', data.getProductById.price)
      form.setFieldValue('gender', data.getProductById.gender)
      form.setFieldValue('material', data.getProductById.material)
      form.setFieldValue('color', data.getProductById.color)
      form.setFieldValue('variations', data.getProductById.variations)
    }
  }, [data])
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
      <Title>Editar Produto</Title>
      <div className='mt-5'>
        <Button.LinkOutline href='/products'>Voltar</Button.LinkOutline>
      </div>
      <div className='flex flex-col mt-5'>
        <div className='-my-2 py-2 overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8'>
          <div className='align-middle inline-block min-w-full shadow overflow-hidden sm:rounded-lg border border-gray-600 bg-gray-800 p-12'>
            <form onSubmit={form.handleSubmit}>
              <div className='flex flex-row flex-wrap items-start justify-start'>
                <div className='mb-2 sm:mb-0'>
                  <Input
                    label='Nome do produto'
                    placeholder='Preencha o nome do produto'
                    onChange={form.handleChange}
                    onBlur={form.handleBlur}
                    value={form.values.name}
                    name='name'
                    errorMessage={form.errors.name}
                  />
                </div>
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
              <div className='my-4'>
                <Input.TextArea
                  label='Descrição do produto'
                  placeholder='Preencha a descrição do produto'
                  onChange={form.handleChange}
                  onBlur={form.handleBlur}
                  value={form.values.description}
                  name='description'
                  textLength={form.values.description.length}
                  errorMessage={form.errors.description}
                />
              </div>
              <Input
                label='Material do produto'
                placeholder='Preencha o material do produto'
                onChange={form.handleChange}
                value={form.values.material}
                name='material'
                errorMessage={form.errors.material}
                onBlur={form.handleBlur}
              />
              <Input
                label='Preço'
                placeholder='Preencha o preço da variação'
                onChange={form.handleChange}
                onBlur={form.handleBlur}
                value={form.values.price}
                name='price'
                errorMessage={
                  form.errors && form.errors.price && form.errors.price
                }
              />
              <div className=' flex  flex-row items-start justify-center mr-2 mb-4 relative h-16 '>
                <Input
                  label='Nome e codigo da Cor'
                  placeholder='Nome da cor'
                  onChange={form.handleChange}
                  onBlur={form.handleBlur}
                  value={form.values.color.colorName}
                  name='color.colorName'
                  errorMessage={
                    form.errors &&
                    form.errors.color?.colorName &&
                    form.errors.color.colorName
                  }
                />

                <Input.Color
                  label='Codigo da Cor'
                  bgColor={form.values.color.colorCode}
                  placeholder='Preencha a cor'
                  onChange={form.handleChange}
                  onBlur={form.handleBlur}
                  value={form.values.color.colorCode}
                  name='color.colorCode'
                />
              </div>
              <div className='flex flex-row flex-wrap items center justify-start my-2'>
              <Select
                  label={'Gender'}
                  onChange={form.handleChange}
                  onBlur={form.handleBlur}
                  name='gender'
                  value={form.values.gender}
                  options={genderOptions}
                  errorMessage={
                    form.errors && form.errors.gender && form.errors.gender
                  }
                />
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
                                size: '',
                                sku: '',
                                weight: 0,
                                stock: 0,
                              })
                            }
                          >
                            Adicionar variação
                          </Button>
                        </div>
                        {form.values.variations &&
                          form.values.variations.map((variation, index) => (
                            <div
                              className='flex flex-row flex-wrap my-2 p-5 border border-gray-600 bg-gray-800 rounded relative'
                              key={index}
                            >
                              <>
                                <Select.SingleValues
                                  label={'Tamanho'}
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
                              </>

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
                Salvar alterações
              </Button>
              <Modal
                type={'edit'}
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
export default EditProduct
