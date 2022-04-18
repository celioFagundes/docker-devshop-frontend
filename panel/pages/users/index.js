import React, { useState } from 'react'
import Layout from '../../components/Layout'
import Title from '../../components/Title'
import Table from '../../components/Table'
import { useMutation, useQuery } from '../../lib/graphql'
import Link from 'next/link'
import Button from '../../components/Button'
import Alert from '../../components/Alert'
import Modal from '../../components/Modal'
import { AiFillDelete, AiFillEdit, AiOutlinePlus } from 'react-icons/ai'
import { MdPassword } from 'react-icons/md'
import { FaUserClock } from 'react-icons/fa'

const DELETE_USERS = `
  mutation deleteUser($id: String!) {
    panelDeleteUser(id : $id)
  }
`
const GET_ALL_USERS = `
  query{
  panelGetAllUsers{
    id
    name
    email
    role
  }
}`

const Users = () => {
  const { data, error, mutate } = useQuery(GET_ALL_USERS)
  const [deleteData, deleteUser] = useMutation(DELETE_USERS)

  const [modalVisible, setModalVisible] = useState(false)
  const [itemSelected, setItemSelected] = useState('')
  const openModal = id => async () => {
    setModalVisible(true)
    setItemSelected({ id })
  }
  const remove = async () => {
    await deleteUser(itemSelected)
    mutate()
    setModalVisible(false)
  }
  return (
    <Layout>
      <Title>Manage users</Title>
      <div className='mt-5'>
        <Button.Card href='/users/create' Icon={AiOutlinePlus}>
          Insert new user
        </Button.Card>
      </div>

      <div className='flex flex-col mt-5'>
        <div className='-my-2 py-2 overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8'>
          {data && data.panelGetAllUsers.length === 0 && (
            <Alert>No users found</Alert>
          )}
          {data && data.panelGetAllUsers.length > 0 && (
            <div className='align-middle inline-block min-w-full shadow overflow-hidden sm:rounded-lg '>
              <Table>
                <Table.Head>
                  <Table.Th>User</Table.Th>
                  <Table.Th>Email</Table.Th>
                  <Table.Th>Role</Table.Th>
                  <Table.Th></Table.Th>
                </Table.Head>
                <Table.Body>
                  {data &&
                    data.panelGetAllUsers.map(item => (
                      <Table.Row key={item.id}>
                        <Table.Td>
                          <div className='text-sm leading-5 font-medium text-lightGray'>
                            {item.name}
                          </div>
                        </Table.Td>
                        <Table.Td>
                          <div className='text-sm leading-5 text-lightGray'>
                            {item.email}
                          </div>
                        </Table.Td>
                        <Table.Td>
                          <div className='text-sm leading-5 text-lightGray uppercase'>
                            {item.role}
                          </div>
                        </Table.Td>
                        <Table.Td className='px-6 py-4 whitespace-no-wrap text-right border-b border-gray-200 text-sm leading-5 font-medium'>
                          <div className='flex items-center justify-start'>
                            <Link href={`/users/${item.id}/sessions`}>
                              <a className='text-lightGray font-medium hover:text-gray-400 mr-2'>
                                <FaUserClock size={24} />
                              </a>
                            </Link>
                            <Link href={`/users/${item.id}/password`}>
                              <a className='text-lightGray font-medium hover:text-gray-400 mr-2'>
                                <MdPassword size={24} />
                              </a>
                            </Link>
                            <Link href={`/users/${item.id}/edit`}>
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
              <Modal
                type={'remove'}
                itemId={itemSelected}
                visible={modalVisible}
                confirmFunction={remove}
                closeFunction={() => setModalVisible(false)}
              />
            </div>
          )}
        </div>
      </div>
    </Layout>
  )
}
export default Users
