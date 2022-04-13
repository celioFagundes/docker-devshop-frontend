import React, { useState } from 'react'
import Layout from '../../components/Layout'
import Title from '../../components/Title'
import Table from '../../components/Table'
import { useMutation, useQuery } from '../../lib/graphql'
import {
  AiOutlinePlus,
  AiFillDelete,
  AiFillEdit,
  AiFillPicture,
} from 'react-icons/ai'
import Link from 'next/link'
import Button from '../../components/Button'
import Alert from '../../components/Alert'
import Modal from '../../components/Modal'
import ModalInfo from '../../components/ModalInfo'

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
    await deleteProduct({id:itemSelected.id})
    mutate()
    setModalVisible(false)
  }
  return (
    <Layout>
      <Title>Manage Sneakers</Title>
      <div className='mt-5'>
        <Button.Card href='/products/create' Icon={AiOutlinePlus}>
          Insert new sneaker{' '}
        </Button.Card>
      </div>

      <div className='flex flex-col mt-5'>
        <div className='-my-2 py-2 overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8'>
          {data && data.getAllProducts.length === 0 && (
            <Alert>Nenhuma produto encontrado</Alert>
          )}
          {data && data.getAllProducts.length > 0 && (
            <div className='align-middle inline-block min-w-full shadow overflow-hidden sm:rounded-lg '>
              <Table>
                <Table.Head>
                  <Table.Th>Sneaker</Table.Th>
                  <Table.Th>Brand</Table.Th>
                  <Table.Th>Category</Table.Th>
                  <Table.Th>Gender</Table.Th>
                  <Table.Th>Slug</Table.Th>
                  <Table.Th>Material</Table.Th>
                  <Table.Th></Table.Th>
                </Table.Head>
                <Table.Body>
                  {data.getAllProducts.map(item => (
                    <Table.Row key={item.id}>
                      <Table.Td>
                        <div className='flex items-center'>
                          <div>
                            <div className='text-sm leading-5 font-medium text-gray-900'>
                              {item.name}
                            </div>
                            <div className='text-sm leading-5 text-gray-500  max-w-xs overflow-hidden truncate'>
                              {item.description}
                            </div>
                          </div>
                        </div>
                      </Table.Td>
                      <Table.Td>
                        <div className='flex items-center'>
                          <div>
                            <div className='text-sm leading-5 font-medium text-gray-900'>
                              {item.brand.name}
                            </div>
                          </div>
                        </div>
                      </Table.Td>
                      <Table.Td>
                        <div className='flex items-center'>
                          <div>
                            <div className='text-sm leading-5 font-medium text-gray-900'>
                              {item.category.name}
                            </div>
                          </div>
                        </div>
                      </Table.Td>
                      <Table.Td>
                        <div className='flex items-center justify-center'>
                          <div>
                            <div className='text-sm leading-5 font-medium  text-gray-900 uppercase'>
                              {item.gender}
                            </div>
                          </div>
                        </div>
                      </Table.Td>
                      <Table.Td>
                        <div className='flex items-center'>
                          <div>
                            <div className='text-sm leading-5 font-medium text-gray-900'>
                              {item.slug}
                            </div>
                          </div>
                        </div>
                      </Table.Td>
                      <Table.Td>
                        <div className='flex items-center'>
                          <div>
                            <div className='text-sm leading-5 font-medium text-gray-900'>
                              {item.material}
                            </div>
                          </div>
                        </div>
                      </Table.Td>
                      <Table.Td>
                        <div className='flex items-center justify-between'>
                          <Link href={`/products/${item.id}/images`}>
                            <a className='text-gray-900 font-medium hover:text-gray-400 mr-1'>
                              <AiFillPicture size={24} />
                            </a>
                          </Link>
                          <Link href={`/products/${item.id}/edit`}>
                            <a className='text-gray-900 font-medium hover:text-gray-400 mr-2'>
                              <AiFillEdit size={24} />
                            </a>
                          </Link>
                          <button
                            onClick={openModal(item)}
                            className='text-gray-900 font-medium hover:text-gray-400'
                          >
                            <AiFillDelete size={24} />
                          </button>
                          <button
                            onClick={openModalInfo(item)}
                            className='text-gray-900 font-medium hover:text-gray-400'
                          >
                            ...
                          </button>
                        </div>
                      </Table.Td>
                    </Table.Row>
                  ))}
                </Table.Body>
              </Table>
              {modalInfoVisible && (
                <ModalInfo
                  type={'remove'}
                  item={itemSelected}
                  visible={modalInfoVisible}
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
