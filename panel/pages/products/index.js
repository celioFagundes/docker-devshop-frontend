import React, { useEffect, useState } from 'react'
import Layout from '../../components/Layout'
import Title from '../../components/Title'
import Table from '../../components/Table'
import { useMutation, useQuery } from '../../lib/graphql'
import {
  AiOutlinePlus,
  AiFillDelete,
  AiFillEdit,
  AiFillPicture,
  AiFillInfoCircle,
} from 'react-icons/ai'
import Link from 'next/link'
import Button from '../../components/Button'
import Alert from '../../components/Alert'
import Modal from '../../components/Modal'
import ModalInfo from '../../components/ModalInfo'
import Select from '../../components/Select'
import Input from '../../components/Input'

const genderOptions = ['All', 'Men', 'Women']

const brandsOptions = ['All', 'Adidas', 'Nike']
const categoriesOptions = [
  'All',
  'Sneakers',
  'Training & Gym',
  'Running',
  'Soccer',
  'Skateboarding',
  'Basketball',
]
const DELETE_PRODUCT = `
  mutation deleteProduct($id: String!) {
    panelDeleteProduct(id : $id)
  }
`
const GET_ALL_PRODUCTS = `
  query{
  getAllProducts{
    id
    name
    slug
    description
    price
    gender
    material
    color{
      colorName
    }
    category{
      id
      name
    }
    brand{
      id
      name
    }
    variations{
      sku
      weight
      stock
      size
    }
  }
}`

