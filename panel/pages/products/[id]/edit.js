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
    .min(3, '3 characters minimum required')
    .required('Please, enter a name'),
  description: Yup.string()
    .min(20, '20 characters minimum required')
    .required('Please, enter a description'),
  category: Yup.string()
    .min(1, 'Please select a category')
    .required('Please select a category'),
  brand: Yup.string()
    .min(1, 'Please select a brand')
    .required('Please select a brand'),
  price: Yup.number()
    .moreThan(0, 'Must be greater than zero')
    .required('Please, enter a price'),
  gender: Yup.string().required('Please, select a gender'),
  material: Yup.string()
    .min(3, '3 characters minimum required')
    .required('Please, enter a material'),
  color: Yup.object().shape({
    colorName: Yup.string()
      .min(3, '3 characters minimum required')
      .required('Please, enter the color name'),
    colorCode: Yup.string()
      .min(3, '3 characters minimum required')
      .required('Please,enter color code'),
  }),
  slug: Yup.string()
    .min(3, '3 characters minimum required')
    .required('Please, enter a slug')
    .test('is-unique', 'Slug already in use', async value => {
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
      if(ret.data.getProductBySlug.id === id){
        return true
      }
      return false
    }),
  variations: Yup.array().of(
    Yup.object().shape({
      size: Yup.string().required('Please, select a size'),
      sku: Yup.string()
        .min(3, '3 characters minimum required')
        .required('Enter a valid SKU'),
      weight: Yup.number()
        .moreThan(0, 'Must be greater than zero')
        .required('Enter a weight'),
      stock: Yup.number()
        .moreThan(0, 'Must be greater than zero')
        .required('Enter the stock quantity'),
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
      form.setFieldValue('gender', data.getProductById.gender.toUpperCase())
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
      <Title>Edit sneaker</Title>
      <div className='mt-5'>
        <Button.LinkBack href='/products'>Back</Button.LinkBack>
      </div>
      <div className='flex flex-col'>
        <div className='-my-2 py-2 overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8'>
          <div className='align-middle inline-block min-w-full shadow overflow-hidden sm:rounded-b  bg-darkBlack p-12'>
            <form onSubmit={form.handleSubmit}>
              <Input
                label='Name'
                placeholder='Enter sneaker name'
                onChange={form.handleChange}
                value={form.values.name}
                name='name'
                errorMessage={form.errors.name}
                onBlur={form.handleBlur}
                helpText='Name including color'
              />
              <Input
                label='URL Slug'
                placeholder='Enter sneaker slug'
                onChange={form.handleChange}
                onBlur={form.handleBlur}
                value={form.values.slug}
                name='slug'
                errorMessage={form.errors.slug}
                helpText={"Slug is used to create easy-to-read URL's"}
              />
              <Input
                label='Material '
                placeholder='Enter material'
                onChange={form.handleChange}
                value={form.values.material}
                name='material'
                errorMessage={form.errors.material}
                onBlur={form.handleBlur}
              />
              <div className='my-2 relative'>
                <Input.TextArea
                  label='Description'
                  placeholder='Enter description'
                  onChange={form.handleChange}
                  onBlur={form.handleBlur}
                  value={form.values.description}
                  name='description'
                  errorMessage={form.errors.description}
                  textLength={form.values.description.length}
                  helpText='Min: 20 Max: 500'
                />
              </div>
              <Input
                label='Price'
                placeholder='Enter price'
                onChange={form.handleChange}
                onBlur={form.handleBlur}
                value={form.values.price}
                name='price'
                errorMessage={
                  form.errors && form.errors.price && form.errors.price
                }
              />
              <div className=' flex  flex-row items-start justify-start mr-2 mb-4 relative '>
                <Input.Color
                  label='Color name and code'
                  placeholder='Color name'
                  bgColor={form.values.color.colorCode}
                  onChange={form.handleChange}
                  onBlur={form.handleBlur}
                  colorNameValue={form.values.color.colorName}
                  colorCodeValue={form.values.color.colorCode}
                  colorName='color.colorName'
                  codeName='color.colorCode'
                  helpText='Use the color picker to select color code'
                  errorMessage={
                    form.errors &&
                    form.errors?.color?.colorName &&
                    form.errors.color.colorName
                  }
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
                  label={'Select sneaker category'}
                  onChange={form.handleChange}
                  onBlur={form.handleBlur}
                  name='category'
                  value={form.values.category}
                  options={categoriesOptions}
                  errorMessage={form.errors.category}
                />
                <Select
                  label={'Select sneaker brand'}
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
                      <div className=''>
                        <p className='text-primary font-medium text-lg'>Sneaker Variations</p>
                        <div className='my-1'>
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
                            Add new variation form
                          </Button>
                        </div>
                        {form.values.variations.map((variation, index) => (
                          <div
                            className='flex flex-row flex-wrap my-2 p-5  bg-lightBlack rounded relative'
                            key={index}
                          >
                            <div className='flex flex-row flex-wrap items-start justify-between h'>
                              <Input.Variation
                                label='SKU'
                                placeholder='Enter variation SKU'
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

                              <Input.Variation
                                label='Weight'
                                placeholder='Enter variation weight'
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

                              <Input.Variation
                                label='Stock'
                                placeholder='Enter variation stock'
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
                            <>
                              <Select.SingleValues
                                label={'Size'}
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
                            {index > 0 && (
                              <button
                                type='button'
                                className='px-2 py-1 bg-darkBlack text-red-500 font-medium text-xs rounded-full hover:bg-red-400 absolute right-2 top-3'
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
                Finish
              </Button>
              <Modal
                type={'create'}
                visible={modalVisible}
                closeFunction={() => setModalVisible(false)}
              />
            </form>

            {data && !!data.errors && (
              <p className='bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mt-2'>
                Error while trying to save
              </p>
            )}
          </div>
        </div>
      </div>
    </Layout>
  )
}
export default EditProduct
