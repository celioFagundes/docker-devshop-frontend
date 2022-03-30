import Link from 'next/link'
import Image from 'next/image'
const Brands = ({ brands }) => {

  return (
    <section className='text-gray-600 body-font bg-white shadow-sm'>
      <div className='container  pb-20 mx-auto'>
        <div className='flex flex-col text-center w-full mb-10 bg-blue-700 py-4'>
          <p className='lg:w-2/3 mx-auto text-xl leading-relaxed text-white'>
            As melhores marcas você encontra aqui no DevShop
          </p>
        </div>
        <div className='flex flex-wrap m-4 '>
          {brands.map(brand => (
            <div className=' bg-white  p-4 my-2 ' key={brand.id}>
              <Link href = {`/marca/${brand.slug}`} passHref>
                <div className='flex relative'>
                    <Image
                    alt={brand.name}
                    src={brand.logo}
                    layout='fill'
                  />
                  <div className='px-8 py-10 h-32 relative z-10 w-full border-4 border-gray-200 bg-white opacity-0 hover:opacity-100 text-center transition-all ease-in-out cursor-pointer'>
                    <h1 className='title-font text-lg font-medium text-gray-900 mb-3'>
                      {brand.name}
                    </h1>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Brands
