import {useState} from 'react'
import Layout from '../../components/Layout'
import Title from '../../components/Title'
import Table from '../../components/Table'
import { useMutation, useQuery } from '../../lib/graphql'
import Link from 'next/link'
import Button from '../../components/Button'
import Alert from '../../components/Alert'
import Modal from '../../components/Modal'
const DELETE_CATEGORY = `
  mutation deleteCategory($id: String!) {
    panelDeleteCategory(id : $id)
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

const Categories = () => {
  const { data, error, mutate } = useQuery(GET_ALL_CATEGORIES)
  const [deleteData, deleteCategory] = useMutation(DELETE_CATEGORY)
  const [modalVisible, setModalVisible] = useState(false)
  const [itemSelected, setItemSelected] = useState('')
 
  const openModal = id => async () => {
    setModalVisible(true)
    setItemSelected({id})
  }
  const remove = async() =>{
    await deleteCategory(itemSelected)
    mutate()
    setModalVisible(false)
  }
  return (
    <Layout>
      <Title>Gerenciar Categorias</Title>
      <div className='mt-5'>
        <Button.Link href='/categories/create'>
          Criar nova categoria
        </Button.Link>
      </div>

      <div className='flex flex-col mt-5'>
        <div className='-my-2 py-2 overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8'>
          {data && data.getAllCategories.length === 0 && (
            <Alert>Nenhuma categoria encontrada</Alert>
          )}
          {data && data.getAllCategories.length > 0 && (
            <div className='align-middle inline-block min-w-full shadow overflow-hidden sm:rounded-lg '>
              <Table>
                <Table.Head>
                  <Table.Th>Categorias</Table.Th>
                  <Table.Th>Ações</Table.Th>
                </Table.Head>
                <Table.Body>
                  {data && data.getAllCategories.map(item => (
                    <Table.Row key={item.id}>
                      <Table.Td>
                        <div className='flex items-center'>
                          <div>
                            <div className='text-sm leading-5 font-medium text-gray-900'>
                              {item.name}
                            </div>
                            <div className='text-sm leading-5 text-gray-500'>
                              {item.slug}
                            </div>
                          </div>
                        </div>
                      </Table.Td>
                      <Table.Td>
                        <Link  href={`/categories/${item.id}/edit`}>
                          <a className='text-blue-900 font-medium hover:text-indigo-400 mr-2'>
                          Editar
                          </a>
                        </Link>
                        {'|'}
                        <a
                          href='#'
                          onClick={openModal(item.id)}
                          className='text-red-800 font-medium hover:text-red-400 ml-2'
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
export default Categories
