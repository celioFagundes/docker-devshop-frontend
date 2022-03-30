import Image from 'next/image'
import Link from 'next/link'
const CardProduct = ({ product }) => {
  return (
    <div
      className='w-full flex flex-col justify-between sm:w-1/2 h-96 md:w-1/3 lg:w-1/4 my-2 mr-1 py-6 px-4 bg-white shadow-md rounded hover:cursor-pointer '
      key={product.id}
    >
      <div className='block relative h-48 rounded overflow-hidden'>
        {product.images && product.images.length > 0 ? (
          <Image
            alt={product.name}
            className='object-contain object-center w-full h-full block'
            src={product.images[0]}
            layout='fill'
          />
        ) : (
          <Image
            alt={product.name}
            className='object-contain object-center w-full h-full block'
            src='https://dummyimage.com/420x260'
            layout='fill'
          />
        )}
      </div>
      <div className='mt-4 '>
        <h3 className='text-gray-500text-xs tracking-widest title-font mb-1 '>
          {product.brand.name}
        </h3>
        <h2 className='text-gray-900 title-font text-lg font-medium'>
          <Link href={`/produto/${product.slug}`}>{product.name}</Link>
        </h2>
        <p className='mt-1 text-green-700 text-lg font-medium'>
          R$ {product.variations[0].price.toLocaleString('pt-br')}
        </p>
      </div>
    </div>
  )
}

export default CardProduct
