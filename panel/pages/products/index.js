import React , {useState} from 'react'
import Layout from '../../components/Layout'
import Title from '../../components/Title'
import Table from '../../components/Table'
import { useMutation, useQuery } from '../../lib/graphql'
import Link from 'next/link'
import Button from '../../components/Button'
import Alert from '../../components/Alert'
import Modal from '../../components/Modal'

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
    category{
      id
      name
    }
    brand{
      id
      name
    }
  }
}`

const Products = () => {
  const { data, error, mutate } = useQuery(GET_ALL_PRODUCTS)
  const [deleteData, deleteProduct] = useMutation(DELETE_PRODUCT)
  const [modalVisible, setModalVisible] = useState(false)
  const [itemSelected, setItemSelected] = useState('')
 
  const openModal = id => async () => {
    setModalVisible(true)
    setItemSelected({id})
  }
  const remove = async() =>{
    await deleteProduct(itemSelected)
    mutate()
    setModalVisible(false)
  }
  return (
    <Layout>
      <Title>Gerenciar Produtos</Title>
      <div className='mt-5'>
        <Button.Link href='/products/create'>Criar novo produto</Button.Link>
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
                  <Table.Th>Produtos</Table.Th>
                  <Table.Th>Slug</Table.Th>
                  <Table.Th>Categoria</Table.Th>
                  <Table.Th>Marca</Table.Th>
                  <Table.Th>Ações</Table.Th>
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
                              {item.slug}
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
                        <div className='flex items-center'>
                          <div>
                            <div className='text-sm leading-5 font-medium text-gray-900'>
                              {item.brand.name}
                            </div>
                          </div>
                        </div>
                      </Table.Td>
                      <Table.Td>
                        <Link href={`/products/${item.id}/images`}>
                          <a className='text-blue-900 font-medium hover:text-indigo-400 mr-2'>
                            Imagens
                          </a>
                        </Link>
                        {' | '}
                        <Link href={`/products/${item.id}/edit`}>
                          <a className='text-blue-900 font-medium hover:text-indigo-400 mr-2'>
                            Editar
                          </a>
                        </Link>
                        {' | '}
                        <a
                          href='#'
                          onClick={openModal(item.id)}
                          className='text-red-900 font-medium hover:text-red-400'
                        >
                          Remover
                        </a>
                      </Table.Td>
                    </Table.Row>
                  ))}
                </Table.Body>
              </Table>
              <Modal type = {'remove'} itemId = {itemSelected} visible = {modalVisible} confirmFunction={remove} closeFunction = {() => setModalVisible(false)}/>
            </div>
          )}
        </div>
      </div>
    </Layout>
  )
}
export default Products
