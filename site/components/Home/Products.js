import CardProduct from '../CardProduct'

const Products = ({ products }) => {
  return (
    <div className='py-3'>
        <div className='bg-blue-700 py-2 px-4 font-medium text-white mb-2'>
            Confira nossos produtos
        </div>
        <div className='flex flex-row  flex-wrap items-start justify-center md:justify-between'>
        {products && products.map(product => <CardProduct product={product} key = {product.id}/>)}
        </div>
      
    </div>
  )
}

export default Products
