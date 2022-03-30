import React from 'react'
import Layout from '../components/Layout'
import Title from '../components/Title'
import Card from '../components/Card'
import { useQuery } from '../lib/graphql'
import { RiArrowUpSFill } from 'react-icons/ri'
import Chart from '../components/Chart'

const GET_ALL_CATEGORIES = `
  query{
  getAllCategories{
    id
    name
    slug
  }
}`
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
  }
}`
const GET_ALL_BRANDS = `
  query{
  getAllBrands{
    id
    name
    slug
    logo
  }
}`
const Dashboard = () => {
  const { data: categories } = useQuery(GET_ALL_CATEGORIES)
  const { data: products } = useQuery(GET_ALL_PRODUCTS)
  const { data: brands } = useQuery(GET_ALL_BRANDS)
  
  return (
    <Layout>
      <Title>Informações gerais</Title>
      <div className='my-3'>

     
      <p className='font-medium text-lg text-white'>
          Número de vendas do mês atual : Abril/22
        </p>
        <div className='flex flex-row items-center justify-start'>
          <p className='font-medium text-lg text-white mr-3'>1200 </p>
          <span className='font-medium text-sm text-white mr-3'>
            <RiArrowUpSFill color='#42F548 ' className='inline' />
            10% em relação ao mês anterior
          </span>
        </div>
        </div>
      <Chart/>
      <div className='mt-4'>
        
        
        
        <div className='flex flex-wrap'>
          <Card>
            <Card.Data>
              <Card.Title>Categorias</Card.Title>
              <div className='flex  items center justify-between'>
                <Card.Description>
                  Quantidade de categorias cadastradas :{' '}
                  <span className='font-medium text-lg'>
                    {categories?.getAllCategories?.length}
                  </span>
                </Card.Description>
                <Card.Description>
                  Categoria mais pesquisada :{' '}
                  <span className='font-medium text-lg'>Celulares</span>
                </Card.Description>
              </div>
            </Card.Data>
          </Card>
          <Card>
            <Card.Data>
              <Card.Title>Produtos</Card.Title>
              <div className='flex  items center justify-between'>
                <Card.Description>
                  Quantidade de produtos cadastrados :{' '}
                  {products?.getAllProducts?.length}
                </Card.Description>
                <Card.Description>
                  Produto mais vendido :
                  <span className='font-medium text-lg'>
                    Samsung Galaxy S21
                  </span>
                </Card.Description>
              </div>
            </Card.Data>
          </Card>
          <Card>
            <Card.Data>
              <Card.Title>Marcas</Card.Title>
              <div className='flex  items center justify-between'>
                <Card.Description>
                  Quantidade de marcas cadastradas :{' '}
                  {brands?.getAllBrands?.length}
                </Card.Description>
                <Card.Description>
                  Marca mais vendida :{' '}
                  <span className='font-medium text-lg'>Samsung</span>{' '}
                </Card.Description>
              </div>
            </Card.Data>
          </Card>
        </div>
      </div>
    </Layout>
  )
}
export default Dashboard
