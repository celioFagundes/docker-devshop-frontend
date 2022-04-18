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
import { BsFillCloudUploadFill } from 'react-icons/bs'
import { MdHideImage, MdImage } from 'react-icons/md'

const DELETE_BRAND = `
  mutation deleteBrand($id: String!) {
    panelDeleteBrand(id : $id)
  }
`
const REMOVE_BRAND_LOGO = `
  mutation removeBrandLogo($id: String!) {
    panelRemoveBrandLogo(id : $id)
  }
`
const GET_ALL_BRANDS = `
  query{
  getAllBrands{
    id
    name
    slug
    logo
  }
}`

const Brands = () => {
  const { data, error, mutate } = useQuery(GET_ALL_BRANDS)
  const [deleteData, deleteBrand] = useMutation(DELETE_BRAND)
  const [deleteBrandLogoData, deleteBrandLogo] = useMutation(REMOVE_BRAND_LOGO)
  const [modalVisible, setModalVisible] = useState(false)
  const [itemSelected, setItemSelected] = useState('')
  const openModal = id => async () => {
    setModalVisible(true)
    setItemSelected({ id })
  }
  const remove = async () => {
    await deleteBrand(itemSelected)
    mutate()
    setModalVisible(false)
  }
  const removeBrandLogo = id => async () => {
    await deleteBrandLogo({ id })
    mutate()
  }
  return (
    <Layout>
      <Title>Manage brands</Title>
      <div className='mt-5'>
        <Button.Card href='/brands/create' Icon={AiOutlinePlus}>
          Insert new Brand
        </Button.Card>
      </div>

      <div className='flex flex-col mt-5'>
        <div className='-my-2 py-2 overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8'>
          {data && data.getAllBrands.length === 0 && (
            <Alert>No brands found</Alert>
          )}
          {data && data.getAllBrands.length > 0 && (
            <div className='align-middle inline-block min-w-full shadow overflow-hidden sm:rounded-lg '>
              <Table>
                <Table.Head>
                  <Table.Th>Logo</Table.Th>
                  <Table.Th>Brand</Table.Th>
                  <Table.Th>slug</Table.Th>
                  <Table.Th></Table.Th>
                </Table.Head>
                <Table.Body>
                  {data &&
                    data.getAllBrands.map(item => (
                      <Table.Row key={item.id}>
                        {item.logo ? (
                          <Table.Td>
                            <div className='flex items-center'>
                              <div>
                                <div className='text-sm leading-5 font-medium text-gray-900'>
                                  <img
                                    src={item.logo}
                                    alt={item.name}
                                    height={60}
                                    width={60}
                                  />
                                </div>
                              </div>
                            </div>
                          </Table.Td>
                        ) : (
                          <Table.Td>
                            <div className='text-sm leading-5 font-medium text-lightGray'>
                              No logo found
                            </div>
                          </Table.Td>
                        )}
                        <Table.Td>
                          <div className='text-sm leading-5 font-medium text-lightGray'>
                            {item.name}
                          </div>
                        </Table.Td>
                        <Table.Td>
                          <div className='text-sm leading-5 text-lightGray'>
                            {item.slug}
                          </div>
                        </Table.Td>
                        <Table.Td className='px-6 py-4 whitespace-no-wrap text-right border-b border-gray-200 text-sm leading-5 font-medium'>
                          <div className='flex items-center justify-start'>
                            <Link href={`/brands/${item.id}/edit`}>
                              <a className='text-lightGray font-medium hover:text-gray-400 mr-2'>
                                <AiFillEdit size={24} />
                              </a>
                            </Link>
                            <Link href={`/brands/${item.id}/upload`}>
                              <a className='text-lightGray font-medium hover:text-gray-400 mr-2'>
                                <MdImage size={24} />
                              </a>
                            </Link>
                            {item.logo && (
                              <button
                                onClick={removeBrandLogo(item.id)}
                                className='text-lightGray font-medium hover:text-gray-400'
                              >
                                <MdHideImage size={24} />
                              </button>
                            )}
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
export default Brands