const Products = () => {
  const { data, error, mutate } = useQuery(GET_ALL_PRODUCTS)
  const [deleteData, deleteProduct] = useMutation(DELETE_PRODUCT)
  const [displayData, setDisplayData] = useState([])
  const [genderSelected, setGenderSelected] = useState('All')
  const [brandSelected, setBrandSelected] = useState('All')
  const [categorySelected, setCategorySelected] = useState('All')
  const [searchInput, setSearchInput] = useState('')
  const [modalVisible, setModalVisible] = useState(false)
  const [modalInfoVisible, setModalInfoVisible] = useState(false)
  const [itemSelected, setItemSelected] = useState({})
  const openModal = item => async () => {
    setModalVisible(true)
    setItemSelected(item)
  }
  const openModalInfo = item => async () => {
    setModalInfoVisible(true)
    setItemSelected(item)
  }
  const remove = async () => {
    await deleteProduct({ id: itemSelected.id })
    mutate()
    setModalVisible(false)
  }

  const handleInput = evt =>{
    setSearchInput(evt.target.value.toLowerCase())
  }
  const handleSelect = (fn, e) => {
    fn(e.target.value)
  }
  useEffect(() => {
    if (data && data.getAllProducts) {
      setDisplayData(data.getAllProducts)
    }
  }, [data])

  const filterByGender = list => {
    if (genderSelected !== 'All') {
      let newList = list.filter(item => item.gender === genderSelected)
      return newList
    }
    return list
  }
  const filterByBrand = list => {
    if (brandSelected !== 'All') {
      let newList = list.filter(item => item.brand.name === brandSelected)
      return newList
    }
    return list
  }
  const filterByCategory = list => {
    if (categorySelected !== 'All') {
      let newList = list.filter(item => item.category.name === categorySelected)
      return newList
    }
    return list
  }

  useEffect(() => {
    if (data && data.getAllProducts) {
      let filteredList = data.getAllProducts
      filteredList = filterByBrand(filteredList)
      filteredList = filterByCategory(filteredList)
      filteredList = filterByGender(filteredList)
      let newDisplayList = filteredList.filter(item => item.name.toLowerCase().includes(searchInput))
      setDisplayData(newDisplayList)
    }
  }, [searchInput,genderSelected, brandSelected, categorySelected])

  return (
    <Layout>
      <Title>Manage Shoes</Title>
      <div className='mt-5'>
        <Button.Card href='/products/create' Icon={AiOutlinePlus}>
          Insert new shoe{' '}
        </Button.Card>
      </div>
      <div className='flex items-center justify-start bg-lightBlack mt-2 py-1'>
        <Input.Search label='Search by name' value={searchInput} onChange = {(evt) => handleInput(evt)}/>
        <div className=' flex items-center justify-start'>
          <Select.SingleValuesHorizontal
            options={brandsOptions}
            label='Brand'
            value={brandSelected}
            onChange={evt => handleSelect(setBrandSelected, evt)}
          />
          <Select.SingleValuesHorizontal
            options={categoriesOptions}
            label='Category'
            value={categorySelected}
            onChange={evt => handleSelect(setCategorySelected, evt)}
          />
          <Select.SingleValuesHorizontal
            options={genderOptions}
            label='Gender'
            value={genderSelected}
            onChange={evt => handleSelect(setGenderSelected, evt)}
          />
        </div>
      </div>
      <div className='flex flex-col'>
        <div className='-my-2 py-2 overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8'>
          {displayData && displayData.length === 0 && (
            <Alert>No shoes found</Alert>
          )}
          {displayData && displayData.length > 0 && (
            <div className='align-middle inline-block min-w-full shadow overflow-hidden sm:rounded-lg '>
              <Table>
                <Table.Head>
                  <Table.Th>Shoe</Table.Th>
                  <Table.Th>Brand</Table.Th>
                  <Table.Th>Category</Table.Th>
                  <Table.Th>Gender</Table.Th>
                  <Table.Th>Slug</Table.Th>
                  <Table.Th>Material</Table.Th>
                  <Table.Th></Table.Th>
                </Table.Head>
                <Table.Body>
                  {displayData.map(item => (
                    <Table.Row key={item.id}>
                      <Table.Td>
                        <div className='flex items-center'>
                          <div>
                            <div className='text-sm leading-5 font-medium text-lightGray'>
                              {item.name + item.color.colorName}
                            </div>
                            <div className='text-sm leading-5 text-lightGray  max-w-xs overflow-hidden truncate'>
                              {item.description}
                            </div>
                          </div>
                        </div>
                      </Table.Td>
                      <Table.Td>
                        <div className='flex items-center'>
                          <div>
                            <div className='text-sm leading-5 font-medium text-lightGray'>
                              {item.brand.name}
                            </div>
                          </div>
                        </div>
                      </Table.Td>
                      <Table.Td>
                        <div className='flex items-center'>
                          <div>
                            <div className='text-sm leading-5 font-medium text-lightGray'>
                              {item.category.name}
                            </div>
                          </div>
                        </div>
                      </Table.Td>
                      <Table.Td>
                        <div className='flex items-center justify-center'>
                          <div>
                            <div className='text-sm leading-5 font-medium  text-lightGray uppercase'>
                              {item.gender}
                            </div>
                          </div>
                        </div>
                      </Table.Td>
                      <Table.Td>
                        <div className='flex items-center'>
                          <div>
                            <div className='text-sm leading-5 font-medium text-lightGray'>
                              {item.slug}
                            </div>
                          </div>
                        </div>
                      </Table.Td>
                      <Table.Td>
                        <div className='flex items-center'>
                          <div>
                            <div className='text-sm leading-5 font-medium text-lightGray'>
                              {item.material}
                            </div>
                          </div>
                        </div>
                      </Table.Td>
                      <Table.Td>
                        <div className='flex items-center justify-between'>
                          <Link href={`/products/${item.id}/images`}>
                            <a className='text-lightGray font-medium hover:text-gray-400 mr-1'>
                              <AiFillPicture size={24} />
                            </a>
                          </Link>
                          <Link href={`/products/${item.id}/edit`}>
                            <a className='text-lightGray font-medium hover:text-gray-400 mr-2'>
                              <AiFillEdit size={24} />
                            </a>
                          </Link>
                          <button
                            onClick={openModal(item)}
                            className='text-lightGray font-medium hover:text-gray-400'
                          >
                            <AiFillDelete size={24} />
                          </button>
                          <button
                            onClick={openModalInfo(item)}
                            className='text-lightGray font-medium hover:text-gray-400'
                          >
                            <AiFillInfoCircle size={24} />
                          </button>
                        </div>
                      </Table.Td>
                    </Table.Row>
                  ))}
                </Table.Body>
              </Table>
              {modalInfoVisible && (
                <ModalInfo
                  item={itemSelected}
                  closeFunction={() => setModalInfoVisible(false)}
                />
              )}
              {modalVisible && (
                <Modal
                  type={'remove'}
                  itemId={itemSelected.id}
                  visible={modalVisible}
                  confirmFunction={remove}
                  closeFunction={() => setModalVisible(false)}
                />
              )}
            </div>
          )}
        </div>
      </div>
    </Layout>
  )
}
export default Products
