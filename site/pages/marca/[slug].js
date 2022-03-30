import { gql } from 'graphql-request'
import Layout from '../../components/Layout'
import { fetcher } from '../../lib/graphql'
import CardProduct from '../../components/CardProduct'

const GET_ALL_CATEGORIES = gql`
  query {
    categories: getAllCategories {
      id
      name
      slug
    }
  }
`
const GET_ALL_BRANDS = gql`
  query {
    brands: getAllBrands {
      id
      name
      slug
    }
  }
`
const GET_ALL_PRODUCTS_BY_BRAND= gql`
  query getProductsByBrand($slug: String!) {
    products: getProductsByBrand(brandSlug: $slug) {
      id
      name
      slug
      brand{
        name
      }
      images
      variations{
        price
      }
    }
  }
`
const ProductsByBrand = ({ products, categories , brands, marca}) => {
  return (
    <Layout categories={categories} brands = {brands}>
      <p className='bg-blue-500 py-2 px-4 font-medium text-white mb-5'>Confira nossos produtos da marca {marca}</p>
      <section className='text-gray-600 body-font'>
        <div className='container px-5 py-24 mx-auto'>
          <div className='flex flex-wrap -m-4'>
            {products?.length === 0 && <p>Sem produtos para esta categoria</p>}
            {products?.map(product => (
              <CardProduct product = {product} key = {product.id}/>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  )
}
export async function getServerSideProps(context) {
  const { products } = await fetcher(GET_ALL_PRODUCTS_BY_BRAND, {
    slug: context.query.slug,
  })
  const { categories } = await fetcher(GET_ALL_CATEGORIES)
  const { brands } = await fetcher(GET_ALL_BRANDS)
  return {
    props: {
      marca: context.query.slug,
      products,
      categories,
      brands
    },
  }
}
export default ProductsByBrand
