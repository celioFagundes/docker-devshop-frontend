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
      <Title>General Data</Title>
      <div className='mt-4'>
        <div className='flex flex-wrap'>
          <Card>
            <Card.Data>
              <Card.Title>Categories</Card.Title>
              <div className='flex  items center justify-between'>
                <Card.Description>
                   Registered categories:
                  <span className='font-medium text-lg'>
                    {categories?.getAllCategories?.length}
                  </span>
                </Card.Description>
              </div>
            </Card.Data>
          </Card>
          <Card>
            <Card.Data>
              <Card.Title>Sneakers</Card.Title>
              <div className='flex  items center justify-between'>
                <Card.Description>
                  Registered sneakers:{' '}
                  {products?.getAllProducts?.length}
                </Card.Description>
              </div>
            </Card.Data>
          </Card>
          <Card>
            <Card.Data>
              <Card.Title>Brands</Card.Title>
              <div className='flex  items center justify-between'>
                <Card.Description>
                 Registered brands :{' '}
                  {brands?.getAllBrands?.length}
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
