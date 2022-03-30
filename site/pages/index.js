import Layout from '../components/Layout'
import Seo from '../components/Seo'
import { fetcher } from '../lib/graphql'
import { gql } from 'graphql-request'
import Brands from '../components/Home/Brands'
import Products from '../components/Home/Products'
import Link from 'next/link'
import Image from 'next/image'

const GET_ALL_PRODUCTS = gql`
  query {
    products: getAllProducts {
      id
      name
      slug
      voltage
      variations {
        price
      }
      brand {
        slug
        name
      }
      images
    }
  }
`
const GET_ALL_BRANDS = gql`
  query {
    brands: getAllBrands {
      id
      name
      slug
      logo
    }
  }
`
const GET_ALL_CATEGORIES = gql`
  query {
    categories: getAllCategories {
      id
      name
      slug
    }
  }
`
const Index = ({ brands, categories, products }) => {
  return (
    <>
      <Layout categories={categories} brands={brands}>
        <Seo />
        <Link href='/categoria/smartphones'>
          <div>
          <Image
            alt='link para categoria smartphone'
            src={'/images/banner.webp'}
            layout='responsive'
            width={1250}
            height={313}
            priority
          />
          </div>
        </Link>
        <Products products={products} />
        <Brands brands={brands} />
      </Layout>
    </>
  )
}

export async function getServerSideProps(context) {
  const { brands } = await fetcher(GET_ALL_BRANDS)
  const { categories } = await fetcher(GET_ALL_CATEGORIES)
  const { products } = await fetcher(GET_ALL_PRODUCTS)

  return {
    props: {
      brands,
      categories,
      products,
    },
  }
}

export default Index
