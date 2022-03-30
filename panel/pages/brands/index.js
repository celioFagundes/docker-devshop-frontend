import React , {useState} from 'react'
import Layout from '../../components/Layout'
import Title from '../../components/Title'
import Table from '../../components/Table'
import { useMutation, useQuery } from '../../lib/graphql'
import Link from 'next/link'
import Button from '../../components/Button'
import Alert from '../../components/Alert'
import Modal from '../../components/Modal'

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
    setItemSelected({id})
  }
  const remove = async() =>{
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
      <Title>Gerenciar Marcas</Title>
      <div className='mt-5'>
        <Button.Link href='/brands/create'>Criar nova marca</Button.Link>
      </div>

      <div className='flex flex-col mt-5'>
        <div className='-my-2 py-2 overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8'>
          {data && data.getAllBrands.length === 0 && (
            <Alert>Nenhuma marca encontrada</Alert>
          )}
          {data && data.getAllBrands.length > 0 && (
            <div className='align-middle inline-block min-w-full shadow overflow-hidden sm:rounded-lg '>
              <Table>
                <Table.Head>
                  <Table.Th>Logo</Table.Th>
                  <Table.Th>Marca</Table.Th>
                  <Table.Th>Actions</Table.Th>
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
                            <div className='text-sm leading-5 font-medium text-gray-900'>
                                Nenhum logo encontrado
                              </div>
                          </Table.Td>
                        )}
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
                        <Table.Td className='px-6 py-4 whitespace-no-wrap text-right border-b border-gray-200 text-sm leading-5 font-medium'>
                          <Link href={`/brands/${item.id}/edit`}>
                            <a className='text-blue-900 font-medium hover:text-indigo-400 mr-2'>
                              Editar
                            </a>
                          </Link>
                          {' | '}

                          <Link href={`/brands/${item.id}/upload`}>
                            <a className='text-blue-900 font-medium hover:text-indigo-400 mr-2'>
                              Upload Logo
                            </a>
                          </Link>
                          {' | '}

                          {item.logo && (
                            <>
                              <a
                                href='#'
                                onClick={removeBrandLogo(item.id)}
                                className='text-red-900 font-medium hover:text-red-400 mr-2'
                              >
                                Remover logo
                              </a>
                              {' | '}
                            </>
                          )}
                          <a
                            href='#'
                            onClick={openModal(item.id)}
                            className='text-red-900 font-medium hover:text-red-400 '
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
export default Brands
