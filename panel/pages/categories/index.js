import {useState} from 'react'
import Layout from '../../components/Layout'
import Title from '../../components/Title'
import Table from '../../components/Table'
import { useMutation, useQuery } from '../../lib/graphql'
import Link from 'next/link'
import Button from '../../components/Button'
import Alert from '../../components/Alert'
import Modal from '../../components/Modal'
import { AiFillDelete, AiFillEdit, AiOutlinePlus } from 'react-icons/ai'
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
      <Title>Manage categories</Title>
      <div className='mt-5'>
        <Button.Card href='/categories/create' Icon={AiOutlinePlus}>
          Insert new Category
        </Button.Card>
      </div>

      <div className='flex flex-col mt-5'>
        <div className='-my-2 py-2 overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8'>
          {data && data.getAllCategories.length === 0 && (
            <Alert>No categories found</Alert>
          )}
          {data && data.getAllCategories.length > 0 && (
            <div className='align-middle inline-block min-w-full shadow overflow-hidden sm:rounded-lg '>
              <Table>
                <Table.Head>
                  <Table.Th>Category</Table.Th>
                  <Table.Th>Slug</Table.Th>
                  <Table.Th></Table.Th>
                </Table.Head>
                <Table.Body>
                  {data && data.getAllCategories.map(item => (
                    <Table.Row key={item.id}>
                      <Table.Td>
                        <div className='flex items-center'>
                            <div className='text-sm leading-5 font-medium text-lightGray'>
                              {item.name}        
                          </div>
                        </div>
                      </Table.Td>
                      <Table.Td>
                        <div className='flex items-center'>
                        <div className='text-sm leading-5 text-lightGray'>
                              {item.slug}
                            </div>
                        </div>
                      </Table.Td>
                      <Table.Td>
                        <div className='flex items-center justify-start'>
                          <Link href={`/categories/${item.id}/edit`}>
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
                        </div>
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
